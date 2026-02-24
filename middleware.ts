import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("__Secure-my-app.session_token")?.value; // production version cookie name
  //const token = req.cookies.get("my-app.session_token")?.value; // development version cookie name

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/add-food/:path*", "/my-listings/:path*"],
};
