import { Cart } from "@prisma/client";
import sendResponse from "../../../shared/Response/sendResponse";
import catchAsync from "../../../shared/catchAsync";
import CartService from "./cart.service";
import { JwtPayload } from "jsonwebtoken";

const addToCart = catchAsync(async (req, res) => {
  const cart: Cart = req.body;
  const user:JwtPayload = req.user!
  cart.userId = user.id
  const result = await CartService.addToCartDb(cart);
  sendResponse(res, { 
    data: result,
  });
});

const getToCart = catchAsync(async (req, res) => {
  const user = req.user! 
  const result = await CartService.getToCartDb(user.id);
  sendResponse(res, {
    data: result,
  });
});


const getACart = catchAsync(async (req, res) => {
  const { itemId } = req.params;
  const user = req.user!
  const result = await CartService.getACartDb(itemId,user);
  sendResponse(res, { 
    data: result,
  });
});

const setDateToItem = catchAsync(async (req, res) => {
  const { itemId } = req.params;
  const { bookingDate } = req.body;
  const result = await CartService.setDateToItemDb(itemId, bookingDate);
  sendResponse(res, {
    data: result,
  });
});
const removeDateFromItem = catchAsync(async (req, res) => {
  const { itemId } = req.params;
  const result = await CartService.removeDateFromItemDb(itemId);
  sendResponse(res, {
    data: result,
  });
});

const removeCart = catchAsync(async (req, res) => {
  const { itemId } = req.params;
  const user = req.user!;
  const result = await CartService.deleteCartDb(itemId, user);
  sendResponse(res, {
    data: result,
  });
});

const CartControl = {
  addToCart,
  getToCart,
  removeDateFromItem,
  getACart,
  setDateToItem, 
  removeCart,
};
export default CartControl;
