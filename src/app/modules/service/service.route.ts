import { Router } from "express";
import Auth from "../../middlewares/auth";
import {
  CreateServiceSchema,
  UpdateServiceSchema,
  UpdateServiceStatusSchema,
} from "./service.schema";
import ServiceControl from "./service.control";
import validateRequestJson from "../../middlewares/validateRequestJson";
import upload from "../../middlewares/uploder/multer";
import validateRequest from "../../middlewares/validateRequest";

const ServiceRoute = Router();
ServiceRoute.post(
  "/",
  upload.single("file"),
  Auth(["admin", "super_admin"]),
  validateRequestJson(CreateServiceSchema),
  ServiceControl.createService
);
ServiceRoute.get("/", ServiceControl.getService);
ServiceRoute.get("/:serviceTypeId", ServiceControl.getAService);

ServiceRoute.patch(
  "/:serviceTypeId",
  Auth(["admin", "super_admin"]),
  upload.single("file"),
  validateRequestJson(UpdateServiceSchema),
  ServiceControl.updateService
);
ServiceRoute.patch(
  "/status/:serviceTypeId",
  Auth(["admin", "super_admin"]),
  validateRequest(UpdateServiceStatusSchema),
  ServiceControl.updateServiceStatus
);
ServiceRoute.delete(
  "/:serviceTypeId",
  Auth(["admin", "super_admin"]),
  ServiceControl.deleteService
);

export default ServiceRoute;
