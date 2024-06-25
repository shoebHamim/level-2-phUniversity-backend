import { Router } from "express";
import { validateRequest } from "../../middleware/validateRequest";
import { academicSemesterSchemaValidation } from "./academicSemester.validation";
import { academicSemesterControllers } from "./academicSemester.controller";

const router = Router();

router.post(
  "/create-academic-semester",
  validateRequest(academicSemesterSchemaValidation),
  academicSemesterControllers.createAcademicSemester
);
router.get('/all-academic-semesters',academicSemesterControllers.findAllAcademicSemester)
router.get('/single-academic-semester/:id',academicSemesterControllers.findSingleAcademicSemester)
router.put('/update-academic-semester/:id',validateRequest(academicSemesterSchemaValidation),academicSemesterControllers.updateAcademicSemester)


export const academicSemesterRoutes = router;
