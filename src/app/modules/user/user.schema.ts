import z from "zod";
const CreateUserSchema = z.object({
  body: z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string(),
    password: z.string(),
  }),
});
export const UpdateProfileUserSchema = z.object({
  body: z
    .object({
      firstName: z.string().optional(),
      lastName: z.string().optional(),
      address: z.string().optional(),
      email: z.string().optional(),
      contactNo: z.string().optional(),
      gender: z.enum(["male", "female"]).optional(),
      dateOfBirth: z.string().optional(),
      bloodGroup: z.string().optional(),
    })
    .optional(),
});
export const LoginUserSchema = z.object({
  body: z.object({
    email: z.string(),
    password: z.string(),
  }),
});
export const CreateServiceProviderSchema = z.object({
  body: z.object({
    userId: z.string(),
    serviceTypeId: z.string(),
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
