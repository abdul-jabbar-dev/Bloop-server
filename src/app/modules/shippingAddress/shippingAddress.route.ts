import { Router } from "express";
import Auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import ShippingAddressControl from "./shippingAddress.control";
import {
  CreateShippingAddressSchema,
  UpdateShippingAddressSchema,
} from "./shippingAddress.schema";

const ShippingAddressRoute = Router();

ShippingAddressRoute.post(
  "/create-shipping-address",
  Auth(["subscriber"]),
  validateRequest(CreateShippingAddressSchema),
  ShippingAddressControl.createShippingAddress
);
ShippingAddressRoute.get(
  "/get-shipping-address",
  Auth(["subscriber"]),
  ShippingAddressControl.getShippingAddress
);
ShippingAddressRoute.get(
  "/get-shipping-address/:shippingAddressId",
  Auth(["subscriber"]),
  ShippingAddressControl.getAShippingAddress
);

ShippingAddressRoute.delete(
  "/delete-shipping-address/:shippingAddressId",
  Auth(["subscriber"]),
  ShippingAddressControl.deleteShippingAddress
);

ShippingAddressRoute.patch(
  "/set-default/:shippingAddressId",
  Auth(["subscriber"]), 
  ShippingAddressControl.setDefaultShippingAddress
);
// Unhandled
ShippingAddressRoute.patch(
  "/:shippingAddressId",
  Auth(["subscriber"]),
  validateRequest(UpdateShippingAddressSchema),
  ShippingAddressControl.updateShippingAddress
);
export default ShippingAddressRoute;
