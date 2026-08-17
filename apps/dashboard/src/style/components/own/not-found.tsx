import { ArrowLeft, LifeBuoy } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { buttonVariants } from "#components/ui/button";

export default function NotFound() {
	return (
		<main className="flex min-h-screen w-full flex-col items-center justify-center gap-16 px-6 py-20">
			<Helmet>
				<title>Nexus - 404</title>
			</Helmet>
			<section className="flex max-w-2xl flex-col items-center gap-7 text-center">
				<span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5">
					<span className="size-1.5 rounded-full bg-primary" />
					<span className="font-mono text-xs font-semibold tracking-widest text-primary">
						ERRO 404
					</span>
				</span>

				<h1 className="select-none bg-linear-to-br from-chart-4 to-primary bg-clip-text font-mono text-7xl font-bold leading-none text-transparent text-shadow-primary text-shadow-lg/20 sm:text-8xl md:text-9xl lg:text-[11rem]">
					404
				</h1>

				<h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
					Esta página se perdeu no servidor
				</h2>

				<p className="max-w-md text-base text-muted-foreground">
					O link pode estar quebrado ou a página pode ter sido movida. Que tal
					voltar para um lugar seguro?
				</p>

				<div className="flex flex-wrap items-center justify-center gap-3">
					<a href="/" className={buttonVariants({ size: "lg" })}>
						<ArrowLeft />
						Voltar ao início
					</a>
					<a
						href="/"
						className={buttonVariants({ variant: "outline", size: "lg" })}
					>
						<LifeBuoy />
						Reportar problema
					</a>
				</div>
			</section>
		</main>
	);
}
