import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from "@prisma/client/runtime/library";
import TError from "../../../../../types/error/Error";

export default function prismaClientKnownRequestError(
  err: PrismaClientKnownRequestError
) {
  const error: TError = {
    name: err.name,
    path: {
      path: "",
      message: "",
    },
    message: "",
    statusCode: 400,
  };
  if (err.code === "P2002") {
    error.message = (err?.message)?.trim();
    error.path = {
      path: ((err?.meta as any)?.target)?.join("/ "),
      message:
        "Unique constraint failed on the fields: " +
        ((err?.meta as any)?.target)?.join("/ "),
    };
  }
  return error;
}
