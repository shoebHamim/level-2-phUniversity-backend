import { FacultyModel } from "./faculty.Model";
import QueryBuilder from "../../builder/QueryBuilder";



const getAllFacultyFromDB=async(query:Record<string,unknown>)=>{
  const facultyQueryObj=new QueryBuilder(FacultyModel.find(),query);
  facultyQueryObj.search(['name','email']).filter().sort().paginate().fields()

  return await facultyQueryObj.queryModel
}

const getSingleFacultyByIdFromDB=async(id:string)=>{
  return await FacultyModel.find({id})
}





export default  {
  getAllFacultyFromDB,
  getSingleFacultyByIdFromDB

  
}