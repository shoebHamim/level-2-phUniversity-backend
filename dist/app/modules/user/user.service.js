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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userServices = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const student_model_1 = __importDefault(require("../student/student.model"));
const user_model_1 = __importDefault(require("./user.model"));
const user_utils_1 = __importDefault(require("./user.utils"));
const AppError_1 = require("../../errors/AppError");
const faculty_Model_1 = require("../faculty/faculty.Model");
const createStudentIntoDB = (password, studentData) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const id = yield user_utils_1.default.createStudentId(studentData.admissionSemester);
        //transaction -1
        let newUser = {
            id: id.toString(), // using this for the time being
            password: password || "default pass", // for the time being
            role: "student",
            status: "in-progress",
        };
        const result = yield user_model_1.default.create([newUser], { session });
        if (!result.length) {
            throw new AppError_1.AppError(400, "failed to create user");
        }
        else {
            studentData.id = result[0].id; // embedded id
            studentData.user = result[0]._id; // reference id
        }
        //transaction-2
        const newStudent = yield student_model_1.default.create([studentData], { session });
        if (!newStudent) {
            throw new AppError_1.AppError(400, "failed to create student");
        }
        // success!
        yield session.commitTransaction();
        yield session.endSession();
        return newStudent;
    }
    catch (err) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new AppError_1.AppError(500, err);
    }
});
const createFacultyIntoDB = (password, facultyData) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const id = yield user_utils_1.default.createFacultyId();
        //transaction -1
        let newUser = {
            id: id.toString(),
            password: password || "default pass",
            role: "faculty",
            status: "in-progress",
        };
        const result = yield user_model_1.default.create([newUser], { session });
        if (!result.length) {
            throw new AppError_1.AppError(400, "failed to create user");
        }
        else {
            facultyData.id = result[0].id; // embedded id
            facultyData.userId = result[0]._id; // reference id
        }
        //transaction-2
        const newFaculty = yield faculty_Model_1.FacultyModel.create([facultyData], { session });
        if (!newFaculty) {
            throw new AppError_1.AppError(400, "failed to create faculty");
        }
        // success!
        yield session.commitTransaction();
        yield session.endSession();
        return newFaculty;
    }
    catch (err) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new AppError_1.AppError(500, err);
    }
});
exports.userServices = {
    createStudentIntoDB,
    createFacultyIntoDB,
};
