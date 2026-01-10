import { NextResponse } from "next/server";

export async function middleware(req: any) {
  const hasSessionCookie = req.cookies.has("my-app.session_token");

  console.log("Cookie: ", req.cookies.get("my-app.session_token"));

  if (!hasSessionCookie && req.nextUrl.pathname.startsWith("/add-food")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/add-food/:path*", "/my-listings/:path*"],
  runtime: "nodejs",
};
