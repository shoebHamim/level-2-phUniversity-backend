import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

//regular middleware
export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const message = "API not found!";
  return res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message,

  });
};
