import express, { Application } from "express";
import cors from "cors";
import allRouters from "./router/router";
import GlobalError from "./app/middlewares/error/GlobalError";
import cookieParser from "cookie-parser";
const app: Application = express();
//parser
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
 
app.use(express.json());

app.use("/api/v1/", allRouters);
app.use(GlobalError);

export default app;
