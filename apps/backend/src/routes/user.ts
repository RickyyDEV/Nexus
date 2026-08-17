import { Elysia } from "elysia";
import z from "zod";
import { macro } from "../macro";
import { fetchUserGuilds } from "../methods/guild";
import { prisma } from "../prisma/prisma";

export const UserRouter = new Elysia({ prefix: "/user" })
	.use(macro)
	.get(
		"/servers",
		async ({ user }) => {
			const server = await prisma.server.findMany({
				where: {
					ownerUserId: user.id,
				},
			});
			return server;
		},
		{
			auth: true,
		},
	)
	.get(
		"/guilds",
		async ({ user }) => {
			const account = await prisma.account.findFirst({
				where: {
					userId: user.id,
				},
			});
			if (!account?.accessToken) throw new Error("User not found.");
			const servers = await prisma.server.findMany({
				where: {
					ownerUserId: user.id,
				},
			});
			const guilds = await fetchUserGuilds(account.accessToken);
			const filteredGuilds = guilds.botServers.filter(
				(a) => !servers.some((b) => b.discordGuildId === a.id),
			);
			return { botServers: filteredGuilds, toInvite: guilds.toInvite };
		},
		{
			auth: true,
		},
	)
	.post(
		"/servers/add",
		async ({ user, body, status }) => {
			try {
				const account = await prisma.account.findFirst({
					where: {
						userId: user.id,
					},
				});
				if (!account?.accessToken) throw new Error("User not found.");
				if (
					(await prisma.server.findUnique({
						where: {
							discordGuildId: body.guildId,
						},
					})) != null
				)
					throw new Error("O usuário já possui esse servidor");
				const possibleGuilds = await fetchUserGuilds(account.accessToken);
				if (
					!possibleGuilds.botServers.some(
						(a) => a.id === body.guildId.toString(),
					)
				)
					throw new Error("Ocorreu um erro ao tentar selecionar servidor.");
				const guild = await prisma.server.create({
					data: {
						name: body.servername,
						discordGuildId: body.guildId,
						ownerUserId: user.id,
						iconHash: body.icon,
					},
				});
				return { ok: true, serverId: guild.id };
			} catch (err) {
				return status(401, err);
			}
		},
		{
			body: z.object({
				servername: z.string(
					"O nome do servidor deve existir e ser uma string.",
				),
				guildId: z.string("O id da guilda deve existir e ser uma string."),
				icon: z.string().nullable(),
			}),
			auth: true,
		},
	);
