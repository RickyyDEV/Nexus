import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="h-screen w-screen flex items-center justify-center flex-col">
      <Loader2 size={80} className="animate-spin stroke-muted-foreground" />
      <h1 className="text-lg text-center">Carregando...</h1>
    </div>
  );
}
