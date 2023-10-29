import { Router } from "express";
import UserRoute from "../app/modules/user/user.route";
import AuthRoute from "../app/modules/user/auth.route";
import ServiceTypeRoute from "../app/modules/serviceType/serviceType.route";
import ServiceRoute from "../app/modules/service/service.route";
import ShippingAddressRoute from "../app/modules/shippingAddress/shippingAddress.route";
import CartRoute from "../app/modules/cart/cart.route";

const allRouters = Router();

allRouters.use("/users", UserRoute);
allRouters.use("/cart", CartRoute);
allRouters.use("/auth", AuthRoute);
allRouters.use("/service-type", ServiceTypeRoute);
allRouters.use("/service", ServiceRoute);
allRouters.use("/shipping-address", ShippingAddressRoute);
export default allRouters;
