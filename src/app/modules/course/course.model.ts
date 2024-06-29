import { Schema, model } from "mongoose";
import {
  TCourse,
  TCourseFaculty,
  TPreRequisiteCourses,
} from "./course.interface";

const preRequisiteCoursesSchema = new Schema<TPreRequisiteCourses>(
  {
    course: { type: Schema.Types.ObjectId, required: true, ref: "Course" },
    isDeleted: { type: Boolean, default: false },
  },
  { _id: false }
);

const courseSchema = new Schema<TCourse>({
  title: { type: String, required: true, unique: true, trim: true },
  prefix: { type: String, required: true, trim: true },
  code: { type: Number, trim: true, required: true },
  credits: { type: Number, trim: true, required: true },
  preRequisiteCourses: { type: [preRequisiteCoursesSchema], default: [] },
  isDeleted: { type: Boolean, default: false },
});

const courseFacultySchema = new Schema<TCourseFaculty>({
  course: { type: Schema.Types.ObjectId, ref: "Course", unique: true,required:true },
  faculties: [{ type: Schema.Types.ObjectId ,ref:"Faculty",required:true}],
});

export const CourseModel = model<TCourse>("Course", courseSchema);
export const CourseFacultyModel = model<TCourseFaculty>("CourseFaculty", courseFacultySchema);
