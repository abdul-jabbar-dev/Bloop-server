import { Status } from "@prisma/client";
import z from "zod";
export const CreateServiceSchema = z.object({
  body: z.object({
    title: z.string(),
    price: z.string(),
    orderType: z.string(),
    serviceArea: z.string().array(),
    details: z.string(),
    serviceGuarantee: z.string(),
    serviceTypeId: z.string(),
    serviceItem: z.string().array()
  }),
});
export const UpdateServiceSchema = z.object({
  body: z
    .object({
      title: z.string().optional(),
      price: z.number().optional(),
      orderType: z.string().optional(),
      serviceArea: z.string().array().optional(),
      details: z.string().optional(),
      serviceGuarantee: z.string().optional(),
      serviceTypeId: z.string().optional(),
      serviceItem: z.string().array().optional(),
      inServicePackage: z.string().array().optional(),
    })
    .optional(),
});
export const UpdateServiceStatusSchema = z.object({
  body: z.object({
    status: z.enum(Object.getOwnPropertyNames(Status) as [string, ...string[]]),
  }),
});
