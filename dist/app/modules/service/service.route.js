"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const service_schema_1 = require("./service.schema");
const service_control_1 = __importDefault(require("./service.control"));
const validateRequestJson_1 = __importDefault(require("../../middlewares/validateRequestJson"));
const multer_1 = __importDefault(require("../../middlewares/uploder/multer"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const ServiceRoute = (0, express_1.Router)();
ServiceRoute.post("/", multer_1.default.single("file"), (0, auth_1.default)(["admin", "super_admin"]), (0, validateRequestJson_1.default)(service_schema_1.CreateServiceSchema), service_control_1.default.createService);
ServiceRoute.get("/", service_control_1.default.getService);
ServiceRoute.get("/:serviceTypeId", service_control_1.default.getAService);
ServiceRoute.patch("/:serviceTypeId", (0, auth_1.default)(["admin", "super_admin"]), multer_1.default.single("file"), (0, validateRequestJson_1.default)(service_schema_1.UpdateServiceSchema), service_control_1.default.updateService);
ServiceRoute.patch("/status/:serviceTypeId", (0, auth_1.default)(["admin", "super_admin"]), (0, validateRequest_1.default)(service_schema_1.UpdateServiceStatusSchema), service_control_1.default.updateServiceStatus);
ServiceRoute.delete("/:serviceTypeId", (0, auth_1.default)(["admin", "super_admin"]), service_control_1.default.deleteService);
exports.default = ServiceRoute;
