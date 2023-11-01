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
const sendResponse_1 = __importDefault(require("../../../shared/Response/sendResponse"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const cart_service_1 = __importDefault(require("./cart.service"));
const addToCart = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cart = req.body;
    const user = req.user;
    cart.userId = user.id;
    const result = yield cart_service_1.default.addToCartDb(cart);
    (0, sendResponse_1.default)(res, {
        data: result,
    });
}));
const getToCart = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const result = yield cart_service_1.default.getToCartDb(user.id);
    (0, sendResponse_1.default)(res, {
        data: result,
    });
}));
const getACart = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { itemId } = req.params;
    const user = req.user;
    const result = yield cart_service_1.default.getACartDb(itemId, user);
    (0, sendResponse_1.default)(res, {
        data: result,
    });
}));
const setDateToItem = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { itemId } = req.params;
    const { bookingDate } = req.body;
    const result = yield cart_service_1.default.setDateToItemDb(itemId, bookingDate);
    (0, sendResponse_1.default)(res, {
        data: result,
    });
}));
const removeDateFromItem = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { itemId } = req.params;
    const result = yield cart_service_1.default.removeDateFromItemDb(itemId);
    (0, sendResponse_1.default)(res, {
        data: result,
    });
}));
const removeCart = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { itemId } = req.params;
    const user = req.user;
    const result = yield cart_service_1.default.deleteCartDb(itemId, user);
    (0, sendResponse_1.default)(res, {
        data: result,
    });
}));
const CartControl = {
    addToCart,
    getToCart,
    removeDateFromItem,
    getACart,
    setDateToItem,
    removeCart,
};
exports.default = CartControl;
