import {
  TCourse,
  TCourseFaculty,
  TPreRequisiteCourses,
} from "./course.interface";
import { CourseFacultyModel, CourseModel } from "./course.model";

const createCourseIntoDB = async (courseData: TCourse) => {
  const result = await CourseModel.create(courseData);
  return result;
};
const getAllCoursesFromDB = async (req: Record<string, unknown>) => {
  return await CourseModel.find().populate({
    path: "preRequisiteCourses.course",
    select: "title code -_id",
  });
};

const getSingleCourseFromDB = async (id: string) => {
  return await CourseModel.findById(id).populate({
    path: "preRequisiteCourses.course",
    select: "title code ",
  });
};
const deleteCourseFromDB = async (id: string) => {
  return await CourseModel.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );
};
const updateCourseIntoDB = async (id: string, data: Partial<TCourse>) => {
  // non primitive update and find the current Prerequisite field
  const nonPrimitiveFields = { ...data };
  delete nonPrimitiveFields.preRequisiteCourses;
  const nonPrimitiveUpdated = await CourseModel.findByIdAndUpdate(
    id,
    nonPrimitiveFields,
    { new: true }
  );

  // let currentPreRequisiteField = nonPrimitiveUpdated?.preRequisiteCourses || [];
  const preRequisiteUpdateInitial = data.preRequisiteCourses || [];
  let newPrerequisites: TPreRequisiteCourses[] = [];
  const deletingPrerequisites = preRequisiteUpdateInitial.filter(
    (course: TPreRequisiteCourses) => {
      if (course?.isDeleted == true) {
        return course;
      }
      newPrerequisites.push(course);
    }
  );
  // ! method-1:soft delete
  // update the currentPrerequisiteFields delete
  // for (let preReq of currentPreRequisiteField) {
  //   const id = preReq?.course.toString();
  //   for (let deletePreReq of deletingPrerequisites) {
  //     if (deletePreReq?.course.toString() == id) {
  //       preReq.isDeleted = true;
  //     }
  //   }
  // }
  // !method -2 :pulling / actually deleteing
  // find the id's of prereq that you want to delete
  const deletingPrereqIds = deletingPrerequisites.map(
    (preReq) => preReq.course
  );
  const deletedPreReq = await CourseModel.findByIdAndUpdate(id, {
    $pull: { preRequisiteCourses: { course: { $in: deletingPrereqIds } } },
  });

  //! method:1 soft delete update
  // checking if newPrerequisites are already in the field
  // const freshNewPreRequisites = [];

  // for (let i = 0; i < newPrerequisites.length; i++) {
  //   let fresh = true;
  //   for (let preReq of currentPreRequisiteField) {
  //     const id = preReq?.course.toString();
  //     if (newPrerequisites[i].course.toString() === id) {
  //       preReq.isDeleted = false;
  //       fresh = false;
  //     }
  //   }
  //   if (fresh) {
  //     freshNewPreRequisites.push(newPrerequisites[i]);
  //   }
  // }
  // const updatedPreRequisiteField = [
  //   ...currentPreRequisiteField,
  //   ...freshNewPreRequisites,
  // ];
  // const result = await CourseModel.findByIdAndUpdate(
  //   id,
  //   { preRequisiteCourses: updatedPreRequisiteField },
  //   { new: true }
  // );
  //! method-2: update
  const result = await CourseModel.findByIdAndUpdate(
    id,
    {
      $addToSet: { preRequisiteCourses: newPrerequisites },
    },
    { new: true }
  ).populate("preRequisiteCourses.course");

  return result;
};

const assignFacultiesWithCourseIntoDB = async (
  id: string,
  payload: TCourseFaculty
) => {
  const result = await CourseFacultyModel.findByIdAndUpdate(id, {
    $set:{course:id},
    $addToSet: { 
      faculties: { $each: payload } },
  },{upsert:true,new:true,runValidators:true});

  return result;
};
const removeFacultiesFromCourseFromDB = async (
  id: string,
  payload: TCourseFaculty
) => {
  const result = await CourseFacultyModel.findByIdAndUpdate(id, {
    $pull: {faculties: { $in: payload } },
  },{new:true});

  return result;
};

export const courseServices = {
  createCourseIntoDB,
  getAllCoursesFromDB,
  getSingleCourseFromDB,
  deleteCourseFromDB,
  updateCourseIntoDB,
  assignFacultiesWithCourseIntoDB,
  removeFacultiesFromCourseFromDB
};
