import request from "supertest";
import { describe, expect, it } from "vitest";
import { createApp } from "../src/app.js";

const app = createApp();

describe("app", () => {
  it("GET / returns a welcome response", async () => {
    const response = await request(app).get("/");

    expect(response.status).toBe(200);
    expect(response.body.ok).toBe(true);
    expect(response.body.data.name).toBe("nodejs-monolithic-boilerplate");
  });

  it("GET /health returns healthy status", async () => {
    const response = await request(app).get("/health");

    expect(response.status).toBe(200);
    expect(response.body.ok).toBe(true);
    expect(response.body.data.status).toBe("healthy");
  });

  it("POST /api/v1/users creates a user", async () => {
    const response = await request(app)
      .post("/api/v1/users")
      .send({ name: "Ada Lovelace", email: "ada@example.com" });

    expect(response.status).toBe(201);
    expect(response.body.ok).toBe(true);
    expect(response.body.data.id).toEqual(expect.any(String));
    expect(response.body.data.email).toBe("ada@example.com");
  });

  it("POST /api/v1/users rejects invalid request body", async () => {
    const response = await request(app)
      .post("/api/v1/users")
      .send({ name: "A", email: "not-an-email" });

    expect(response.status).toBe(400);
    expect(response.body.ok).toBe(false);
    expect(response.body.error.code).toBe("BAD_REQUEST");
  });

  it("GET unknown route returns 404", async () => {
    const response = await request(app).get("/missing");

    expect(response.status).toBe(404);
    expect(response.body.ok).toBe(false);
    expect(response.body.error.code).toBe("NOT_FOUND");
  });

  it("unsupported method returns 405", async () => {
    const response = await request(app).put("/health");

    expect(response.status).toBe(405);
    expect(response.body.ok).toBe(false);
    expect(response.body.error.code).toBe("METHOD_NOT_ALLOWED");
  });
});
