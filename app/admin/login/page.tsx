import type { Metadata } from "next";

import { login } from "@/app/actions/admin";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

type PageProps = {
  searchParams: Promise<{ error?: string }>;
};

export default async function AdminLoginPage({ searchParams }: PageProps) {
  const { error } = await searchParams;

  return (
    <section className="flex flex-1 flex-col items-center justify-center gap-6 bg-tertiary px-8 py-24 lg:px-16">
      <div className="w-full max-w-sm">
        <span className="h-px w-10 bg-secondary" />
        <h1 className="mt-4 font-serif text-3xl text-primary">Admin</h1>
        <p className="mt-2 font-sans text-sm text-neutral">
          Restricted access for event organizers.
        </p>

        <form action={login} className="mt-8 flex flex-col gap-4">
          <label className="flex flex-col gap-2 font-sans text-sm text-primary">
            <span className="text-neutral">Password</span>
            <input
              type="password"
              name="password"
              required
              autoFocus
              className="border border-primary/20 bg-transparent px-3 py-2 text-sm text-primary focus:border-secondary focus:outline-none"
            />
          </label>

          {error && (
            <p className="font-sans text-sm text-terracotta">
              Incorrect password. Please try again.
            </p>
          )}

          <Button type="submit" className="w-full" loadingText="Logging in…">
            Log in
          </Button>
        </form>
      </div>
    </section>
  );
}
