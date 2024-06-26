import { TAcademicDepartment } from "./academicDepartment.interface";
import { AcademicDepartmentModel } from "./academicDepartment.model";



const createAcademicDepartmentIntoDB=async(payload:TAcademicDepartment)=>{
  return await AcademicDepartmentModel.create(payload)
}


const findAllDeptFromDB=async()=>{
  return await AcademicDepartmentModel.find().populate('faculty')
}




export default{
  createAcademicDepartmentIntoDB,
  findAllDeptFromDB
}