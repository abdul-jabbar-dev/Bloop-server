import { Router } from "express";
import OrderService from "./order.service";
import validateRequest from "../../middlewares/validateRequest";
import { CreateOrderSchema } from "./order.schema";

const OrderRoute = Router();

OrderRoute.post(
  "/create-order",
  validateRequest(CreateOrderSchema),
  OrderService.createOrder
);

export default OrderRoute;
