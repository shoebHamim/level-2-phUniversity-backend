"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const userValidationSchema = zod_1.z.object({
    password: zod_1.z.string().min(6, { message: "Password must be at least 6 characters long." }).optional(),
});
exports.default = userValidationSchema;
