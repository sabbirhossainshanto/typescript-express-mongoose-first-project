import mongoose from 'mongoose';
import { Student } from './student.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { User } from '../user/user.model';
import { TStudent } from './student.interface';
import QueryBuilder from '../../builder/QueryBuilder';
import { studentSearchAbleFields } from './student.constant';

const getALlStudentFromDB = async (query: Record<string, unknown>) => {
  // console.log({ query });
  // const queryObj = { ...query };
  // let searchTerm = '';
  // if (query?.searchTerm) {
  //   searchTerm = query.searchTerm as string;
  // }

  /* search query */
  //   const searchQuery = Student.find({
  //     $or: studentSearchAbleFields.map((filed) => ({
  //       [filed]: { $regex: searchTerm, $options: 'i' },
  //     })),
  //   });

  //   /* filter query */
  //   const excludeField = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
  //   excludeField.forEach((el) => delete queryObj[el]);

  //   const filterQuery = searchQuery
  //     .find(queryObj)
  //     .populate('admissionSemester')
  //     .populate({
  //       path: 'academicDepartment',
  //       populate: {
  //         path: 'academicFaculty',
  //       },
  //     });

  //   /* sort query */
  //   let sort = '-createdAt';
  //   if (query.sort) {
  //     sort = query.sort as string;
  //   }
  //   const sortQuery = filterQuery.sort(sort);
  //   /* limit query */
  //   let limit = 1;
  //   let page = 1;
  //   let skip = 0;

  //   if (query.limit) {
  //     limit = Number(query.limit);
  //   }

  //   if (query.page) {
  //     page = Number(query.page);
  //     skip = (page - 1) * limit;
  //   }
  //   const paginateQuery = sortQuery.skip(skip);

  //   const limitQuery = paginateQuery.limit(limit);
  //   let fields = '__v';
  //   if (query.fields) {
  //     fields = (query.fields as string).split(',').join(' ');
  //   }
  //   const fieldsQuery = await limitQuery.select(fields);
  //   return fieldsQuery;
  const studentQuery = new QueryBuilder(
    Student.find()
      .populate('admissionSemester')
      .populate({
        path: 'academicDepartment',
        populate: {
          path: 'academicFaculty',
        },
      }),
    query,
  )
    .search(studentSearchAbleFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await studentQuery.modelQuery;
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id })
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};
const updateSingleStudentFromDB = async (
  id: string,
  payload: Partial<TStudent>,
) => {
  const { name, guardian, localGuardian, ...remainStudentData } = payload;
  const modifiedStudent: Record<string, unknown> = { ...remainStudentData };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedStudent[`name.${key}`] = value;
    }
  }
  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedStudent[`guardian.${key}`] = value;
    }
  }
  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedStudent[`localGuardian.${key}`] = value;
    }
  }

  const result = await Student.findOneAndUpdate({ id }, modifiedStudent, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteSingleStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const deletedStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student');
    }
    const deletedUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user');
    }
    await session.commitTransaction();
    await session.endSession();
    return deletedStudent;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
  }
};

export const studentServices = {
  getALlStudentFromDB,
  getSingleStudentFromDB,
  deleteSingleStudentFromDB,
  updateSingleStudentFromDB,
};
