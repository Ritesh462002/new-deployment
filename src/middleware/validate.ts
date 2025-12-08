import { NextFunction, Request, Response } from "express";
import { ZodObject, ZodRawShape } from "zod";
export const validate =
  (schema: ZodObject<ZodRawShape>) =>
  (req: Request, _res: Response, next: NextFunction): void => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params
      });
      next();
    } catch (error) {
      next(error);
    }
  };