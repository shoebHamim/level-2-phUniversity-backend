import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import facultyService from "./faculty.service";


const getAllFaculty=catchAsync(async(req,res)=>{
  const result=await facultyService.getAllFacultyFromDB(req.query)
  sendResponse(res,{
    success:true,
    data:result,
    statusCode:httpStatus.OK,
    message:"All faculty fetched"+`[${result.length}]`
  })
})
const getSingleFacultyById=catchAsync(async(req,res)=>{
  const result=await facultyService.getSingleFacultyByIdFromDB(req.params.id)
  sendResponse(res,{
    success:true,
    data:result,
    statusCode:httpStatus.OK,
    message:"Single faculty fetched"
  })
})



export default { getAllFaculty,getSingleFacultyById}