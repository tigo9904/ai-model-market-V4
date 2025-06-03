import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { isAdminAuthenticatedFromCookies } from "@/lib/auth"

export function middleware(request: NextRequest) {
  // Get the pathname
  const path = request.nextUrl.pathname

  // Check if the path is for admin pages (except login)
  const isAdminPath = path.startsWith("/admin") && !path.startsWith("/admin/login")

  // If it's an admin path, check authentication
  if (isAdminPath) {
    const cookieHeader = request.headers.get("cookie") || ""
    const isAuthenticated = isAdminAuthenticatedFromCookies(cookieHeader)

    if (!isAuthenticated) {
      // Redirect to login with the original path as redirect parameter
      const url = new URL("/admin/login", request.url)
      url.searchParams.set("redirect", path)
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}

// Configure the middleware to run only on admin routes
export const config = {
  matcher: ["/admin/:path*"],
}
