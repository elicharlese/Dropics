import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // For demo purposes, we'll use a simple cookie to check if the user is authenticated
  const isAuthenticated = request.cookies.has("authenticated")

  // Get the pathname of the request
  const pathname = request.nextUrl.pathname

  // Define auth routes
  const authRoutes = ["/signin", "/signup", "/forgot-password", "/reset-password", "/verify-email"]

  // Define protected routes
  const protectedRoutes = ["/account", "/checkout"]

  // Check if the route is protected
  const isProtectedRoute = protectedRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`))

  // Check if the route is an auth route
  const isAuthRoute = authRoutes.some((route) => pathname === route)

  // If the route is protected and the user is not authenticated, redirect to signin
  if (isProtectedRoute && !isAuthenticated) {
    const url = new URL("/signin", request.url)
    url.searchParams.set("callbackUrl", encodeURI(pathname))
    return NextResponse.redirect(url)
  }

  // If the route is an auth route and the user is authenticated, redirect to account
  if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(new URL("/account", request.url))
  }

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/account/:path*",
    "/checkout/:path*",
    "/signin",
    "/signup",
    "/forgot-password",
    "/reset-password",
    "/verify-email",
  ],
}

