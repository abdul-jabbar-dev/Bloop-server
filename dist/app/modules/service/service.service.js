"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prismaClient_1 = __importDefault(require("../../../db/prismaClient"));
const imgUpload_1 = require("../../../shared/uploads/imgUpload");
const paginationHelpers_1 = require("../../../shared/paginationHelpers");
const service_constants_1 = require("./service.constants");
const createServiceDb = (service, image) => __awaiter(void 0, void 0, void 0, function* () {
    let newService = null;
    try {
        yield prismaClient_1.default.$transaction((asyncDB) => __awaiter(void 0, void 0, void 0, function* () {
            const uploadThumbnail = yield asyncDB.media.create({
                data: {
                    format: image.format,
                    original_filename: image.original_filename,
                    public_id: image.public_id,
                    secure_url: image.secure_url,
                    url: image.url,
                    folder: image === null || image === void 0 ? void 0 : image.folder,
                    created_at: image.created_at,
                },
            });
            if (!uploadThumbnail) {
                yield (0, imgUpload_1.ImgDelete)(image.public_id);
                throw new Error("Thumbnail create failed");
            }
            else {
                service["thumbnail"] = uploadThumbnail.id;
                service["status"] = "active";
                newService = yield asyncDB.service.create({ data: service });
                if (!newService) {
                    yield (0, imgUpload_1.ImgDelete)(image.public_id);
                    throw new Error("Service create failed! Try again");
                }
            }
        }));
        if (newService === null) {
            yield (0, imgUpload_1.ImgDelete)(image.public_id);
            throw new Error("Service create failed! Try again");
        }
        else {
            return newService;
        }
    }
    catch (error) {
        yield (0, imgUpload_1.ImgDelete)(image.public_id);
        console.log(error);
        throw new Error("Service create failed! Try again");
    }
});
const getServiceDb = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page, skip } = paginationHelpers_1.paginationHelpers.calculatePagination(options);
    const { searchTerm } = filters, filterData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            OR: service_constants_1.serviceSearchableFields.map((field) => ({
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
                    equals: filterData[key],
                },
            })),
        });
    }
    const whereConditions = andConditions.length > 0
        ? { AND: andConditions }
        : {};
    const result = yield prismaClient_1.default.service.findMany({
        where: whereConditions,
        include: {
            feedback: true,
            image: true,
            service: true,
            servicePlaced: true,
            serviceProvider: true,
        },
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder
            ? { [options.sortBy]: options.sortOrder }
            : {
                createdAt: "desc",
            },
    });
    const total = yield prismaClient_1.default.service.count({
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
});
const getAServiceDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield prismaClient_1.default.service.findUnique({
        where: { id },
    });
    if (!res) {
        throw new Error("Service not found");
    }
    return res;
});
const updateServiceDb = (serviceId, data, newThumbnail) => __awaiter(void 0, void 0, void 0, function* () {
    if (newThumbnail && !data) {
        data = { thumbnail: "" };
    }
    const isExistService = yield prismaClient_1.default.service.findUnique({
        where: { id: serviceId },
    });
    if (!isExistService || isExistService === null) {
        throw new Error("Service not exist");
    }
    try {
        let updateService = null;
        yield prismaClient_1.default.$transaction((asyncDB) => __awaiter(void 0, void 0, void 0, function* () {
            if (newThumbnail) {
                const oldThumbnails = yield asyncDB.media.findMany({
                    where: { service: { id: isExistService.id } },
                });
                if (oldThumbnails) {
                    oldThumbnails.map((oldTum) => __awaiter(void 0, void 0, void 0, function* () {
                        yield (0, imgUpload_1.ImgDelete)(oldTum.public_id);
                        yield prismaClient_1.default.media.delete({ where: { id: oldTum.id } });
                    }));
                }
                const updateThumbnail = yield asyncDB.media.create({
                    data: {
                        format: newThumbnail.format,
                        original_filename: newThumbnail.original_filename,
                        public_id: newThumbnail.public_id,
                        secure_url: newThumbnail.secure_url,
                        url: newThumbnail.url,
                        folder: newThumbnail === null || newThumbnail === void 0 ? void 0 : newThumbnail.folder,
                        created_at: newThumbnail.created_at,
                    },
                });
                if (!updateThumbnail) {
                    (0, imgUpload_1.ImgDelete)(newThumbnail.public_id);
                    throw new Error("Thumbnail update failed");
                }
                else
                    data["thumbnail"] = updateThumbnail.id;
            }
            updateService = yield asyncDB.service.update({
                where: { id: isExistService.id },
                data,
            });
        }));
        if (!updateService || updateService === null) {
            throw new Error("Invalid update service");
        }
        else {
            return updateService;
        }
    }
    catch (error) {
        if (newThumbnail) {
            (0, imgUpload_1.ImgDelete)(newThumbnail.public_id);
        }
        throw error;
    }
});
const updateServiceStatusDb = (serviceId, status) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield prismaClient_1.default.service.update({
        where: { id: serviceId },
        data: { status },
    });
    return res;
});
const deleteServiceDb = (serviceId) => __awaiter(void 0, void 0, void 0, function* () {
    const isExistService = yield prismaClient_1.default.service.findUnique({
        where: { id: serviceId },
    });
    if (!isExistService) {
        throw new Error("Unknown service for delete");
    }
    const res = yield prismaClient_1.default.service.delete({
        where: { id: serviceId },
    });
    const existImage = yield prismaClient_1.default.media.findFirst({
        where: { id: isExistService.thumbnail },
    });
    if (existImage) {
        yield (0, imgUpload_1.ImgDelete)(existImage.public_id);
        yield prismaClient_1.default.media.delete({ where: { id: isExistService.thumbnail } });
    }
    return isExistService;
});
const ServiceService = {
    createServiceDb,
    getServiceDb,
    getAServiceDb,
    updateServiceStatusDb,
    deleteServiceDb,
    updateServiceDb,
};
exports.default = ServiceService;
