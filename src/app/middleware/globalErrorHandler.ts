import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import config from "../config";
import { TErrorSources, TGenericErrorResponse } from "../interface/error";
import handleZodError from "../errors/handleZodError";
import { AppError } from "../errors/AppError";

//global error handler
export const globalErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next
) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "something went wrong";
  let errorSources: TErrorSources = [
    {
      path: [""],
      message,
    },
  ];
  // checking if zod error
  if (err instanceof ZodError) {
    const zodError = handleZodError(err);
    statusCode = zodError.statusCode;
    message = zodError.message;
    errorSources = zodError.errorSources;
  }else if(err?.name==='CastError'){
    // you can handle it separately
  }else if(err?.code==11000){
    // you can handle duplicate mongoDB error here
  }
  else if(err instanceof AppError){
    // console.log('iha ekti app error');
  }

  const finalError: TGenericErrorResponse = {
    success: false,
    message,
    errorSources,
    stack: config.environment === "development" ? err?.stack : null,
  };
  return res.status(statusCode).json(finalError);
};


