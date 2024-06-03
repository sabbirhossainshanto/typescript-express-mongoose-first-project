import { Schema, model } from 'mongoose';
import {
  StudentModel,
  TGuardian,
  TLocalGuardian,
  TStudent,
  TStudentMethods,
  TUserName,
} from './student.interface';

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    maxlength: [20, 'First name can not be more than 20'],
    validate: {
      validator: function (value: string) {
        const firstNameCapitalization =
          value.charAt(0).toUpperCase() + value.slice(1);
        return firstNameCapitalization === value;
      },
      message: 'First name is not capitalize',
    },
  },
  middleName: { type: String },
  lastName: { type: String, required: true },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: { type: String, required: true },
  fatherContactNo: { type: String, required: true },
  fatherOccupation: { type: String, required: true },
  motherName: { type: String, required: true },
  motherContactNo: { type: String, required: true },
  motherOccupation: { type: String, required: true },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: { type: String, required: true },
  occupation: { type: String, required: true },
  contactNo: { type: String, required: true },
  address: { type: String, required: true },
});

const studentSchema = new Schema<TStudent, StudentModel, TStudentMethods>({
  id: { type: String, required: [true, 'Id is required'], unique: true },
  user: {
    type: Schema.Types.ObjectId,
    required: [true, 'User id is required'],
    unique: true,
    ref: 'User',
  },
  name: {
    type: userNameSchema,
    required: true,
  },
  gender: {
    type: String,
    enum: {
      values: ['female', 'male', 'other'],
      message: '{VALUE} is not valid',
    },
    required: true,
  },
  dateOfBirth: { type: String },
  email: { type: String, required: true, unique: true },
  contactNo: { type: String, required: true },
  emergencyContactNo: { type: String, required: true },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'AB+', 'AB-', 'B+', 'B-', 'O+', 'O-'],
  },
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  admissionSemester: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'AcademicSemester',
  },
  academicDepartment: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'AcademicDepartment',
  },
  guardian: {
    type: guardianSchema,
    required: true,
  },
  localGuardian: {
    type: localGuardianSchema,
    required: true,
  },
  profileImg: { type: String },

  isDeleted: {
    type: Boolean,
    default: false,
  },
});

studentSchema.pre('find', async function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
studentSchema.pre('findOne', async function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

studentSchema.methods.isUserExist = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};

export const Student = model<TStudent, StudentModel>('Student', studentSchema);
