import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const config = {
  matcher: "/admin/:path*",
};

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/admin/login" || pathname === "/admin/logged-out") {
    return NextResponse.next();
  }

  const auth = request.cookies.get("lb-admin");
  if (auth?.value !== "1") {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}
