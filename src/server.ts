import { createServer } from "node:http";
import { env } from "./config/env.js";
import { logger } from "./config/logger.js";
import { createApp } from "./app.js";

const app = createApp();
const server = createServer(app);

server.listen(env.PORT, () => {
  logger.info({ port: env.PORT }, `API server listening on port ${env.PORT}`);
});

function shutdown(signal: NodeJS.Signals) {
  logger.info({ signal }, "Shutdown signal received");

  server.close((error) => {
    if (error) {
      logger.error({ err: error }, "Error while closing HTTP server");
      process.exit(1);
    }

    logger.info("HTTP server closed");
    process.exit(0);
  });
}

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
