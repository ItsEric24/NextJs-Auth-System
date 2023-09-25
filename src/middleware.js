import { NextResponse } from "next/server";

export function middleware(request) {
  const path = request.nextUrl.pathname;

  const publicPath = path === "/login" || path === "/signup";

  const token = request.cookies.get("user")?.value || "";

  if (publicPath && token) {
    return NextResponse.redirect(new URL("/profile", request.url));
  }

  if (!publicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/", "/profile/:path*", "/login", "/signup"],
};
