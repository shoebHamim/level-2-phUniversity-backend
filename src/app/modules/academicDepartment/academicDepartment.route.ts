import { Router } from "express";
import { validateRequest } from "../../middleware/validateRequest";
import { academicDepartmentValidation } from "./academicDepartment.validation";
import academicDepartmentController from "./academicDepartment.controller";


const router=Router()
router.get('/all-departments',academicDepartmentController.findAllDepartments)
router.post('/create-department',validateRequest(academicDepartmentValidation),academicDepartmentController.createAcademicDepartment)



export const academicDepartmentRoutes=router