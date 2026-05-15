import { randomUUID } from "node:crypto";
import compression from "compression";
import cors from "cors";
import express, { type Request } from "express";
import helmet from "helmet";
import { pinoHttp } from "pino-http";
import { env } from "./config/env.js";
import { logger } from "./config/logger.js";
import { errorMiddleware, notFoundMiddleware } from "./middleware/error.middleware.js";
import { requestIdMiddleware } from "./middleware/request-id.middleware.js";
import { router } from "./routes/index.js";

function parseCorsOrigin() {
  if (env.CORS_ORIGIN === "*") {
    return true;
  }

  return env.CORS_ORIGIN.split(",").map((origin) => origin.trim());
}

export function createApp() {
  const app = express();

  app.disable("x-powered-by");

  app.use(requestIdMiddleware);
  app.use(
    pinoHttp({
      logger,
      genReqId: (req: Request) => (req as Request & { id?: string }).id ?? randomUUID()
    })
  );
  app.use(helmet());
  app.use(cors({ origin: parseCorsOrigin(), credentials: true }));
  app.use(compression());
  app.use(express.json({ limit: "1mb" }));

  app.use(router);

  app.use(notFoundMiddleware);
  app.use(errorMiddleware);

  return app;
}
