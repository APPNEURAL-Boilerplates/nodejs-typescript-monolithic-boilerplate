import { z } from "zod";

export const userIdParamsSchema = z.object({
  id: z.uuid()
});

export const createUserBodySchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.email().toLowerCase()
});

export type CreateUserInput = z.infer<typeof createUserBodySchema>;
export type UserIdParams = z.infer<typeof userIdParamsSchema>;
