import express, { Application } from "express";
import cors from "cors";
import allRouters from "./router/router";
import GlobalError from "./app/middlewares/error/GlobalError";
import cookieParser from "cookie-parser";
import ImgUpload from "./shared/uploads/imgUpload";
const app: Application = express();
//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

 

app.use("/api/v1/", allRouters);
app.use(GlobalError);

export default app;
