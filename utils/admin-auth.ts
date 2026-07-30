// Autenticação simples para /admin: uma única password guardada em
// ADMIN_PASSWORD (env var), sem tabela de utilizadores. O cookie de sessão
// guarda um hash SHA-256 da password, nunca a password em si.
//
// Usa Web Crypto (globalThis.crypto.subtle) em vez de "node:crypto" porque
// este ficheiro é importado tanto pelo middleware (Edge Runtime, que não
// suporta o módulo "crypto" do Node) como pelas Server Actions (Node
// Runtime). Web Crypto está disponível em ambos.

export const ADMIN_COOKIE_NAME = "admin_session";

export async function sha256Hex(input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);

  return Array.from(new Uint8Array(hashBuffer))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

/**
 * Token esperado no cookie de sessão, derivado da ADMIN_PASSWORD atual.
 * Devolve null se ADMIN_PASSWORD não estiver configurada — nesse caso o
 * acesso a /admin fica sempre bloqueado, em vez de aberto por omissão.
 */
export async function getExpectedAdminToken(): Promise<string | null> {
  const password = process.env.ADMIN_PASSWORD;

  if (!password) return null;

  return sha256Hex(password);
}
