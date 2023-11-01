"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cart_control_1 = __importDefault(require("./cart.control"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const cart_schema_1 = require("./cart.schema");
const CartRoute = (0, express_1.Router)();
CartRoute.post("/add-to-cart", (0, auth_1.default)(["admin", "super_admin", "subscriber", "serviceProvider"]), (0, validateRequest_1.default)(cart_schema_1.CreateCartSchema), cart_control_1.default.addToCart);
CartRoute.get("/get-from-cart", (0, auth_1.default)(["admin", "super_admin", "subscriber", "serviceProvider"]), cart_control_1.default.getToCart);
CartRoute.get("/get-from-cart/:itemId", (0, auth_1.default)(["admin", "super_admin", "subscriber", "serviceProvider"]), cart_control_1.default.getACart);
CartRoute.patch("/set-date/:itemId", (0, auth_1.default)(["admin", "super_admin"]), (0, validateRequest_1.default)(cart_schema_1.SetTimeCartSchema), cart_control_1.default.setDateToItem);
CartRoute.delete("/remove-date/:itemId", (0, auth_1.default)(["admin", "super_admin"]), cart_control_1.default.removeDateFromItem);
CartRoute.delete("/remove-cart/:itemId", (0, auth_1.default)(["admin", "super_admin"]), cart_control_1.default.removeCart);
exports.default = CartRoute;
