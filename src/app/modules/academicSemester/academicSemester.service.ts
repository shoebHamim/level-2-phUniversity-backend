import { academicSemesterNameCodeMapper } from "./academicSemester.constant";
import { TAcademicSemester } from "./academicSemester.interface";
import AcademicSemesterModel from "./academicSemester.model";

const createAcademicSemesterIntoDB = async (payLoad: TAcademicSemester) => {
  if (academicSemesterNameCodeMapper[payLoad.name] !== payLoad.code) {
    throw new Error("Academic Semester and code does not match");
  }

  const result = await AcademicSemesterModel.create(payLoad);
  return result;
};

const findAllAcademicSemesterFromDB=async()=>{

  return await AcademicSemesterModel.find({})
}

const findSingleAcademicSemesterByIdFromDB=async(id:string)=>{
  return await AcademicSemesterModel.find({_id:id})
}

const updateAcademicSemester=async(id:string,updatedData:TAcademicSemester)=>{
  if (academicSemesterNameCodeMapper[updatedData.name] !== updatedData.code) {
    throw new Error("Academic Semester and code does not match");
  }
  return await AcademicSemesterModel.findByIdAndUpdate(id,updatedData);
}



export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
  findAllAcademicSemesterFromDB,
  findSingleAcademicSemesterByIdFromDB,
  updateAcademicSemester
};
