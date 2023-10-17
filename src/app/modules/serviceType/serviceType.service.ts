import { ServiceType } from "@prisma/client";
import DB from "../../../db/prismaClient";

const createServiceTypeDb = async (
  serviceType: ServiceType
): Promise<ServiceType> => {
  const res: ServiceType = await DB.serviceType.create({ data: serviceType });
  return res;
};

const getServiceTypeDb = async (): Promise<ServiceType[]> => {
  const res: ServiceType[] = await DB.serviceType.findMany();
  return res;
};

const getAServiceTypeDb = async (id: string): Promise<ServiceType> => {
  const res: ServiceType | null = await DB.serviceType.findUnique({
    where: { id },
  });
  if (!res) {
    throw new Error("Service type not found");
  }
  return res;
};

const updateServiceTypeDb = async (
  serviceTypeId: string,
  title: string
): Promise<ServiceType> => {
  const res: ServiceType = await DB.serviceType.update({
    where: { id: serviceTypeId },
    data: { title },
  });
  return res;
};
const deleteServiceTypeDb = async (
  serviceTypeId: string
): Promise<ServiceType> => {
  const res: ServiceType = await DB.serviceType.delete({
    where: { id: serviceTypeId },
  });
  return res;
};

const ServiceTypeService = {
  createServiceTypeDb,
  getServiceTypeDb,
  getAServiceTypeDb,
  deleteServiceTypeDb,
  updateServiceTypeDb,
};
export default ServiceTypeService;
