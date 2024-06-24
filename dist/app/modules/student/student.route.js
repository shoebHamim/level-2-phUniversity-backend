"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentRoutes = void 0;
const express_1 = require("express");
const studentController_1 = require("./studentController");
const router = (0, express_1.Router)();
router.get('/all-student', studentController_1.StudentController.getAllStudent);
router.get('/:id', studentController_1.StudentController.getSingleStudent);
exports.studentRoutes = router;
