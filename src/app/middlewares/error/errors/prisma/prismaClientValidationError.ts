import { PrismaClientValidationError } from "@prisma/client/runtime/library";
import TError from "../../../../../types/error/Error";

export default function prismaClientValidationError(
  err: PrismaClientValidationError
): TError {
  if (err.message.includes("is missing.")) {
    const error: TError = {
      name: "Argument is missing",
      path: {
        path: err.message
         ?.split("Argument")[1]
         ?.split("` ")[0]
         ?.replace(" `", "")
         ?.trim(),
        message: err?.message?.split("})")[1]?.trim(),
      },
      message:
        err.message
          ?.split("Argument")[1]
          ?.split("` ")[0]
          ?.replace(" `", "")
          ?.trim() + " argument is missing",
      statusCode: 400,
    };
    return error;
  } else {
    const error: TError = {
      name: "Invalid type",
      path: {
        path: err.message.split("Argument")[1].split("` ")[0].split("`")[1],
        message: err.message
          ?.split("})")[1]
          ?.split(" Invalid value provided. ")[1]
          ?.trim(),
      },
      message: err?.message?.split("})")[1]?.trim(),
      statusCode: 400,
    };
    return error;
  }
}
