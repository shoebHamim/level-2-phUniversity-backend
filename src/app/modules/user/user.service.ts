import mongoose from "mongoose";
import { academicSemesterNameCodeMapper } from "../academicSemester/academicSemester.constant";
import AcademicSemesterModel from "../academicSemester/academicSemester.model";
import { TStudent } from "../student/student.interface";
import StudentModel from "../student/student.model";
import { TUser } from "./user.interface";
import UserModel from "./user.model";
import userUtils from "./user.utils";
import { AppError } from "../../errors/AppError";

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
      throw new AppError(400, "failed to create user");
    }
    // success!
    await session.commitTransaction();
    await session.endSession();
    return newStudent;
  } catch (err:any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(500,err.toString())
  }
};

export const userServices = {
  createStudentIntoDB,
};
