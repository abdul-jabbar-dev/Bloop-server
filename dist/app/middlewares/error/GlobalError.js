"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const library_1 = require("@prisma/client/runtime/library");
const prismaClientValidationError_1 = __importDefault(require("./errors/prisma/prismaClientValidationError"));
const prismaClientKnownRequestError_1 = __importDefault(require("./errors/prisma/prismaClientKnownRequestError"));
const zod_1 = require("zod");
const zodValidator_1 = __importDefault(require("./errors/zod/zodValidator"));
const jsonwebtoken_1 = require("jsonwebtoken");
const tokenExpiredError_1 = __importDefault(require("./errors/jwt/tokenExpiredError"));
const GlobalError = (err, req, res, next) => {
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>global start>>>>>>>>>>>>>>>>>>>>>>>>>>>\n", err, "\n>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>global end>>>>>>>>>>>>>>>>>>>>>>>>>>>");
    let error = {
        name: err === null || err === void 0 ? void 0 : err.name,
        message: err === null || err === void 0 ? void 0 : err.message,
        statusCode: 400,
        path: { path: err === null || err === void 0 ? void 0 : err.message, message: "" },
    };
    if (err instanceof library_1.PrismaClientValidationError) {
        error = (0, prismaClientValidationError_1.default)(err);
    }
    else if (err instanceof library_1.PrismaClientKnownRequestError) {
        error = (0, prismaClientKnownRequestError_1.default)(err);
    }
    else if (err instanceof zod_1.ZodError) {
        error = (0, zodValidator_1.default)(err);
    }
    else if (err instanceof jsonwebtoken_1.TokenExpiredError) {
        error = (0, tokenExpiredError_1.default)(err);
    }
    res.status(error.statusCode).send(error);
};
exports.default = GlobalError;
