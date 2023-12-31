import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import TError from "../../../types/error/Error";
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from "@prisma/client/runtime/library";
import prismaClientValidationError from "./errors/prisma/prismaClientValidationError";
import prismaClientKnownRequestError from "./errors/prisma/prismaClientKnownRequestError";
import { ZodError } from "zod";
import zodValidator from "./errors/zod/zodValidator";
import { TokenExpiredError } from "jsonwebtoken";
import tokenExpiredError from "./errors/jwt/tokenExpiredError";

const GlobalError: ErrorRequestHandler = (
  err,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(
    ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>global start>>>>>>>>>>>>>>>>>>>>>>>>>>>\n",
    err,
    "\n>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>global end>>>>>>>>>>>>>>>>>>>>>>>>>>>"
  );

  let error: TError = {
    name: err?.name,
    message: err?.message,
    statusCode: 400,
    path: { path: err?.message, message: "" },
  };

  if (err instanceof PrismaClientValidationError) {
    error = prismaClientValidationError(err);
  } else if (err instanceof PrismaClientKnownRequestError) {
    error = prismaClientKnownRequestError(err);
  } else if (err instanceof ZodError) {
    error = zodValidator(err);
  }else if (err instanceof TokenExpiredError){
    error = tokenExpiredError(err)
  }
    res.status(error.statusCode).send(error);
};
export default GlobalError;
