import { createFileRoute } from "@tanstack/react-router";
import { Helmet } from "react-helmet-async";
import NavBar from "#components/own/navbar";
import HeroLanding from "../style/components/own/hero-landing";
export const Route = createFileRoute("/")({
	component: Home,
});

function Home() {
	return (
		<>
			<Helmet>
				<title>Nexus - Home</title>
			</Helmet>
			<NavBar />
			<HeroLanding />
		</>
	);
}
