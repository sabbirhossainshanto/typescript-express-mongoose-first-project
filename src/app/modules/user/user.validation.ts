import { z } from 'zod';

const createUserValidationSchema = z.object({
  password: z
    .string({invalid_type_error:"Password must be a string"})
    .max(20, { message: 'Password can not be more than 20 character' })
    .min(5, { message: 'Password can not less than five character' }),
  isDeleted: z.boolean().optional().default(false),
});

export const userValidation = {
  createUserValidationSchema,
};
