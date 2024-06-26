import { z } from "zod";

export const academicDepartmentValidation = z.object({
  name: z.string({ required_error: "nam chara faculty hoy you stupid?" }),
  faculty: z.string({ required_error: "faculty is required" }),
});
