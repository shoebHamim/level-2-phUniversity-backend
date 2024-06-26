import { z } from "zod";

export const facultyValidation=z.object({
  name:z.string({required_error:"nam chara faculty hoy you stupid?"})
})