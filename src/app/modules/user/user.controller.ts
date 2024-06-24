import { NextFunction, Request, RequestHandler, Response } from "express";
import { userServices } from "./user.service";
import { StudentValidationSchema } from "../student/student.validation";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";


// controllers
const createStudent = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body;
  // validate
  const zodParsedData = StudentValidationSchema.parse(studentData);
  const result = await userServices.createStudentIntoDB(
    password,
    zodParsedData
  );
  sendResponse(res, {
    data: result,
    message: "Student created successfully",
    statusCode: httpStatus.OK,
    success: true,
  });
});






export const userController = {
  createStudent,
};
