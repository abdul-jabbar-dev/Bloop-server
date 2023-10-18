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
const createServiceTypeDb = (serviceType) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield prismaClient_1.default.serviceType.create({ data: serviceType });
    return res;
});
const getServiceTypeDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield prismaClient_1.default.serviceType.findMany();
    return res;
});
const getAServiceTypeDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield prismaClient_1.default.serviceType.findUnique({
        where: { id },
    });
    if (!res) {
        throw new Error("Service type not found");
    }
    return res;
});
const updateServiceTypeDb = (serviceTypeId, title) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield prismaClient_1.default.serviceType.update({
        where: { id: serviceTypeId },
        data: { title },
    });
    return res;
});
const deleteServiceTypeDb = (serviceTypeId) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield prismaClient_1.default.serviceType.delete({
        where: { id: serviceTypeId },
    });
    return res;
});
const ServiceTypeService = {
    createServiceTypeDb,
    getServiceTypeDb,
    getAServiceTypeDb,
    deleteServiceTypeDb,
    updateServiceTypeDb,
};
exports.default = ServiceTypeService;
