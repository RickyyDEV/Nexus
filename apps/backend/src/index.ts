import { Elysia } from "elysia";
import auth from "./auth/auth";
import { cors } from "@elysia/cors";
import { BunEnv } from "@nexus/env";
import { routes } from "./routes/routes";
import { macro } from "./macro";
import { logger } from "@bogeychan/elysia-logger";
const app = new Elysia()
  .use(macro)
  .use(
    cors({
      origin: [BunEnv.BACKEND_URL, BunEnv.DASHBOARD_URL],
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      credentials: true,
      allowedHeaders: ["Content-Type", "Authorization"],
    }),
  )
  .use(routes)
  .use(
    logger({
      transport: {
        target: "pino-pretty",
        options: {
          colorize: true,
        },
        level: "debug",
      },
    }),
  )

  .listen(3001);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
