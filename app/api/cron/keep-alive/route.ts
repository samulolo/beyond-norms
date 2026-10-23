import type { NextRequest } from "next/server";

import { createAdminClient } from "@/supabase/admin";

// Mantém o projeto Supabase (plano gratuito) ativo: projetos sem
// atividade durante 7 dias são pausados. O Vercel Cron chama esta rota
// uma vez por dia (ver vercel.json) e fazemos uma consulta mínima à base
// de dados — só leitura, idempotente, segura se correr duas vezes.
export async function GET(request: NextRequest) {
  // A Vercel envia automaticamente `Authorization: Bearer <CRON_SECRET>`.
  // Sem CRON_SECRET configurada, a rota fica fechada (não abre por omissão).
  const cronSecret = process.env.CRON_SECRET;
  const authHeader = request.headers.get("authorization");

  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const supabase = createAdminClient();
    const { error } = await supabase
      .from("payments")
      .select("id", { head: true, count: "exact" });

    if (error) {
      console.log("Keep-alive: erro na consulta ao Supabase: ", error);
      return Response.json({ ok: false }, { status: 500 });
    }

    return Response.json({ ok: true, at: new Date().toISOString() });
  } catch (err) {
    console.log("Keep-alive: erro inesperado: ", err);
    return Response.json({ ok: false }, { status: 500 });
  }
}
