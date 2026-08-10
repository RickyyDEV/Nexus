import { BotMessageSquare, MenuIcon, XIcon } from "lucide-react";
import { Button, buttonVariants } from "../ui/button";
import { useIsMobile } from "../ui/mobile-hook";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from "#components/ui/drawer";
export default function NavBar() {
  const isMobile = useIsMobile();
  return (
    <header>
      <nav className="bg-white w-full flex justify-between  pr-4 pl-4 md:pr-0 md:pl-0 md:justify-around h-20 items-center border-b border-border">
        <div className="flex items-center gap-1">
          <div className="bg-primary p-1.5 rounded-sm">
            <BotMessageSquare className="text-white md:size-5 size-4" />
          </div>
          <h1 className="md:text-xl text-secondary-foreground font-bold">
            Nexus
          </h1>
        </div>
        {isMobile ? (
          <>
            <div>
              <Drawer
                modal={true}
                disablePointerDismissal
                swipeDirection="right"
              >
                <DrawerTrigger
                  render={
                    <Button variant="ghost" size={"icon"}>
                      <MenuIcon />
                    </Button>
                  }
                />
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerClose
                      className={"w-min self-end"}
                      render={
                        <Button variant="ghost">
                          <XIcon />
                        </Button>
                      }
                    />
                  </DrawerHeader>
                  <a href="#" className={buttonVariants({ variant: "ghost" })}>
                    Recursos
                  </a>
                  <a href="#" className={buttonVariants({ variant: "ghost" })}>
                    Módulos
                  </a>
                  <a href="#" className={buttonVariants({ variant: "ghost" })}>
                    Preços
                  </a>
                  <a href="#" className={buttonVariants({ variant: "ghost" })}>
                    Preços
                  </a>
                  <DrawerFooter>
                    <a
                      href="/auth/login"
                      className={buttonVariants({ variant: "ghost" })}
                    >
                      Entrar
                    </a>
                    <a href="#" className={buttonVariants({ size: "lg" })}>
                      Adicionar bot
                    </a>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            </div>
          </>
        ) : (
          <>
            <div>
              <div>
                <a href="#" className={buttonVariants({ variant: "ghost" })}>
                  Recursos
                </a>
                <a href="#" className={buttonVariants({ variant: "ghost" })}>
                  Módulos
                </a>
                <a href="#" className={buttonVariants({ variant: "ghost" })}>
                  Preços
                </a>
                <a href="#" className={buttonVariants({ variant: "ghost" })}>
                  Preços
                </a>
              </div>
            </div>
            <div>
              <a
                href="/auth/login"
                className={buttonVariants({ variant: "ghost" })}
              >
                Entrar
              </a>
              <a href="#" className={buttonVariants({ size: "lg" })}>
                Adicionar bot
              </a>
            </div>
          </>
        )}
      </nav>
    </header>
  );
}
