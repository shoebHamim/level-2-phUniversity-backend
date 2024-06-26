import mongoose from "mongoose";
import { TStudent } from "../student/student.interface";
import StudentModel from "../student/student.model";
import { TUser } from "./user.interface";
import UserModel from "./user.model";
import userUtils from "./user.utils";
import { AppError } from "../../errors/AppError";
import { TFaculty } from "../faculty/faculty.interface";
import { FacultyModel } from "../faculty/faculty.Model";

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const id = await userUtils.createStudentId(studentData.admissionSemester);
    //transaction -1
    let newUser: Partial<TUser> = {
      id: id.toString(), // using this for the time being
      password: password || "default pass", // for the time being
      role: "student",
      status: "in-progress",
    };
    const result = await UserModel.create([newUser], { session });
    if (!result.length) {
      throw new AppError(400, "failed to create user");
    } else {
      studentData.id = result[0].id; // embedded id
      studentData.user = result[0]._id; // reference id
    }
    //transaction-2
    const newStudent = await StudentModel.create([studentData], { session });
    if (!newStudent) {
      throw new AppError(400, "failed to create student");
    }
    // success!
    await session.commitTransaction();
    await session.endSession();
    return newStudent;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(500, err);
  }
};
const createFacultyIntoDB = async (password: string, facultyData: TFaculty) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const id = await userUtils.createFacultyId();
    //transaction -1
    let newUser: Partial<TUser> = {
      id: id.toString(),
      password: password || "default pass",
      role: "faculty",
      status: "in-progress",
    };
    const result = await UserModel.create([newUser], { session });
    if (!result.length) {
      throw new AppError(400, "failed to create user");
    } else {
      facultyData.id = result[0].id; // embedded id
      facultyData.userId = result[0]._id; // reference id
    }
    //transaction-2
    const newFaculty = await FacultyModel.create([facultyData], { session });
    if (!newFaculty) {
      throw new AppError(400, "failed to create faculty");
    }
    // success!
    await session.commitTransaction();
    await session.endSession();
    return newFaculty;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(500, err);
  }
};

export const userServices = {
  createStudentIntoDB,
  createFacultyIntoDB,
};
