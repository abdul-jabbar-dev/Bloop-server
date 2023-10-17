import { ShippingAddress } from "@prisma/client";
import DB from "../../../db/prismaClient";

const createShippingAddressDb = async (
  shippingAddress: ShippingAddress
): Promise<ShippingAddress> => {
  const res: ShippingAddress = await DB.shippingAddress.create({
    data: shippingAddress,
  });
  return res;
};

const getShippingAddressDb = async (): Promise<ShippingAddress[]> => {
  const res: ShippingAddress[] = await DB.shippingAddress.findMany();
  return res;
};

const getAShippingAddressDb = async (id: string): Promise<ShippingAddress> => {
  const res: ShippingAddress | null = await DB.shippingAddress.findUnique({
    where: { id },
  });
  if (!res) {
    throw new Error("Shipping Address not found");
  }
  return res;
};

const updateShippingAddressDb = async (
  shippingAddressId: string,
  shippingAddressData: Partial<ShippingAddress>
): Promise<ShippingAddress> => {
  const res: ShippingAddress = await DB.shippingAddress.update({
    where: { id: shippingAddressId },
    data: shippingAddressData,
  });
  return res;
};
const deleteShippingAddressDb = async (
  shippingAddressId: string
): Promise<ShippingAddress> => {
  const res: ShippingAddress = await DB.shippingAddress.delete({
    where: { id: shippingAddressId },
  });
  return res;
};

const ShippingAddressService = {
  createShippingAddressDb,
  getShippingAddressDb,
  getAShippingAddressDb,
  deleteShippingAddressDb,
  updateShippingAddressDb,
};
export default ShippingAddressService;
