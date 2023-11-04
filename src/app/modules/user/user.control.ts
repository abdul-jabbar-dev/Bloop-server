import { Credential, ServiceProvider, Status, User } from "@prisma/client";
import sendResponse from "../../../shared/Response/sendResponse";
import catchAsync from "../../../shared/catchAsync";
import { CreateUser, LoginUser } from "../../../types/user/user";
import UserService from "./user.service";
import ImgUpload from "../../../shared/uploads/imgUpload";

import { UploadApiResponse } from "cloudinary";
import DB from "../../../db/prismaClient";
import pick from "../../../shared/pick";
import { userFilterableFields } from "./user.constants";
import { CreateServiceProvider } from "../../../types/user/provider/serviceProvider";
//Auth route
const createUserByProvider = catchAsync(async (req, res) => {
  const user: User = req.body;
  if (user.email) {
    user["status"] = "active";
  } else {
    user["status"] = "deactive";
  }
  user["role"] = "subscriber";
  if (user.providerUid) {
    const isExist = await DB.user.findUnique({
      where: { providerUid: user.providerUid },
      include: {
        image: true,
        subscriber: true,
        credential: { select: { accessToken: true, refreshToken: true } },
      },
    });

    if (isExist) {
      sendResponse(res, {
        data: isExist,
      });
    } else {
      let uploadedImage: UploadApiResponse | null = null;
      if (!user) {
        throw new Error("User required!");
      }
      if (user.profileImage) {
        uploadedImage = await ImgUpload(user.profileImage, {
          folder: "bloop",
        });
        user.profileImage = null;
      }

      const result = await UserService.createUserByProviderDb(
        user,
        uploadedImage
      );
      sendResponse(res, {
        data: result,
      });
    }
  }
});
const createUser = catchAsync(async (req, res) => {
  const user: CreateUser = req.body;
  user["status"] = "active";
  user["role"] = "subscriber";
  const result = await UserService.createUserDb(user);

  sendResponse(res, {
    data: {
      accessToken: result.accessToken,
      email: result.email,
      id: result.id,
    },
  });
});
const loginUser = catchAsync(async (req, res) => {
  const user: LoginUser = req.body;
  const { accessToken, refreshToken, userId, email }: Credential =
    await UserService.loginUserDb(user);

  res.cookie("refreshToken", refreshToken);
  res.setHeader("Authorization", accessToken as string);

  sendResponse(res, {
    data: {
      accessToken: accessToken,
      email: email,
      userId: userId,
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
    data: {
      email: result.email,
      id: result.id,
    },
  });
});

// user route
const getUsers = catchAsync(async (req, res) => {
  const filters = pick(req.query, userFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  const result = await UserService.getUsersDb(undefined, filters, options);
  sendResponse(res, { data: result });
});
const createServiceProvider = catchAsync(async (req, res) => {
  const providerInfo: CreateServiceProvider = {
    serviceTypeId: req.body.serviceTypeId,
    userId: req.body.userId,
    availability: true,
    status: Status.active,
  };
  const user = await DB.user.findUnique({ where: { id: providerInfo.userId } });
  if (!user) {
    throw new Error("Invalid user id! create user first");
  } else if (!user.email || user.status === "deactive") {
    throw new Error("User account is deactivated");
  } 
  const result = await UserService.createServiceProviderDb(providerInfo);
  sendResponse(res, {
    data: result,
  });
});

const getMyProfile = catchAsync(async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new Error("My credential not found! try login first");
  }
  const result = await UserService.getMyProfileDb(user);
  sendResponse(res, {
    data: result,
  });
});
const getSubscriber = catchAsync(async (req, res) => {
  const filters = pick(req.query, userFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  const result = await UserService.getUsersDb("subscriber", filters, options);
  sendResponse(res, {
    data: result,
  });
});
const getServiceProvider = catchAsync(async (req, res) => {
  const filters = pick(req.query, userFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  const result = await UserService.getServiceProviderDb(filters, options);
  sendResponse(res, {
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
    data: result,
  });
});

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
export default UserController;
