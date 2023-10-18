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
exports.ImgDelete = void 0;
const cloudinary_1 = __importDefault(require("../../config/upload/cloudinary"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const ImgUpload = (imgPath, options) => __awaiter(void 0, void 0, void 0, function* () {
    const file = path_1.default.parse(imgPath);
    const upload = yield cloudinary_1.default.v2.uploader.upload(imgPath, Object.assign({ filename_override: file.name.split("_")[0] }, options));
    if (!upload) {
        throw new Error("Image upload failed");
    }
    else {
        fs_1.default.unlink(imgPath, (err) => console.log(err));
        return upload;
    }
});
const ImgDelete = (publicId, options) => __awaiter(void 0, void 0, void 0, function* () {
    if (publicId) {
        return yield cloudinary_1.default.v2.uploader.destroy(publicId, options);
    }
    else
        return;
});
exports.ImgDelete = ImgDelete;
exports.default = ImgUpload;
