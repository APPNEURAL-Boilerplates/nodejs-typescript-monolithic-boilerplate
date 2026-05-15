import type { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { env } from "../config/env.js";
import { logger } from "../config/logger.js";
import { AppError } from "../errors/app-error.js";
import { jsonResponse } from "../utils/http.js";

export function notFoundMiddleware(req: Request, _res: Response, next: NextFunction) {
  next(new AppError(404, "NOT_FOUND", `Route ${req.method} ${req.originalUrl} not found`));
}

export function methodNotAllowedMiddleware(req: Request, _res: Response, next: NextFunction) {
  next(new AppError(405, "METHOD_NOT_ALLOWED", `Method ${req.method} is not allowed for this route`));
}

export function errorMiddleware(
  error: unknown,
  req: Request,
  res: Response,
  _next: NextFunction
) {
  if (res.headersSent) {
    return;
  }

  if (error instanceof AppError) {
    return jsonResponse(res, error.statusCode, {
      ok: false,
      error: {
        code: error.code,
        message: error.message,
        ...(error.details ? { details: error.details } : {})
      }
    });
  }

  if (error instanceof z.ZodError) {
    return jsonResponse(res, 400, {
      ok: false,
      error: {
        code: "BAD_REQUEST",
        message: "Validation failed",
        details: error.issues
      }
    });
  }

  logger.error({ err: error, requestId: req.id }, "Unhandled application error");

  return jsonResponse(res, 500, {
    ok: false,
    error: {
      code: "INTERNAL_ERROR",
      message: "Internal server error",
      ...(env.NODE_ENV !== "production" && error instanceof Error
        ? { details: { message: error.message, stack: error.stack } }
        : {})
    }
  });
}
