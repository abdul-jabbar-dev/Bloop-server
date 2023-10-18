"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_route_1 = __importDefault(require("../app/modules/user/user.route"));
const auth_route_1 = __importDefault(require("../app/modules/user/auth.route"));
const serviceType_route_1 = __importDefault(require("../app/modules/serviceType/serviceType.route"));
const service_route_1 = __importDefault(require("../app/modules/service/service.route"));
const shippingAddress_route_1 = __importDefault(require("../app/modules/shippingAddress/shippingAddress.route"));
const allRouters = (0, express_1.Router)();
allRouters.use("/users", user_route_1.default);
allRouters.use("/auth", auth_route_1.default);
allRouters.use("/service-type", serviceType_route_1.default);
allRouters.use("/service", service_route_1.default);
allRouters.use("/shipping-address", shippingAddress_route_1.default);
exports.default = allRouters;
