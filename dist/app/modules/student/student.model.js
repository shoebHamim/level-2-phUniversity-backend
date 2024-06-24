"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userNameSchema = new mongoose_1.Schema({
    firstName: { type: String, required: true },
    middleName: String,
    lastName: { type: String, required: true },
}, { _id: false });
const guardianSchema = new mongoose_1.Schema({
    fatherName: { type: String, required: true },
    fatherOccupation: { type: String, required: true },
    fatherContactNo: { type: String, required: true },
    motherName: { type: String, required: true },
    motherOccupation: { type: String, required: true },
    motherContactNo: { type: String, required: true },
}, { _id: false });
const localGuardianSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    occupation: { type: String, required: true },
    contactNo: { type: String, required: true },
    address: { type: String, required: true },
}, { _id: false });
const studentSchema = new mongoose_1.Schema({
    id: { type: String, required: true, unique: true },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        unique: true,
        ref: "User",
    },
    name: userNameSchema,
    gender: { type: String, enum: ["male", "female", "other"], required: true },
    dateOfBirth: String,
    email: { type: String, required: true, unique: true },
    contactNo: { type: String, required: true },
    emergencyContactNo: { type: String, required: true },
    bloodGroup: {
        type: String,
        enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    guardian: guardianSchema,
    localGuardian: localGuardianSchema,
    profileImg: String,
    isDeleted: { type: Boolean, required: true },
}, { timestamps: true });
const StudentModel = (0, mongoose_1.model)("Student", studentSchema);
exports.default = StudentModel;
