import { z } from 'zod';

// Define the Zod schema according to the TUser interface
export const userValidationSchema = z.object({
  name: z
    .string()
    .min(1)
    .max(20)
    .refine((value) => /^[A-Z]/.test(value), {
      message: 'Name must start with a capital letter',
    }),
  email: z.string().email(),
  password: z
    .string({
      invalid_type_error: 'Password must be a string',
    })
    .max(20, { message: 'Password can not more than 20 characters' })
    .optional(),

    phone: z.string(),
    address: z.string(),
});


// Export the schema
export const UserValidation = {
  userValidationSchema,
};
