import { z } from 'zod';

const preRequisiteCoursesValidationSchema = z.object({
  course: z.string().min(1, { message: "Course ID is required" }).regex(/^[0-9a-fA-F]{24}$/, { message: "Invalid Course ID format" }),
  isDeleted: z.boolean().optional()
});

export const courseValidationSchema = z.object({
  title: z.string().trim().min(1, { message: "Title is required" }),
  prefix: z.string().trim().min(1, { message: "Prefix is required" }),
  code: z.number().int({ message: "Code must be an integer" }),
  credits: z.number().int({ message: "Credits must be an integer" }),
  preRequisiteCourses: z.array(preRequisiteCoursesValidationSchema).optional()
});