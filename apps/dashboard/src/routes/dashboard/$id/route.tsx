import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Helmet } from "react-helmet-async";
import { AppSidebar } from "#components/own/dashboard/sidebar";
import Loading from "#components/own/loading";
import { SidebarProvider } from "#components/ui/sidebar";
import { TooltipProvider } from "#components/ui/tooltip";
import { FetchUser, FetchUserServer } from "../../../actions/user";
import { queryClient } from "../../../main";

export const Route = createFileRoute("/dashboard/$id")({
	beforeLoad: ({ params }) => {
		void queryClient.prefetchQuery({
			queryKey: [`user`],
			queryFn: FetchUser,
			staleTime: 1000 * 60 * 5,
		});
		void queryClient.prefetchQuery({
			queryKey: [`user-server`, params.id],
			queryFn: () => FetchUserServer(params.id),
			staleTime: 1000 * 60 * 5,
		});
	},
	pendingComponent: () => <Loading />,
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<>
			<Helmet>
				<title>Nexus - Dashboard</title>
			</Helmet>
			<TooltipProvider>
				<SidebarProvider>
					<AppSidebar />
					<main>
						<Outlet />
					</main>
				</SidebarProvider>
			</TooltipProvider>
		</>
	);
}
