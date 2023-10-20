import { ZodError } from "zod";
import TError from "../../../../../types/error/Error";

export default function zodValidator(err: ZodError): TError {
  const error: TError = {
    message: (err?.issues[0]?.path[1] as string) + " is " + err?.issues[0].message,
    name: err?.name,
    statusCode: 400,
    path: {
      path: err.issues?.map((er) => er?.path.join("/"))?.join(", "),
      message: JSON.stringify(
        err.issues?.map((er) => (er?.path.join("/") + " is " + er.message)?.trim())
      ),
    },
  }; 
  return error;
}
