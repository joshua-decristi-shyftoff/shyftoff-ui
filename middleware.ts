import type { NextRequest } from "next/server";

import { NextResponse } from "next/server";

import { Profile } from "@/models/Profile";

/**
 * Auth middleware for route protection.
 *
 * @param request - Next.js request
 * @returns NextResponse to continue or redirect
 */
export const middleware = async (request: NextRequest) => {
  const publicPrefixes = ["/login", "/_next", "/favicon.ico", "/api/"];
  if (publicPrefixes.some(prefix => request.nextUrl.pathname.startsWith(prefix)))
    return NextResponse.next();

  // Redirects to login if invalid/expired
  if (!await Profile.validate())
    return NextResponse.redirect(new URL("/login", request.url));

  // If validate() returns a redirect, return it; otherwise continue
  return NextResponse.next();
};

/**
 * Middleware matcher configuration.
 */
export const config = {
  matcher: ["/((?!_next|favicon.ico|api|login).*)"],
};
