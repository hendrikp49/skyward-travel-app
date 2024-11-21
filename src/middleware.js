import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("token")?.value;
  const role = req.cookies.get("role")?.value;

  if (!token) {
    if (
      req.nextUrl.pathname.startsWith("/dashboard") ||
      req.nextUrl.pathname.startsWith("/user")
    ) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    } else {
      return NextResponse.next();
    }
  }

  if (role === "admin") {
    if (
      req.nextUrl.pathname === "/user/cart" ||
      req.nextUrl.pathname === "/user/my-transaction"
    ) {
      return NextResponse.redirect(new URL("/", req.url));
    } else {
      return NextResponse.next();
    }
  } else if (role === "user") {
    if (req.nextUrl.pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/", req.url));
    } else {
      return NextResponse.next();
    }
  }

  if (
    req.nextUrl.pathname === "/auth/login" ||
    req.nextUrl.pathname === "/auth/register"
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/user/:path*"],
};
