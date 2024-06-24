import StudentModel from "./student.model"



const getAllStudentsFromDB=async()=>{
  return await StudentModel.find({})
}
const getSingleStudentFromDB=async(student_id:string)=>{
  return await StudentModel.find({id:student_id})
}


export const studentServices={
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  


}