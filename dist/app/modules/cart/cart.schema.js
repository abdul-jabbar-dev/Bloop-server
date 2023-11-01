"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetTimeCartSchema = exports.CreateCartSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.CreateCartSchema = zod_1.default.object({
    body: zod_1.default.object({
        serviceId: zod_1.default.string(),
        time: zod_1.default.string().optional(),
    }),
});
exports.SetTimeCartSchema = zod_1.default.object({
    body: zod_1.default.object({
        bookingDate: zod_1.default.string(),
    }),
});
