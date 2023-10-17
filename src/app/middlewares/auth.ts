import { NextFunction, Request, Response } from "express";
import JWT from "../../shared/jwt";
import config from "../../config";
import { Role } from "@prisma/client";
import DB from "../../db/prismaClient";

const Auth =
  (role: Role[]) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req?.headers?.authorization;
      if (!token) {
        next(new Error("Token required"));
        return;
      }
      const decoded = JWT.decodedToken(token, config.accessToken.secret);
      if (typeof decoded === "string") {
        throw new Error("Invalid token");
      }
      console.log("Login: ", decoded.role);

      const isExistUser = await DB.user.findUnique({
        where: { id: decoded.id },
      });
      if (!isExistUser) {
        throw new Error("This user has no record found");
      }

      if (role.includes(isExistUser.role)) {
        req.user = isExistUser;
        next();
      } else {
        throw new Error("Invalid Access");
      }
    } catch (error) {
      next(error);
    }
  };
export default Auth;
