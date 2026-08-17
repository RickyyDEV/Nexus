import z from "zod";

let envSchema = z.object({
	BETTER_AUTH_SECRET: z.string(),
	BETTER_AUTH_URL: z.string(),
	DISCORD_CLIENT_ID: z.string(),
	DISCORD_CLIENT_SECRET: z.string(),
	DASHBOARD_URL: z.string(),
	BACKEND_URL: z.string(),
	DATABASE_URL: z.string(),
	VITE_APP_URL: z.string(),
	VITE_BACKEND_URL: z.string(),
	PROD_URL: z.string(),
	BOT_TOKEN: z.string(),
});

export const BunEnv = envSchema.parse(Bun.env);
export const ProcessEnv = envSchema.parse(process.env);
