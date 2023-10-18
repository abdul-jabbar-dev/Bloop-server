"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (data, secret, options) => {
    const token = jsonwebtoken_1.default.sign(data, secret, options);
    return token;
};
const decodedToken = (token, accessOrRefreshSecret) => {
    const data = jsonwebtoken_1.default.verify(token, accessOrRefreshSecret);
    return data;
};
const JWT = { generateToken, decodedToken };
exports.default = JWT;
