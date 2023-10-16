import { Response } from "express";
import TResponse from "../../types/Response/TResponse";

const sendResponse = <T>(
  res: Response,
  { message, status, data, meta }: TResponse<T>
) => {
  const response: TResponse<T> = {
    message,
    status:true,
    data,
    meta,
  };
  res.send(response);
};
export default sendResponse;
