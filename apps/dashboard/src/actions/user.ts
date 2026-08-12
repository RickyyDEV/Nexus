import type { Server } from "@nexus/backend/prisma/generated/prisma/client.js";
import { authClient } from "../auth";

export async function FetchServersFromUser(): Promise<Server[]> {
  let res = await fetch(import.meta.env.VITE_BACKEND_URL + "/user/servers", {
    method: "GET",
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to fetch posts");
  return (await res.json()) as Server[];
}

export async function FetchUser() {
  let session = await authClient.getSession();
  return session;
}
