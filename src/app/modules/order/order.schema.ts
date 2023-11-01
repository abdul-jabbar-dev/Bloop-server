import z from "zod";
export const CreateOrderSchema = z.object({
  body: z.object({
    bookingDate: z.string(),
    serviceId: z.string(),
    issueItemName: z.string(),
    issueDetails: z.string(),
    cartId: z.string(),
  }),
});

export const availableProviderDateSchema = z.object({
  body: z.object({
    date: z.string(),
  }),
});
 
export const confirmPaymentSchema = z.object({
  body: z.object({
    orderId: z.string(),
    paymentVarificationCode: z.string().optional(),
    paymentMethod: z.enum([
      "Card",
      "CashOnDelivery",
      "Nogod",
      "Rocket",
      "Bkash",
    ]),
  }),
});
