import { academicSemesterNameCodeMapper } from "../academicSemester/academicSemester.constant";
import AcademicSemesterModel from "../academicSemester/academicSemester.model";
import { TStudent } from "../student/student.interface";
import StudentModel from "../student/student.model";
import { TUser } from "./user.interface";
import UserModel from "./user.model";
import userUtils from "./user.utils";

const createStudentIntoDB = async (
  password: string,
  studentData: TStudent
) => {
  const id =await userUtils.createStudentId(studentData.admissionSemester);

  let newUser: Partial<TUser> = {
    id: id.toString(), // using this for the time being
    password: password || "default pass", // for the time being
    role: "student",
    status: "in-progress",
  };
  const result = await UserModel.create(newUser);
  if (Object.keys(result).length) {
    studentData.id = result.id; // embedded id
    studentData.user = result._id; // reference id
  }

  const newStudent = await StudentModel.create(studentData);
  return newStudent;
};

export const userServices = {
  createStudentIntoDB,
};
