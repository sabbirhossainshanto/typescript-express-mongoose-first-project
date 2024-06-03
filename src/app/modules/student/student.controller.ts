import { studentServices } from './student.services';
import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';

const getAllStudent = catchAsync(async (req, res) => {
  const result = await studentServices.getALlStudentFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Students are retrieve Successfully',
    data: result,
  });
});

const getSingleStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await studentServices.getSingleStudentFromDB(studentId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student retrieve Successfully',
    data: result,
  });
});

const deleteSingleStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await studentServices.deleteSingleStudentFromDB(studentId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student deleted Successfully',
    data: result,
  });
});

const updateSingleStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const { student } = req.body;
  const result = await studentServices.updateSingleStudentFromDB(
    studentId,
    student,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student updated Successfully',
    data: result,
  });
});

export const studentController = {
  getAllStudent,
  getSingleStudent,
  deleteSingleStudent,
  updateSingleStudent,
};
