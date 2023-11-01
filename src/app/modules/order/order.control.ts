import {
  Order,
  PaymentMethods,
  Prisma,
  ServicePlaced,
  ServiceProvider,
  Status,
} from "@prisma/client";
import DB from "../../../db/prismaClient";
import { JwtPayload } from "jsonwebtoken";

type TMakeOrder = {
  orderData: Omit<Order, "createdAt" | "updatedAt" | "id" | "status">;
  oldServicePlacedData: Omit<
    ServicePlaced,
    "id" | "paymentId" | "createdAt" | "updatedAt" | "orderId"
  >;
};

const availableProviderDate = async ({
  providerId,
  bookingDate,
}: {
  providerId: string;
  bookingDate: string;
}) => {
  const isExistProvider = await DB.serviceProvider.findUnique({
    where: { id: providerId },
    include: { servicePlaced: true },
  });
  if (!isExistProvider) {
    throw new Error("Provider id invalid");
  }
  const isAvailable = isExistProvider?.servicePlaced.find(
    (servicePlace: ServicePlaced) => servicePlace.bookingDate === bookingDate
  );
  if (isAvailable) {
    return { isAvailable: false, assignment: isAvailable, isExistProvider };
  } else {
    return { isAvailable: true, isExistProvider };
  }
};
const createOrderDB = async ({
  orderData,
  oldServicePlacedData,
}: TMakeOrder): Promise<{ servicePlaced: string; order: Order }> => {
  const newServicePlacedData: Partial<ServicePlaced> = {
    ...oldServicePlacedData,
  };
  let order: Order | null = null;
  let servicePlaced: ServicePlaced | null = null;
  await DB.$transaction(async (asyncDB) => {
    const orderedService = await asyncDB.service.findUnique({
      where: {
        id: oldServicePlacedData.serviceId,
      },
    });
    if (!orderedService) {
      throw new Error("Invalid Service Data ");
    }
    const serviceProvider = await asyncDB.serviceProvider.findFirst({
      include: { servicePlaced: true },
      where: {
        serviceType: { id: orderedService.serviceTypeId },
        servicePlaced: {
          some: { NOT: { bookingDate: oldServicePlacedData.bookingDate } },
        },
      },
    });
    if (!serviceProvider) {
      throw new Error(
        "No Worker available in " + oldServicePlacedData.bookingDate
      );
    }
    order = await asyncDB.order.create({
      data: { subscriberId: orderData.subscriberId, cartId: orderData.cartId },
    });
    if (!order) {
      throw new Error("Failed to create order");
    }

    const isProviderAvailable = await availableProviderDate({
      providerId: serviceProvider.id,
      bookingDate: oldServicePlacedData.bookingDate,
    });
    if (!isProviderAvailable.isAvailable) {
      throw new Error(
        "Service provider not available in " +
          isProviderAvailable.assignment?.bookingDate
      );
    }
    newServicePlacedData["orderId"] = order.id;
    newServicePlacedData["serviceProviderId"] =
      isProviderAvailable.isExistProvider.id;
    console.log(newServicePlacedData);
    // order created
    // -----------------------------------------------------servicePlaced
    // console.log(order);
    servicePlaced = await asyncDB.servicePlaced.create({
      data: newServicePlacedData as ServicePlaced,
    });
    if (!servicePlaced) {
      throw new Error("Internal server error! Order placed failed");
    } else {
      return { servicePlaced, order };
    }
  });
  if (!order) {
    throw new Error("Order create failed");
  }
  if (!servicePlaced) {
    throw new Error("Order placed failed");
  }
  return { servicePlaced, order };
};
const findByCartDB = async ({ cartId }: { cartId: string }) => {
  const result = await DB.order.findUnique({
    where: { cartId },
    include: {
      servicePlaced: { include: { payment: true, service: true, order: true } },
    },
  });
  return result;
};
const ConfirmPaymentDB = async (confirmData: {
  paymentVarificationCode: string;
  paymentMethod: PaymentMethods;
  orderId: string;
}) => {
  try {
    let order: Order | null = null;
    await DB.$transaction(async (asyncDB) => {
      order = await asyncDB.order.findUnique({
        where: { id: confirmData.orderId },
        include: { servicePlaced: { include: { service: true } } },
      });
      if (!order) {
        throw new Error("No Order found try to valid order id ");
      }
      const makePayment = await asyncDB.payment.create({
        data: {
          price: (order as any).servicePlaced?.service.price?.toString()!,
          status:
            confirmData?.paymentMethod === PaymentMethods.CashOnDelivery
              ? "pending"
              : "paid",
          paymentMethod: confirmData.paymentMethod,
          paymentVarificationCode: confirmData.paymentVarificationCode,
          servicePlaced: { connect: { id: (order as any).servicePlaced?.id! } },
        },
      });

      if (!makePayment) {
        throw new Error("internal server error payment failed");
      }
      const updateOrder = await DB.order.update({
        where: { id: order.id },
        data: { status: "booked" },
      });
      if (!updateOrder) {
        throw new Error("internal server error payment update");
      }
    });
    if (!order) {
      throw new Error("internal server error! checkout failed");
    }
    return order;
  } catch (error) {
    return Promise.reject(error);
  }
};
const findMyOrderDB = async (user: JwtPayload) => {
  const result = await DB.order.findMany({
    where: { subscriber: { userId: user.id } },
    include: {
      feedback: true,
      servicePlaced: {
        include: { payment: true, service: true, serviceProvider: true },
      },
    },
  });
  return result;
};

const findProviderOrderDB = async (user: JwtPayload, isActive: Status | {}) => {
  const result = await DB.order.findMany({
    include: {
      feedback: true,
      servicePlaced: {
        include: { payment: true, service: true, serviceProvider: true,order:true },
      },
    },
    where: {
      servicePlaced: {
        serviceProviderId: user.serviceProvider.id,
      },
      status: isActive,
    },
    orderBy: { servicePlaced: { createdAt: "desc" } },
  });

  return result;
};

const completeOrderDB = async (orderId: string, provider: ServiceProvider) => {
  const order = await DB.order.findUnique({
    where: { id: orderId, servicePlaced: { serviceProviderId: provider.id } },
  });
  if (!order) {
    throw new Error("Invalid Order");
  }
  const updateOrder = await DB.order.update({
    where: { id: order.id },
    data: { status: "finish" },
  });
  if (!updateOrder) {
    throw new Error("Failed to completed order");
  }
 return updateOrder
};

const OrderControl = {
  createOrderDB,
  availableProviderDate,
  findByCartDB,
  ConfirmPaymentDB,
  findMyOrderDB,
  findProviderOrderDB,
  completeOrderDB,
};
export default OrderControl;
