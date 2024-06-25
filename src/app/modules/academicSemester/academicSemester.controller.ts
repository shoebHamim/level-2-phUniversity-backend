import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AcademicSemesterServices } from "./academicSemester.service";

const createAcademicSemester = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic Semester is created",
    data: result,
  });
});
const findAllAcademicSemester = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.findAllAcademicSemesterFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All academic Semester is fetched",
    data: result,
  });
});
const findSingleAcademicSemester = catchAsync(async (req, res) => {
  const result =
    await AcademicSemesterServices.findSingleAcademicSemesterByIdFromDB(
      req.params.id
    );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Single Academic Semester is fetched",
    data: result,
  });
});
const updateAcademicSemester = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.updateAcademicSemester(
    req.params.id,
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic Semester is updated",
    data: result,
  });
});

export const academicSemesterControllers = {
  createAcademicSemester,
  findAllAcademicSemester,
  findSingleAcademicSemester,
  updateAcademicSemester
};
