import { Helmet } from "react-helmet-async";
import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import Loading from "#components/own/loading";
import { FetchUser } from "../../actions/user";
import { queryClient } from "../../main";
import { useQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/dashboard")({
  beforeLoad: async ({}) => {
    void queryClient.prefetchQuery({
      queryKey: ["user"],
      queryFn: FetchUser,
      staleTime: 1000 * 60 * 5, //
    });
  },
  pendingComponent: () => <Loading />,
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const { data, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: FetchUser,
    staleTime: 1000 * 60 * 5,
  });
  if (!data?.data && !isLoading) navigate({ href: "/auth/login" });
  else
    return (
      <>
        <Helmet>
          <title>Nexus - Dashboard</title>
        </Helmet>
        <Outlet />
      </>
    );
}
