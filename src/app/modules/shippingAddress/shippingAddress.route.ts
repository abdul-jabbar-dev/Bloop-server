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
  "/",
  Auth(["subscriber"]),
  validateRequest(CreateShippingAddressSchema),
  ShippingAddressControl.createShippingAddress
);
ShippingAddressRoute.get("/", ShippingAddressControl.getShippingAddress);
ShippingAddressRoute.get(
  "/:shippingAddressId",
  ShippingAddressControl.getAShippingAddress
);

ShippingAddressRoute.patch(
  "/:shippingAddressId",
  Auth(["subscriber"]),
  validateRequest(UpdateShippingAddressSchema),
  ShippingAddressControl.updateShippingAddress
);
ShippingAddressRoute.delete(
  "/:shippingAddressId",
  Auth(["subscriber"]),
  ShippingAddressControl.deleteShippingAddress
);

export default ShippingAddressRoute;
