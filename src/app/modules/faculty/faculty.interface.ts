import { Types } from "mongoose";

export type TFaculty={
  id:string;
  userId:Types.ObjectId;
  name:string;
  gender:"male"|"female"|"other";
  dateOfBirth:string;
  email:string;
  contactNo:string;
  emergencyContactNo:string;
  presentAddress:string;
  permanentAddress:string;
  academicDepartment:Types.ObjectId;
  designation:"contractual"|"full-time";
  profileImg:string;
  isDeleted:boolean;


}