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
ShippingAddressRoute.get(
  "/",
  Auth(["subscriber"]),
  ShippingAddressControl.getShippingAddress
);
ShippingAddressRoute.get(
  "/:shippingAddressId",
  Auth(["subscriber"]),
  ShippingAddressControl.getAShippingAddress
);
ShippingAddressRoute.delete(
  "/:shippingAddressId",
  Auth(["subscriber"]),
  ShippingAddressControl.deleteShippingAddress
);



// Unhandled
ShippingAddressRoute.patch(
  "/:shippingAddressId",
  Auth(["subscriber"]),
  validateRequest(UpdateShippingAddressSchema),
  ShippingAddressControl.updateShippingAddress
);
export default ShippingAddressRoute;
