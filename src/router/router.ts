import { Router } from "express";
import UserRoute from "../app/modules/user/user.route";
import AuthRoute from "../app/modules/user/auth.route";

const allRouters = Router();

allRouters.use('/users',UserRoute)
allRouters.use('/auth',AuthRoute)

export default allRouters;
