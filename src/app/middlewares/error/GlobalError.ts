import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import TError from "../../../types/error/Error";
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from "@prisma/client/runtime/library";
import prismaClientValidationError from "./errors/prisma/prismaClientValidationError";
import prismaClientKnownRequestError from "./errors/prisma/prismaClientKnownRequestError";

const GlobalError: ErrorRequestHandler = (
  err,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let error: TError = {
    name: err.name,
    message: err.message,
    statusCode: 400,
    path: { path: err.message, message: "" },
  };
console.log(err)
  if (err instanceof PrismaClientValidationError) {
    error = prismaClientValidationError(err);
  } else if (err instanceof PrismaClientKnownRequestError) {
    error = prismaClientKnownRequestError(err);
  }
  res.send(error);
};
export default GlobalError;
