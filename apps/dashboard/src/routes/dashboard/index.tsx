import DashboardNavBar from "#components/own/dashboard/navbar";
import { createFileRoute, notFound } from "@tanstack/react-router";
import Loading from "#components/own/loading";
import { FetchServersFromUser, FetchUser } from "../../actions/user";
import { queryClient } from "../../main";
import { useQuery } from "@tanstack/react-query";
export const Route = createFileRoute("/dashboard/")({
  loader: async () => {
    void queryClient.prefetchQuery({
      queryKey: ["user-servers"],
      queryFn: FetchServersFromUser,
    });
  },
  pendingComponent: () => <Loading />,
  component: RouteComponent,
});

function RouteComponent() {
  const { data: servers, isLoading: isLoadingServer } = useQuery({
    queryKey: ["user-servers"],
    queryFn: FetchServersFromUser,
  });
  const { data: user, isLoading: isLoadingUser } = useQuery({
    queryKey: ["user"],
    queryFn: FetchUser,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });
  if (isLoadingUser || isLoadingServer) return <Loading />;
  if ((!isLoadingUser && !isLoadingServer && !user) || !servers)
    return notFound();
  else
    return (
      <>
        <DashboardNavBar user={user?.data?.user!} />
        <div className="p-15 space-y-2">
          <div className="flex justify-between">
            <div>
              <h2 className="uppercase text-md text-primary font-bold">
                BEM VINDO DE VOLTA
              </h2>
              <h1 className="text-4xl font-bold">
                Bem-vindo, {user?.data?.user.name}!
              </h1>
              <p className="text-sm text-muted-foreground">
                Escolha um servidor para configurar o bot, ou adicione o Nexus a
                um novo servidor Discord.
              </p>
            </div>
            <div className="bg-white flex rounded-lg items-center  space-x-2 border-2">
              <div className="p-4">
                <h1 className="text-2xl font-bold">{servers.length}</h1>
                <p className="text-sm2 text-muted-foreground">
                  Servidores conectados
                </p>
              </div>
              <div className="h-full border-r-2"></div>
              <div className="p-4">
                <h1 className="text-2xl font-bold">
                  {servers.reduce(
                    (total, server) => total + server.memberCount,
                    0,
                  )}
                </h1>
                <p className="text-sm2 text-muted-foreground">Membros totais</p>
              </div>
            </div>
          </div>
          <h1 className="font-bold text-2xl">Seus servidores</h1>
        </div>
      </>
    );
}
