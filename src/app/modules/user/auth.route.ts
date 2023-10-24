import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import CreateUserSchema, {
  CreateServiceProviderSchema,
  LoginUserSchema,
  newPasswordSchema,
} from "./user.schema";
import UserController from "./user.control";
import Auth from "../../middlewares/auth";

const AuthRoute = Router();

AuthRoute.post("/create-by-provider", UserController.createUserByProvider);

AuthRoute.post(
  "/create-subscriber",
  validateRequest(CreateUserSchema),
  UserController.createUser
);

AuthRoute.post(
  "/create-service-provider",
  Auth(["admin", "super_admin"]),
  validateRequest(CreateServiceProviderSchema),
  UserController.createServiceProvider
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
