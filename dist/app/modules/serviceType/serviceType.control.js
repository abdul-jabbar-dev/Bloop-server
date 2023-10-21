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
const serviceType_service_1 = __importDefault(require("./serviceType.service"));
const createServiceType = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const serviceType = req.body;
    const result = yield serviceType_service_1.default.createServiceTypeDb(serviceType);
    (0, sendResponse_1.default)(res, {
        data: result,
    });
}));
const getServiceType = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield serviceType_service_1.default.getServiceTypeDb();
    (0, sendResponse_1.default)(res, {
        data: result,
    });
}));
const getAServiceType = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { serviceTypeId } = req.params;
    const result = yield serviceType_service_1.default.getAServiceTypeDb(serviceTypeId);
    (0, sendResponse_1.default)(res, {
        data: result,
    });
}));
const updateServiceType = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { serviceTypeId } = req.params;
    const { title } = req.body;
    const result = yield serviceType_service_1.default.updateServiceTypeDb(serviceTypeId, title);
    (0, sendResponse_1.default)(res, {
        data: result,
    });
}));
const deleteServiceType = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { serviceTypeId } = req.params;
    const result = yield serviceType_service_1.default.deleteServiceTypeDb(serviceTypeId);
    (0, sendResponse_1.default)(res, {
        data: result,
    });
}));
const ServiceTypeControl = {
    createServiceType,
    getServiceType,
    getAServiceType,
    updateServiceType,
    deleteServiceType,
};
exports.default = ServiceTypeControl;
