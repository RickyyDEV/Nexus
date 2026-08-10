import { ArrowLeft, BotMessageSquare, Loader2 } from "lucide-react";
import { authClient } from "../../../auth";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button, buttonVariants } from "#components/ui/button";
import { Helmet } from "react-helmet-async";
import { toast } from "sonner";
import { useState } from "react";

export const Route = createFileRoute("/auth/login/")({
  component: RouteComponent,
});

function RouteComponent() {
  let [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();
  return (
    <div className="h-screen w-screen bg-secondary-foreground">
      <Helmet>
        <title>Nexus - Login</title>
      </Helmet>
      <a
        href="/"
        className={buttonVariants({ variant: "link" }) + " absolute m-10"}
      >
        <ArrowLeft />
        Voltar
      </a>
      <div className="h-screen w-screen bg-secondary-foreground p-10 space-y-5 mx-auto justify-center flex flex-col items-center">
        <div className="flex items-center gap-1 select-none">
          <div className="bg-primary p-1.5 rounded-sm">
            <BotMessageSquare className="text-white md:size-5 size-4" />
          </div>
          <h1 className="md:text-xl text-secondary font-bold">Nexus</h1>
        </div>
        <div>
          <span className="uppercase text-primary font-bold">
            PAINEL DO CLIENTE
          </span>
        </div>
        <h1 className="text-primary-foreground text-5xl font-bold text-center">
          Seu servidor, configurado do seu jeito
        </h1>
        <p className="text-muted text-center">
          Conecte-se com sua conta Discord para acessar o painel de controle.
        </p>
        <Button
          variant={"secondary"}
          size={"lg"}
          disabled={isLoading}
          className={"min-w-1/10"}
          onClick={async () => {
            setIsLoading(true);
            await authClient.signIn
              .social({
                provider: "discord",
                callbackURL: import.meta.env.VITE_APP_URL + "/dashboard",
                disableRedirect: true,
              })
              .then((a) => {
                if (a.data?.url != null) navigate({ href: a.data.url });
                else
                  toast.error("Ocorreu um erro ao tentar logar com o discord", {
                    description: a.error?.message,
                  });
                setIsLoading(false);
              });
          }}
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin" />
            </>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 256 199"
                width="24"
                height="24"
              >
                <path
                  fill="#5865F2"
                  d="M216.856 16.597A208.5 208.5 0 0 0 164.042 0c-2.275 4.113-4.933 9.645-6.766 14.046q-29.538-4.442-58.533 0c-1.832-4.4-4.55-9.933-6.846-14.046a207.8 207.8 0 0 0-52.855 16.638C5.618 67.147-3.443 116.4 1.087 164.956c22.169 16.555 43.653 26.612 64.775 33.193A161 161 0 0 0 79.735 175.3a136.4 136.4 0 0 1-21.846-10.632a109 109 0 0 0 5.356-4.237c42.122 19.702 87.89 19.702 129.51 0a132 132 0 0 0 5.355 4.237a136 136 0 0 1-21.886 10.653c4.006 8.02 8.638 15.67 13.873 22.848c21.142-6.58 42.646-16.637 64.815-33.213c5.316-56.288-9.08-105.09-38.056-148.36M85.474 135.095c-12.645 0-23.015-11.805-23.015-26.18s10.149-26.2 23.015-26.2s23.236 11.804 23.015 26.2c.02 14.375-10.148 26.18-23.015 26.18m85.051 0c-12.645 0-23.014-11.805-23.014-26.18s10.148-26.2 23.014-26.2c12.867 0 23.236 11.804 23.015 26.2c0 14.375-10.148 26.18-23.015 26.18"
                />
              </svg>
              Continuar com Discord
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
