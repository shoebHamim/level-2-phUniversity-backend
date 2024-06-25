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
const student_model_1 = __importDefault(require("../student/student.model"));
const user_model_1 = __importDefault(require("./user.model"));
const user_utils_1 = __importDefault(require("./user.utils"));
const createStudentIntoDB = (password, studentData) => __awaiter(void 0, void 0, void 0, function* () {
    const id = yield user_utils_1.default.createStudentId(studentData.admissionSemester);
    let newUser = {
        id: id.toString(), // using this for the time being
        password: password || "default pass", // for the time being
        role: "student",
        status: "in-progress",
    };
    const result = yield user_model_1.default.create(newUser);
    if (Object.keys(result).length) {
        studentData.id = result.id; // embedded id
        studentData.user = result._id; // reference id
    }
    const newStudent = yield student_model_1.default.create(studentData);
    return newStudent;
});
exports.userServices = {
    createStudentIntoDB,
};
