import type { NextFunction, Request, Response } from "express";

type AsyncRouteHandler<P = unknown, ResBody = unknown, ReqBody = unknown> = (
  req: Request<P, ResBody, ReqBody>,
  res: Response,
  next: NextFunction
) => Promise<unknown>;

export function asyncHandler<P = unknown, ResBody = unknown, ReqBody = unknown>(
  handler: AsyncRouteHandler<P, ResBody, ReqBody>
) {
  return (req: Request<P, ResBody, ReqBody>, res: Response, next: NextFunction) => {
    Promise.resolve(handler(req, res, next)).catch(next);
  };
}
