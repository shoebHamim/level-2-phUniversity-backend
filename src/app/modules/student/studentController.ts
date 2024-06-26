import { Request, RequestHandler, Response } from "express";
import { studentServices } from "./student.service";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const getAllStudent = catchAsync(async (req, res) => {
  const allStudents = await studentServices.getAllStudentsFromDB();
  sendResponse(res, {
    data: allStudents,
    success: true,
    message: `all students[${allStudents.length}] fetched`,
    statusCode: httpStatus.OK,
  });
});
const getSingleStudent = catchAsync(async (req, res) => {
  const singleStudent = await studentServices.getSingleStudentFromDB(
    req.params.id
  );
  sendResponse(res, {
    data: singleStudent,
    success: true,
    message: "single student fetched",
    statusCode: httpStatus.OK,
  });
});

const deleteSingleStudent = catchAsync(async(req,res)=>{
  const result=await studentServices.deleteStudentFromDB(req.params.id)
  sendResponse(res, {
    data: result,
    success: true,
    message: "single student deleted",
    statusCode: httpStatus.OK,
  });

})

const updateStudent=catchAsync(async(req,res)=>{
  const result=await studentServices.updateStudentIntoDB(req.params.id,req.body.student);
  sendResponse(res, {
    data: result,
    success: true,
    message: "Student update successfully",
    statusCode: httpStatus.OK,
  });

})

export const StudentController = {
  getAllStudent,
  getSingleStudent,
  deleteSingleStudent,
  updateStudent
};
