import z from "zod";
export const CreateOrderSchema = z.object({
  body: z.object({
    bookingDate: z.string(),
    serviceId: z.string(),
    issueItemName: z.string(),
    issueDetails: z.string(),
  }),
});
