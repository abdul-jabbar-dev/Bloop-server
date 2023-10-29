import z from "zod";
export const CreateShippingAddressSchema = z.object({
  body: z.object({
    address: z.string(),
    street: z.string(),
    area: z.string(),
    city: z.string(),
    isDefault: z.boolean(), 
    label: z.string(),
    contactNo: z.string(),
  }),
});
export const UpdateShippingAddressSchema = z.object({
  body: z.object({
    address: z.string().optional(),
    street: z.string().optional(),
    area: z.string().optional(),
    city: z.string().optional(),
    isDefault: z.boolean().optional(), 
    label: z.string().optional(),
    contactNo: z.string().optional(),
  }),
});
