import { AcademicSemesterNameCodeMapper } from './academicSemester.constant';
import { TAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  if (AcademicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new Error('Invalid semester code!');
  }
  const result = await AcademicSemester.create(payload);
  return result;
};

const getAllAcademicSemesterFromDB = async () => {
  const result = await AcademicSemester.find();
  return result;
};
const getSingleAcademicSemesterFromDB = async (id: string) => {
  const result = await AcademicSemester.findById(id);
  return result;
};
const updateSingleAcademicSemesterFromDB = async (
  id: string,
  semester: Partial<TAcademicSemester>,
) => {
  if (
    semester.code &&
    semester.name &&
    AcademicSemesterNameCodeMapper[semester.name] !== semester.code
  ) {
    throw new Error('Invalid semester code!');
  }
  const result = await AcademicSemester.findOneAndUpdate(
    {
      _id: id,
    },
    semester,
    { new: true },
  );
  return result;
};

export const AcademicSemesterService = {
  createAcademicSemesterIntoDB,
  getAllAcademicSemesterFromDB,
  getSingleAcademicSemesterFromDB,
  updateSingleAcademicSemesterFromDB,
};
