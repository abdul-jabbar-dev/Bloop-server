import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import CreateUserSchema, {
  LoginUserSchema,
  newPasswordSchema,
} from "./user.schema";
import UserController from "./user.control";

const AuthRoute = Router();

AuthRoute.post(
  "/create-subscriber",
  validateRequest(CreateUserSchema),
  UserController.createUser
);

AuthRoute.post(
  "/login",
  validateRequest(LoginUserSchema),
  UserController.loginUser
);

AuthRoute.post(
  "/reset-password",
  validateRequest(newPasswordSchema),
  UserController.resetPassword
);

export default AuthRoute;
