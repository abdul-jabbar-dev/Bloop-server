"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = __importDefault(require("cloudinary"));
const __1 = __importDefault(require(".."));
cloudinary_1.default.v2.config({
    api_key: __1.default.cloudinary.api_key,
    api_secret: __1.default.cloudinary.api_secret,
    cloud_name: __1.default.cloudinary.cloud_name,
});
exports.default = cloudinary_1.default;
