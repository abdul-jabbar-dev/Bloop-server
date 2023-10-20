import { Credential, Media, Prisma, Role, Status, User } from "@prisma/client";
import DB from "../../../db/prismaClient";
import B from "../../../shared/bcrypt";
import { CreateUser, LoginUser } from "../../../types/user/user";
import JWT from "../../../shared/jwt";
import config from "../../../config";
import { UploadApiResponse } from "cloudinary";
import { JwtPayload } from "jsonwebtoken";
import { ImgDelete } from "../../../shared/uploads/imgUpload";
import { IPaginationOptions } from "../../../types/pagination";
import { paginationHelpers } from "../../../shared/paginationHelpers";
import { userSearchableFields } from "./user.constants";
import TResponse from "../../../types/Response/TResponse";
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
      email: newUser.email!,
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
  const isMatch = await B.comparePassword(password, isExist.password!);

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
    isExist.password!
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

const createUserByProviderDb = async (
  data: User,
  image: UploadApiResponse | null
) => {
  let res: User | null = null;
  try {
    await DB.$transaction(async (asyncDB) => {
      res = await asyncDB.user.create({ data });
      if (!res) {
        if (image) {
          ImgDelete(image.public_id);
        }
        throw new Error("Failed to create user");
      }
      if (image) {
        const newImg = await asyncDB.media.create({
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
        await asyncDB.user.update({
          where: { id: res.id },
          data: { profileImage: newImg.id },
        });
      }
      const createCredin = await asyncDB.credential.create({
        data: {
          role: "subscriber",
          userId: res.id,
          email: res.email,
          accessToken: JWT.generateToken(
            { id: res.id, role: res.role },
            config.accessToken.secret,
            { expiresIn: config.accessToken.validate }
          ),
          refreshToken: JWT.generateToken(
            { id: res.id, role: res.role },
            config.refreshToken.secret,
            { expiresIn: config.refreshToken.validate }
          ),
        },
      });
      if (!createCredin) {
        throw new Error("Invalid Parameter");
      }
    });
    if (res === null || res === undefined) {
    } else {
      const post = await DB.user.findUnique({
        where: { id: (res as User).id },
        include: {
          credential: { select: { accessToken: true, refreshToken: true } },
        },
      });
      return post;
    }
  } catch (error) {
    if (image) {
      ImgDelete(image.public_id);
    }
    throw new Error((error as any).message);
  }
};
// user
const getUsersDb = async (
  userRole: Role | undefined,
  filters: { searchTerm?: string | undefined },
  options: IPaginationOptions
): Promise<TResponse<User[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;
  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: userSearchableFields.map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }
  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }
  const whereConditions: Prisma.UserWhereInput =
    andConditions.length > 0
      ? { AND: andConditions as Prisma.UserWhereInput }
      : {};
  const result = await DB.user.findMany({
    where: { AND: [{ role: userRole }, whereConditions] },
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            createdAt: "desc",
          },
  });
  const total = await DB.user.count({
    where: whereConditions,
  });
  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};
// const getSubscriberDb = async (
//   filters: { searchTerm?: string | undefined },
//   options: IPaginationOptions
// ): Promise<TResponse<User[]>> => {
//   const { limit, page, skip } = paginationHelpers.calculatePagination(options);
//   const { searchTerm, ...filterData } = filters;

//   const andConditions = [];

//   if (searchTerm) {
//     andConditions.push({
//       OR: userSearchableFields.map((field) => ({
//         [field]: {
//           contains: searchTerm,
//           mode: "insensitive",
//         },
//       })),
//     });
//   }

//   if (Object.keys(filterData).length > 0) {
//     andConditions.push({
//       AND: Object.keys(filterData).map((key) => ({
//         [key]: {
//           equals: (filterData as any)[key],
//         },
//       })),
//     });
//   }

//   const whereConditions: Prisma.UserWhereInput =
//     andConditions.length > 0 ? { AND: andConditions } : {};

//   const result = await DB.user.findMany({
//     where: { AND: [{ role: "subscriber" }, whereConditions] },
//     skip,
//     take: limit,
//     orderBy:
//       options.sortBy && options.sortOrder
//         ? { [options.sortBy]: options.sortOrder }
//         : {
//             createdAt: "desc",
//           },
//   });
//   const total = await DB.user.count({
//     where: whereConditions,
//   });
//   return {
//     meta: {
//       total,
//       page,
//       limit,
//     },
//     data: result,
//   };
// };

// const getServiceProviderDb = async (
//   filters: { searchTerm?: string | undefined },
//   options: IPaginationOptions
// ): Promise<TResponse<User[]>> => {
//   const { limit, page, skip } = paginationHelpers.calculatePagination(options);
//   const { searchTerm, ...filterData } = filters;

//   const andConditions = [];

//   if (searchTerm) {
//     andConditions.push({
//       OR: userSearchableFields.map((field) => ({
//         [field]: {
//           contains: searchTerm,
//           mode: "insensitive",
//         },
//       })),
//     });
//   }

//   if (Object.keys(filterData).length > 0) {
//     andConditions.push({
//       AND: Object.keys(filterData).map((key) => ({
//         [key]: {
//           equals: (filterData as any)[key],
//         },
//       })),
//     });
//   }

//   const whereConditions: Prisma.UserWhereInput =
//     andConditions.length > 0 ? { AND: andConditions } : {};

//   const result = await DB.user.findMany({
//     where: { AND: [{ role: "serviceProvider" }, whereConditions] },
//     skip,
//     take: limit,
//     orderBy:
//       options.sortBy && options.sortOrder
//         ? { [options.sortBy]: options.sortOrder }
//         : {
//             createdAt: "desc",
//           },
//   });
//   const total = await DB.user.count({
//     where: whereConditions,
//   });
//   return {
//     meta: {
//       total,
//       page,
//       limit,
//     },
//     data: result,
//   };
// };

const getMyProfileDb = async (user: JwtPayload) => {
  const result = await DB.user.findUnique({
    where: { id: user.id },
    include: { image: true, subscriber: true },
  });
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

      updateProfile = await asyncDB.user.update({
        where: { id: user.id },
        data: userInfo,
      });
      let status: Status = Status.deactive;
      if (updateProfile.email) {
        status = Status.active;
      } else {
        status = Status.deactive;
      }
      const updateStatus = await asyncDB.user.update({
        where: { id: updateProfile.id },
        data: { status: status },
      });
      if (!updateStatus) {
        throw new Error("Invalid update status");
      }
      console.log(updateProfile);
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
  createUserByProviderDb,
  // getSubscriberDb,
  // getServiceProviderDb,
};
export default UserService;
