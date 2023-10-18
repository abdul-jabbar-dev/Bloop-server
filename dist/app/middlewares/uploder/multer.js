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
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = require("fs");
const config_1 = __importDefault(require("../../../config"));
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, fs_1.mkdir)(config_1.default.multerUploadPath, { recursive: true }, () => {
                cb(null, config_1.default.multerUploadPath);
            });
        });
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        const myUpload = path_1.default.parse(file.originalname);
        cb(null, myUpload.name + "_" + uniqueSuffix + "_" + myUpload.ext);
    },
});
const upload = (0, multer_1.default)({ storage: storage });
exports.default = upload;
