import { randomUUID } from "node:crypto";
import type { CreateUserInput } from "./user.schema.js";

export type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

export interface UserRepository {
  findAll(): Promise<User[]>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(input: CreateUserInput): Promise<User>;
}

class InMemoryUserRepository implements UserRepository {
  private readonly users = new Map<string, User>();

  async findAll(): Promise<User[]> {
    return [...this.users.values()].sort((a, b) => a.createdAt.localeCompare(b.createdAt));
  }

  async findById(id: string): Promise<User | null> {
    return this.users.get(id) ?? null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const normalizedEmail = email.toLowerCase();
    return [...this.users.values()].find((user) => user.email === normalizedEmail) ?? null;
  }

  async create(input: CreateUserInput): Promise<User> {
    const now = new Date().toISOString();

    const user: User = {
      id: randomUUID(),
      name: input.name,
      email: input.email.toLowerCase(),
      createdAt: now,
      updatedAt: now
    };

    this.users.set(user.id, user);

    return user;
  }
}

export const userRepository = new InMemoryUserRepository();
