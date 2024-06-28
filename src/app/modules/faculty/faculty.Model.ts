import { Schema, model } from "mongoose";
import { TFaculty } from "./faculty.interface";


const facultySchema = new Schema<TFaculty>({
  id:{type:String,required:true,unique:true},
  userId: { type: Schema.Types.ObjectId, required: true,ref:'User' },
  name: { type: String, required: true },
  gender: { type: String, enum: ['male', 'female', 'other'], required: true },
  dateOfBirth: { type: String, required: true },
  email: { type: String, required: true,unique:true },
  contactNo: { type: String, required: true },
  emergencyContactNo: { type: String, required: true },
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  academicDepartment: { type: Schema.Types.ObjectId, required: true ,ref:"AcademicDepartment"},
  designation: { type: String, enum: ['contractual', 'full-time'], required: true },
  profileImg: { type: String, required: true },
  isDeleted: { type: Boolean, required: true }
}, {
  timestamps: true, 
});


export const FacultyModel=model<TFaculty>('Faculty',facultySchema)