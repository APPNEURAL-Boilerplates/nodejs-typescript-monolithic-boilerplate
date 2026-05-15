import { Router } from "express";
import { methodNotAllowedMiddleware } from "../../middleware/error.middleware.js";
import { validate } from "../../middleware/validate.middleware.js";
import { asyncHandler } from "../../utils/async-handler.js";
import { createUser, getUser, listUsers } from "./user.controller.js";
import { createUserBodySchema, userIdParamsSchema } from "./user.schema.js";

export const userRouter = Router();

userRouter
  .route("/")
  .get(asyncHandler(listUsers))
  .post(validate({ body: createUserBodySchema }), asyncHandler(createUser))
  .all(methodNotAllowedMiddleware);

userRouter
  .route("/:id")
  .get(validate({ params: userIdParamsSchema }), asyncHandler(getUser))
  .all(methodNotAllowedMiddleware);
