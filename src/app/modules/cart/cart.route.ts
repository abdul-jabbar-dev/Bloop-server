import { Router } from "express";
import CartControl from "./cart.control";
import Auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { CreateCartSchema, SetTimeCartSchema } from "./cart.schema";

const CartRoute = Router();
CartRoute.post(
  "/add-to-cart",
  Auth(["admin", "super_admin", "subscriber", "serviceProvider"]),
  validateRequest(CreateCartSchema),
  CartControl.addToCart
);
CartRoute.get(
  "/get-from-cart",
  Auth(["admin", "super_admin", "subscriber", "serviceProvider"]),
  CartControl.getToCart
);

CartRoute.get(
  "/get-cart-item/:itemId",
  Auth(["admin", "super_admin", "subscriber", "serviceProvider"]),
  CartControl.getACart
);

CartRoute.patch(
  "/set-date/:itemId",
  Auth(["admin", "super_admin"]),
  validateRequest(SetTimeCartSchema),
  CartControl.setDateToItem
);
CartRoute.delete(
  "/remove-date/:itemId",
  Auth(["admin", "super_admin"]),
  CartControl.removeDateFromItem
);
CartRoute.delete(
  "/remove-cart/:itemId",
  Auth(["admin", "super_admin"]),
  CartControl.removeCart
);

export default CartRoute;
