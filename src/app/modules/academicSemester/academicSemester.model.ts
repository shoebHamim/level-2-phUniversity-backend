import { Schema, model } from 'mongoose';
import { TAcademicSemester } from './academicSemester.interface';
const months= ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

const academicSemesterSchema = new Schema<TAcademicSemester>({
  name: {
    type: String,
    enum: ["Spring", "Summer", "Fall"],
    required: true,
  },
  code: {
    type: String,
    enum: ["01", "02", "03"],
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  startMonth: {type:"String",enum:months,required:true},
  endMonth:{type:"String",enum:months,required:true}
},{timestamps:true});


academicSemesterSchema.pre('save',async function (next) {
  const  isSemesterExists=await AcademicSemesterModel.findOne({
    name:this.name,
    year:this.year
  })
  if(isSemesterExists){
    throw new Error("Semester is already created!")
  }
  next()
})

const AcademicSemesterModel = model<TAcademicSemester>('AcademicSemester', academicSemesterSchema);

export default AcademicSemesterModel;