import express, { NextFunction, Request, Response } from "express";
import { userControllers } from "./user.controller";
import { createStudentValidationSchema } from "../student/student.validation";
import { AnyZodObject } from "zod";
import { validateRequest } from "../../middleware/validateRequest";
import { facultyValidationSchema } from "../faculty/faculty.validation";

const router = express.Router();

router.post(
  "/create-student",
  validateRequest(createStudentValidationSchema),
  userControllers.createStudent
);
router.post(
  "/create-faculty",
  validateRequest(facultyValidationSchema),
  userControllers.createFaculty
);

export const userRoutes = router;
