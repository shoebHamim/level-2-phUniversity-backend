"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const student_validation_1 = require("../student/student.validation");
const validateRequest_1 = require("../../middleware/validateRequest");
const faculty_validation_1 = require("../faculty/faculty.validation");
const router = express_1.default.Router();
router.post("/create-student", (0, validateRequest_1.validateRequest)(student_validation_1.createStudentValidationSchema), user_controller_1.userControllers.createStudent);
router.post("/create-faculty", (0, validateRequest_1.validateRequest)(faculty_validation_1.facultyValidationSchema), user_controller_1.userControllers.createFaculty);
exports.userRoutes = router;
