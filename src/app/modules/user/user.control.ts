import { Credential, Media } from "@prisma/client";
import sendResponse from "../../../shared/Response/sendResponse";
import catchAsync from "../../../shared/catchAsync";
import { CreateUser, LoginUser } from "../../../types/user/user";
import UserService from "./user.service";
import ImgUpload from "../../../shared/uploads/imgUpload";

import { UploadApiResponse } from "cloudinary"; 
//Auth route
const createUser = catchAsync(async (req, res) => {
  const user: CreateUser = req.body;
  user["status"] = "pending";
  user["role"] = "subscriber";
  const result = await UserService.createUserDb(user);

  sendResponse(res, {
    message: "Successfully create an account",
    data: {
      accessToken: result.accessToken,
      email: result.email,
      id: result.id,
    },
  });
});
const loginUser = catchAsync(async (req, res) => {
  const user: LoginUser = req.body;
  const result: Credential = await UserService.loginUserDb(user);

  res.cookie("refreshToken", result.refreshToken);
  res.setHeader("Authorization", result.accessToken as string);
  sendResponse(res, {
    message: "Login Successfully",
    data: {
      accessToken: result.accessToken,
      email: result.email,
      id: result.id,
    },
  });
});
const resetPassword = catchAsync(async (req, res) => {
  const resetPasswordConfig = {
    email: req.body.email,
    oldPassword: req.body.oldPassword,
    newPassword: req.body.newPassword,
  };
  const result = await UserService.resetPassword(resetPasswordConfig);
  sendResponse(res, {
    message: "Password reset Successfully",
    data: {
      email: result.email,
      id: result.id,
    },
  });
});

// user route
const getUsers = catchAsync(async (req, res) => {
  const result = await UserService.getUsersDb();
  res.send(result);
});

const getMyProfile = catchAsync(async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new Error("My credential not found! try login first");
  }
  const result = await UserService.getMyProfileDb(user);
  sendResponse(res, {
    message: "My profile fetched Successfully",
    data: result,
  });
});

const updateUser = catchAsync(async (req, res) => {
  const profile = req.file;
  let uploadedImage: UploadApiResponse | null = null;
  const user = req.user;
  if (!user) {
    throw new Error("User required!");
  }
  if (profile) {
    uploadedImage = await ImgUpload(profile.path, {
      folder: "bloop",
    });
  }
  const result = await UserService.updateUserDb(user, req.body, uploadedImage);
  sendResponse(res, {
    message: "Profile update Successfully",
    data: result,
  });
});

const UserController = {
  createUser,
  getMyProfile,
  getUsers,
  updateUser,
  loginUser,
  resetPassword,
};
export default UserController;
