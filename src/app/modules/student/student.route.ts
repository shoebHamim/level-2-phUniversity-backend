import { Router } from "express";
import { StudentController } from "./studentController";


const router=Router()


router.get('/all-student',StudentController.getAllStudent)
router.get('/:id',StudentController.getSingleStudent)


export const studentRoutes=router;