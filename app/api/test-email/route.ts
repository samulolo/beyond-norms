import { NextResponse } from "next/server";

import { sendEmailConfirmation, sendSaleNotification } from "@/email/resend";

// Rota temporária de diagnóstico — testa o envio real dos dois emails a
// partir da produção (onde sabemos que o browser e a Resend já
// funcionaram antes), para isolar se o problema é a Resend/env vars ou
// outra coisa. Protegida pela ADMIN_PASSWORD para não ficar aberta a
// qualquer pessoa. APAGAR depois de diagnosticado (ver MAINTENANCE.md).
export async function GET(request: Request) {
  const url = new URL(request.url);
  const key = url.searchParams.get("key");
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword || key !== adminPassword) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const to = url.searchParams.get("to") ?? "eliseusamulolo@gmail.com";

  const envCheck = {
    NEXT_RESEND_SECRET_KEY: Boolean(process.env.NEXT_RESEND_SECRET_KEY),
    NEXT_PUBLIC_EMAIL_FROM: process.env.NEXT_PUBLIC_EMAIL_FROM ?? null,
    SUPABASE_SERVICE_ROLE_KEY: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY),
    NEXT_PUBLIC_SUPABASE_URL: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL),
  };

  const results: Record<string, unknown> = { to, envCheck };

  try {
    await sendEmailConfirmation(to, "Teste", "August 20", "2026", "BN-TESTE01");
    results.confirmationEmail = "ok";
  } catch (err) {
    results.confirmationEmail = {
      error: err instanceof Error ? err.message : String(err),
    };
  }

  try {
    await sendSaleNotification({
      customerEmail: to,
      customerName: "Teste",
      customerPhone: "+351 900 000 000",
      eventDate: "August 20",
      eventYear: "2026",
      orderId: "BN-TESTE01",
      amountTotal: "€85.00",
      dietaryRestrictions: ["Vegetarian"],
      dietaryOther: null,
      hasAllergies: false,
      allergyDetails: null,
    });
    results.saleNotificationEmail = "ok";
  } catch (err) {
    results.saleNotificationEmail = {
      error: err instanceof Error ? err.message : String(err),
    };
  }

  return NextResponse.json(results);
}
