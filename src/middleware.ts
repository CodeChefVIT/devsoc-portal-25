import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('auth-token')?.value;
  if (req.nextUrl.pathname === '/') {
    //Uncomment when login done
    if (token) {
      // return NextResponse.redirect(new URL('/dashboard', req.url));
    } else {
      // return NextResponse.redirect(new URL('/login', req.url));
    }
  }



  return NextResponse.next();
}

export const config = {
  matcher: ['/'], // Add more protected routes as needed
};
