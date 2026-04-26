import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.redirect(
    new URL("/admin/logged-out", process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000")
  );
  response.cookies.delete("lb-admin");
  return response;
}
