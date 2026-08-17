import { useNavigate } from "@tanstack/react-router";
import type { User } from "better-auth";
import { BellIcon, BotMessageSquare } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "#components/ui/avatar";
import { Button } from "#components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "#components/ui/dropdown-menu";
import { authClient } from "../../../../auth";
export default function DashboardNavBar({ user }: { user: User }) {
	const navigate = useNavigate();
	return (
		<header>
			<nav className="bg-white w-full flex justify-around pr-4 pl-4 md:pr-0 md:pl-0 md:justify-around h-20 items-center border-b border-border">
				<div className="flex items-center gap-1 select-none">
					<div className="bg-primary p-1.5 rounded-sm ">
						<BotMessageSquare className="text-white md:size-5 size-4  " />
					</div>
					<h1 className="md:text-xl text-secondary-foreground font-bold">
						Nexus
					</h1>
				</div>
				<div className="flex items-center">
					<div className="md:mr-3">
						<DropdownMenu>
							<DropdownMenuTrigger
								render={
									<Button variant={"outline"} className={"mr-2 md:mr-0"}>
										<BellIcon />
									</Button>
								}
							/>
							<DropdownMenuContent className={"w-sm"} align="center">
								<div className="p-10 text-center">
									<h1>Sem notificações</h1>
								</div>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
					<DropdownMenu>
						<DropdownMenuTrigger
							render={
								<Button
									variant="ghost"
									size="icon"
									className="rounded-full flex"
								>
									<Avatar>
										{user.image && (
											<AvatarImage src={user.image} alt="shadcn" />
										)}
										<AvatarFallback>
											{user.name
												.split(" ")
												.slice(0, 2)
												.map((word) => word[0])
												.join("")
												.toUpperCase()}
										</AvatarFallback>
									</Avatar>
								</Button>
							}
						/>
						<div className="md:flex flex-col justify-start ml-2 hidden md:visible">
							<h1 className="font-bold">{user.name}</h1>
							<p className="text-muted-foreground text-xs font-thin">
								{user.email}
							</p>
						</div>
						<DropdownMenuContent className="w-32">
							<DropdownMenuGroup>
								<DropdownMenuItem>Perfil</DropdownMenuItem>
								<DropdownMenuItem>Configuração</DropdownMenuItem>
							</DropdownMenuGroup>
							<DropdownMenuSeparator />
							<DropdownMenuGroup>
								<DropdownMenuItem
									onClick={async () => {
										await authClient.signOut({}).then((a) => {
											a.data?.success &&
												!a.error &&
												navigate({
													href: import.meta.env.VITE_APP_URL + "/auth/login",
												});
										});
									}}
									variant="destructive"
								>
									Sair
								</DropdownMenuItem>
							</DropdownMenuGroup>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</nav>
		</header>
	);
}
