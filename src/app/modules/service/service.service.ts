import { Media, Prisma, Service, Status } from "@prisma/client";
import DB from "../../../db/prismaClient";
import { UploadApiResponse } from "cloudinary";
import { ImgDelete } from "../../../shared/uploads/imgUpload";
import { IPaginationOptions } from "../../../types/pagination";
import { paginationHelpers } from "../../../shared/paginationHelpers";
import { serviceSearchableFields } from "./service.constants";
import TResponse from "../../../types/Response/TResponse";

const createServiceDb = async (
  service: Service,
  image: UploadApiResponse
): Promise<Service> => {
  let newService: Service | null = null;
  try {
    await DB.$transaction(async (asyncDB) => {
      const uploadThumbnail: Media = await asyncDB.media.create({
        data: {
          format: image.format,
          original_filename: image.original_filename,
          public_id: image.public_id,
          secure_url: image.secure_url,
          url: image.url,
          folder: image?.folder,
          created_at: image.created_at,
        },
      });

      if (!uploadThumbnail) {
        await ImgDelete(image.public_id);
        throw new Error("Thumbnail create failed");
      } else {
        service["thumbnail"] = uploadThumbnail.id;
        service["status"] = "active";
        newService = await asyncDB.service.create({ data: service });
        if (!newService) {
          await ImgDelete(image.public_id);
          throw new Error("Service create failed! Try again");
        }
      }
    });

    if (newService === null) {
      await ImgDelete(image.public_id);
      throw new Error("Service create failed! Try again");
    } else {
      return newService;
    }
  } catch (error) {
    await ImgDelete(image.public_id);
    console.log(error);
    throw new Error("Service create failed! Try again");
  }
};

const getServiceDb = async (
  filters: { searchTerm?: string | undefined },
  options: IPaginationOptions
): Promise<TResponse<Service[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;
  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: serviceSearchableFields.map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }
  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }
  const whereConditions: Prisma.ServiceWhereInput =
    andConditions.length > 0
      ? { AND: andConditions as Prisma.ServiceWhereInput }
      : {};
  const result = await DB.service.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            createdAt: "desc",
          },
  });
  const total = await DB.service.count({
    where: whereConditions,
  });
  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getAServiceDb = async (id: string): Promise<Service> => {
  const res: Service | null = await DB.service.findUnique({
    where: { id },
  });
  if (!res) {
    throw new Error("Service not found");
  }
  return res;
};

const updateServiceDb = async (
  serviceId: string,
  data: Partial<Service>,
  newThumbnail: UploadApiResponse | null
): Promise<Service> => {
  if (newThumbnail && !data) {
    data = { thumbnail: "" };
  }
  const isExistService: Service | null = await DB.service.findUnique({
    where: { id: serviceId },
  });
  if (!isExistService || isExistService === null) {
    throw new Error("Service not exist");
  }
  try {
    let updateService: Service | null = null;
    await DB.$transaction(async (asyncDB) => {
      if (newThumbnail) {
        const oldThumbnails = await asyncDB.media.findMany({
          where: { service: { id: isExistService.id } },
        });
        if (oldThumbnails) {
          oldThumbnails.map(async (oldTum) => {
            await ImgDelete(oldTum.public_id);
            await DB.media.delete({ where: { id: oldTum.id } });
          });
        }

        const updateThumbnail = await asyncDB.media.create({
          data: {
            format: newThumbnail.format,
            original_filename: newThumbnail.original_filename,
            public_id: newThumbnail.public_id,
            secure_url: newThumbnail.secure_url,
            url: newThumbnail.url,
            folder: newThumbnail?.folder,
            created_at: newThumbnail.created_at,
          },
        });
        if (!updateThumbnail) {
          ImgDelete(newThumbnail.public_id);
          throw new Error("Thumbnail update failed");
        } else data["thumbnail"] = updateThumbnail.id;
      }
      updateService = await asyncDB.service.update({
        where: { id: isExistService.id },
        data,
      });
    });
    if (!updateService || updateService === null) {
      throw new Error("Invalid update service");
    } else {
      return updateService;
    }
  } catch (error) {
    if (newThumbnail) {
      ImgDelete(newThumbnail.public_id);
    }
    throw error;
  }
};

const updateServiceStatusDb = async (
  serviceId: string,
  status: Status
): Promise<Service> => {
  const res: Service = await DB.service.update({
    where: { id: serviceId },
    data: { status },
  });
  return res;
};
const deleteServiceDb = async (serviceId: string): Promise<Service> => {
  const isExistService: Service | null = await DB.service.findUnique({
    where: { id: serviceId },
  });
  if (!isExistService) {
    throw new Error("Unknown service for delete");
  }
  const res: Service = await DB.service.delete({
    where: { id: serviceId },
  });
  const existImage = await DB.media.findFirst({
    where: { id: isExistService.thumbnail },
  });
  if (existImage) {
    await ImgDelete(existImage.public_id);
    await DB.media.delete({ where: { id: isExistService.thumbnail } });
  }
  return isExistService;
};

const ServiceService = {
  createServiceDb,
  getServiceDb,
  getAServiceDb,
  updateServiceStatusDb,
  deleteServiceDb,
  updateServiceDb,
};
export default ServiceService;
