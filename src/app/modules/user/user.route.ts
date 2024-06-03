import express from 'express';
import { userController } from './user.controller';
import { studentValidation } from '../student/student.validation';
import validateRequest from '../../middlewares/validateRequest';
import { createFacultyValidationSchema } from '../faculty/faculty.validation';
const router = express.Router();

router.post(
  '/create-student',
  validateRequest(studentValidation.createStudentValidationSchema),
  userController.createStudent,
);

router.post(
  '/create-faculty',
  validateRequest(createFacultyValidationSchema),
  userController.createFaculty,
);

export const UserRoutes = router;
