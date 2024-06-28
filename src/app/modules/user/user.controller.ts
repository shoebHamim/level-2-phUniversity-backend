import { NextFunction, Request, RequestHandler, Response } from "express";
import { userServices } from "./user.service";
import { createStudentValidationSchema } from "../student/student.validation";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import userUtils from "./user.utils";

// controllers
const createStudent = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body;
  const result = await userServices.createStudentIntoDB(password, studentData);
  sendResponse(res, {
    data: result,
    message: "Student created successfully",
    statusCode: httpStatus.OK,
    success: true,
  });
});
const createFaculty = catchAsync(async (req, res) => {
  const { password, faculty: facultyData  } = req.body;
  const result = await userServices.createFacultyIntoDB(password, facultyData);
  sendResponse(res, {
    data: result,
    message: "Faculty created successfully",
    statusCode: httpStatus.OK,
    success: true,
  });

});

export const userControllers = {
  createStudent,
  createFaculty
};
