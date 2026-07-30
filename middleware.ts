import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { ADMIN_COOKIE_NAME, getExpectedAdminToken } from "@/utils/admin-auth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // A própria página de login tem de ficar acessível sem sessão, senão
  // ninguém consegue autenticar-se.
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  const expectedToken = await getExpectedAdminToken();
  const cookieValue = request.cookies.get(ADMIN_COOKIE_NAME)?.value;

  if (!expectedToken || cookieValue !== expectedToken) {
    const loginUrl = new URL("/admin/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
