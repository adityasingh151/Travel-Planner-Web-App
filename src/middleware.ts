import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Define public and private routes
  const publicRoutes = ['/login', '/signup', '/verifyemail'];
  const privateRoutes = ['/profile', '/build_pkg', '/packagesarchive'];

  // Get the session token from the NextAuth.js cookie
  const session = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

  const isAuthenticated = !!session;

  // Check if the path matches any public or private routes
  const isPublicRoute = publicRoutes.includes(path);
  const isPrivateRoute = privateRoutes.includes(path);

  // If the user is authenticated and tries to access a public page, redirect them to the home page
  if (isPublicRoute && isAuthenticated) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // If the user is not authenticated and tries to access a private page, redirect them to the login page
  if (isPrivateRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Allow the request to proceed if none of the above conditions match
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
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
  ],
};
