import { z } from 'zod';

const facultyValidationSchema = 
z.object({
  faculty:
  z.object({
    userId: z.string().optional(),
    name: z.string().min(1, { message: "Name is required" }),
    gender: z.enum(['male', 'female', 'other'], { message: "Gender must be 'male', 'female', or 'other'" }),
    dateOfBirth: z.string().min(1, { message: "Date of Birth is required" }),
    email: z.string().email({ message: "Invalid email format" }),
    contactNo: z.string().min(1, { message: "Contact Number is required" }),
    emergencyContactNo: z.string().min(1, { message: "Emergency Contact Number is required" }),
    presentAddress: z.string().min(1, { message: "Present Address is required" }),
    permanentAddress: z.string().min(1, { message: "Permanent Address is required" }),
    academicDepartment: z.string().min(1, { message: "Academic Department is required" }),
    designation: z.enum(['contractual', 'full-time'], { message: "Designation must be 'contractual' or 'full-time'" }),
    profileImg: z.string().min(1, { message: "Profile Image is required" }),
    isDeleted: z.boolean({ message: "Is Deleted must be a boolean" })
  })
})

export { facultyValidationSchema };