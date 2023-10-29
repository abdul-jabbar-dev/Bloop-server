import z from "zod";
export const CreateCartSchema = z.object({
  body: z.object({
    serviceId: z.string(),
    time: z.string().optional(),
  }),
}); 
export const SetTimeCartSchema = z.object({
  body: z.object({
    date: z.string(), 
  }),
}); 