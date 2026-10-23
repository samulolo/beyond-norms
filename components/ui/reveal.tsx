import type { CSSProperties, ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /**
   * "scroll" (default): anima quando entra no ecrã, via CSS scroll-driven
   * animations. Browsers sem suporte mostram o conteúdo logo, sem animação.
   * "load": anima uma vez no carregamento (usar acima da dobra, ex: hero).
   */
  trigger?: "scroll" | "load";
};

// Sem JavaScript: o conteúdo vem visível no HTML do servidor e a animação é
// só CSS. Antes, tudo começava com opacity-0 e só aparecia depois da
// hidratação do React + IntersectionObserver, o que atrasava o primeiro ecrã.
export function Reveal({
  children,
  className = "",
  delay = 0,
  trigger = "scroll",
}: RevealProps) {
  return (
    <div
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
      className={`${trigger === "load" ? "reveal-load" : "reveal-scroll"} ${className}`}
    >
      {children}
    </div>
  );
}
