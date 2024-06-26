import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import facultyService from "./faculty.service";


const createFaculty=catchAsync(async(req,res)=>{
  const result=await facultyService.createFacultyIntoDB(req.body);
  sendResponse(res,{
    success:true,
    data:result,
    statusCode:httpStatus.OK,
    message:"new faculty created"
  })
})


export default {createFaculty}