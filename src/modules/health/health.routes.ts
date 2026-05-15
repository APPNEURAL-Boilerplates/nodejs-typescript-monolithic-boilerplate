import { Router } from "express";
import { methodNotAllowedMiddleware } from "../../middleware/error.middleware.js";
import { successResponse } from "../../utils/http.js";

export const healthRouter = Router();

healthRouter
  .route("/health")
  .get((_req, res) => {
    return successResponse(res, {
      status: "healthy",
      uptime: process.uptime(),
      timestamp: new Date().toISOString()
    });
  })
  .all(methodNotAllowedMiddleware);
