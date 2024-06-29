import { TCourse, TPreRequisiteCourses } from './course.interface';
import httpStatus from "http-status"
import { catchAsync } from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse"
import {  courseServices } from "./course.service"
import { object } from "zod"


const createCourse=catchAsync(async(req,res)=>{ 
  const validatedBody = (req as any).validatedBody;
  const result=await courseServices.createCourseIntoDB(validatedBody)
  sendResponse(res,{
    success:true,
    data:result,
    statusCode:httpStatus.OK,
    message:"Course Created"
  })
})

const getAllCourse=catchAsync(async(req,res)=>{
  const result=await courseServices.getAllCoursesFromDB(req.query)
  sendResponse(res,{
    success:true,
    data:result,
    statusCode:httpStatus.OK,
    message:"All course fetched"+`[${result.length}]`
  })
})
const getSingleCourseById=catchAsync(async(req,res)=>{
  const result=await courseServices.getSingleCourseFromDB(req.params.id)
  sendResponse(res,{
    success:true,
    data:result,
    statusCode:httpStatus.OK,
    message:"Single course fetched"
  })
})
const deleteCourse=catchAsync(async(req,res)=>{
  const result=await courseServices.deleteCourseFromDB(req.params.id)
  sendResponse(res,{
    success:true,
    data:result,
    statusCode:httpStatus.OK,
    message:"Course deleted"
  })
})
const updateCourse=catchAsync(async(req,res)=>{
  const result=await courseServices.updateCourseIntoDB(req.params.id,req.body)
  sendResponse(res,{
    success:true,
    data:result,
    statusCode:httpStatus.OK,
    message:"Course updated"
  })
})
const assignFacultiesWithCourse=catchAsync(async(req,res)=>{
  const {courseId}=req.params;
  const {faculties}=req.body;
  const result=await courseServices.assignFacultiesWithCourseIntoDB(courseId,faculties)
  sendResponse(res,{
    success:true,
    data:result,
    statusCode:httpStatus.OK,
    message:"Course updated"
  })
})
const removeFaculties=catchAsync(async(req,res)=>{
  const {courseId}=req.params;
  const {faculties}=req.body;
  const result=await courseServices.removeFacultiesFromCourseFromDB(courseId,faculties)
  sendResponse(res,{
    success:true,
    data:result,
    statusCode:httpStatus.OK,
    message:"Course updated"
  })
})




export default{
  getAllCourse,
  getSingleCourseById,
  createCourse,
  deleteCourse,
  updateCourse,
   assignFacultiesWithCourse,
   removeFaculties
}
