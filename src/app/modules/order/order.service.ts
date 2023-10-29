import { Order, ServicePlaced, Subscriber } from "@prisma/client";
import catchAsync from "../../../shared/catchAsync";
import DB from "../../../db/prismaClient";
import OrderControl from "./order.control";
import sendResponse from "../../../shared/Response/sendResponse";

const createOrder = catchAsync(async (req, res) => {
  const subscriber: Subscriber | null = await DB.subscriber.findUnique({
    where: { userId: req?.user?.id },
  });
  if (!subscriber) {
    throw new Error("Invalid subscriber");
  }
  const orderData: Omit<Order, "createdAt" | "updatedAt" | "id" | "status"> = {
    subscriberId: subscriber.id,
  };

  const servicePlacedData: Omit<
    ServicePlaced,
    "id" | "paymentId" | "createdAt" | "updatedAt" | "orderId"
  > = req.body;
  const result = await OrderControl.createOrderDB({
    orderData,
    oldServicePlacedData: servicePlacedData,
  });
  sendResponse(res, { data: result });
});

const OrderService = { createOrder };
export default OrderService;
