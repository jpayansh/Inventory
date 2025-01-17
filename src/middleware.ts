import queryDb from 'dbConfig/dbConfig';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname,
    isLogin = path === '/login';
  const token = request.cookies.get('token');

  if (token && isLogin) {
    // const user = await queryDb('SELECT * FROM users WHERE token = $1', [token]);
    // if (!user) {
    //   return NextResponse.redirect(new URL('/login', request.url));
    // }
    return NextResponse.redirect(new URL('/inventory/default', request.url));
  }
  if (!token && !isLogin) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/inventory/add-inventory',
    '/inventory/create-order',
    '/inventory/default',
    '/inventory/generate-invoice',
    '/inventory/data-tables',
    '/login',
  ],
};
