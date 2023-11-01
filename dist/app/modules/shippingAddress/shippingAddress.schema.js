"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateShippingAddressSchema = exports.CreateShippingAddressSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.CreateShippingAddressSchema = zod_1.default.object({
    body: zod_1.default.object({
        address: zod_1.default.string(),
        street: zod_1.default.string(),
        area: zod_1.default.string(),
        city: zod_1.default.string(),
        isDefault: zod_1.default.boolean(),
        label: zod_1.default.string(),
        contactNo: zod_1.default.string(),
    }),
});
exports.UpdateShippingAddressSchema = zod_1.default.object({
    body: zod_1.default.object({
        address: zod_1.default.string().optional(),
        street: zod_1.default.string().optional(),
        area: zod_1.default.string().optional(),
        city: zod_1.default.string().optional(),
        isDefault: zod_1.default.boolean().optional(),
        label: zod_1.default.string().optional(),
        contactNo: zod_1.default.string().optional(),
    }),
});
