import { ShippingAddress } from "@prisma/client";
import sendResponse from "../../../shared/Response/sendResponse";
import catchAsync from "../../../shared/catchAsync";
import ShippingAddressService from "./shippingAddress.service";

const createShippingAddress = catchAsync(async (req, res) => {
  const shippingAddressData: ShippingAddress = req.body;
  const result = await ShippingAddressService.createShippingAddressDb(
    shippingAddressData
  );
  sendResponse(res, {
    message: "Create Shipping Address successfully",
    data: result,
  });
});

const getShippingAddress = catchAsync(async (req, res) => {
  const result = await ShippingAddressService.getShippingAddressDb();
  sendResponse(res, {
    message: "Shipping Address retrieve successfully",
    data: result,
  });
});
const getAShippingAddress = catchAsync(async (req, res) => {
  const { shippingAddressId } = req.params;
  const result = await ShippingAddressService.getAShippingAddressDb(
    shippingAddressId
  );
  sendResponse(res, {
    message: "Shipping Address retrieve successfully",
    data: result,
  });
});

const updateShippingAddress = catchAsync(async (req, res) => {
  const { shippingAddressId } = req.params;
  const data: Partial<ShippingAddress> = req.body;
  const result = await ShippingAddressService.updateShippingAddressDb(
    shippingAddressId,
    data
  );
  sendResponse(res, {
    message: "Shipping Address update successfully",
    data: result,
  });
});

const deleteShippingAddress = catchAsync(async (req, res) => {
  const { shippingAddressId } = req.params;
  const result = await ShippingAddressService.deleteShippingAddressDb(
    shippingAddressId
  );
  sendResponse(res, {
    message: "Shipping Address delete successfully",
    data: result,
  });
});

const ShippingAddressControl = {
  createShippingAddress,
  getShippingAddress,
  getAShippingAddress,
  updateShippingAddress,
  deleteShippingAddress,
};
export default ShippingAddressControl;
