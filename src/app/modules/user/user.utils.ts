
import { Types } from "mongoose";
import AcademicSemesterModel from "../academicSemester/academicSemester.model";
import StudentModel from "../student/student.model";


const findLastStudentIdCountPart=async()=>{
  const last_student=await StudentModel.findOne().sort({ _id: -1 }).lean();
  const last_student_id=last_student?.id.substring(6)
  if(last_student_id){
    const count=parseInt(last_student_id)    
    return  (count+1).toString().padStart(4,'0')
  }
  return '0000'

}

const createStudentId=async(admissionSemId:Types.ObjectId)=>{
  const admissionSemesterData=await AcademicSemesterModel.findById(admissionSemId).lean()
    const currentYear=new Date().getFullYear().toString();
    const semCode=admissionSemesterData?.code 
    // const count=await StudentModel.countDocuments()
    // const countPart=count.toString().padStart(4,'0')
    const countPart= await findLastStudentIdCountPart()

    return currentYear+semCode+countPart
}



export default{createStudentId}