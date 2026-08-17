import { logger } from "@bogeychan/elysia-logger";
import { cors } from "@elysia/cors";
import { BunEnv } from "@nexus/env";
import { Elysia } from "elysia";
import { macro } from "./macro";
import { routes } from "./routes/routes";

const app = new Elysia()
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
	.use(
		cors({
			origin: [BunEnv.BACKEND_URL, BunEnv.DASHBOARD_URL],
			methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
			credentials: true,
			allowedHeaders: ["Content-Type", "Authorization"],
		}),
	)
	.use(macro)
	.use(routes)
	.listen(3001);

console.log(
	`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
