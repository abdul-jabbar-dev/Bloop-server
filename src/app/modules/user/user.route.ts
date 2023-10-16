import { Router } from "express";
import UserController from "./user.control";
import Auth from "../../middlewares/auth";

const UserRoute = Router();

UserRoute.get("/", Auth(["admin", "super_admin"]), UserController.getUsers);
UserRoute.patch("/:id", UserController.updateUser);
export default UserRoute;
