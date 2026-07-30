"use client";

import Link from "next/link";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";

// Mensagem exata que o Next.js usa quando o ID de uma Server Action já não
// existe na build atual (normalmente porque o browser tinha a página aberta
// de antes de um deploy novo). Ver:
// https://nextjs.org/docs/messages/failed-to-find-server-action
const STALE_DEPLOYMENT_ERROR = "Failed to find Server Action";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const isStaleDeployment = error.message?.includes(STALE_DEPLOYMENT_ERROR);

  useEffect(() => {
    console.log("Erro apanhado pelo error boundary: ", error);

    if (isStaleDeployment) {
      // Recarregar traz a build mais recente do servidor, o que resolve
      // isto sozinho na grande maioria dos casos — sem sem precisar de o
      // utilizador perceber que algo correu mal.
      window.location.reload();
    }
  }, [error, isStaleDeployment]);

  if (isStaleDeployment) {
    // Não mostrar nada enquanto o reload acontece (é questão de instantes).
    return null;
  }

  return (
    <section className="flex flex-1 flex-col items-center justify-center gap-6 bg-tertiary px-8 py-24 text-center lg:px-16">
      <span className="h-px w-10 bg-secondary" />

      <h1 className="max-w-md font-serif text-3xl text-primary lg:text-4xl">
        Something went wrong.
      </h1>

      <p className="max-w-md font-sans text-sm leading-relaxed text-neutral">
        We hit an unexpected error. Please try again — if it keeps
        happening, get in touch and we&apos;ll sort it out.
      </p>

      <div className="mt-2 flex items-center gap-6">
        <Button type="button" onClick={reset}>
          Try again
        </Button>
        <Link
          href="/"
          className="font-sans text-sm font-medium uppercase tracking-wider text-primary underline underline-offset-4 hover:text-secondary"
        >
          Back to home
        </Link>
      </div>
    </section>
  );
}
