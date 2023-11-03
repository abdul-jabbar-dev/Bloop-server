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
import ShippingAddressControl from "../shippingAddress/shippingAddress.control";
import ShippingAddressService from "../shippingAddress/shippingAddress.service";

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
  const shippingAddress = await DB.shippingAddress.findFirst({
    include: { subscriber: true },
    where: { subscriberId: subscriber.id, isDefault: true }, 
  });
  if (!shippingAddress) {
    throw new Error("No Shipping address selected");
  }
  console.log(shippingAddress);
  if (existCart) {
    sendResponse(res, { data: existCart });
  }
  const orderData: Omit<Order, "createdAt" | "updatedAt" | "id" | "status"> = {
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
};
export default OrderService;
