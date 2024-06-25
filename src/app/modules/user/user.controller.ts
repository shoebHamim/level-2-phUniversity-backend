import { NextFunction, Request, RequestHandler, Response } from "express";
import { userServices } from "./user.service";
import { createStudentValidationSchema } from "../student/student.validation";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";

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

export const userControllers = {
  createStudent,
};
