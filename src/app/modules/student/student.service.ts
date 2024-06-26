import mongoose from "mongoose";
import StudentModel from "./student.model";
import UserModel from "../user/user.model";
import { TStudent } from "./student.interface";

const getAllStudentsFromDB = async () => {
  return await StudentModel.find({});
};
const getSingleStudentFromDB = async (student_id: string) => {
  return await StudentModel.find({ id: student_id }).populate(
    "admissionSemester").populate({path:'academicDepartment',populate:{path:'faculty'}});
};

const deleteStudentFromDB=async(studentId:string)=>{

  const session=await mongoose.startSession()
  try{
    session.startTransaction()
    //transaction -1
    const userDelete=await UserModel.updateOne({id:studentId},{isDeleted:true},{session,new:true})
    if(!userDelete.modifiedCount){
      throw new Error("failed to delete user")
    }
    //transaction -2
    const studentDelete=await StudentModel.updateOne({id:studentId},{isDeleted:true},{session,new:true})

    if(!studentDelete.modifiedCount){
      throw new Error("failed to delete student")
    }
    //success!
    await session.commitTransaction();
    await session.endSession()
    return studentDelete
  }catch(err:any){
    throw new Error(err.toString())
  }
}

const updateStudentIntoDB = async (id: string, updatedData: Partial<TStudent>) => {
  const { name, guardian, localGuardian, ...primitiveFields } = updatedData;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...primitiveFields
  };

  // Re-structured data to include variable names
  const nonPrimitiveData = [
    { name: 'name', value: name },
    { name: 'localGuardian', value: localGuardian },
    { name: 'guardian', value: guardian }
  ];

  nonPrimitiveData.forEach(({ name, value }) => {
    if (value && Object.keys(value).length) {
      for (const [key, val] of Object.entries(value)) {
        modifiedUpdatedData[`${name}.${key}`] = val;
      }
    }
  });
  console.log(modifiedUpdatedData);
  const result=await StudentModel.findOneAndUpdate({id},modifiedUpdatedData,{new:true,runValidators:true})
  return result
}


export const studentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
  updateStudentIntoDB
};
