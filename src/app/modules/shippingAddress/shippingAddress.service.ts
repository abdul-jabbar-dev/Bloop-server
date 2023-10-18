import { ShippingAddress, Subscriber } from "@prisma/client";
import DB from "../../../db/prismaClient";
import { JwtPayload } from "jsonwebtoken";
import config from "../../../config";

const createShippingAddressDb = async (
  shippingAddress: ShippingAddress,
  user: JwtPayload
): Promise<ShippingAddress> => {
  const isExistSubscriber = await DB.subscriber.findUnique({
    where: { userId: user.id },
    include: { shippingAddress: true },
  });

  if (!isExistSubscriber) {
    throw new Error("Invalid subscriber");
  }

  let totalShippingAddress = Number(config.subscriber.totalShippingAddress);
  if (
    isExistSubscriber?.shippingAddress &&
    isExistSubscriber?.shippingAddress?.length >= totalShippingAddress
  ) {
    throw new Error(
      "Maximum " + totalShippingAddress + " shipping address added"
    );
  }
  shippingAddress["subscriberId"] = isExistSubscriber.id;
  const res: ShippingAddress = await DB.shippingAddress.create({
    data: shippingAddress,
  });
  if (!res) {
    throw new Error("Shipping address include unsuccessful");
  }
  return res;
};

const getShippingAddressDb = async (user: JwtPayload): Promise<Subscriber> => {
  const subscriberInfo = await DB.subscriber.findUnique({
    where: { userId: user.id },
    include: { shippingAddress: true },
  });
  if (!subscriberInfo) {
    throw new Error("Invalid user id");
  }
  return subscriberInfo;
};

const getAShippingAddressDb = async (
  id: string,
  user: JwtPayload
): Promise<ShippingAddress> => {
  const subscriber = await DB.subscriber.findUnique({
    where: { userId: user.id },
  });
  if (!subscriber) {
    throw new Error("Invalid subscriber");
  }

  const res: ShippingAddress | null = await DB.shippingAddress.findUnique({
    where: { id, subscriberId: subscriber.id },
  });
  if (res === null) {
    throw new Error("Shipping Address not found");
  }
  return res;
};

const deleteShippingAddressDb = async (
  id: string,
  user: JwtPayload
): Promise<ShippingAddress> => {
  const res: ShippingAddress = await DB.shippingAddress.delete({
    where: { id, subscriber: { userId: user.id } },
  });
  return res;
};
// Unhandled
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

const ShippingAddressService = {
  createShippingAddressDb,
  getShippingAddressDb,
  getAShippingAddressDb,
  deleteShippingAddressDb,
  updateShippingAddressDb,
};
export default ShippingAddressService;
