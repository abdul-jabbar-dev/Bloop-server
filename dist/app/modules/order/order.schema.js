"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.confirmPaymentSchema = exports.availableProviderDateSchema = exports.CreateOrderSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.CreateOrderSchema = zod_1.default.object({
    body: zod_1.default.object({
        bookingDate: zod_1.default.string(),
        serviceId: zod_1.default.string(),
        issueItemName: zod_1.default.string(),
        issueDetails: zod_1.default.string(),
        cartId: zod_1.default.string(),
    }),
});
exports.availableProviderDateSchema = zod_1.default.object({
    body: zod_1.default.object({
        date: zod_1.default.string(),
    }),
});
exports.confirmPaymentSchema = zod_1.default.object({
    body: zod_1.default.object({
        orderId: zod_1.default.string(),
        paymentVarificationCode: zod_1.default.string().optional(),
        paymentMethod: zod_1.default.enum([
            "Card",
            "CashOnDelivery",
            "Nogod",
            "Rocket",
            "Bkash",
        ]),
    }),
});
