import { ShippingAddress, Subscriber } from "@prisma/client";
import DB from "../../../db/prismaClient";
import { JwtPayload } from "jsonwebtoken";
import config from "../../../config";

const setDefaultShippingAddressDb = async (
  shippingAddressId: string,
  user: JwtPayload
) /* : Promise<ShippingAddress> */ => {
  const isExistSubscriber = await DB.subscriber.findUnique({
    where: { userId: user.id },
    include: { shippingAddress: true },
  });

  if (!isExistSubscriber) {
    throw new Error("Invalid subscriber");
  }

  const resetDefault = await DB.shippingAddress.updateMany({
    where: { subscriberId: isExistSubscriber.id },
    data: { isDefault: false },
  });
  if (!resetDefault) {
    throw new Error("invalid user access to update default");
  }
  let res: ShippingAddress | null = await DB.shippingAddress.update({
    where: { id: shippingAddressId },
    data: { isDefault: true },
  });

  if (res === null) {
    throw new Error("Set Default failed");
  }
  return resetDefault;
};

const createShippingAddressDb = async (
  shippingAddress: ShippingAddress,
  user: JwtPayload
): Promise<ShippingAddress> => {
  let res: ShippingAddress | null = null;

  await DB.$transaction(async (asyncDb) => {
    const isExistSubscriber = await asyncDb.subscriber.findUnique({
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

    const resetDefault = await asyncDb.shippingAddress.updateMany({
      where: { subscriberId: isExistSubscriber.id },
      data: { isDefault: false },
    });
    if (!resetDefault) {
      throw new Error("invalid user access to update default");
    }

    shippingAddress["subscriberId"] = isExistSubscriber.id;
    res = await asyncDb.shippingAddress.create({
      data: shippingAddress,
    });
  });

  if (!res) {
    throw new Error("Shipping address include unsuccessful");
  }
  return res;
};

const getShippingAddressDb = async (user: JwtPayload) => {
  const isExistSubscriber = await DB.subscriber.findUnique({
    where: { userId: user.id },
  });

  if (!isExistSubscriber) {
    throw new Error("Invalid subscriber");
  }

  const shippingAddress = await DB.shippingAddress.findMany({
    where: { subscriberId: isExistSubscriber.id },
    include: { subscriber: true },
    orderBy: { createdAt: "desc" },
  });
  if (!shippingAddress) {
    throw new Error("Invalid user id");
  }
  return shippingAddress;
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
  setDefaultShippingAddressDb,
};
export default ShippingAddressService;
