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
const client_1 = require("@prisma/client");
const sendResponse_1 = __importDefault(require("../../../shared/Response/sendResponse"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const user_service_1 = __importDefault(require("./user.service"));
const imgUpload_1 = __importDefault(require("../../../shared/uploads/imgUpload"));
const prismaClient_1 = __importDefault(require("../../../db/prismaClient"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const user_constants_1 = require("./user.constants");
//Auth route
const createUserByProvider = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body;
    if (user.email) {
        user["status"] = "active";
    }
    else {
        user["status"] = "deactive";
    }
    user["role"] = "subscriber";
    if (user.providerUid) {
        const isExist = yield prismaClient_1.default.user.findUnique({
            where: { providerUid: user.providerUid },
            include: {
                image: true,
                subscriber: true,
                credential: { select: { accessToken: true, refreshToken: true } },
            },
        });
        if (isExist) {
            (0, sendResponse_1.default)(res, {
                data: isExist,
            });
        }
        else {
            let uploadedImage = null;
            if (!user) {
                throw new Error("User required!");
            }
            if (user.profileImage) {
                uploadedImage = yield (0, imgUpload_1.default)(user.profileImage, {
                    folder: "bloop",
                });
                user.profileImage = null;
            }
            const result = yield user_service_1.default.createUserByProviderDb(user, uploadedImage);
            (0, sendResponse_1.default)(res, {
                data: result,
            });
        }
    }
}));
const createUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body;
    user["status"] = "active";
    user["role"] = "subscriber";
    const result = yield user_service_1.default.createUserDb(user);
    (0, sendResponse_1.default)(res, {
        data: {
            accessToken: result.accessToken,
            email: result.email,
            id: result.id,
        },
    });
}));
const loginUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body;
    const { accessToken, refreshToken, userId, email } = yield user_service_1.default.loginUserDb(user);
    res.cookie("refreshToken", refreshToken);
    res.setHeader("Authorization", accessToken);
    (0, sendResponse_1.default)(res, {
        data: {
            accessToken: accessToken,
            email: email,
            userId: userId,
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
        data: {
            email: result.email,
            id: result.id,
        },
    });
}));
// user route
const getUsers = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, user_constants_1.userFilterableFields);
    const options = (0, pick_1.default)(req.query, ["limit", "page", "sortBy", "sortOrder"]);
    const result = yield user_service_1.default.getUsersDb(undefined, filters, options);
    (0, sendResponse_1.default)(res, { data: result });
}));
const createServiceProvider = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const providerInfo = {
        serviceTypeId: req.body.serviceTypeId,
        userId: req.body.userId,
        availability: true,
        status: client_1.Status.active,
    };
    const user = yield prismaClient_1.default.user.findUnique({ where: { id: providerInfo.userId } });
    if (!user) {
        throw new Error("Invalid user id! create user first");
    }
    else if (!user.email || user.status === "deactive") {
        throw new Error("User account is deactivated");
    }
    const result = yield user_service_1.default.createServiceProviderDb(providerInfo);
    (0, sendResponse_1.default)(res, {
        data: result,
    });
}));
const getMyProfile = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (!user) {
        throw new Error("My credential not found! try login first");
    }
    const result = yield user_service_1.default.getMyProfileDb(user);
    (0, sendResponse_1.default)(res, {
        data: result,
    });
}));
const getSubscriber = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, user_constants_1.userFilterableFields);
    const options = (0, pick_1.default)(req.query, ["limit", "page", "sortBy", "sortOrder"]);
    const result = yield user_service_1.default.getUsersDb("subscriber", filters, options);
    (0, sendResponse_1.default)(res, {
        data: result,
    });
}));
const getServiceProvider = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, user_constants_1.userFilterableFields);
    const options = (0, pick_1.default)(req.query, ["limit", "page", "sortBy", "sortOrder"]);
    const result = yield user_service_1.default.getServiceProviderDb(filters, options);
    (0, sendResponse_1.default)(res, {
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
        data: result,
    });
}));
const UserController = {
    createUser,
    getSubscriber,
    createUserByProvider,
    getMyProfile,
    getUsers,
    updateUser,
    loginUser,
    getServiceProvider,
    resetPassword,
    createServiceProvider,
};
exports.default = UserController;
