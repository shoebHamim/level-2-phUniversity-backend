import { Request,Response,NextFunction } from "express";
import { AnyZodObject } from "zod";

export const validateRequest = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedBody = await schema.parseAsync(req.body);
      (req as any).validatedBody = validatedBody;
      next();
    } catch (err) {
      next(err);
    }
  };
};