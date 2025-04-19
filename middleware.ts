import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const supabase = createMiddlewareClient({ req: request, res: response });
  
  const {
    data: { session },
  } = await supabase.auth.getSession();
  
  // Check if the request is for an admin route
  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin');
  
  // If trying to access admin routes without being logged in, redirect to login
  if (isAdminRoute && !session) {
    const redirectUrl = new URL('/login', request.url);
    redirectUrl.searchParams.set('redirectTo', request.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }
  
  // If trying to access login page while already logged in, redirect to admin dashboard
  if (request.nextUrl.pathname === '/login' && session) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }
  
  return response;
}

export const config = {
  matcher: ['/admin/:path*', '/login'],
};
