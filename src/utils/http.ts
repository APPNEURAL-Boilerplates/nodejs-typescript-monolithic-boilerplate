import type { Response } from "express";

export type SuccessBody<T> = {
  ok: true;
  data: T;
  meta?: Record<string, unknown>;
};

export type ErrorBody = {
  ok: false;
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
};

export function jsonResponse<T>(
  res: Response,
  statusCode: number,
  body: T
): Response<T> {
  return res.status(statusCode).json(body);
}

export function successResponse<T>(
  res: Response,
  data: T,
  statusCode = 200,
  meta?: Record<string, unknown>
): Response<SuccessBody<T>> {
  return jsonResponse(res, statusCode, {
    ok: true,
    data,
    ...(meta ? { meta } : {})
  });
}
