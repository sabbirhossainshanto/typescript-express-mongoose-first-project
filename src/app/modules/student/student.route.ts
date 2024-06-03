import express from 'express';
import { studentController } from './student.controller';
import validateRequest from '../../middlewares/validateRequest';
import { studentValidation } from './student.validation';

const router = express.Router();

router.get('/', studentController.getAllStudent);
router.get('/:studentId', studentController.getSingleStudent);
router.delete('/:studentId', studentController.deleteSingleStudent);

router.patch(
  '/:studentId',
  validateRequest(studentValidation.updateStudentValidationSchema),
  studentController.updateSingleStudent
);

export const StudentRoutes = router;
