import { useQuery } from "@tanstack/react-query";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { AutoSkeleton } from "auto-skeleton-react";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { UsersIcon } from "lucide-react";
import DashboardNavBar from "#components/own/dashboard/navbar";
import ServersDialog from "#components/own/dashboard/servers-dialog";
import Loading from "#components/own/loading";
import { Badge } from "#components/ui/badge";
import { buttonVariants } from "#components/ui/button";
import { FetchServersFromUser, FetchUser } from "../../actions/user";

export const Route = createFileRoute("/dashboard/")({
	pendingComponent: () => <Loading />,
	component: RouteComponent,
});

function RouteComponent() {
	const { data: user, isLoading: isLoadingUser } = useQuery({
		queryKey: ["user"],
		queryFn: FetchUser,
		refetchOnWindowFocus: false,
		staleTime: 1000 * 60 * 5,
	});
	const { data: servers, isLoading: isLoadingServer } = useQuery({
		queryKey: ["user-servers"],
		queryFn: FetchServersFromUser,
	});
	if (isLoadingUser) return <Loading />;
	if (!user?.data?.user) return notFound();
	else {
		return (
			<div className="flex h-screen flex-col">
				<DashboardNavBar user={user.data.user} />
				<div className="flex flex-1 flex-col space-y-8 p-4 md:p-15">
					<div className="md:flex justify-between space-y-5 md:space-y-0">
						<div>
							<h2 className="uppercase text-md text-primary font-bold">
								BEM VINDO DE VOLTA
							</h2>
							<h1 className="text-4xl font-bold">
								Bem-vindo, {user.data.user.name}!
							</h1>
							<p className="text-sm text-muted-foreground">
								Escolha um servidor para configurar o bot, ou adicione o Nexus a
								um novo servidor Discord.
							</p>
						</div>
						<div className="bg-white flex rounded-lg items-center space-x-2 border-2">
							<div className="p-4">
								<AutoSkeleton loading={isLoadingServer}>
									<h1 className="text-2xl font-bold">{servers?.length}</h1>
									<p className="text-sm text-muted-foreground">
										Servidores conectados
									</p>
								</AutoSkeleton>
							</div>
							<div className="h-full border-r-2"></div>
							<div className="p-4">
								<AutoSkeleton loading={isLoadingServer}>
									<h1 className="text-2xl font-bold w-fit">
										{servers?.reduce(
											(total, server) => total + server.memberCount,
											0,
										)}
									</h1>
									<p className="text-sm text-muted-foreground">
										Membros totais
									</p>
								</AutoSkeleton>
							</div>
						</div>
					</div>
					<div className="flex justify-between">
						<AutoSkeleton loading={isLoadingServer}>
							<div className="flex space-x-2">
								<h1 className="font-bold text-lg md:text-2xl">
									Seus servidores
								</h1>
								<Badge className="size-4 md:size-5" variant={"default"}>
									{servers?.length}
								</Badge>
							</div>
						</AutoSkeleton>
						<ServersDialog />
					</div>
					{servers?.length === 0 ? (
						<div className="flex flex-1 items-center justify-center">
							<h1>Nenhum servidor adicionado no sistema</h1>
						</div>
					) : (
						<div className="grid grid-cols-4 gap-8">
							{servers?.map((server) => (
								<div
									key={server.id}
									className="p-3 border-2 shadow-xs rounded-lg space-y-2"
								>
									<div className="flex space-x-2 items-center">
										<div className="p-3 bg-primary rounded-full text-white ">
											{server.name
												.split(" ")
												.slice(0, 2)
												.map((word) => word[0])
												.join("")
												.toUpperCase()}{" "}
										</div>
										<div>
											<h1 className="font-bold text-md">{server.name}</h1>
											<p className="text-xs text-muted-foreground">
												Alterado{" "}
												{formatDistanceToNow(server.updatedAt, {
													locale: ptBR,
													addSuffix: true,
													includeSeconds: true,
												})}
											</p>
										</div>
									</div>
									<div className="flex justify-around">
										<div className="flex items-center space-x-0.5 text-muted-foreground">
											<UsersIcon size={15} />
											<span className="text-sm">{server.memberCount}</span>
										</div>
										<div className="flex items-center space-x-0.5 text-muted-foreground">
											<a
												className={buttonVariants()}
												href={`/dashboard/${server.id}`}
											>
												Configurar
											</a>
										</div>
									</div>
								</div>
							))}
						</div>
					)}
				</div>
			</div>
		);
	}
}
