import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const config = {
  matcher: "/admin/:path*",
};

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAuthenticated = request.cookies.get("lb-admin")?.value === "1";

  if (pathname === "/admin/login" || pathname === "/admin/logged-out") {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/admin/works", request.url));
    }
    return NextResponse.next();
  }

  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}
