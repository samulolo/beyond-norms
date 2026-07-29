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

### Imagens
`public/images/`. Substituir o ficheiro mantendo o mesmo nome evita
mexer em código. Para nomes novos, atualizar o `import` no componente
que usa a imagem (`Hero`, `Essence`, `Pillars`, `Harmony`, `Contact`).

### Texto de cada secção (Hero, Essence, Pillars, Schedule, Harmony)
Ainda está escrito diretamente no JSX de cada componente em
`components/sections/`. Não existe um ficheiro central de "copy" — para
mudar frases, editar o componente da secção correspondente.

## Variáveis de ambiente (`.env.local`)

| Variável | Para quê |
|---|---|
| `STRIPE_SECRET_KEY` | Chave da API Stripe. Modo teste e modo live têm chaves diferentes. |
| `STRIPE_WEBHOOK_SECRET` | Assina os eventos do webhook. Também diferente entre teste e live — ao lançar em produção, criar um novo endpoint no Dashboard da Stripe em modo live e copiar o secret de lá. |
| `NEXT_PUBLIC_SITE_URL` | Tem de ser o domínio real em produção (https). Se ficar em localhost, os redirects da Stripe e a imagem do produto no checkout partem-se. |
| `NEXT_RESEND_SECRET_KEY` | Chave da conta Resend, usada para enviar o email de confirmação. |
| `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Ligação à tabela `payments`, usada para não reenviar o email duas vezes para a mesma compra. |
| `NEXT_PUBLIC_EMAIL_CONTACT` | Email de contacto público, mostrado no site. |

## Dívida técnica conhecida (por resolver)

1. **`email/resend.ts` envia sempre para um endereço fixo**
   (`to: ['eliseufranco26@gmail.com']`), em vez do email do cliente
   (`to: [mailTo]`). Enquanto isto não for corrigido, nenhum cliente
   recebe de facto o email de confirmação — só chega a esse endereço
   fixo. Precisa também de um domínio verificado no Resend (o
   `from: 'Acme <onboarding@resend.dev>'` atual é o domínio sandbox, que
   só permite enviar para o próprio email da conta). **Bloqueador — não
   dar o projeto como concluído com isto por corrigir.**

2. **RLS da tabela `payments` no Supabase usa a chave anon/publishable**,
   que fica exposta no browser (prefixo `NEXT_PUBLIC_`). As políticas
   atuais permitem insert/select/update a qualquer pessoa com essa key.
   Recomendado migrar o webhook para usar a `service_role` key (só no
   servidor) antes de operar com pagamentos reais em maior escala.

3. **Não existe página de Política de Privacidade nem Termos de
   Serviço.** O site recolhe email, nome, telefone, morada implícita
   (restrições alimentares e alergias são dados de saúde na prática) —
   para operar na UE isto normalmente exige uma política de privacidade
   acessível, mesmo que simples. Não há nenhum link ativo para isso no
   site neste momento.

4. **Só existe 1 plano em `data/plans.ts`.** Se adicionarem mais planos
   no futuro, `createCheckoutSession` (`app/actions/checkout.ts`) precisa
   de passar a receber qual plano foi escolhido — hoje usa sempre
   `eventsPlans[0]`, ignorando os restantes.

5. **Metadata do site é mínima** (`app/layout.tsx`): título e descrição
   são só `"BeyondNorms"`, sem Open Graph nem imagem de partilha. Ao
   partilhar o link no WhatsApp/Instagram/Twitter, a pré-visualização
   fica genérica ou vazia.

## Onde está cada peça do fluxo de pagamento

1. Cliente clica "Reserve Experience" → vai para `/checkout`
   (`app/checkout/page.tsx`).
2. Preenche restrições alimentares/alergias →
   `components/checkout/checkout-form.tsx`.
3. Submete o formulário → `app/actions/checkout.ts` cria a sessão Stripe
   (com o nome/telefone pedidos pela própria Stripe, e as restrições
   alimentares na metadata) e redireciona para o checkout hospedado.
4. Stripe confirma o pagamento → chama
   `app/api/stripe/webhook/route.ts` (server-to-server, não depende do
   browser do cliente).
5. O webhook grava a compra em `payments` (Supabase, com verificação de
   idempotência) e envia o email de confirmação via `email/resend.ts`.
6. Stripe redireciona o browser do cliente para
   `app/payments/success/page.tsx` — só apresentação, não envia nada.

Para testar tudo isto localmente, é preciso o `stripe listen --forward-to
http://localhost:3000/api/stripe/webhook` a correr em paralelo ao
`npm run dev` (ver Stripe CLI).
