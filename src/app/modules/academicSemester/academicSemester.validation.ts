import { z } from "zod";

const monthSchema = z
  .enum([
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ])
  .describe("Invalid month. Please select a valid month.");

export const academicSemesterSchemaValidation = z.object({
  name: z
    .enum(["Spring", "Summer", "Fall"])
    .describe("Semester name must be either Spring, Summer, or Fall."),
  code: z
    .enum(["01", "02", "03"])
    .describe(
      "Semester code must be '01' for Spring, '02' for Summer, or '03' for Fall."
    ),
  year: z.string().describe("Year must be between 2000 and the current year."),

  startMonth: monthSchema,
  endMonth: monthSchema,
});
