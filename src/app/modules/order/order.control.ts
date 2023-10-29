import { Order, ServicePlaced, Subscriber } from "@prisma/client";
import DB from "../../../db/prismaClient";

type TMakeOrder = {
  orderData: Omit<Order, "createdAt" | "updatedAt" | "id" | "status">;
  oldServicePlacedData: Omit<
    ServicePlaced,
    "id" | "paymentId" | "createdAt" | "updatedAt" | "orderId"
  >;
};

const createOrderDB = async ({
  orderData,
  oldServicePlacedData,
}: TMakeOrder) => {
  const newServicePlacedData: Partial<ServicePlaced> = {
    ...oldServicePlacedData,
  };
  await DB.$transaction(async (asyncDB) => {
    const order = await asyncDB.order.create({
      data: { subscriberId: orderData.subscriberId },
    });
    if (!order) {
      throw new Error("Failed to create order");
    }
    // order created
    newServicePlacedData["orderId"] = order.id;
    // -----------------------------------------------------servicePlaced
    console.log(newServicePlacedData);
    // const servicePlaced = await asyncDB.servicePlaced.create({ data: newServicePlacedData  });
  });
};

const OrderControl = {
  createOrderDB,
};
export default OrderControl;
