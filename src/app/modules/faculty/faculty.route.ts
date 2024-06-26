import { Router } from "express";
import facultyController from "./faculty.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { facultyValidation } from "./faculty.validation";


const router=Router()

router.post('/create-faculty',validateRequest(facultyValidation),facultyController.createFaculty)



export const facultyRoute=router;