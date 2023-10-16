import z from "zod";
const CreateUserSchema = z.object({
  body: z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string(),
    password: z.string(),
  }),
});
export const LoginUserSchema = z.object({
  body: z.object({
    email: z.string(),
    password: z.string(),
  }),
});
export const newPasswordSchema = z.object({
  body: z.object({
    email: z.string(),
    oldPassword: z.string(),
    newPassword: z.string(),
  }),
});
export default CreateUserSchema;
