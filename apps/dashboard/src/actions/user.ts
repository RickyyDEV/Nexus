import type { Server } from "@nexus/backend/prisma/generated/prisma/client.js";
import { authClient } from "../auth";

export async function FetchServersFromUser(): Promise<Server[]> {
	const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/servers`, {
		method: "GET",
		credentials: "include",
	});
	if (!res.ok) throw new Error("Erro ao busca servidores.");
	return (await res.json()) as Server[];
}

export async function FetchUser() {
	const session = await authClient.getSession();
	return session;
}

export async function FetchUserServer(id: string) {
	const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/servers/${id}`, {
		method: "GET",
		credentials: "include",
	});
	if (!res.ok) throw new Error("Erro ao tentar buscar servidor.");
	return (await res.json()) as Server;
}

export async function FetchUserServersToAdd(): Promise<{
	botServers: Array<{
		id: string;
		name: string;
		icon: string | null;
		owner: boolean;
		permissions: string;
		features: string[];
	}>;
	toInvite: Array<{
		id: string;
		name: string;
		icon: string | null;
		owner: boolean;
		permissions: string;
		features: string[];
	}>;
}> {
	const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/guilds`, {
		credentials: "include",
	});
	if (!res.ok) throw new Error("Não foi possivel carregar seus servidores");
	return await res.json();
}
