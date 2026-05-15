import { AppError } from "../../errors/app-error.js";
import type { CreateUserInput } from "./user.schema.js";
import { userRepository } from "./user.repository.js";

export const userService = {
  async listUsers() {
    return userRepository.findAll();
  },

  async getUserById(id: string) {
    const user = await userRepository.findById(id);

    if (!user) {
      throw new AppError(404, "NOT_FOUND", "User not found");
    }

    return user;
  },

  async createUser(input: CreateUserInput) {
    const existingUser = await userRepository.findByEmail(input.email);

    if (existingUser) {
      throw new AppError(409, "CONFLICT", "A user with this email already exists");
    }

    return userRepository.create(input);
  }
};
