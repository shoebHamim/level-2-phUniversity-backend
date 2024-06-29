import { Router } from "express";
import courseController from "./course.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { courseValidationSchema } from "./course.validation";


const router=Router()


router.post('/create-course',validateRequest(courseValidationSchema),courseController.createCourse)
router.get('/',courseController.getAllCourse)
router.get('/:id',courseController.getSingleCourseById)
router.delete('/:id',courseController.deleteCourse)
router.patch('/:id',courseController.updateCourse)
router.put('/:courseId/assign-faculties',courseController.assignFacultiesWithCourse)
router.delete('/:courseId/remove-faculties',courseController.removeFaculties)

router.all('/',(req,res)=>{
  res.send('default path of course')
})


export const courseRoute=router;