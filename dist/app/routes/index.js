"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_route_1 = require("../modules/user/user.route");
const student_route_1 = require("../modules/student/student.route");
const academicSemester_route_1 = require("../modules/academicSemester/academicSemester.route");
const faculty_route_1 = require("../modules/faculty/faculty.route");
const academicDepartment_route_1 = require("../modules/academicDepartment/academicDepartment.route");
const course_route_1 = require("../modules/course/course.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/users",
        route: user_route_1.userRoutes,
    },
    {
        path: "/students",
        route: student_route_1.studentRoutes,
    },
    {
        path: "/academic-semesters",
        route: academicSemester_route_1.academicSemesterRoutes,
    },
    {
        path: "/faculties",
        route: faculty_route_1.facultyRoute,
    },
    {
        path: "/department",
        route: academicDepartment_route_1.academicDepartmentRoutes,
    }, {
        path: "/course",
        route: course_route_1.courseRoute,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
router.use("/users", user_route_1.userRoutes);
exports.default = router;
