import type { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { AppError } from "../errors/app-error.js";

type ValidationSchemas = {
  body?: z.ZodType;
  params?: z.ZodType;
  query?: z.ZodType;
};

function formatZodError(error: z.ZodError) {
  return error.issues.map((issue) => ({
    path: issue.path.join("."),
    message: issue.message
  }));
}

export function validate(schemas: ValidationSchemas) {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      if (schemas.body) {
        req.body = schemas.body.parse(req.body);
      }

      if (schemas.params) {
        req.params = schemas.params.parse(req.params) as typeof req.params;
      }

      if (schemas.query) {
        req.query = schemas.query.parse(req.query) as typeof req.query;
      }

      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        next(new AppError(400, "BAD_REQUEST", "Validation failed", formatZodError(error)));
        return;
      }

      next(error);
    }
  };
}
