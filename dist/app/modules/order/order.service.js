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
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const prismaClient_1 = __importDefault(require("../../../db/prismaClient"));
const order_control_1 = __importDefault(require("./order.control"));
const sendResponse_1 = __importDefault(require("../../../shared/Response/sendResponse"));
const availableProviderDate = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { providerId } = req.params;
    const { date } = req.body;
    const result = yield order_control_1.default.availableProviderDate({
        providerId,
        bookingDate: date,
    });
    (0, sendResponse_1.default)(res, { data: result });
}));
const findByCart = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cartId } = req.params;
    const result = yield order_control_1.default.findByCartDB({ cartId });
    (0, sendResponse_1.default)(res, { data: result });
}));
const findMyOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const result = yield order_control_1.default.findMyOrderDB(user);
    (0, sendResponse_1.default)(res, { data: result });
}));
const findProviderActiveOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const result = yield order_control_1.default.findProviderOrderDB(user, "booked");
    (0, sendResponse_1.default)(res, { data: result });
}));
const findProviderAllOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    console.log(user);
    const result = yield order_control_1.default.findProviderOrderDB(user, {});
    (0, sendResponse_1.default)(res, { data: result });
}));
const createOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const subscriber = yield prismaClient_1.default.subscriber.findUnique({
        where: { userId: (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.id },
    });
    if (!subscriber) {
        throw new Error("Invalid subscriber");
    }
    const existCart = yield prismaClient_1.default.order.findUnique({
        where: { cartId: req.body.cartId },
    });
    if (existCart) {
        (0, sendResponse_1.default)(res, { data: existCart });
    }
    const orderData = {
        subscriberId: subscriber.id,
        cartId: req.body.cartId,
    };
    const servicePlacedData = Object.assign(Object.assign({}, req.body), { cartId: undefined });
    const result /* : { servicePlaced: string; order: Order } */ = yield order_control_1.default.createOrderDB({
        orderData,
        oldServicePlacedData: servicePlacedData,
    });
    (0, sendResponse_1.default)(res, { data: result });
}));
const confirmPayment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const confirmData = req.body;
    const result = yield order_control_1.default.ConfirmPaymentDB(confirmData);
    (0, sendResponse_1.default)(res, {
        data: result,
    });
}));
const completeOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderId } = req.params;
    const user = req.user;
    const provider = yield prismaClient_1.default.serviceProvider.findUnique({
        where: { userId: user === null || user === void 0 ? void 0 : user.id },
    });
    if (!provider) {
        throw new Error("Invalid provider");
    }
    const result = yield order_control_1.default.completeOrderDB(orderId, provider);
    (0, sendResponse_1.default)(res, {
        data: result,
    });
}));
const OrderService = {
    createOrder,
    findMyOrder,
    availableProviderDate,
    findByCart,
    confirmPayment,
    findProviderAllOrder,
    findProviderActiveOrder,
    completeOrder,
};
exports.default = OrderService;
