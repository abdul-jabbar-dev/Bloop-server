import z from "zod";
export const CreateServiceTypeSchema = z.object({
  body: z.object({
    title: z.string()
  }),
}); 