"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateShippingAddressSchema = exports.CreateShippingAddressSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.CreateShippingAddressSchema = zod_1.default.object({
    body: zod_1.default.object({
        shippingNumber: zod_1.default.string(),
        country: zod_1.default.string(),
        street: zod_1.default.string(),
        town: zod_1.default.string(),
        city: zod_1.default.string(),
        address: zod_1.default.string(),
        label: zod_1.default.string(),
        contactNo: zod_1.default.string(),
    }),
});
exports.UpdateShippingAddressSchema = zod_1.default.object({
    body: zod_1.default.object({
        shippingNumber: zod_1.default.string().optional(),
        country: zod_1.default.string().optional(),
        street: zod_1.default.string().optional(),
        town: zod_1.default.string().optional(),
        city: zod_1.default.string().optional(),
        address: zod_1.default.string().optional(),
        label: zod_1.default.string().optional(),
        contactNo: zod_1.default.string().optional(),
    }),
});
