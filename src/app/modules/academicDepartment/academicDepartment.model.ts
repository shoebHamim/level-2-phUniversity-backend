import { Schema, model } from "mongoose";
import { TAcademicDepartment } from "./academicDepartment.interface";
import { AppError } from "../../errors/AppError";

const AcademicDepartmentSchema = new Schema<TAcademicDepartment>(
  {
    name: { type: String, required: true },
    faculty: { type: Schema.Types.ObjectId, ref: "Faculty" },
  },
  { timestamps: true }
);
AcademicDepartmentSchema.pre('save',async function(next){
  const result=await AcademicDepartmentModel.find({name:this.name}).lean()
  if(result.length){
    throw new AppError(400,"Academic Department Already Created!")
  }
  next()

})



export const AcademicDepartmentModel = model<TAcademicDepartment>(
  "AcademicDepartment",
  AcademicDepartmentSchema
);
