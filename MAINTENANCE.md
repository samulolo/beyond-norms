# Guia de Manutenção

Este documento é para quem for alterar este projeto no futuro — pode ser
outro developer, ou eu daqui a uns meses. Lista onde mexer para os pedidos
de alteração mais prováveis, e sinaliza a dívida técnica conhecida para não
se perder de vista.

## Alterações de conteúdo mais comuns

### Preço do bilhete
Fonte única: `data/plans.ts`, campo `price` de cada plano.
`app/actions/checkout.ts` (cria a sessão Stripe) e
`components/sections/pricing.tsx` (mostra o preço no site) leem ambos
daqui. **Não voltar a escrever o valor à parte** 

### Datas do evento
`utils/constant/const.ts` → `eventDates`. A escolha real acontece em
`/checkout` (`components/checkout/checkout-form.tsx`) — a Hero mostra as
datas só como texto informativo, não como seletor. A data escolhida
segue via metadata da Stripe até ao webhook, à tabela `payments` e ao
email de confirmação.

### Horários (Soul Speed Dating / Dinner Show)
`utils/constant/const.ts` → `soulSpeedDatingTime`, `dinnerShowTime`.
Usados em `components/sections/schedule.tsx` e em
`components/email-template.tsx`.

### FAQs
`components/sections/faq.tsx` → array `faqs` no topo do ficheiro.

### Dados de contacto
`utils/constant/const.ts` → `organizerName`, `eventAddress`,
`contactPhoneDisplay` / `contactPhoneHref`, `contactEmail`,
`instagramHandle` / `instagramUrl`. Usados no `Footer`, na secção
`Contact` e no rodapé do email de confirmação. Mudar aqui propaga aos
três sítios automaticamente.

### Restrições alimentares (formulário em `/checkout`)
`utils/constant/const.ts` → `dietaryRestrictionOptions`.

### Indicativos de país (telefone em `/checkout`)
`utils/constant/country-codes.ts` → `countryCodes`. Lista curada, não
exaustiva — para adicionar um país novo, basta acrescentar uma entrada.
`defaultCountryCodeId` controla qual vem pré-selecionado (hoje: Portugal).

### Política de Privacidade
`app/privacy-policy/page.tsx`. Ligada no `Footer` e por baixo do botão de
submeter em `/checkout`. **Texto escrito por mim como ponto de partida —
não é aconselhamento jurídico.** Dado que o formulário recolhe dados de
alergias (dados de saúde na prática), vale a pena um advogado rever isto
antes de operar com clientes reais em maior escala, especialmente a parte
de base legal/consentimento.

### Imagens
`public/images/`. Substituir o ficheiro mantendo o mesmo nome evita
mexer em código. Para nomes novos, atualizar o `import` no componente
que usa a imagem (`Hero`, `Essence`, `Pillars`, `Harmony`, `Contact`).

### Texto de cada secção (Hero, Essence, Pillars, Schedule, Harmony)
Ainda está escrito diretamente no JSX de cada componente em
`components/sections/`. Não existe um ficheiro central de "copy" — para
mudar frases, editar o componente da secção correspondente.

### Dashboard de admin (`/admin`)
Ver secção própria mais abaixo.

## Variáveis de ambiente (`.env.local`)

| Variável | Para quê |
|---|---|
| `STRIPE_SECRET_KEY` | Chave da API Stripe. Modo teste e modo live têm chaves diferentes. |
| `STRIPE_WEBHOOK_SECRET` | Assina os eventos do webhook. Também diferente entre teste e live — ao lançar em produção, criar um novo endpoint no Dashboard da Stripe em modo live e copiar o secret de lá. |
| `NEXT_PUBLIC_SITE_URL` | Tem de ser o domínio real em produção (https). Se ficar em localhost, os redirects da Stripe e a imagem do produto no checkout partem-se. |
| `NEXT_RESEND_SECRET_KEY` | Chave da conta Resend, usada para enviar o email de confirmação. |
| `NEXT_PUBLIC_EMAIL_FROM` | Remetente do email de confirmação, formato `"Nome <email@dominio.com>"`. O domínio tem de estar verificado no Resend. |
| `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Ligação à tabela `payments`, usada para não reenviar o email duas vezes para a mesma compra, e para o dashboard de admin ler as vendas. |
| `NEXT_PUBLIC_EMAIL_CONTACT` | Email de contacto público, mostrado no site. |
| `ADMIN_PASSWORD` | Password única para entrar em `/admin`. Sem esta env definida, `/admin` fica sempre inacessível (por segurança, não abre por omissão). |

## Dashboard de admin (`/admin`)

Mostra estatísticas de vendas (bilhetes vendidos, receita total, vendas
por data do evento) e a lista de reservas (nome, email, telefone, data,
estado, restrições alimentares/alergias), lida diretamente da tabela
`payments` no Supabase.

**Autenticação**: password única via `ADMIN_PASSWORD`, sem sistema de
contas. `middleware.ts` protege todas as rotas `/admin/*` (exceto
`/admin/login`) verificando um cookie httpOnly que guarda um hash
SHA-256 da password (`utils/admin-auth.ts`) — a password em si nunca é
guardada no cookie. `app/actions/admin.ts` trata do login/logout.

Isto é adequado para um único administrador de confiança. Se no futuro
mais pessoas precisarem de acesso com permissões diferentes, vale a pena
migrar para Supabase Auth em vez de continuar a esticar este esquema de
password única.

**Antes de usar**: correr o SQL abaixo no Supabase para garantir que a
tabela `payments` tem a coluna `created_at` (necessária para ordenar a
lista por data de compra):

```sql
alter table payments
  add column if not exists created_at timestamptz not null default now();

notify pgrst, 'reload schema';
```

Para a receita da dashboard refletir o valor real pago em cada checkout
(e não o preço atual em `data/plans.ts`), a tabela também deve guardar o
total vindo da Stripe:

```sql
alter table payments
  add column if not exists amount_total integer,
  add column if not exists currency text;

notify pgrst, 'reload schema';
```

## Dívida técnica conhecida (por resolver)

1. **RLS da tabela `payments` no Supabase usa a chave anon/publishable**,
   que fica exposta no browser (prefixo `NEXT_PUBLIC_`). As políticas
   atuais permitem insert/select/update a qualquer pessoa com essa key.
   O dashboard de admin lê a mesma tabela com a mesma key — a proteção
   de `/admin` é só a password, não o RLS. Recomendado migrar o webhook
   (e o admin) para usar a `service_role` key (só no servidor) antes de
   operar com pagamentos reais em maior escala.

2. **Não existem Termos de Serviço.** Só a Política de Privacidade foi
   criada (`app/privacy-policy/page.tsx`). Termos de Serviço (política de
   reembolso, regras de conduta no evento, idade mínima, etc.) continuam
   por escrever.

3. **Só existe 1 plano em `data/plans.ts`.** Se adicionarem mais planos
   no futuro, `createCheckoutSession` (`app/actions/checkout.ts`) precisa
   de passar a receber qual plano foi escolhido — hoje usa sempre
   `eventsPlans[0]`, ignorando os restantes.

4. **Autenticação de `/admin` é password única, sem rate limiting.** Não
   há proteção contra tentativas repetidas de login (brute force). Baixo
   risco enquanto for só uso interno, mas vale a pena rever se o link
   circular mais.

## Onde está cada peça do fluxo de pagamento

1. Cliente clica "Reserve Experience" → vai para `/checkout`
   (`app/checkout/page.tsx`).
2. Preenche nome, telefone (com indicativo de país), data do evento e
   restrições alimentares/alergias → `components/checkout/checkout-form.tsx`.
3. Submete o formulário → `app/actions/checkout.ts` cria a sessão Stripe
   (nome/telefone/restrições vão na metadata da sessão — a Stripe só
   trata do pagamento em si) e redireciona para o checkout hospedado.
4. Stripe confirma o pagamento → chama
   `app/api/stripe/webhook/route.ts` (server-to-server, não depende do
   browser do cliente).
5. O webhook grava a compra em `payments` (Supabase, com verificação de
   idempotência), gera um número de bilhete (`BN-` + últimos 8
   caracteres do `session.id`, em maiúsculas — não é guardado à parte,
   é sempre recalculado a partir do `stripe_payment_id`) e envia o email
   de confirmação via `email/resend.ts`.
6. Stripe redireciona o browser do cliente para
   `app/payments/success/page.tsx` — só apresentação, não envia nada.

Para testar tudo isto localmente, é preciso o `stripe listen --forward-to
http://localhost:3000/api/stripe/webhook` a correr em paralelo ao
`npm run dev` (ver Stripe CLI).
