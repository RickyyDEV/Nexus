import { useQuery } from "@tanstack/react-query";
import { createFileRoute, notFound } from "@tanstack/react-router";
import Loading from "#components/own/loading";
import { FetchUser, FetchUserServer } from "../../../actions/user";

export const Route = createFileRoute("/dashboard/$id/")({
	component: RouteComponent,
});

function RouteComponent() {
	const { id } = Route.useParams();
	const { data: user, isLoading: isLoadingUser } = useQuery({
		queryKey: ["user"],
		queryFn: FetchUser,
		refetchOnWindowFocus: false,
		staleTime: 1000 * 60 * 5,
	});
	const { data: server, isLoading: isLoadingServer } = useQuery({
		queryKey: [`user-server`, id],
		queryFn: () => FetchUserServer(id),
		refetchOnWindowFocus: false,
		staleTime: 1000 * 60 * 5,
	});
	if (isLoadingUser || isLoadingServer) return <Loading />;
	else if (!user?.data?.user || !server) throw notFound();
	else return <div>Hello {user.data.user.name}!</div>;
}
