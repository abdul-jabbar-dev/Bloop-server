import { Role, ShippingAddress } from "@prisma/client";
import sendResponse from "../../../shared/Response/sendResponse";
import catchAsync from "../../../shared/catchAsync";
import ShippingAddressService from "./shippingAddress.service";
import { JwtPayload } from "jsonwebtoken";

const createShippingAddress = catchAsync(async (req, res) => {
  const user: JwtPayload | undefined = req.user;
  if (!user) {
    throw new Error("User login required");
  }
  if (user.role !== Role.subscriber) {
    throw new Error("Only subscriber has access");
  }
  const shippingAddressData: ShippingAddress = req.body;
  const result = await ShippingAddressService.createShippingAddressDb(
    shippingAddressData,
    user
  );
  sendResponse(res, { 
    data: result,
  });
});
const getShippingAddress = catchAsync(async (req, res) => {
  const user: JwtPayload | undefined = req.user;
  if (!user || user.role !== Role.subscriber) {
    throw new Error("Invalid Subscriber");
  }
  const result = await ShippingAddressService.getShippingAddressDb(user);
  sendResponse(res, { 
    data: result,
  });
});
const getAShippingAddress = catchAsync(async (req, res) => {
  const { shippingAddressId } = req.params;
  const user: JwtPayload | undefined = req.user;
  if (!user || user.role !== Role.subscriber) {
    throw new Error("Invalid Subscriber");
  }
  const result = await ShippingAddressService.getAShippingAddressDb(
    shippingAddressId,
    user
  );
  sendResponse(res, { 
    data: result,
  });
});

const deleteShippingAddress = catchAsync(async (req, res) => {
  const { shippingAddressId } = req.params;
  const user: JwtPayload | undefined = req.user;
  if (!user || user.role !== Role.subscriber) {
    throw new Error("Invalid Subscriber");
  }
  const result = await ShippingAddressService.deleteShippingAddressDb(
    shippingAddressId,
    user
  );
  sendResponse(res, { 
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
