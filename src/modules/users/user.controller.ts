import type { Request, Response } from "express";
import { successResponse } from "../../utils/http.js";
import { userService } from "./user.service.js";
import type { CreateUserInput, UserIdParams } from "./user.schema.js";

export async function listUsers(_req: Request, res: Response) {
  const users = await userService.listUsers();
  return successResponse(res, users, 200, { count: users.length });
}

export async function getUser(req: Request<UserIdParams>, res: Response) {
  const user = await userService.getUserById(req.params.id);
  return successResponse(res, user);
}

export async function createUser(req: Request<unknown, unknown, CreateUserInput>, res: Response) {
  const user = await userService.createUser(req.body);
  return successResponse(res, user, 201);
}
