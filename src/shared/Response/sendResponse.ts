import { Response } from "express";
import TResponse from "../../types/Response/TResponse";

const sendResponse = <T>(res: Response, { data, meta }: TResponse<T>) => {
  const response: TResponse<T> = {
    data,
    meta,
  };
  res.send(response);
};
export default sendResponse;
