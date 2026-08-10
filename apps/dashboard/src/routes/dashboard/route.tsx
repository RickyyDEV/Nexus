import { Helmet } from "react-helmet-async";
import { authClient } from "../../auth";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard")({
  beforeLoad: async ({}) => {
    let session = await authClient.getSession();
    if (!session.data) redirect({ href: "/auth/login", throw: true });
    return session;
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
  return (
    <>
      <Helmet>
        <title>Nexus - Dashboard</title>
      </Helmet>
      <Outlet />
    </>
  );
}
