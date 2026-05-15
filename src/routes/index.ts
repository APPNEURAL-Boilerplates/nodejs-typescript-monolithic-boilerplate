import { Router } from "express";
import { healthRouter } from "../modules/health/health.routes.js";
import { userRouter } from "../modules/users/user.routes.js";
import { methodNotAllowedMiddleware } from "../middleware/error.middleware.js";
import { successResponse } from "../utils/http.js";

export const router = Router();

router
  .route("/")
  .get((_req, res) => {
    return successResponse(res, {
      name: "nodejs-monolithic-boilerplate",
      message: "Node.js modular monolith API is running",
      docs: {
        health: "/health",
        users: "/api/v1/users"
      }
    });
  })
  .all(methodNotAllowedMiddleware);

router.use(healthRouter);
router.use("/api/v1/users", userRouter);
