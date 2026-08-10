import {
  AlertCircle,
  BotMessageSquare,
  MessageCircleIcon,
  ShieldCheckIcon,
  UserPlus,
} from "lucide-react";
import { Badge } from "#components/ui/badge";

export default function HeroLanding() {
  return (
    <div className="flex flex-col md:flex-row gap-5 w-full items-center md:h-[calc(100vh-150px)]">
      <div className="w-full md:w-1/2 p-2 md:p-10 flex flex-col items-center">
        <div>
          <h1 className="font-bold text-4xl md:text-7xl tracking-wide max-w-130">
            Configure com
            <span className="text-primary text-shadow-primary text-shadow-lg/20">
              {" rapidez "}
            </span>
            e
            <span className="text-primary text-shadow-primary text-shadow-lg/20">
              {" praticidade"}
            </span>
          </h1>
          <p className="text-md md:text-lg text-muted-foreground mt-4 max-w-130">
            O Nexus é o painel de controle definitivo para o seu servidor
            Discord. Ative módulos, ajuste mensagens e bloqueei links em
            segundos — tudo em uma interface simples.
          </p>
          {/* <a
            href="#"
            className={buttonVariants({
              variant: "ghost",
              className: "pt-2",
            })}
          >
            <PlayIcon />
            Ver demonstração
          </a> */}
        </div>
      </div>
      <div className="w-full md:w-1/2 mx-auto flex justify-center md:justify-start">
        <div className="w-2/3 h-1/2 bg-white border shadow-sm rounded-lg animate-[fadeIn_0.5s_ease-out_forwards] select-none">
          <div className="flex bg-muted justify-between items-center p-3 rounded-t-lg">
            <div className="flex items-center gap-1">
              <div className="bg-primary p-1.5 rounded-sm">
                <BotMessageSquare className="text-white md:size-3 size-4" />
              </div>
              <h1 className="md:text-md text-secondary-foreground font-bold">
                Nexus
                <span className="text-sm text-muted-foreground/60">
                  {" "}
                  / #registros{" "}
                </span>
              </h1>
            </div>
            <div>
              <Badge variant="destructive">
                <AlertCircle className="animate-pulse" />
                ALERTA
              </Badge>
            </div>
          </div>
          <div className="p-7">
            <div className="min-w-2/3 p-4 items-center mx-auto bg-muted space-y-1 rounded-md border shadow-sm">
              <div className="p-2 bg-primary w-fit rounded-sm ">
                <UserPlus size={15} stroke="white" />
              </div>
              <div>
                <h1 className="md:text-md text-secondary-foreground font-medium">
                  Novo membro entrou
                </h1>
                <p className="text-muted-foreground/50 text-xs">
                  há poucos segundos • gatilho automático
                </p>
              </div>
            </div>
          </div>
          <hr className="w-5/6 mx-auto" />
          <div className="p-7 space-y-5">
            <div className="min-w-2/3 p-4 items-center mx-auto bg-muted space-y-1 rounded-md border shadow-sm flex space-x-2">
              <div className="p-2 bg-primary/30 w-fit rounded-sm items-center">
                <MessageCircleIcon size={15} className="stroke-primary" />
              </div>
              <div>
                <h1 className="md:text-md text-secondary-foreground font-medium">
                  Mensagem de boas-vindas em #geral
                </h1>
                <p className="text-muted-foreground/50 text-xs">
                  👋 Bem-vindo @Ricardo! Você é o membro nº 1.241 — leia as
                  regras...
                </p>
              </div>
            </div>
            <div className="min-w-2/3 p-4 items-center mx-auto bg-muted space-y-1 rounded-md border shadow-sm flex space-x-2">
              <div className="p-2 bg-green-300/30 w-fit rounded-sm items-center">
                <ShieldCheckIcon size={15} className="stroke-green-700" />
              </div>
              <div>
                <h1 className="md:text-md text-secondary-foreground font-medium">
                  Cargo "Iniciante" atribuído
                </h1>
                <p className="text-muted-foreground/50 text-xs">
                  Novo membro tem agora acesso ao restante do servidor
                </p>
              </div>
            </div>
            <div className="md:flex space-x-2">
              <p className="text-xs text-muted-foreground font-medium">
                Administrando tambem:
              </p>
              <div className="md:flex md:space-x-2 grid grid-cols-3 gap-x-2 gap-y-2">
                <Badge variant={"secondary"}>Anti-Link</Badge>
                <Badge variant={"secondary"}>Moderação</Badge>
                <Badge variant={"secondary"}>Tickets</Badge>
                <Badge variant={"secondary"}>+5 mods</Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
