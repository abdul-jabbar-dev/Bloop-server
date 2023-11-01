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
const config_1 = __importDefault(require("../../../config"));
const setDefaultShippingAddressDb = (shippingAddressId, user) => __awaiter(void 0, void 0, void 0, function* () {
    const isExistSubscriber = yield prismaClient_1.default.subscriber.findUnique({
        where: { userId: user.id },
        include: { shippingAddress: true },
    });
    if (!isExistSubscriber) {
        throw new Error("Invalid subscriber");
    }
    const resetDefault = yield prismaClient_1.default.shippingAddress.updateMany({
        where: { subscriberId: isExistSubscriber.id },
        data: { isDefault: false },
    });
    if (!resetDefault) {
        throw new Error("invalid user access to update default");
    }
    let res = yield prismaClient_1.default.shippingAddress.update({
        where: { id: shippingAddressId },
        data: { isDefault: true },
    });
    if (res === null) {
        throw new Error("Set Default failed");
    }
    return resetDefault;
});
const createShippingAddressDb = (shippingAddress, user) => __awaiter(void 0, void 0, void 0, function* () {
    let res = null;
    yield prismaClient_1.default.$transaction((asyncDb) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const isExistSubscriber = yield asyncDb.subscriber.findUnique({
            where: { userId: user.id },
            include: { shippingAddress: true },
        });
        if (!isExistSubscriber) {
            throw new Error("Invalid subscriber");
        }
        let totalShippingAddress = Number(config_1.default.subscriber.totalShippingAddress);
        if ((isExistSubscriber === null || isExistSubscriber === void 0 ? void 0 : isExistSubscriber.shippingAddress) &&
            ((_a = isExistSubscriber === null || isExistSubscriber === void 0 ? void 0 : isExistSubscriber.shippingAddress) === null || _a === void 0 ? void 0 : _a.length) >= totalShippingAddress) {
            throw new Error("Maximum " + totalShippingAddress + " shipping address added");
        }
        const resetDefault = yield asyncDb.shippingAddress.updateMany({
            where: { subscriberId: isExistSubscriber.id },
            data: { isDefault: false },
        });
        if (!resetDefault) {
            throw new Error("invalid user access to update default");
        }
        shippingAddress["subscriberId"] = isExistSubscriber.id;
        res = yield asyncDb.shippingAddress.create({
            data: shippingAddress,
        });
    }));
    if (!res) {
        throw new Error("Shipping address include unsuccessful");
    }
    return res;
});
const getShippingAddressDb = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const isExistSubscriber = yield prismaClient_1.default.subscriber.findUnique({
        where: { userId: user.id },
    });
    if (!isExistSubscriber) {
        throw new Error("Invalid subscriber");
    }
    const shippingAddress = yield prismaClient_1.default.shippingAddress.findMany({
        where: { subscriberId: isExistSubscriber.id },
        include: { subscriber: true },
        orderBy: { createdAt: "desc" },
    });
    if (!shippingAddress) {
        throw new Error("Invalid user id");
    }
    return shippingAddress;
});
const getAShippingAddressDb = (id, user) => __awaiter(void 0, void 0, void 0, function* () {
    const subscriber = yield prismaClient_1.default.subscriber.findUnique({
        where: { userId: user.id },
    });
    if (!subscriber) {
        throw new Error("Invalid subscriber");
    }
    const res = yield prismaClient_1.default.shippingAddress.findUnique({
        where: { id, subscriberId: subscriber.id },
    });
    if (res === null) {
        throw new Error("Shipping Address not found");
    }
    return res;
});
const deleteShippingAddressDb = (id, user) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield prismaClient_1.default.shippingAddress.delete({
        where: { id, subscriber: { userId: user.id } },
    });
    return res;
});
// Unhandled
const updateShippingAddressDb = (shippingAddressId, shippingAddressData) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield prismaClient_1.default.shippingAddress.update({
        where: { id: shippingAddressId },
        data: shippingAddressData,
    });
    return res;
});
const ShippingAddressService = {
    createShippingAddressDb,
    getShippingAddressDb,
    getAShippingAddressDb,
    deleteShippingAddressDb,
    updateShippingAddressDb,
    setDefaultShippingAddressDb,
};
exports.default = ShippingAddressService;
