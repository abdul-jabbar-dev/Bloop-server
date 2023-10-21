"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateServiceStatusSchema = exports.UpdateServiceSchema = exports.CreateServiceSchema = void 0;
const client_1 = require("@prisma/client");
const zod_1 = __importDefault(require("zod"));
exports.CreateServiceSchema = zod_1.default.object({
    body: zod_1.default.object({
        title: zod_1.default.string(),
        price: zod_1.default.string(),
        orderType: zod_1.default.string(),
        serviceArea: zod_1.default.string().array(),
        details: zod_1.default.string(),
        serviceGuarantee: zod_1.default.string(),
        serviceTypeId: zod_1.default.string(),
        serviceItem: zod_1.default.string().array()
    }),
});
exports.UpdateServiceSchema = zod_1.default.object({
    body: zod_1.default
        .object({
        title: zod_1.default.string().optional(),
        price: zod_1.default.number().optional(),
        orderType: zod_1.default.string().optional(),
        serviceArea: zod_1.default.string().array().optional(),
        details: zod_1.default.string().optional(),
        serviceGuarantee: zod_1.default.string().optional(),
        serviceTypeId: zod_1.default.string().optional(),
        serviceItem: zod_1.default.string().array().optional(),
        inServicePackage: zod_1.default.string().array().optional(),
    })
        .optional(),
});
exports.UpdateServiceStatusSchema = zod_1.default.object({
    body: zod_1.default.object({
        status: zod_1.default.enum(Object.getOwnPropertyNames(client_1.Status)),
    }),
});
