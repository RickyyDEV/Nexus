import DashboardNavBar from "#components/own/dashboard/navbar";
import { createFileRoute, redirect } from "@tanstack/react-router";
import type { Server } from "@nexus/api/prisma/generated/prisma/client.ts";
export const Route = createFileRoute("/dashboard/")({
  loader: async () => {
    try {
      let res = await fetch(
        import.meta.env.VITE_BACKEND_URL + "/user/servers",
        {
          method: "GET",
          credentials: "include",
        },
      );
      if (!res.ok) throw new Error("Failed to fetch posts");
      return res.json();
    } catch (err) {
      console.log("Deu erro ai em");
    }
  },
  pendingComponent: () => (
    <>
      <p>CARREGANDO</p>
      <p>SDADSAD</p>
    </>
  ),
  component: RouteComponent,
});

function RouteComponent() {
  let { data } = Route.useRouteContext();
  let servers = Route.useLoaderData() as Server[];
  console.log(servers);
  if (!data) return redirect({ href: "/auth/login", throw: true });
  return (
    <>
      <DashboardNavBar user={data.user} />
      <div className="p-15 space-y-1">
        <h2 className="uppercase text-md text-primary font-bold">
          BEM VINDO DE VOLTA
        </h2>
        <h1 className="text-4xl font-bold">Bem-vindo, {data.user.name}!</h1>
        <p className="text-sm text-muted-foreground">
          Escolha um servidor para configurar o bot, ou adicione o Nexus a um
          novo servidor Discord.
        </p>
      </div>
    </>
  );
}
