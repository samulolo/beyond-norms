
import type { Metadata } from "next";
import Link from "next/link";

import { getStripeClient } from "@/utils/stripe";
import { processCompletedCheckout } from "@/utils/process-payment";

export const metadata: Metadata = {
  title: "Booking Confirmed",
  robots: { index: false, follow: false },
};

// Dá margem à gravação em Supabase + envio de emails (ver nota abaixo),
// mesmo alinhamento do webhook em app/api/stripe/webhook/route.ts.
export const maxDuration = 30;

type PageProps = {
  searchParams: Promise<{ session_id?: string }>;
};

async function getSession(sessionId: string | undefined) {
  if (!sessionId) return null;

  try {
    const stripe = getStripeClient();
    return await stripe.checkout.sessions.retrieve(sessionId);
  } catch {
    return null;
  }
}

export default async function PaymentSuccessPage({
  searchParams,
}: PageProps) {
  const { session_id } = await searchParams;
  const session = await getSession(session_id);
  const email = session?.customer_details?.email ?? null;

  // Rede de segurança: o webhook da Stripe (app/api/stripe/webhook) devia
  // ser quem grava o pagamento e envia os emails, mas os pedidos que a
  // Stripe faz de servidor-a-servidor para esse endpoint têm estado a
  // falhar a ligação de forma persistente ("Failed to connect to remote
  // host", ver MAINTENANCE.md). O pedido que carrega esta página vem do
  // browser do próprio cliente, ao ser redirecionado de volta do checkout
  // — esse chega sempre. processCompletedCheckout() é idempotente (chave
  // é `stripe_payment_id`), por isso é seguro chamá-lo aqui mesmo que o
  // webhook também tenha tratado (ou venha a tratar) da mesma sessão.
  if (session) {
    try {
      await processCompletedCheckout(session);
    } catch (err) {
      console.log(
        "Erro ao processar pagamento na página de sucesso: ",
        session.id,
        err,
      );
    }
  }

  return (
    <section className="flex flex-1 flex-col items-center justify-center gap-6 bg-tertiary px-8 py-24 text-center lg:px-16">
      <span className="flex p-2 items-center justify-center border border-secondary font-serif font-bold text-lg text-primary">
        BeyondNorms
      </span>

      <span className="h-px w-10 bg-secondary" />

      <h1 className="max-w-xl font-serif text-4xl text-primary lg:text-5xl">
        Welcome to the community.
      </h1>

      <p className="max-w-md font-sans text-base leading-relaxed text-neutral">
        {email ? (
          <>
            We&apos;ve saved your spot, <span className="text-primary">{email}</span>.
          </>
        ) : (
          "We've saved your spot."
        )}{" "}
        You&apos;re officially part of <span className="text-secondary font-serif">BeyondNorms</span> &mdash; get ready for real
        people, real emotions, and real connections. Keep an eye on your inbox,
        we&apos;ll be in touch with everything you need before the night.
      </p>

      <Link
        href="/"
        className="mt-4 font-sans text-sm font-medium uppercase tracking-wider text-primary underline underline-offset-4 hover:text-secondary"
      >
        Back to home
      </Link>
    </section>
  );
}
