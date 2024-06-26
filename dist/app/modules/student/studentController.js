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
exports.StudentController = void 0;
const student_service_1 = require("./student.service");
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const getAllStudent = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allStudents = yield student_service_1.studentServices.getAllStudentsFromDB();
    (0, sendResponse_1.default)(res, {
        data: allStudents,
        success: true,
        message: `all students[${allStudents.length}] fetched`,
        statusCode: http_status_1.default.OK,
    });
}));
const getSingleStudent = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const singleStudent = yield student_service_1.studentServices.getSingleStudentFromDB(req.params.id);
    (0, sendResponse_1.default)(res, {
        data: singleStudent,
        success: true,
        message: "single student fetched",
        statusCode: http_status_1.default.OK,
    });
}));
const deleteSingleStudent = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield student_service_1.studentServices.deleteStudentFromDB(req.params.id);
    (0, sendResponse_1.default)(res, {
        data: result,
        success: true,
        message: "single student deleted",
        statusCode: http_status_1.default.OK,
    });
}));
const updateStudent = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield student_service_1.studentServices.updateStudentIntoDB(req.params.id, req.body.student);
    (0, sendResponse_1.default)(res, {
        data: result,
        success: true,
        message: "Student update successfully",
        statusCode: http_status_1.default.OK,
    });
}));
exports.StudentController = {
    getAllStudent,
    getSingleStudent,
    deleteSingleStudent,
    updateStudent
};
