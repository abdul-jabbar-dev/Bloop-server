import { Cart } from "@prisma/client";
import DB from "../../../db/prismaClient";
import { JwtPayload } from "jsonwebtoken";

const addToCartDb = async (cart: Cart): Promise<Cart> => {
  const res: Cart = await DB.cart.create({ data: cart });
  return res;
};

const getToCartDb = async (id: string): Promise<Cart[]> => {
  const res = await DB.cart.findMany({
    where: { userId: id },
    include: {
      user: true,
      service: { include: { image: true, service: true } },
    },
  });
  return res;
};

const getACartDb = async (id: string, user: JwtPayload) => {
  const res = await DB.cart.findUnique({
    where: { id },
    include: { service: {include:{image:true,service:true}}, },
  }); 
  if (!res) {
    throw new Error("Service type not found");
  }
  if (res.userId !== user.id) {
    throw new Error("Invalid access! Enter your cart id");
  }
  return res;
};

const setDateToItemDb = async (
  itemId: string,
  bookingDate: string
): Promise<Cart> => {
  const existDate = await DB.cart.findFirst({
    where: { id: itemId, bookingDate },
  });
  if (existDate) {
    return existDate;
  }
  const res: Cart = await DB.cart.update({
    where: { id: itemId },
    data: { bookingDate },
  });
  return res;
};

const removeDateFromItemDb = async (itemId: string): Promise<Cart> => {
  const res: Cart = await DB.cart.update({
    where: { id: itemId },
    data: { bookingDate: undefined },
  });
  return res;
};

const deleteCartDb = async (
  cartId: string,
  user: JwtPayload
): Promise<Cart> => {
  const existDate = await DB.cart.findFirst({
    where: { id: cartId, userId: user.id },
  });
  if (!existDate) {
    throw new Error("Invalid parameter");
  }
  const res: Cart = await DB.cart.delete({
    where: { id: cartId },
  });
  return res;
};

const CartService = {
  addToCartDb,
  getToCartDb,
  getACartDb,
  deleteCartDb,
  setDateToItemDb,
  removeDateFromItemDb,
};
export default CartService;
