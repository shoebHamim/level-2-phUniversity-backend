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

// const deleteSingleStudent = async (req: Request, res: Response) => {
//   try {
//     const singleStudent = await StudentServices.deleteSingleStudentFromDB(
//       req.params.id
//     );
//     res.status(200).json({
//       success: true,
//       message: `${req.params.id} student is deleted`,
//       data: singleStudent,
//     });
//   } catch (err) {
//     // console.log(err);
//     res.send(err);
//   }
// };

export const StudentController = {
  getAllStudent,
  getSingleStudent,
};
