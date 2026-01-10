import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("my-app.session_token")?.value;

  if (!token && req.nextUrl.pathname.startsWith("/add-food")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/add-food/:path*", "/my-listings/:path*"],
};
