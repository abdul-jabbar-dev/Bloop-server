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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prismaClient_1 = __importDefault(require("../../../db/prismaClient"));
const bcrypt_1 = __importDefault(require("../../../shared/bcrypt"));
const jwt_1 = __importDefault(require("../../../shared/jwt"));
const config_1 = __importDefault(require("../../../config"));
const imgUpload_1 = require("../../../shared/uploads/imgUpload");
//Auth
const createUserDb = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { password } = data, user = __rest(data, ["password"]);
    const existUser = yield prismaClient_1.default.user.findUnique({ where: { email: user.email } });
    if (existUser) {
        throw new Error("Email already Exist");
    }
    if (!password) {
        throw new Error("Password required");
    }
    let createCredential = null;
    const Session = yield prismaClient_1.default.$transaction((asyncDB) => __awaiter(void 0, void 0, void 0, function* () {
        const hashedPassword = yield bcrypt_1.default.hashPassword(password);
        const newUser = yield asyncDB.user.create({ data: user });
        if (!newUser) {
            throw new Error("User create unsuccessfully");
        }
        const credentialData = {
            email: newUser.email,
            password: hashedPassword,
            userId: newUser.id,
            role: client_1.Role.subscriber,
            accessToken: jwt_1.default.generateToken({ id: newUser.id, role: newUser.role }, config_1.default.accessToken.secret, { expiresIn: config_1.default.accessToken.validate }),
            refreshToken: jwt_1.default.generateToken({ id: newUser.id, role: newUser.role }, config_1.default.refreshToken.secret, { expiresIn: config_1.default.refreshToken.validate }),
        };
        createCredential = yield asyncDB.credential.create({
            data: credentialData,
        });
        const newSubscriber = yield asyncDB.subscriber.create({
            data: { status: "active", userId: newUser.id },
        });
        if (!newSubscriber) {
            throw new Error("User create unsuccessfully!");
        }
    }));
    if (createCredential === null) {
        throw new Error("Account create unsuccessfully");
    }
    else {
        return createCredential;
    }
});
const loginUserDb = ({ email, password, }) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prismaClient_1.default.credential.findUnique({
        where: { email },
    });
    if (!isExist) {
        throw new Error("Invalid User");
    }
    const isMatch = yield bcrypt_1.default.comparePassword(password, isExist.password);
    if (!isMatch) {
        throw new Error("Invalid Password");
    }
    return isExist;
});
const resetPassword = (resetConfig) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prismaClient_1.default.credential.findUnique({
        where: { email: resetConfig.email },
    });
    if (!isExist) {
        throw new Error("Invalid email");
    }
    const isPasswordMatch = yield bcrypt_1.default.comparePassword(resetConfig.oldPassword, isExist.password);
    if (!isPasswordMatch) {
        throw new Error("Incorrect password");
    }
    const newHashPassword = yield bcrypt_1.default.hashPassword(resetConfig.newPassword);
    if (!newHashPassword) {
        throw new Error("Reset password error");
    }
    const updatePassword = yield prismaClient_1.default.credential.update({
        where: { id: isExist.id },
        data: { password: newHashPassword },
    });
    return updatePassword;
});
// user
const getUsersDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prismaClient_1.default.user.findMany();
    return result;
});
const getMyProfileDb = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prismaClient_1.default.user.findUnique({ where: { id: user.id } });
    return result;
});
const updateUserDb = (user, userInfo, image) => __awaiter(void 0, void 0, void 0, function* () {
    let uploadImage = null;
    let updateProfile = null;
    if (!userInfo) {
        userInfo = { profileImage: "" };
    }
    try {
        yield prismaClient_1.default.$transaction((asyncDB) => __awaiter(void 0, void 0, void 0, function* () {
            if (image) {
                const isExistImage = yield asyncDB.media.findMany({
                    where: { user: { id: user.id } },
                });
                if (isExistImage) {
                    isExistImage.forEach((existImg) => __awaiter(void 0, void 0, void 0, function* () {
                        (0, imgUpload_1.ImgDelete)(existImg.public_id);
                        yield asyncDB.media.delete({
                            where: { id: existImg.id },
                        });
                    }));
                }
                uploadImage = yield asyncDB.media.create({
                    data: {
                        format: image.format,
                        original_filename: image.original_filename,
                        public_id: image.public_id,
                        secure_url: image.secure_url,
                        url: image.url,
                        folder: image === null || image === void 0 ? void 0 : image.folder,
                        created_at: image.created_at,
                    },
                });
                if (!uploadImage) {
                    throw new Error("Profile Update failed");
                }
            }
            if (uploadImage) {
                userInfo.profileImage = uploadImage.id;
            }
            userInfo === null || userInfo === void 0 ? true : delete userInfo.email;
            updateProfile = yield asyncDB.user.update({
                where: { id: user.id },
                data: userInfo,
            });
        }));
        return updateProfile;
    }
    catch (error) {
        (0, imgUpload_1.ImgDelete)(image.public_id);
        throw new Error(error.message);
    }
});
const UserService = {
    createUserDb,
    getUsersDb,
    getMyProfileDb,
    updateUserDb,
    loginUserDb,
    resetPassword,
};
exports.default = UserService;
