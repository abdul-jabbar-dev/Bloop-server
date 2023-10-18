import { Credential, Media, Role, User } from "@prisma/client";
import DB from "../../../db/prismaClient";
import B from "../../../shared/bcrypt";
import { CreateUser, LoginUser } from "../../../types/user/user";
import JWT from "../../../shared/jwt";
import config from "../../../config";
import { UploadApiResponse } from "cloudinary";
import { JwtPayload } from "jsonwebtoken";
import { ImgDelete } from "../../../shared/uploads/imgUpload";
//Auth
const createUserDb = async (data: CreateUser): Promise<Credential> => {
  const { password, ...user } = data;
  const existUser = await DB.user.findUnique({ where: { email: user.email } });
  if (existUser) {
    throw new Error("Email already Exist");
  }
  if (!password) {
    throw new Error("Password required");
  }

  let createCredential: Credential | null = null;
  const Session = await DB.$transaction(async (asyncDB) => {
    const hashedPassword = await B.hashPassword(password);

    const newUser: User = await asyncDB.user.create({ data: user });
    if (!newUser) {
      throw new Error("User create unsuccessfully");
    }
    const credentialData = {
      email: newUser.email,
      password: hashedPassword,
      userId: newUser.id,
      role: Role.subscriber,
      accessToken: JWT.generateToken(
        { id: newUser.id, role: newUser.role },
        config.accessToken.secret,
        { expiresIn: config.accessToken.validate }
      ),
      refreshToken: JWT.generateToken(
        { id: newUser.id, role: newUser.role },
        config.refreshToken.secret,
        { expiresIn: config.refreshToken.validate }
      ),
    };
    createCredential = await asyncDB.credential.create({
      data: credentialData,
    });
    const newSubscriber = await asyncDB.subscriber.create({
      data: { status: "active", userId: newUser.id },
    });
    if (!newSubscriber) {
      throw new Error("User create unsuccessfully!");
    }
  });
  if (createCredential === null) {
    throw new Error("Account create unsuccessfully");
  } else {
    return createCredential;
  }
};
const loginUserDb = async ({
  email,
  password,
}: LoginUser): Promise<Credential> => {
  const isExist: Credential | null = await DB.credential.findUnique({
    where: { email },
  });
  if (!isExist) {
    throw new Error("Invalid User");
  }
  const isMatch = await B.comparePassword(password, isExist.password);

  if (!isMatch) {
    throw new Error("Invalid Password");
  }
  return isExist;
};
const resetPassword = async (resetConfig: {
  oldPassword: string;
  newPassword: string;
  email: string;
}) => {
  const isExist: Credential | null = await DB.credential.findUnique({
    where: { email: resetConfig.email },
  });
  if (!isExist) {
    throw new Error("Invalid email");
  }
  const isPasswordMatch = await B.comparePassword(
    resetConfig.oldPassword,
    isExist.password
  );
  if (!isPasswordMatch) {
    throw new Error("Incorrect password");
  }
  const newHashPassword = await B.hashPassword(resetConfig.newPassword);
  if (!newHashPassword) {
    throw new Error("Reset password error");
  }
  const updatePassword = await DB.credential.update({
    where: { id: isExist.id },
    data: { password: newHashPassword },
  });
  return updatePassword;
};
// user
const getUsersDb = async () => {
  const result = await DB.user.findMany();
  return result;
};

const getMyProfileDb = async (user: JwtPayload) => {
  const result = await DB.user.findUnique({ where: { id: user.id } });
  return result;
};

const updateUserDb = async (
  user: JwtPayload,
  userInfo: Partial<User>,
  image: UploadApiResponse | null
) => {
  let uploadImage: Media | null = null;
  let updateProfile: User | null = null;
  if (!userInfo) {
    userInfo = { profileImage: "" };
  }
  try {
    await DB.$transaction(async (asyncDB) => {
      if (image) {
        const isExistImage = await asyncDB.media.findMany({
          where: { user: { id: user.id } },
        });
        if (isExistImage) {
          isExistImage.forEach(async (existImg: Media) => {
            ImgDelete(existImg.public_id);
            await asyncDB.media.delete({
              where: { id: existImg.id },
            });
          });
        }

        uploadImage = await asyncDB.media.create({
          data: {
            format: image.format,
            original_filename: image.original_filename,
            public_id: image.public_id,
            secure_url: image.secure_url,
            url: image.url,
            folder: image?.folder,
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
      delete userInfo?.email;

      updateProfile = await asyncDB.user.update({
        where: { id: user.id },
        data: userInfo,
      });
    });

    return updateProfile;
  } catch (error) {
    ImgDelete((image as UploadApiResponse).public_id!);
    throw new Error((error as any).message);
  }
};

const UserService = {
  createUserDb,
  getUsersDb,
  getMyProfileDb,
  updateUserDb,
  loginUserDb,
  resetPassword,
};
export default UserService;
