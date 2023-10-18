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
const service_service_1 = __importDefault(require("./service.service"));
const imgUpload_1 = __importDefault(require("../../../shared/uploads/imgUpload"));
const createService = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const thumbnail = req.file;
    let uploadedImage = null;
    if (!thumbnail) {
        throw new Error("Thumbnail Image required");
    }
    uploadedImage = yield (0, imgUpload_1.default)(thumbnail.path, {
        folder: "bloop/services",
    });
    const service = req.body;
    const result = yield service_service_1.default.createServiceDb(service, uploadedImage);
    (0, sendResponse_1.default)(res, {
        message: "Service create successfully",
        data: result,
    });
}));
const getService = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_service_1.default.getServiceDb();
    (0, sendResponse_1.default)(res, {
        message: "Service retrieve successfully",
        data: result,
    });
}));
const getAService = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { serviceTypeId } = req.params;
    const result = yield service_service_1.default.getAServiceDb(serviceTypeId);
    (0, sendResponse_1.default)(res, {
        message: "Service retrieve successfully",
        data: result,
    });
}));
const updateService = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { serviceTypeId } = req.params;
    const data = req.body;
    const thumbnail = req === null || req === void 0 ? void 0 : req.file;
    let uploadedImage = null;
    if (thumbnail) {
        uploadedImage = yield (0, imgUpload_1.default)(thumbnail.path, {
            folder: "bloop/services",
        });
    }
    const result = yield service_service_1.default.updateServiceDb(serviceTypeId, data, uploadedImage);
    (0, sendResponse_1.default)(res, {
        message: "Service update successfully",
        data: result,
    });
}));
const updateServiceStatus = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { serviceTypeId } = req.params;
    const { status } = req.body;
    const result = yield service_service_1.default.updateServiceStatusDb(serviceTypeId, status);
    (0, sendResponse_1.default)(res, {
        message: "Service status update successfully",
        data: result,
    });
}));
const deleteService = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { serviceTypeId } = req.params;
    const result = yield service_service_1.default.deleteServiceDb(serviceTypeId);
    (0, sendResponse_1.default)(res, {
        message: "Service delete successfully",
        data: result,
    });
}));
const ServiceControl = {
    createService,
    getService,
    getAService,
    updateService,
    deleteService,
    updateServiceStatus,
};
exports.default = ServiceControl;
