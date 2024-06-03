import { z } from 'zod';

const createUserNameValidationSchema = z.object({
  firstName: z
    .string()
    .max(20, 'First name cannot be more than 20')
    .regex(/^[A-Z][a-z]*$/, 'First name is not capitalized'),
  middleName: z.string().optional(),
  lastName: z.string(),
});

const createGuardianValidationSchema = z.object({
  fatherName: z.string(),
  fatherContactNo: z.string(),
  fatherOccupation: z.string(),
  motherName: z.string(),
  motherContactNo: z.string(),
  motherOccupation: z.string(),
});

const createLocalGuardianValidationSchema = z.object({
  name: z.string(),
  occupation: z.string(),
  contactNo: z.string(),
  address: z.string(),
});

const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    student: z.object({
      name: createUserNameValidationSchema,
      user: z.string().optional(),
      gender: z.enum(['female', 'male', 'other']),
      dateOfBirth: z.string().optional(),
      email: z.string().email('Invalid email'),
      contactNo: z.string(),
      emergencyContactNo: z.string(),
      bloodGroup: z
        .enum(['A+', 'A-', 'AB+', 'AB-', 'B+', 'B-', 'O+', 'O-'])
        .optional(),
      presentAddress: z.string(),
      permanentAddress: z.string(),
      guardian: createGuardianValidationSchema,
      localGuardian: createLocalGuardianValidationSchema,
      admissionSemester: z.string(),
      academicDepartment: z.string(),
      profileImg: z.string().optional(),
      isDeleted: z.boolean().default(false),
    }),
  }),
});

/* update validation */
const updateUserNameValidationSchema = z.object({
  firstName: z
    .string()
    .max(20, 'First name cannot be more than 20')
    .regex(/^[A-Z][a-z]*$/, 'First name is not capitalized')
    .optional(),
  middleName: z.string().optional(),
  lastName: z.string().optional(),
});

const updateGuardianValidationSchema = z.object({
  fatherName: z.string().optional(),
  fatherContactNo: z.string().optional(),
  fatherOccupation: z.string().optional(),
  motherName: z.string().optional(),
  motherContactNo: z.string().optional(),
  motherOccupation: z.string().optional(),
});

const updateLocalGuardianValidationSchema = z.object({
  name: z.string().optional(),
  occupation: z.string().optional(),
  contactNo: z.string().optional(),
  address: z.string().optional(),
});

const updateStudentValidationSchema = z.object({
  body: z
    .object({
      password: z.string().optional(),
      student: z
        .object({
          name: updateUserNameValidationSchema.optional(),
          user: z.string().optional(),
          gender: z.enum(['female', 'male', 'other']).optional(),
          dateOfBirth: z.string().optional(),
          email: z.string().email('Invalid email').optional(),
          contactNo: z.string().optional(),
          emergencyContactNo: z.string().optional(),
          bloodGroup: z
            .enum(['A+', 'A-', 'AB+', 'AB-', 'B+', 'B-', 'O+', 'O-'])
            .optional(),
          presentAddress: z.string().optional(),
          permanentAddress: z.string().optional(),
          guardian: updateGuardianValidationSchema.optional(),
          localGuardian: updateLocalGuardianValidationSchema.optional(),
          admissionSemester: z.string().optional(),
          academicDepartment: z.string().optional(),
          profileImg: z.string().optional(),
          isDeleted: z.boolean().default(false).optional(),
        })
        .optional(),
    })
    .optional(),
});

export const studentValidation = {
  createStudentValidationSchema,
  updateStudentValidationSchema,
};
