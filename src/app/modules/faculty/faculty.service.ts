import { FacultyModel } from "./faculty.Model";
import { TFaculty } from "./faculty.interface";



const getAllFacultyFromDB=async()=>{
  return await FacultyModel.find()
}

const getSingleFacultyByIdFromDB=async(id:string)=>{
  return await FacultyModel.find({id})
}





export default  {
  getAllFacultyFromDB,
  getSingleFacultyByIdFromDB

  
}