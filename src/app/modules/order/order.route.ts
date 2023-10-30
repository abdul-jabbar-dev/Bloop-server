import { Router } from "express";
import OrderService from "./order.service";
import validateRequest from "../../middlewares/validateRequest";
import {
  CreateOrderSchema,
  availableProviderDateSchema,
  confirmPaymentSchema,
} from "./order.schema";
import Auth from "../../middlewares/auth";

const OrderRoute = Router();

OrderRoute.post(
  "/create-order",
  validateRequest(CreateOrderSchema),
  Auth(["subscriber"]),
  OrderService.createOrder
);
OrderRoute.post(
  "/available-provider-date/:providerId",
  Auth(["subscriber"]),
  validateRequest(availableProviderDateSchema),
  OrderService.availableProviderDate
);

OrderRoute.get(
  "/find-by-cartId/:cartId",
  Auth(["subscriber"]),
  OrderService.findByCart
);
OrderRoute.get(
  "/find-my-orders",
  Auth(["subscriber"]),
  OrderService.findMyOrder
);

OrderRoute.post(
  "/confirm-payment",
  Auth(["subscriber"]),
  validateRequest(confirmPaymentSchema),
  OrderService.confirmPayment
);

export default OrderRoute;
