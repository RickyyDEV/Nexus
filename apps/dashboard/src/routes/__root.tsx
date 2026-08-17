import { createRootRoute, Outlet } from "@tanstack/react-router";
import NotFound from "#components/own/not-found";
import { Toaster } from "#components/ui/sonner";

export const Route = createRootRoute({
	component: RootComponent,
	notFoundComponent: () => <NotFound />,
});

function RootComponent() {
	return (
		<>
			<Toaster theme="light" />
			<Outlet />
		</>
	);
}
