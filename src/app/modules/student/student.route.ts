import { updateStudentValidationSchema } from './student.validation';
import { validateRequest } from './../../middleware/validateRequest';
import { Router } from "express";
import { StudentController } from "./studentController";


const router=Router()


router.get('/all-student',StudentController.getAllStudent)
router.get('/:id',StudentController.getSingleStudent)
router.delete('/:id',StudentController.deleteSingleStudent)
router.put('/:id',validateRequest(updateStudentValidationSchema),StudentController.updateStudent)

export const studentRoutes=router;