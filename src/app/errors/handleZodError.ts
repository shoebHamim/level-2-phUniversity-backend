import { ZodError } from "zod";
import { TErrorSources } from "../interface/error";

const handleZodError = (err: ZodError) => {
  const statusCode = 400;
  const errorSources:TErrorSources = err.issues.map(singleIssue => {
    return{
      path: singleIssue.path,
      message: singleIssue.message,
    } 
  });
  return {
    statusCode,
    message: "Validation Error",
    errorSources,
  };
};

export default handleZodError;