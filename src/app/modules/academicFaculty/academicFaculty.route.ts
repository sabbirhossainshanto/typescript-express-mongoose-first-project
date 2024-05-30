import express from 'express';
import { AcademicFacultyController } from './academicFaculty.controller';
import validateRequest from '../../middlewares/validateRequest';
import AcademicFacultyValidationSchema from './academicFaculty.validation';
const router = express.Router();

router.post(
  '/create-academic-faculty',
  validateRequest(AcademicFacultyValidationSchema),
  AcademicFacultyController.createAcademicFaculty,
);

router.get('/', AcademicFacultyController.getAllAcademicFaculty);

router.get('/:facultyId', AcademicFacultyController.getSingleAcademicFaculty);

router.patch(
  '/:facultyId',
  validateRequest(AcademicFacultyValidationSchema),
  AcademicFacultyController.updateSingleAcademicFaculty,
);

export const AcademicFacultyRoutes = router;
