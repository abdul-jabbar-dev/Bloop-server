"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.newPasswordSchema = exports.LoginUserSchema = exports.UpdateProfileUserSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const CreateUserSchema = zod_1.default.object({
    body: zod_1.default.object({
        firstName: zod_1.default.string(),
        lastName: zod_1.default.string(),
        email: zod_1.default.string(),
        password: zod_1.default.string(),
    }),
});
exports.UpdateProfileUserSchema = zod_1.default.object({
    body: zod_1.default.object({
        firstName: zod_1.default.string().optional(),
        lastName: zod_1.default.string().optional(),
        address: zod_1.default.string().optional(),
        contactNo: zod_1.default.string().optional(),
        gender: zod_1.default.enum(["male", "female"]).optional(),
        dateOfBirth: zod_1.default.string().optional(),
        bloodGroup: zod_1.default.string().optional(),
    }).optional(),
});
exports.LoginUserSchema = zod_1.default.object({
    body: zod_1.default.object({
        email: zod_1.default.string(),
        password: zod_1.default.string(),
    }),
});
exports.newPasswordSchema = zod_1.default.object({
    body: zod_1.default.object({
        email: zod_1.default.string(),
        oldPassword: zod_1.default.string(),
        newPassword: zod_1.default.string(),
    }),
});
exports.default = CreateUserSchema;
