import { ServiceType } from "@prisma/client";
import sendResponse from "../../../shared/Response/sendResponse";
import catchAsync from "../../../shared/catchAsync";
import ServiceTypeService from "./serviceType.service";

const createServiceType = catchAsync(async (req, res) => {
  const serviceType: ServiceType = req.body;
  const result = await ServiceTypeService.createServiceTypeDb(serviceType);
  sendResponse(res, {
    message: "Create service type successfully",
    data: result,
  });
});

const getServiceType = catchAsync(async (req, res) => {
  const result = await ServiceTypeService.getServiceTypeDb();
  sendResponse(res, {
    message: "Service type retrieve successfully",
    data: result,
  });
});
const getAServiceType = catchAsync(async (req, res) => {
  const { serviceTypeId } =  req.params;
  const result = await ServiceTypeService.getAServiceTypeDb(serviceTypeId);
  sendResponse(res, {
    message: "Service type retrieve successfully",
    data: result,
  });
});

const updateServiceType = catchAsync(async (req, res) => {
  const { serviceTypeId } = req.params;
  const { title } = req.body;
  const result = await ServiceTypeService.updateServiceTypeDb(
    serviceTypeId,
    title
  );
  sendResponse(res, {
    message: "Service type update successfully",
    data: result,
  });
});

const deleteServiceType = catchAsync(async (req, res) => {
  const { serviceTypeId } = req.params;
  const result = await ServiceTypeService.deleteServiceTypeDb(serviceTypeId);
  sendResponse(res, {
    message: "Service type delete successfully",
    data: result,
  });
});

const ServiceTypeControl = {
  createServiceType,
  getServiceType,
  getAServiceType,
  updateServiceType,
  deleteServiceType,
};
export default ServiceTypeControl;
