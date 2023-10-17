import { Router } from "express";
import ServiceTypeControl from "./serviceType.control";
import Auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { CreateServiceTypeSchema } from "./serviceType.schema";

const ServiceTypeRoute = Router();
ServiceTypeRoute.post(
  "/",
  Auth(["admin", "super_admin"]),
  validateRequest(CreateServiceTypeSchema),
  ServiceTypeControl.createServiceType
);
ServiceTypeRoute.get("/", ServiceTypeControl.getServiceType);
ServiceTypeRoute.get("/:serviceTypeId", ServiceTypeControl.getAServiceType);

ServiceTypeRoute.patch(
  "/:serviceTypeId",
  Auth(["admin", "super_admin"]),
  validateRequest(CreateServiceTypeSchema),
  ServiceTypeControl.updateServiceType
);
ServiceTypeRoute.delete(
  "/:serviceTypeId",
  Auth(["admin", "super_admin"]),
  ServiceTypeControl.deleteServiceType
);

export default ServiceTypeRoute;

