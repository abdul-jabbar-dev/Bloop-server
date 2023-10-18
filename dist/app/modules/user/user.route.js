"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_control_1 = __importDefault(require("./user.control"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_schema_1 = require("./user.schema");
const validateRequestJson_1 = __importDefault(require("../../middlewares/validateRequestJson"));
const multer_1 = __importDefault(require("../../middlewares/uploder/multer"));
const UserRoute = (0, express_1.Router)();
UserRoute.get("/", (0, auth_1.default)(["subscriber", "admin", "super_admin"]), user_control_1.default.getUsers);
UserRoute.patch("/update-profile", (0, auth_1.default)(["admin", "serviceProvider", "subscriber", "super_admin"]), multer_1.default.single("file"), (0, validateRequestJson_1.default)(user_schema_1.UpdateProfileUserSchema), user_control_1.default.updateUser);
UserRoute.get("/my-profile", (0, auth_1.default)(["admin", "serviceProvider", "subscriber", "super_admin"]), user_control_1.default.getMyProfile);
exports.default = UserRoute;
