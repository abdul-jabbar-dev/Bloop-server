"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prismaClient_1 = __importDefault(require("../../../db/prismaClient"));
const addToCartDb = (cart) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield prismaClient_1.default.cart.create({ data: cart });
    return res;
});
const getToCartDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield prismaClient_1.default.cart.findMany({
        where: { userId: id },
        include: {
            user: true,
            service: { include: { image: true, service: true } },
        },
    });
    const orders = yield res.map((cart) => __awaiter(void 0, void 0, void 0, function* () {
        return (Object.assign(Object.assign({}, cart), { order: yield prismaClient_1.default.order.findUnique({
                where: { cartId: cart.id },
                include: { servicePlaced: true }
            }) }));
    }));
    const result = yield Promise.all(orders);
    return result;
});
const getACartDb = (id, user) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield prismaClient_1.default.cart.findUnique({
        where: { id },
        include: { service: { include: { image: true, service: true } } },
    });
    if (!res) {
        throw new Error("Service type not found");
    }
    if (res.userId !== user.id) {
        throw new Error("Invalid access! Enter your cart id");
    }
    return res;
});
const setDateToItemDb = (itemId, bookingDate) => __awaiter(void 0, void 0, void 0, function* () {
    const existDate = yield prismaClient_1.default.cart.findFirst({
        where: { id: itemId, bookingDate },
    });
    if (existDate) {
        return existDate;
    }
    const res = yield prismaClient_1.default.cart.update({
        where: { id: itemId },
        data: { bookingDate },
    });
    return res;
});
const removeDateFromItemDb = (itemId) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield prismaClient_1.default.cart.update({
        where: { id: itemId },
        data: { bookingDate: undefined },
    });
    return res;
});
const deleteCartDb = (cartId, user) => __awaiter(void 0, void 0, void 0, function* () {
    const existDate = yield prismaClient_1.default.cart.findFirst({
        where: { id: cartId, userId: user.id },
    });
    if (!existDate) {
        throw new Error("Invalid parameter");
    }
    const res = yield prismaClient_1.default.cart.delete({
        where: { id: cartId },
    });
    return res;
});
const CartService = {
    addToCartDb,
    getToCartDb,
    getACartDb,
    deleteCartDb,
    setDateToItemDb,
    removeDateFromItemDb,
};
exports.default = CartService;
