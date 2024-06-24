import { Schema, model, Types } from "mongoose";
import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  TUserName,
} from "./student.interface";
import { TUser } from "../user/user.interface";

const userNameSchema = new Schema<TUserName>(
  {
    firstName: { type: String, required: true },
    middleName: String,
    lastName: { type: String, required: true },
  },
  { _id: false }
);

const guardianSchema = new Schema<TGuardian>(
  {
    fatherName: { type: String, required: true },
    fatherOccupation: { type: String, required: true },
    fatherContactNo: { type: String, required: true },
    motherName: { type: String, required: true },
    motherOccupation: { type: String, required: true },
    motherContactNo: { type: String, required: true },
  },
  { _id: false }
);

const localGuardianSchema = new Schema<TLocalGuardian>(
  {
    name: { type: String, required: true },
    occupation: { type: String, required: true },
    contactNo: { type: String, required: true },
    address: { type: String, required: true },
  },
  { _id: false }
);

const studentSchema = new Schema<TStudent>(
  {
    id: { type: String, required: true, unique: true },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      unique: true,
      ref: "User",
    },
    name: userNameSchema,
    gender: { type: String, enum: ["male", "female", "other"], required: true },
    dateOfBirth: String,
    email: { type: String, required: true, unique: true },
    contactNo: { type: String, required: true },
    emergencyContactNo: { type: String, required: true },
    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    guardian: guardianSchema,
    localGuardian: localGuardianSchema,
    profileImg: String,
    isDeleted: { type: Boolean, required: true },
  },
  { timestamps: true }
);





const StudentModel = model<TStudent>("Student", studentSchema);

export default StudentModel;
