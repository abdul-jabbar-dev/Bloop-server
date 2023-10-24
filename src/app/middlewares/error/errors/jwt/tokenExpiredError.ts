 
import TError from "../../../../../types/error/Error";
import { TokenExpiredError } from "jsonwebtoken";

export default function tokenExpiredError(err: TokenExpiredError) {
    const expierDate = new Date(err.expiredAt);
 
  const error: TError = {
    name: err.name,
    path: {
      path: "JWT Expired",
      message: "User authorization token invalid at: "+expierDate.toLocaleDateString()+" "+expierDate.toTimeString(),
    },
    message:
      err.message === "jwt expired"
        ? "Authorization token Expired"
        : err.message,
    statusCode: 401,
  };

  return error;
}
