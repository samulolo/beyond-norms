-- Subscrições da newsletter (secção Newsletter da home).
-- Escrita: app/actions/newsletter.ts, com a publishable key.

create table if not exists public.newsletter (
  id uuid primary key default gen_random_uuid(),

  -- Único: a action trata o erro 23505 (duplicado) como "já subscrito".
  email text not null unique check (char_length(email) between 3 and 254),

  created_at timestamptz not null default now()
);

alter table public.newsletter enable row level security;

-- O site só pode inserir; ninguém lê a lista com a publishable key.
create policy "Anyone can subscribe to the newsletter"
  on public.newsletter for insert
  to anon, authenticated
  with check (true);
