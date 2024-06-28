import mongoose from "mongoose";
import StudentModel from "./student.model";
import UserModel from "../user/user.model";
import { TStudent } from "./student.interface";
import QueryBuilder from "../../builder/QueryBuilder";

const getAllStudentsFromDB = async (query: Record<string, string>) => {
  /*
   //!1. Search Query
  const searchTerm = query?.searchTerm || "";
  const searchFields = ["email", "name.firstName"];
  const searchQuery = StudentModel.find({
    $or: searchFields.map(
      (
        field // searching
      ) => ({ [field]: { $regex: searchTerm, $options: "i" } })
    ),
  });
  //!2.filter Query
  const queryObjCopy = { ...query };
  const excludeFields = ["searchTerm", "sort", "limit", "page", "field"];
  excludeFields.forEach((el) => delete queryObjCopy[el]);
  const filterQuery = searchQuery.find(queryObjCopy);

  //!3.Sort Query
  let sortTerm = {};
  if (query?.sort) {
    sortTerm = query.sort as string;
  }
  const sortQuery = filterQuery.sort(sortTerm);

  // !4. PaginateQuery
  let page = 1;
  let skip = 0;
  skip = (Number(query.page || page) - 1) * Number(query.limit || 0);
  const paginateQuery = sortQuery.skip(skip);

  // !5.Limit Query
  let limitValue = 9007199254740991;
  if (query?.limit) {
    limitValue = parseInt(query.limit as string);
  }
  const limitQuery = paginateQuery.limit(limitValue);

  // !6. Field Limiting
  let fieldsToShow = query.field as string;
  if (fieldsToShow) {
    fieldsToShow = fieldsToShow.split(",").join(" ");
  }
  const fieldSelectQuery = await limitQuery.select(fieldsToShow);
  
  */
  // making an object with find query model and the given query
  const studentQuery = new QueryBuilder(StudentModel.find(), query);
  // calling all the methods
  studentQuery
    .search(["name.firstName", "email"])
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await studentQuery.queryModel.populate("admissionSemester");
  return result;
};

const getSingleStudentFromDB = async (student_id: string) => {
  return await StudentModel.find({ id: student_id })
    .populate("admissionSemester")
    .populate({ path: "academicDepartment", populate: { path: "faculty" } });
};

const deleteStudentFromDB = async (studentId: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    //transaction -1
    const userDelete = await UserModel.updateOne(
      { id: studentId },
      { isDeleted: true },
      { session, new: true }
    );
    if (!userDelete.modifiedCount) {
      throw new Error("failed to delete user");
    }
    //transaction -2
    const studentDelete = await StudentModel.updateOne(
      { id: studentId },
      { isDeleted: true },
      { session, new: true }
    );

    if (!studentDelete.modifiedCount) {
      throw new Error("failed to delete student");
    }
    //success!
    await session.commitTransaction();
    await session.endSession();
    return studentDelete;
  } catch (err: any) {
    throw new Error(err.toString());
  }
};

const updateStudentIntoDB = async (
  id: string,
  updatedData: Partial<TStudent>
) => {
  const { name, guardian, localGuardian, ...primitiveFields } = updatedData;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...primitiveFields,
  };

  // Re-structured data to include variable names
  const nonPrimitiveData = [
    { name: "name", value: name },
    { name: "localGuardian", value: localGuardian },
    { name: "guardian", value: guardian },
  ];

  nonPrimitiveData.forEach(({ name, value }) => {
    if (value && Object.keys(value).length) {
      for (const [key, val] of Object.entries(value)) {
        modifiedUpdatedData[`${name}.${key}`] = val;
      }
    }
  });
  console.log(modifiedUpdatedData);
  const result = await StudentModel.findOneAndUpdate(
    { id },
    modifiedUpdatedData,
    { new: true, runValidators: true }
  );
  return result;
};

export const studentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
  updateStudentIntoDB,
};
