import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import academicDepartmentService from "./academicDepartment.service";


const createAcademicDepartment=catchAsync(async(req,res)=>{
  const result=await academicDepartmentService.createAcademicDepartmentIntoDB(req.body)
  sendResponse(res,{
    data:result,
    message:'Department created',
    success:true,
    statusCode:httpStatus.OK
  })

})

const findAllDepartments=catchAsync(async(req,res)=>{
  const result=await academicDepartmentService.findAllDeptFromDB()

  sendResponse(res,{
    data:result,
    message:'All Department fetched',
    success:true,
    statusCode:httpStatus.OK
  })

})


export default{
  findAllDepartments,
  createAcademicDepartment
}