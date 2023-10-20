import { Router } from "express";
import UserController from "./user.control";
import Auth from "../../middlewares/auth";
import { UpdateProfileUserSchema } from "./user.schema";
import validateRequestJson from "../../middlewares/validateRequestJson";
import upload from "../../middlewares/uploder/multer";

const UserRoute = Router();

UserRoute.get(
  "/",
  Auth(["subscriber", "admin", "super_admin"]),
  UserController.getUsers
);
UserRoute.patch(
  "/update-profile",
  Auth(["admin", "serviceProvider", "subscriber", "super_admin"]),
  upload.single("file"), 
  validateRequestJson(UpdateProfileUserSchema),
  UserController.updateUser
);
UserRoute.get(
  "/my-profile",
  Auth(["admin", "serviceProvider", "subscriber", "super_admin"]),
  UserController.getMyProfile
);
UserRoute.get(
  "/get-subscribers",
  Auth(["admin","super_admin"]),
  UserController.getSubscriber
);
UserRoute.get(
  "/get-service-provider",
  Auth(["admin","super_admin"]),
  UserController.getServiceProvider
);
export default UserRoute;
