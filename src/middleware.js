import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("token")?.value;
  const role = req.cookies.get("role")?.value;
  const pathname = req.nextUrl.pathname;
  const response = NextResponse.next();

  if (!token) {
    if (pathname.startsWith("/dashboard") || pathname.startsWith("/user")) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    } else {
      return response;
    }
  }

  if (token && pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (role === "admin") {
    if (pathname === "/user/cart" || pathname === "/user/my-transaction") {
      return NextResponse.redirect(new URL("/", req.url));
    } else {
      return response;
    }
  } else if (role === "user") {
    if (pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/", req.url));
    } else {
      return response;
    }
  }
  return response;
}

export const config = {
  matcher: ["/dashboard/:path*", "/auth/:path*", "/user/:path*"],
};
