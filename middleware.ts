import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { NextRequest } from "next/server";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "dev-secret-change-in-production"
);

const publicPaths = ["/admin/login"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  // Redirect /admin directly to /admin/dashboard or /admin/login
  if (pathname === "/admin") {
    const token = request.cookies.get("saiseo-admin-token")?.value;
    if (token) {
      try {
        await jwtVerify(token, JWT_SECRET);
        return NextResponse.redirect(new URL("/admin/dashboard", request.url));
      } catch {
        // token invalid or expired, proceed to redirect to login
      }
    }
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  if (publicPaths.some((p) => pathname.startsWith(p))) {
    const token = request.cookies.get("saiseo-admin-token")?.value;
    if (token) {
      try {
        await jwtVerify(token, JWT_SECRET);
        return NextResponse.redirect(new URL("/admin/dashboard", request.url));
      } catch {
        // not authenticated, show login
      }
    }
    return NextResponse.next();
  }

  const token = request.cookies.get("saiseo-admin-token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  try {
    await jwtVerify(token, JWT_SECRET);
    return NextResponse.next();
  } catch {
    const response = NextResponse.redirect(
      new URL("/admin/login", request.url)
    );
    response.cookies.delete("saiseo-admin-token");
    return response;
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};

