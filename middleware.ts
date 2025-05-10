import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;

  const isAuth = Boolean(token);
  const pathname = req.nextUrl.pathname;

  const isLogin = pathname.startsWith('/login');
  const isSignup = pathname.startsWith('/signup');
  const isAccount = pathname.startsWith('/account');
  const isFriends = pathname.startsWith('/friends');

  if (isAuth && (isLogin || isSignup)) {
    return NextResponse.redirect(new URL('/account', req.url));
  }

  if (!isAuth && (isAccount || isFriends)) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/login', '/signup', '/account', '/friends/:path*'],
};
