import pino from "pino";
import { env } from "./env.js";

export const logger = pino({
  level: env.LOG_LEVEL,
  base: {
    service: "nodejs-typescript-monolithic-boilerplate",
    env: env.NODE_ENV
  },
  redact: {
    paths: ["req.headers.authorization", "req.headers.cookie"],
    remove: true
  }
});
