"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const serviceType_control_1 = __importDefault(require("./serviceType.control"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const serviceType_schema_1 = require("./serviceType.schema");
const ServiceTypeRoute = (0, express_1.Router)();
ServiceTypeRoute.post("/", (0, auth_1.default)(["admin", "super_admin"]), (0, validateRequest_1.default)(serviceType_schema_1.CreateServiceTypeSchema), serviceType_control_1.default.createServiceType);
ServiceTypeRoute.get("/", serviceType_control_1.default.getServiceType);
ServiceTypeRoute.get("/:serviceTypeId", serviceType_control_1.default.getAServiceType);
ServiceTypeRoute.patch("/:serviceTypeId", (0, auth_1.default)(["admin", "super_admin"]), (0, validateRequest_1.default)(serviceType_schema_1.CreateServiceTypeSchema), serviceType_control_1.default.updateServiceType);
ServiceTypeRoute.delete("/:serviceTypeId", (0, auth_1.default)(["admin", "super_admin"]), serviceType_control_1.default.deleteServiceType);
exports.default = ServiceTypeRoute;
