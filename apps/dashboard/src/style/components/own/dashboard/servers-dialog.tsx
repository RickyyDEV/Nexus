import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { Loader2, Loader2Icon, PlusIcon, ServerIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button, buttonVariants } from "#components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTrigger,
} from "#components/ui/dialog";
import {
	FetchServersFromUser,
	FetchUserServersToAdd,
} from "../../../../actions/user";

export default function ServersDialog() {
	const {
		data: servers,
		isLoading,
		refetch,
	} = useQuery({
		queryKey: ["user-servers-guild"],
		queryFn: FetchUserServersToAdd,
		staleTime: 1000 * 60,
		refetchOnWindowFocus: false,
		enabled: false,
	});
	const { data: memberServers, isLoading: isLoadingServer } = useQuery({
		queryKey: ["user-servers"],
		queryFn: FetchServersFromUser,
	});
	const [isCreating, setIsCreating] = useState("");
	const navigate = useNavigate();
	return (
		<Dialog
			onOpenChange={async (open) => {
				if (!servers && open) await refetch();
			}}
		>
			<DialogTrigger
				render={
					<Button>
						<PlusIcon /> Adicionar servidor
					</Button>
				}
			/>
			<DialogContent className={"md:min-w-1/2 w-full "}>
				<DialogHeader>
					<div className="flex space-x-2">
						<div className="p-3 bg-primary/25 w-fit rounded-full h-fit">
							<ServerIcon size={20} className="stroke-primary" />
						</div>
						<div>
							<h1 className="font-bold">Adicionar servidor</h1>
							<p className="text-sm text-muted-foreground">
								Selecione um servidor para configurar
							</p>
						</div>
					</div>
				</DialogHeader>

				<div>
					<div className="pl-2 pt-3 space-y-2">
						{isLoading || isLoadingServer ? (
							<div className="flex items-center justify-center">
								<Loader2 className="animate-spin stroke-muted-foreground" />
							</div>
						) : (
							<>
								{servers?.botServers
									?.filter((a) => !memberServers?.some((b) => b.id === a.id))
									.map((server) => (
										<div
											key={server.id}
											className="rounded-lg border flex space-x-2 p-3 items-center"
										>
											{server.icon ? (
												<img src={server.icon} alt={server.name} />
											) : (
												<div className="p-3 bg-primary rounded-full text-white">
													{server.name
														.split(" ")
														.slice(0, 2)
														.map((word) => word[0])
														.join("")
														.toUpperCase()}{" "}
												</div>
											)}
											<div className="flex justify-between items-center w-full">
												<div>
													<h1 className="font-bold text-md tracking-wide">
														{server.name}
													</h1>
													<p className="text-sm text-muted-foreground">
														Servidor ainda não configurado
													</p>
												</div>
												<div>
													<Button
														disabled={isCreating === server.id}
														onClick={async () => {
															setIsCreating(server.id);
															const res = await fetch(
																`${import.meta.env.VITE_BACKEND_URL}/user/servers/add`,
																{
																	method: "POST",
																	credentials: "include",
																	headers: {
																		"Content-Type": "application/json", // Tell the server you are sending JSON
																	},
																	body: JSON.stringify({
																		servername: server.name,
																		guildId: server.id,
																		icon: server.icon,
																	}),
																},
															);
															if (!res.ok)
																toast.error(
																	"Ocorreu um erro ao tentar adicionar servidor.",
																	{
																		description: "Tente novamente mais tarde",
																	},
																) && setIsCreating("");
															else {
																const data = (await res.json()) as {
																	ok: boolean;
																	serverId: string;
																};
																navigate({
																	href: `/dashboard/${data.serverId}`,
																});
																setIsCreating("");
															}
														}}
													>
														{isCreating === server.id ? (
															<Loader2Icon className="animate-spin" />
														) : (
															<>Configurar</>
														)}
													</Button>
												</div>
											</div>
										</div>
									))}
								{servers?.toInvite?.map((server) => (
									<div
										key={server.id}
										className="rounded-lg border flex space-x-2 p-3 items-center"
									>
										{server.icon ? (
											<img src={server.icon} alt={server.name} />
										) : (
											<div className="p-3 bg-primary rounded-full text-white">
												{server.name
													.split(" ")
													.slice(0, 2)
													.map((word) => word[0])
													.join("")
													.toUpperCase()}
											</div>
										)}
										<div className="flex justify-between items-center w-full">
											<div>
												<h1 className="font-bold text-md tracking-wide">
													{server.name}
												</h1>
												<p className="text-sm text-muted-foreground">
													Bot ainda não adicionado ao servidor.
												</p>
											</div>
											<div>
												<a
													href={`https://discord.com/oauth2/authorize?client_id=1534323732246429887&permissions=8584986789675007&guild_id=${server.id}&scope=bot+applications.commands`}
													className={buttonVariants()}
													target="_blank"
													rel="noopener"
												>
													Adicionar ao servidor
												</a>
											</div>
										</div>
									</div>
								))}
							</>
						)}
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
