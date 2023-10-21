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
const user_service_1 = __importDefault(require("./user.service"));
const imgUpload_1 = __importDefault(require("../../../shared/uploads/imgUpload"));
//Auth route
const createUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body;
    user["status"] = "active";
    user["role"] = "subscriber";
    const result = yield user_service_1.default.createUserDb(user);
    (0, sendResponse_1.default)(res, {
        message: "Successfully create an account",
        data: {
            accessToken: result.accessToken,
            email: result.email,
            id: result.id,
        },
    });
}));
const loginUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body;
    const result = yield user_service_1.default.loginUserDb(user);
    res.cookie("refreshToken", result.refreshToken);
    res.setHeader("Authorization", result.accessToken);
    (0, sendResponse_1.default)(res, {
        message: "Login Successfully",
        data: {
            accessToken: result.accessToken,
            email: result.email,
            id: result.id,
        },
    });
}));
const resetPassword = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const resetPasswordConfig = {
        email: req.body.email,
        oldPassword: req.body.oldPassword,
        newPassword: req.body.newPassword,
    };
    const result = yield user_service_1.default.resetPassword(resetPasswordConfig);
    (0, sendResponse_1.default)(res, {
        message: "Password reset Successfully",
        data: {
            email: result.email,
            id: result.id,
        },
    });
}));
// user route
const getUsers = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.default.getUsersDb();
    (result);
}));
const getMyProfile = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (!user) {
        throw new Error("My credential not found! try login first");
    }
    const result = yield user_service_1.default.getMyProfileDb(user);
    (0, sendResponse_1.default)(res, {
        message: "My profile fetched Successfully",
        data: result,
    });
}));
const updateUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const profile = req.file;
    let uploadedImage = null;
    const user = req.user;
    if (!user) {
        throw new Error("User required!");
    }
    if (profile) {
        uploadedImage = yield (0, imgUpload_1.default)(profile.path, {
            folder: "bloop",
        });
    }
    const result = yield user_service_1.default.updateUserDb(user, req.body, uploadedImage);
    (0, sendResponse_1.default)(res, {
        message: "Profile update Successfully",
        data: result,
    });
}));
const UserController = {
    createUser,
    getMyProfile,
    getUsers,
    updateUser,
    loginUser,
    resetPassword,
};
exports.default = UserController;
