"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_route_1 = require("../modules/user/user.route");
const student_route_1 = require("../modules/student/student.route");
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
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
router.use("/users", user_route_1.userRoutes);
exports.default = router;
