import { FacultyModel } from "./faculty.Model";
import { TFaculty } from "./faculty.interface";


const createFacultyIntoDB=async(payload:TFaculty)=>{
  return await FacultyModel.create(payload)
}


export default  {
  createFacultyIntoDB
}