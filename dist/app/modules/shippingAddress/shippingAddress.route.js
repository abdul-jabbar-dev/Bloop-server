"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const shippingAddress_control_1 = __importDefault(require("./shippingAddress.control"));
const shippingAddress_schema_1 = require("./shippingAddress.schema");
const ShippingAddressRoute = (0, express_1.Router)();
ShippingAddressRoute.post("/", (0, auth_1.default)(["subscriber"]), (0, validateRequest_1.default)(shippingAddress_schema_1.CreateShippingAddressSchema), shippingAddress_control_1.default.createShippingAddress);
ShippingAddressRoute.get("/", (0, auth_1.default)(["subscriber"]), shippingAddress_control_1.default.getShippingAddress);
ShippingAddressRoute.get("/:shippingAddressId", (0, auth_1.default)(["subscriber"]), shippingAddress_control_1.default.getAShippingAddress);
ShippingAddressRoute.delete("/:shippingAddressId", (0, auth_1.default)(["subscriber"]), shippingAddress_control_1.default.deleteShippingAddress);
// Unhandled
ShippingAddressRoute.patch("/:shippingAddressId", (0, auth_1.default)(["subscriber"]), (0, validateRequest_1.default)(shippingAddress_schema_1.UpdateShippingAddressSchema), shippingAddress_control_1.default.updateShippingAddress);
exports.default = ShippingAddressRoute;
