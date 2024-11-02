import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Define public and private routes
  const publicRoutes = ['/login', '/signup', '/verifyemail'];
  const privateRoutes = ['/profile', '/build_pkg', '/package-details'];

  // Get the session token from the NextAuth.js cookie
  const session = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

  const isAuthenticated = !!session;

  // Check if the path matches any public or private routes
  const isPublicRoute = publicRoutes.includes(path);
  const isPrivateRoute = privateRoutes.includes(path);

  // Allow authenticated users to access the signup page without redirecting
  if (isPublicRoute && isAuthenticated) {
    if (path === '/login' || path === '/signup') {
      return NextResponse.next(); // Allow access for post-auth checks
    }
    return NextResponse.redirect(new URL('/', request.url)); // Redirect to home if authenticated
  }

  // If the user is not authenticated and tries to access a private page, redirect them to the login page
  if (isPrivateRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Allow the request to proceed if none of the above conditions match
  return NextResponse.next();
}

// Config for route matching
export const config = {
  matcher: [
    '/',
    '/login',
    '/signup',
    '/profile',
    '/verifyemail',
    '/about',
    '/services',
    '/packagesarchive',
    '/build_pkg',
    '/package-details'
  ],
};
