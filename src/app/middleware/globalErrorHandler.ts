import { NextFunction, Request, Response } from "express";

//global error handler
export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = 500;

  return res.status(statusCode).json({
    success: false,
    message:err.message||'something went wrong',
    error: err,
  });
};
