import Elysia from "elysia";
import z from "zod";
import { macro } from "../macro";
import { prisma } from "../prisma/prisma";

export const ServerRoute = new Elysia({ prefix: "/servers" }).use(macro).get(
	"/:id",
	async ({ user, params: { id }, status }) => {
		const server = await prisma.server.findFirst({
			where: {
				id,
				OR: [
					{ ownerUserId: user.id },
					{
						members: {
							some: {
								id: user.id,
							},
						},
					},
				],
			},
		});
		if (!server)
			status(401, {
				error: "Servidor não encontrado.",
			});
		return server;
	},
	{
		auth: true,
		params: z.object({
			id: z.string("Você deve providenciar o id do servidor."),
		}),
	},
);
