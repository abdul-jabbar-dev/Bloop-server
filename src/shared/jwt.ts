import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import config from "../config";

const generateToken = (
  data: { id: string; role: string },
  secret: Secret,
  options?: jwt.SignOptions
) => {
  const token: string = jwt.sign(data, secret, options);
  return token;
};

const decodedToken = (token: string, accessOrRefreshSecret: string) => {

  const data: JwtPayload | string = jwt.verify(token, accessOrRefreshSecret);
  return data;
};

const JWT = { generateToken, decodedToken };
export default JWT;
