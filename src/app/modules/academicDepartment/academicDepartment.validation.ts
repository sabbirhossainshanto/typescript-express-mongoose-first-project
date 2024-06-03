import { z } from 'zod';

const createAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Name must be a string',
      required_error: 'Name is required',
    }),
    academicFaculty: z.string({
      invalid_type_error: 'AcademicFaculty must be a string',
      required_error: 'AcademicFaculty is required',
    }),
  }),
});

const updateAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: 'Name must be a string',
        required_error: 'Name is required',
      })
      .optional(),
    academicFaculty: z
      .string({
        invalid_type_error: 'AcademicFaculty must be a string',
        required_error: 'AcademicFaculty is required',
      })
      .optional(),
  }),
});

export const AcademicDepartmentValidations = {
  createAcademicDepartmentValidationSchema,
  updateAcademicDepartmentValidationSchema,
};
