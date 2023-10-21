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
const client_1 = require("@prisma/client");
const sendResponse_1 = __importDefault(require("../../../shared/Response/sendResponse"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const shippingAddress_service_1 = __importDefault(require("./shippingAddress.service"));
const createShippingAddress = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (!user) {
        throw new Error("User login required");
    }
    if (user.role !== client_1.Role.subscriber) {
        throw new Error("Only subscriber has access");
    }
    const shippingAddressData = req.body;
    const result = yield shippingAddress_service_1.default.createShippingAddressDb(shippingAddressData, user);
    (0, sendResponse_1.default)(res, {
        data: result,
    });
}));
const getShippingAddress = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (!user || user.role !== client_1.Role.subscriber) {
        throw new Error("Invalid Subscriber");
    }
    const result = yield shippingAddress_service_1.default.getShippingAddressDb(user);
    (0, sendResponse_1.default)(res, {
        data: result,
    });
}));
const getAShippingAddress = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { shippingAddressId } = req.params;
    const user = req.user;
    if (!user || user.role !== client_1.Role.subscriber) {
        throw new Error("Invalid Subscriber");
    }
    const result = yield shippingAddress_service_1.default.getAShippingAddressDb(shippingAddressId, user);
    (0, sendResponse_1.default)(res, {
        data: result,
    });
}));
const deleteShippingAddress = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { shippingAddressId } = req.params;
    const user = req.user;
    if (!user || user.role !== client_1.Role.subscriber) {
        throw new Error("Invalid Subscriber");
    }
    const result = yield shippingAddress_service_1.default.deleteShippingAddressDb(shippingAddressId, user);
    (0, sendResponse_1.default)(res, {
        data: result,
    });
}));
const updateShippingAddress = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { shippingAddressId } = req.params;
    const data = req.body;
    const result = yield shippingAddress_service_1.default.updateShippingAddressDb(shippingAddressId, data);
    (0, sendResponse_1.default)(res, {
        data: result,
    });
}));
const ShippingAddressControl = {
    createShippingAddress,
    getShippingAddress,
    getAShippingAddress,
    updateShippingAddress,
    deleteShippingAddress,
};
exports.default = ShippingAddressControl;
