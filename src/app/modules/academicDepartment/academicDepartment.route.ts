import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicDepartmentValidations } from './academicDepartment.validation';
import { AcademicDepartmentController } from './academicDepartment.controller';

const router = express.Router();

router.post(
  '/create-academic-department',
  validateRequest(
    AcademicDepartmentValidations.createAcademicDepartmentValidationSchema,
  ),
  AcademicDepartmentController.createAcademicDepartment,
);

router.get('/', AcademicDepartmentController.getAllAcademicDepartment);

router.get(
  '/:departmentId',
  AcademicDepartmentController.getSingleAcademicDepartment,
);

router.patch(
  '/:departmentId',
  validateRequest(
    AcademicDepartmentValidations.updateAcademicDepartmentValidationSchema,
  ),
  AcademicDepartmentController.updateSingleAcademicDepartment,
);

export const AcademicDepartmentRoutes = router;
