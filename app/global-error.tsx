"use client";

import { useEffect } from "react";

import "./globals.css";

// Só dispara se o erro acontecer no próprio Root Layout (app/layout.tsx) —
// nesse caso o Next.js substitui a página inteira por este ficheiro, por
// isso é preciso incluir <html>/<body> aqui também. Erros normais dentro
// das páginas são apanhados por app/error.tsx, que é o caso mais comum.
const STALE_DEPLOYMENT_ERROR = "Failed to find Server Action";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const isStaleDeployment = error.message?.includes(STALE_DEPLOYMENT_ERROR);

  useEffect(() => {
    console.log("Erro apanhado pelo global-error boundary: ", error);

    if (isStaleDeployment) {
      window.location.reload();
    }
  }, [error, isStaleDeployment]);

  return (
    <html lang="en">
      <body className="flex min-h-full flex-col antialiased">
        {!isStaleDeployment && (
          <section className="flex flex-1 flex-col items-center justify-center gap-6 bg-tertiary px-8 py-24 text-center">
            <span className="h-px w-10 bg-secondary" />

            <h1 className="max-w-md font-serif text-3xl text-primary lg:text-4xl">
              Something went wrong.
            </h1>

            <p className="max-w-md font-sans text-sm leading-relaxed text-neutral">
              We hit an unexpected error. Please try again in a moment.
            </p>

            <button
              type="button"
              onClick={reset}
              className="mt-2 inline-flex items-center justify-center whitespace-nowrap bg-primary px-8 py-4 font-sans text-sm font-medium uppercase tracking-wider text-tertiary transition-colors hover:opacity-90"
            >
              Try again
            </button>
          </section>
        )}
      </body>
    </html>
  );
}
