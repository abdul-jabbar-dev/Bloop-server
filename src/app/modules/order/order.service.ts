import {
  Order,
  PaymentMethods,
  ServicePlaced,
  Subscriber,
} from "@prisma/client";
import catchAsync from "../../../shared/catchAsync";
import DB from "../../../db/prismaClient";
import OrderControl from "./order.control";
import sendResponse from "../../../shared/Response/sendResponse";

const availableProviderDate = catchAsync(async (req, res) => {
  const { providerId } = req.params;
  const { date } = req.body;
  const result = await OrderControl.availableProviderDate({
    providerId,
    bookingDate: date,
  });
  sendResponse(res, { data: result });
});
const findByCart = catchAsync(async (req, res) => {
  const { cartId } = req.params;
  const result = await OrderControl.findByCartDB({ cartId });
  sendResponse(res, { data: result });
});
const findMyOrder = catchAsync(async (req, res) => {
  const user = req.user!;
  const result = await OrderControl.findMyOrderDB(user);
  sendResponse(res, { data: result });
});

const findProviderActiveOrder = catchAsync(async (req, res) => {
  const user = req.user!;
  const result = await OrderControl.findProviderOrderDB(user, "booked");
  sendResponse(res, { data: result });
});
const findProviderAllOrder = catchAsync(async (req, res) => {
  const user = req.user!;
  console.log(user);
  const result = await OrderControl.findProviderOrderDB(user, {});
  sendResponse(res, { data: result });
});

const allOrders = catchAsync(async (req, res) => {
  const user = req.user!;
  if (user.role !== "admin") {
    throw new Error("Invalid access");
  }
  const result = await OrderControl.getAllOrdersDB( );
  sendResponse(res, { data: result });
});

const createOrder = catchAsync(async (req, res) => {
  const subscriber: Subscriber | null = await DB.subscriber.findUnique({
    where: { userId: req?.user?.id },
  });
  if (!subscriber) {
    throw new Error("Invalid subscriber");
  }

  const existCart = await DB.order.findUnique({
    where: { cartId: req.body.cartId },
  });
  if (existCart) {
    sendResponse(res, { data: existCart });
  }
  const orderData: Omit<
    Order,
    "createdAt" | "updatedAt" | "id" | "status" | "shippingAddressId"
  > = {
    subscriberId: subscriber.id,
    cartId: req.body.cartId,
  };

  const servicePlacedData: Omit<
    ServicePlaced,
    "id" | "paymentId" | "createdAt" | "updatedAt" | "orderId"
  > = { ...req.body, cartId: undefined };
  const result /* : { servicePlaced: string; order: Order } */ =
    await OrderControl.createOrderDB({
      orderData,
      oldServicePlacedData: servicePlacedData,
    });
  sendResponse(res, { data: result });
});

const confirmPayment = catchAsync(async (req, res) => {
  const confirmData: {
    paymentVarificationCode: string;
    paymentMethod: PaymentMethods;
    orderId: string;
  } = req.body;
  const result = await OrderControl.ConfirmPaymentDB(confirmData);
  sendResponse(res, {
    data: result,
  });
});
const completeOrder = catchAsync(async (req, res) => {
  const { orderId } = req.params;
  const user = req.user;
  const provider = await DB.serviceProvider.findUnique({
    where: { userId: user?.id },
  });
  if (!provider) {
    throw new Error("Invalid provider");
  }
  const result = await OrderControl.completeOrderDB(orderId, provider);
  sendResponse(res, {
    data: result,
  });
});

const OrderService = {
  createOrder,
  findMyOrder,
  availableProviderDate,
  findByCart,
  confirmPayment,
  findProviderAllOrder,
  findProviderActiveOrder,
  completeOrder,
  allOrders,
};
export default OrderService;
