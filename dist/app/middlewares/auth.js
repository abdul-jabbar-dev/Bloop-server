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
const jwt_1 = __importDefault(require("../../shared/jwt"));
const config_1 = __importDefault(require("../../config"));
const prismaClient_1 = __importDefault(require("../../db/prismaClient"));
const Auth = (role) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a.authorization;
        if (!token) { 
            next(new Error("Token required"));
            return;
        }
        const decoded = jwt_1.default.decodedToken(token, config_1.default.accessToken.secret);
        if (typeof decoded === "string") {
            throw new Error("Invalid token");
        }
        const isExistUser = yield prismaClient_1.default.user.findUnique({
            where: { id: decoded.id },
        }); 
        if (!isExistUser) {
            throw new Error("This user has no record found");
        }
        if (role.includes(isExistUser.role)) {
            req.user = isExistUser;
            next();
        }
        else {
            throw new Error("Invalid Access");
        }
    }
    catch (error) {
        next(error);
    }
});
exports.default = Auth;
