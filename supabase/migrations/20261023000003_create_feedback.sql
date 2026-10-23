-- Feedback dos participantes (página /feedback).
-- Escrita: app/actions/feedback.ts, com a publishable key.

create table if not exists public.feedback (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 100),
  email text not null check (char_length(email) between 3 and 254),
  message text not null check (char_length(message) between 1 and 2000),
  created_at timestamptz not null default now()
);

alter table public.feedback enable row level security;

-- O site só pode inserir; para ler, usar o Table Editor do Supabase.
create policy "Anyone can submit feedback"
  on public.feedback for insert
  to anon, authenticated
  with check (true);
