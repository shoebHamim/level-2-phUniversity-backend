import { Types } from "mongoose";
import AcademicSemesterModel from "../academicSemester/academicSemester.model";
import StudentModel from "../student/student.model";
import { FacultyModel } from "../faculty/faculty.Model";

const findLastStudentIdCountPart = async (admissionSemId: Types.ObjectId) => {
  const last_student = await StudentModel.findOne({
    admissionSemester: admissionSemId,
  })
    .sort({ _id: -1 })
    .lean();
  const last_student_id = last_student?.id.substring(6);
  if (last_student_id) {
    const count = parseInt(last_student_id);
    return (count + 1).toString().padStart(4, "0");
  }
  return "0000";
};

const createStudentId = async (admissionSemId: Types.ObjectId) => {
  const admissionSemesterData = await AcademicSemesterModel.findById(
    admissionSemId
  ).lean();
  // const semesterYear=new Date().getFullYear().toString();
  const semesterYear = admissionSemesterData?.year || "0000";
  const semCode = admissionSemesterData?.code || "00";
  // const count=await StudentModel.countDocuments()
  // const countPart=count.toString().padStart(4,'0')
  const countPart = await findLastStudentIdCountPart(admissionSemId);

  return semesterYear + semCode + countPart;
};

const createFacultyId=async()=>{
  const lastCreatedFaculty=await FacultyModel.findOne().sort('-createdAt')
  const lastCreatedFacultyId=lastCreatedFaculty?.id||'F-0000'
  const nextFacultyIdNumberPart=Number(lastCreatedFacultyId.split('-')[1])+1
  const nextFacultyId='F-'+nextFacultyIdNumberPart.toString().padStart(4,"0")
  return nextFacultyId
}

export default { createStudentId,createFacultyId };
