"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentServices = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const student_model_1 = __importDefault(require("./student.model"));
const user_model_1 = __importDefault(require("../user/user.model"));
const getAllStudentsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield student_model_1.default.find({});
});
const getSingleStudentFromDB = (student_id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield student_model_1.default.find({ id: student_id }).populate("admissionSemester").populate({ path: 'academicDepartment', populate: { path: 'faculty' } });
});
const deleteStudentFromDB = (studentId) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        //transaction -1
        const userDelete = yield user_model_1.default.updateOne({ id: studentId }, { isDeleted: true }, { session, new: true });
        if (!userDelete.modifiedCount) {
            throw new Error("failed to delete user");
        }
        //transaction -2
        const studentDelete = yield student_model_1.default.updateOne({ id: studentId }, { isDeleted: true }, { session, new: true });
        if (!studentDelete.modifiedCount) {
            throw new Error("failed to delete student");
        }
        //success!
        yield session.commitTransaction();
        yield session.endSession();
        return studentDelete;
    }
    catch (err) {
        throw new Error(err.toString());
    }
});
const updateStudentIntoDB = (id, updatedData) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, guardian, localGuardian } = updatedData, primitiveFields = __rest(updatedData, ["name", "guardian", "localGuardian"]);
    const modifiedUpdatedData = Object.assign({}, primitiveFields);
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
    const result = yield student_model_1.default.findOneAndUpdate({ id }, modifiedUpdatedData, { new: true, runValidators: true });
    return result;
});
exports.studentServices = {
    getAllStudentsFromDB,
    getSingleStudentFromDB,
    deleteStudentFromDB,
    updateStudentIntoDB
};
