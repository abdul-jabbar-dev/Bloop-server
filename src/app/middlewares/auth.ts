import { NextFunction, Request, Response } from "express";
import JWT from "../../shared/jwt";
import config from "../../config";
import { Role } from "@prisma/client";

const Auth =
  (role: Role[]) => (req: Request, res: Response, next: NextFunction) => {
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
      if (role.includes(decoded.role)) {
        req.user = decoded;
        next();
      } else {
        throw new Error("Invalid Access");
      }
    } catch (error) {
      next(error);
    }
  };
export default Auth;
