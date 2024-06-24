import { z } from 'zod';
import { Types } from 'mongoose';

const TUserNameSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  middleName: z.string().optional(),
  lastName: z.string().min(1, { message: "Last name is required" }),
});

const TGuardianSchema = z.object({
  fatherName: z.string().min(1, { message: "Father's name is required" }),
  fatherOccupation: z.string().min(1, { message: "Father's occupation is required" }),
  fatherContactNo: z.string().min(1, { message: "Father's contact number is required" }),
  motherName: z.string().min(1, { message: "Mother's name is required" }),
  motherOccupation: z.string().min(1, { message: "Mother's occupation is required" }),
  motherContactNo: z.string().min(1, { message: "Mother's contact number is required" }),
});

const TLocalGuardianSchema = z.object({
  name: z.string().min(1, { message: "Local guardian's name is required" }),
  occupation: z.string().min(1, { message: "Local guardian's occupation is required" }),
  contactNo: z.string().min(1, { message: "Local guardian's contact number is required" }),
  address: z.string().min(1, { message: "Local guardian's address is required" }),
});

export const StudentValidationSchema = z.object({
  name: TUserNameSchema,
  gender: z.enum(['male', 'female', 'other'], { message: "Gender must be 'male', 'female', or 'other'" }),
  dateOfBirth: z.string().optional(),
  email: z.string().email({ message: "Invalid email format" }),
  contactNo: z.string().min(1, { message: "Contact number is required" }),
  emergencyContactNo: z.string().min(1, { message: "Emergency contact number is required" }),
  bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']).optional(),
  presentAddress: z.string().min(1, { message: "Present address is required" }),
  permanentAddress: z.string().min(1, { message: "Permanent address is required" }),
  guardian: TGuardianSchema,
  localGuardian: TLocalGuardianSchema,
  profileImg: z.string().optional(),
  isDeleted: z.boolean(),
});