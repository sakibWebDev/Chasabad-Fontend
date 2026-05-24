// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.pathname;
  
  // Check if the URL contains encoded Bengali characters
  if (url.includes('%E0%A6')) {
    // Decode the URL
    const decodedUrl = decodeURIComponent(url);
    return NextResponse.redirect(new URL(decodedUrl, request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: '/seasonal/:path*',
};