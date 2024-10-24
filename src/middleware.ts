import { NextRequest, NextResponse } from "next/server";

export function middleware(request:NextRequest) {
    const path = request.nextUrl.pathname

    const publicUrl = path === '/login' || path === '/signup' || path === '/verifyemail'
    const privateUrl = path ==='/profile' || path === 'build_pkg' || path === 'packagesarchive'

    const token = request.cookies.get("token")?.value || ""
    // console.log(token)

    if(publicUrl && token) {
        
        return NextResponse.redirect(new URL('/', request.url))
    } else if(privateUrl && !token) {
        return NextResponse.redirect(new URL('/login', request.url))
    } 
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
  }