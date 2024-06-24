import { NextFunction, Request, Response } from "express";

//global error handler
export const globalErrorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = 500;
  const message = "something went wrong";
  return res.status(statusCode).json({
    success: false,
    message,
    error: err,
  });
};
