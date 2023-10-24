import { ServiceProvider, ServiceType } from "@prisma/client";
import UserService from "../../app/modules/user/user.service";
import DB from "../../db/prismaClient";

const CreateId = async (
  serviceType: { title: string },
  lastId: ServiceProvider | null
): Promise<string> => {
  const serviceCode = serviceType.title.slice(0, 2).toUpperCase();
  const getNum = Number(lastId?.providerId?.slice(2) || 0) + 1;
  const code = serviceCode + getNum.toString().padStart(3, "0");
  const ifCodeExist = await DB.serviceProvider.findUnique({
    where: { providerId: code },
  });
  if (ifCodeExist) {
    CreateId(serviceType, ifCodeExist);
  }
  return code;
};

export default async function generateProviderId(serviceTypeId: string) {
  try {
    const lastCreateProvider: ServiceProvider | null =
      await UserService.getLastProviderDb();

    const serviceType: { title: string } | null =
      await DB.serviceType.findUnique({
        where: { id: serviceTypeId },
        select: { title: true },
      });
    if (!serviceType) {
      throw new Error("Invalid Service Type");
    }
    return CreateId(serviceType, lastCreateProvider);
  } catch (error) {
    return Promise.reject(error);
  }
}
