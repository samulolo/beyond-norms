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
| `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Ligação pública ao Supabase, usada para inserir subscrições da newsletter e feedback. A publishable key não deve ser `service_role`. |
| `SUPABASE_SERVICE_ROLE_KEY` | Chave server-only usada pelo webhook da Stripe para gravar/atualizar `payments` e pelo dashboard `/admin` para os ler (a tabela tem RLS sem policies). Configurar na Vercel sem prefixo `NEXT_PUBLIC_`. |
| `NEXT_PUBLIC_EMAIL_CONTACT` | Email de contacto público, mostrado no site. |
| `SALE_NOTIFICATION_EMAIL` | Para onde vai o aviso interno de "nova compra recebida" (ver `utils/constant/const.ts`). Sem esta env, usa `nande.vahekeni@beyondnorms.net` por omissão. |
| `FEEDBACK_NOTIFICATION_EMAIL` | Para onde vai o aviso interno de "novo feedback" enviado a cada submissão em `/feedback`. Sem esta env, usa o mesmo destino de `SALE_NOTIFICATION_EMAIL`. |
| `ADMIN_PASSWORD` | Password única para entrar em `/admin`. Sem esta env definida, `/admin` fica sempre inacessível (por segurança, não abre por omissão). |
| `CRON_SECRET` | Segredo do Vercel Cron (string aleatória, 16+ caracteres). A Vercel envia-o no header `Authorization` ao chamar `/api/cron/keep-alive`; sem ele a rota responde sempre 401. |

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

**Base de dados**: a tabela `payments` é criada pela migration
`supabase/migrations/20261023000001_create_payments.sql` (ver secção
"Base de dados (Supabase)").

## Página de feedback (`/feedback`)

Formulário simples (nome, email e mensagem) para os participantes dizerem o que
acharam da experiência. A server action está em `app/actions/feedback.ts`
e grava na tabela `feedback` do Supabase com a publishable key. Tem um
campo escondido (honeypot `website`) contra bots de spam.

A cada feedback gravado, é enviado um aviso por email (`sendFeedbackNotification`
em `email/resend.ts`) para `FEEDBACK_NOTIFICATION_EMAIL`, com o reply-to
apontado para o email da pessoa — basta responder ao aviso para lhe
escrever. Se o envio falhar, o feedback fica gravado na mesma.

**Base de dados**: a tabela `feedback` é criada pela migration
`supabase/migrations/20261023000003_create_feedback.sql`. A policy só
permite **inserir** a partir do site — ninguém consegue ler as mensagens
com a publishable key; para as ver, usar o Table Editor do Supabase.

## Base de dados (Supabase)

O esquema completo está em `supabase/migrations/`, um ficheiro por tabela,
por ordem:

| Migration | Tabela | Quem escreve |
| --- | --- | --- |
| `20261023000001_create_payments.sql` | `payments` | Webhook da Stripe / `/payments/success` (service role key) |
| `20261023000002_create_newsletter.sql` | `newsletter` | Secção Newsletter (publishable key, só insert) |
| `20261023000003_create_feedback.sql` | `feedback` | Página `/feedback` (publishable key, só insert) |

**Base de dados nova**: correr os três ficheiros por ordem no SQL Editor
do Supabase, ou, com a Supabase CLI ligada ao projeto, `supabase db push`.

Todas as tabelas têm RLS ligado. `payments` não tem nenhuma policy: só a
`SUPABASE_SERVICE_ROLE_KEY` lhe acede, porque guarda dados pessoais e de
saúde (alergias) dos clientes.

**Alterações futuras ao esquema**: criar um ficheiro novo em
`supabase/migrations/` (ex: `20261101000001_add_x_to_payments.sql`) em vez
de editar os existentes.

## Keep-alive do Supabase (Vercel Cron)

O plano gratuito do Supabase pausa projetos sem atividade durante 7
dias. `vercel.json` agenda uma chamada diária a `/api/cron/keep-alive`
(`app/api/cron/keep-alive/route.ts`), que faz uma consulta mínima de
leitura à tabela `payments`.

- Horário: `0 4 * * *` em **UTC** — 4h em Lisboa no inverno, 5h no
  verão. No plano Hobby a Vercel pode disparar a qualquer minuto dessa
  hora.
- Segurança: precisa da env `CRON_SECRET` na Vercel.
- Ver execuções: Vercel → projeto → Settings → Cron Jobs → View Logs.
- A Vercel não repete uma execução falhada; um dia falhado não é
  problema (a pausa só acontece ao fim de 7 dias).

## Dívida técnica conhecida (por resolver)

1. **Não existem Termos de Serviço.** Só a Política de Privacidade foi
   criada (`app/privacy-policy/page.tsx`). Termos de Serviço (política de
   reembolso, regras de conduta no evento, idade mínima, etc.) continuam
   por escrever.

2. **Só existe 1 plano em `data/plans.ts`.** Se adicionarem mais planos
   no futuro, `createCheckoutSession` (`app/actions/checkout.ts`) precisa
   de passar a receber qual plano foi escolhido — hoje usa sempre
   `eventsPlans[0]`, ignorando os restantes.

3. **Autenticação de `/admin` é password única, sem rate limiting.** Não
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
4. A gravação em `payments` e o envio dos emails (confirmação ao cliente +
   aviso interno de venda) estão centralizados em
   `utils/process-payment.ts` (`processCompletedCheckout`), gera um
   número de bilhete (`BN-` + últimos 8 caracteres do `session.id`, em
   maiúsculas — não é guardado à parte, é sempre recalculado a partir do
   `stripe_payment_id`), grava com verificação de idempotência (chave
   `stripe_payment_id` + flag `email_sent`) e deixa o evento do PostHog a
   correr depois via `after()`. É chamado a partir de **dois sítios**,
   por causa do problema de conectividade abaixo:
   - `app/api/stripe/webhook/route.ts` — o caminho "oficial",
     server-to-server, chamado pela Stripe.
   - `app/payments/success/page.tsx` — rede de segurança, chamado quando
     o browser do próprio cliente carrega a página de sucesso ao voltar
     do checkout hospedado.
5. Stripe redireciona o browser do cliente para
   `app/payments/success/page.tsx`, que busca a sessão completa (via
   `session_id` no URL) e chama `processCompletedCheckout` também — ver
   nota abaixo sobre porquê.

Para testar tudo isto localmente, é preciso o `stripe listen --forward-to
http://localhost:3000/api/stripe/webhook` a correr em paralelo ao
`npm run dev` (ver Stripe CLI).

### Falhas de conectividade do webhook (10 de agosto de 2026)

A partir de 4 de agosto de 2026, o endpoint `/api/stripe/webhook` começou
a falhar entregas vindas da Stripe com o erro **"Failed to connect to
remote host"** — uma falha de ligação pura (DNS/TCP/TLS), não um erro da
aplicação. Foi investigado e descartado, por esta ordem: tempo de
execução da função (corrigido com `maxDuration` + `after()`, mas não
resolveu sozinho), DNS (confirmado correto — CNAME válido para a
Vercel), Firewall/Bot Protection do projeto (nada configurado), e o
plano Hobby da Vercel (fez-se upgrade para Pro, e continuou a falhar).
Pedidos vindos do browser (`/checkout`, `/`) chegam sempre; só o
servidor-a-servidor da Stripe é afetado — por isso `processCompletedCheckout`
passou a ser chamado também a partir de `app/payments/success/page.tsx`,
que é carregada pelo browser do próprio cliente e por isso chega sempre.
Isto garante que a compra fica registada e os emails saem mesmo enquanto
a causa raiz da falha do webhook não for encontrada (candidato mais
provável por eliminação: algo na rede entre a Stripe e a Vercel,
possivelmente a resolver com o suporte da Vercel, já acessível no plano
Pro). Se o webhook voltar a funcionar normalmente, este código não
precisa de ser revertido — a idempotência por `stripe_payment_id` torna
seguro ter os dois caminhos ativos ao mesmo tempo.
