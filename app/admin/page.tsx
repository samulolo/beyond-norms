import type { Metadata } from "next";

import { logout } from "@/app/actions/admin";
import { Button } from "@/components/ui/button";
import { createClient } from "@/supabase/server";
import { eventDates } from "@/utils/constant/const";

export const metadata: Metadata = {
  title: "Admin — Sales",
  robots: { index: false, follow: false },
};

type Payment = {
  id: string;
  stripe_payment_id: string;
  customer_email: string;
  customer_name: string | null;
  customer_phone: string | null;
  status: string;
  email_sent: boolean;
  event_date_id: string | null;
  dietary_restrictions: string[] | null;
  dietary_other: string | null;
  has_allergies: boolean | null;
  allergy_details: string | null;
  amount_total: number | null;
  currency: string | null;
  created_at?: string;
};

async function getPayments(): Promise<Payment[]> {
  const supabase = await createClient();

  // .order("created_at") falha em silêncio (devolve tudo sem ordenar) se
  // a coluna não existir — ver SQL em MAINTENANCE.md para garantir que
  // existe antes de confiar na ordenação por data.
  const { data, error } = await supabase
    .from("payments")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.log("Erro ao carregar pagamentos no admin: ", error);
    return [];
  }

  return data ?? [];
}

function formatEventDate(id: string | null) {
  if (!id) return "—";
  return eventDates.find((date) => date.id === id)?.full ?? id;
}

function formatRestrictions(payment: Payment) {
  const parts: string[] = [];

  if (payment.dietary_restrictions?.length) {
    parts.push(payment.dietary_restrictions.join(", "));
  }

  if (payment.dietary_other) {
    parts.push(payment.dietary_other);
  }

  if (payment.has_allergies) {
    parts.push(`Allergy: ${payment.allergy_details || "not specified"}`);
  }

  return parts.length ? parts.join(" · ") : "—";
}

function isConfirmedPayment(payment: Payment) {
  return payment.status === "paid" || payment.status === "completed";
}

function formatPaymentAmount(payment: Payment) {
  if (typeof payment.amount_total !== "number") return "—";

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: payment.currency?.toUpperCase() ?? "EUR",
  }).format(payment.amount_total / 100);
}

export default async function AdminPage() {
  const payments = await getPayments();

  const completedPayments = payments.filter(isConfirmedPayment);
  const totalRevenue = completedPayments.reduce(
    (total, payment) => total + (payment.amount_total ?? 0),
    0,
  );
  const totalCurrency =
    completedPayments.find((payment) => payment.currency)?.currency ?? "eur";

  const salesByDate = eventDates.map((date) => ({
    ...date,
    count: completedPayments.filter((p) => p.event_date_id === date.id)
      .length,
  }));

  return (
    <section className="flex flex-1 flex-col gap-10 bg-tertiary px-8 py-16 lg:px-16">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <span className="h-px w-10 bg-secondary" />
          <h1 className="font-serif text-3xl text-primary">Sales</h1>
        </div>

        <form action={logout}>
          <Button type="submit" variant="outline" size="sm">
            Log out
          </Button>
        </form>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="border border-secondary/40 p-6">
          <p className="font-sans text-xs font-semibold uppercase tracking-widest text-secondary">
            Tickets sold
          </p>
          <p className="mt-3 font-serif text-4xl text-primary">
            {completedPayments.length}
          </p>
        </div>

        <div className="border border-secondary/40 p-6">
          <p className="font-sans text-xs font-semibold uppercase tracking-widest text-secondary">
            Total revenue
          </p>
          <p className="mt-3 font-serif text-4xl text-primary">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: totalCurrency.toUpperCase(),
            }).format(totalRevenue / 100)}
          </p>
        </div>

        <div className="border border-secondary/40 p-6">
          <p className="font-sans text-xs font-semibold uppercase tracking-widest text-secondary">
            By date
          </p>
          <div className="mt-3 flex flex-col gap-1 font-sans text-sm text-primary">
            {salesByDate.map((date) => (
              <div key={date.id} className="flex items-center justify-between">
                <span className="text-neutral">{date.full}</span>
                <span className="font-semibold">{date.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="overflow-x-auto border border-primary/15">
        <table className="w-full min-w-[900px] font-sans text-sm">
          <thead>
            <tr className="border-b border-secondary/40 text-left text-xs font-semibold uppercase tracking-widest text-secondary">
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Experience date</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Dietary / Allergies</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr
                key={payment.id}
                className="border-b border-primary/10 text-primary transition-colors hover:bg-primary/5"
              >
                <td className="px-4 py-3">{payment.customer_name ?? "—"}</td>
                <td className="px-4 py-3">{payment.customer_email}</td>
                <td className="px-4 py-3">
                  {payment.customer_phone ?? "—"}
                </td>
                <td className="px-4 py-3">
                  {formatEventDate(payment.event_date_id)}
                </td>
                <td className="px-4 py-3">{formatPaymentAmount(payment)}</td>
                <td className="px-4 py-3 capitalize">{payment.status}</td>
                <td className="px-4 py-3">{formatRestrictions(payment)}</td>
              </tr>
            ))}

            {payments.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-10 text-center text-neutral"
                >
                  No sales recorded yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
