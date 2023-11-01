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
const user_service_1 = __importDefault(require("../../app/modules/user/user.service"));
const prismaClient_1 = __importDefault(require("../../db/prismaClient"));
const CreateId = (serviceType, lastId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const serviceCode = serviceType.title.slice(0, 2).toUpperCase();
    const getNum = Number(((_a = lastId === null || lastId === void 0 ? void 0 : lastId.providerId) === null || _a === void 0 ? void 0 : _a.slice(2)) || 0) + 1;
    const code = serviceCode + getNum.toString().padStart(3, "0");
    const ifCodeExist = yield prismaClient_1.default.serviceProvider.findUnique({
        where: { providerId: code },
    });
    if (ifCodeExist) {
        CreateId(serviceType, ifCodeExist);
    }
    return code;
});
function generateProviderId(serviceTypeId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const lastCreateProvider = yield user_service_1.default.getLastProviderDb();
            const serviceType = yield prismaClient_1.default.serviceType.findUnique({
                where: { id: serviceTypeId },
                select: { title: true },
            });
            if (!serviceType) {
                throw new Error("Invalid Service Type");
            }
            return CreateId(serviceType, lastCreateProvider);
        }
        catch (error) {
            return Promise.reject(error);
        }
    });
}
exports.default = generateProviderId;
