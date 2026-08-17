import { BunEnv } from "@nexus/env";

export async function fetchUserGuilds(accessToken: string) {
	const [userServers, botServers] = await Promise.all([
		await fetch(`https://discord.com/api/v10/users/@me/guilds`, {
			headers: { Authorization: `Bearer ${accessToken}` },
		}),
		fetch(`https://discord.com/api/v10/users/@me/guilds`, {
			headers: { Authorization: `Bot ${BunEnv.BOT_TOKEN}` },
		}),
	]);
	if (!userServers.ok || !botServers.ok)
		throw new Error("Ocorreu um erro ao tentar carregar as guildas.");
	const [userServersJson, botServersJson]: [
		Array<{
			id: string;
			name: string;
			icon: string | null;
			owner: boolean;
			permissions: string;
			features: string[];
		}>,
		Array<{
			id: string;
			name: string;
			icon: string | null;
			owner: boolean;
			permissions: string;
			features: string[];
		}>,
	] = await Promise.all([userServers.json(), botServers.json()]);
	const MANAGE_GUILD = BigInt(0x20); // 0x20
	const filtered = userServersJson.filter(
		(g) => g.owner || (BigInt(g.permissions) & MANAGE_GUILD) === MANAGE_GUILD,
	);
	return {
		botServers: botServersJson.filter((a) =>
			filtered.some((b) => b.id === a.id),
		),

		toInvite: filtered.filter(
			(a) => !botServersJson.some((b) => b.id === a.id),
		),
	};
}
