import z from "zod";
export const CreateShippingAddressSchema = z.object({
  body: z.object({
    shippingNumber: z.string(),
    country: z.string(),
    street: z.string(),
    town: z.string(),
    city: z.string(),
    address: z.string(),
    label: z.string(),
    contactNo: z.string(),
  }),
});
export const UpdateShippingAddressSchema = z.object({
  body: z.object({
    shippingNumber: z.string().optional(),
    country: z.string().optional(),
    street: z.string().optional(),
    town: z.string().optional(),
    city: z.string().optional(),
    address: z.string().optional(),
    label: z.string().optional(),
    contactNo: z.string().optional(),
  }),
});
