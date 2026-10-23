-- Pagamentos concluídos via Stripe Checkout.
-- Escrita: utils/process-payment.ts (webhook da Stripe e /payments/success),
-- sempre com SUPABASE_SERVICE_ROLE_KEY, que ignora RLS.
-- Leitura: dashboard /admin.

create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),

  -- id da Checkout Session da Stripe (cs_...). Único: é a chave do upsert
  -- idempotente (onConflict: "stripe_payment_id") em process-payment.ts.
  stripe_payment_id text not null unique,

  customer_email text not null,
  customer_name text,
  customer_phone text,

  -- "paid" quando gravado, "completed" depois de enviados os emails.
  status text not null,

  -- Evita enviar a confirmação duas vezes (webhook + página de sucesso).
  email_sent boolean not null default false,

  -- id da data em eventDates (utils/constant/const.ts), ex: "2026-09-21".
  event_date_id text,

  -- Valor real pago, em cêntimos, e moeda ("eur"), vindos da Stripe.
  amount_total integer,
  currency text,

  dietary_restrictions text[] not null default '{}',
  dietary_other text,
  has_allergies boolean not null default false,
  allergy_details text,

  created_at timestamptz not null default now()
);

-- O /admin ordena por data de compra.
create index if not exists payments_created_at_idx
  on public.payments (created_at desc);

-- RLS ligado e SEM policies: a publishable key (pública, vai no browser)
-- não consegue ler nem escrever. Só a service role key acede — estes
-- dados têm nomes, emails, telefones e alergias de clientes.
alter table public.payments enable row level security;
