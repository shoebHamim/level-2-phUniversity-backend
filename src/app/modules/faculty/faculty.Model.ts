import { Schema, model } from "mongoose";
import { TFaculty } from "./faculty.interface";


const FacultySchema=new Schema<TFaculty>({
  name:{type:String,required:true}
})



export const FacultyModel=model<TFaculty>('Faculty',FacultySchema)