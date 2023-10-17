import { Service } from "@prisma/client";
import sendResponse from "../../../shared/Response/sendResponse";
import catchAsync from "../../../shared/catchAsync";
import ServiceService from "./service.service";
import { UploadApiResponse } from "cloudinary";
import ImgUpload from "../../../shared/uploads/imgUpload";

const createService = catchAsync(async (req, res) => {
  const thumbnail = req.file;
  let uploadedImage: UploadApiResponse | null = null;

  if (!thumbnail) {
    throw new Error("Thumbnail Image required");
  }
  uploadedImage = await ImgUpload(thumbnail.path, {
    folder: "bloop/services",
  });

  const service: Service = req.body;
  const result = await ServiceService.createServiceDb(service, uploadedImage);
  sendResponse(res, {
    message: "Service create successfully",
    data: result,
  });
});
const getService = catchAsync(async (req, res) => {
  const result = await ServiceService.getServiceDb();
  sendResponse(res, {
    message: "Service retrieve successfully",
    data: result,
  });
});
const getAService = catchAsync(async (req, res) => {
  const { serviceTypeId } = req.params;
  const result = await ServiceService.getAServiceDb(serviceTypeId);
  sendResponse(res, {
    message: "Service retrieve successfully",
    data: result,
  });
});
const updateService = catchAsync(async (req, res) => {
  const { serviceTypeId } = req.params;
  const data: Partial<Service> = req.body;
  const thumbnail = req?.file;
  let uploadedImage: UploadApiResponse | null = null;
  if (thumbnail) {
    uploadedImage = await ImgUpload(thumbnail.path, {
      folder: "bloop/services",
    });
  }
  const result = await ServiceService.updateServiceDb(
    serviceTypeId,
    data,
    uploadedImage
  );
  sendResponse(res, {
    message: "Service update successfully",
    data: result,
  });
});
const updateServiceStatus = catchAsync(async (req, res) => {
  const { serviceTypeId } = req.params;
  const { status } = req.body;
  const result = await ServiceService.updateServiceStatusDb(
    serviceTypeId,
    status
  );
  sendResponse(res, {
    message: "Service status update successfully",
    data: result,
  });
});
const deleteService = catchAsync(async (req, res) => {
  const { serviceTypeId } = req.params;
  const result = await ServiceService.deleteServiceDb(serviceTypeId);
  sendResponse(res, {
    message: "Service delete successfully",
    data: result,
  });
});

const ServiceControl = {
  createService,
  getService,
  getAService,
  updateService,
  deleteService,
  updateServiceStatus,
};
export default ServiceControl;
