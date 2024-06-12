import { NextRequest, NextResponse } from 'next/server';
import cookie from 'cookie';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const cookies = req.headers.get('cookie') || '';
  const { portal_access } = cookie.parse(cookies);

  if (!portal_access) {
    return NextResponse.redirect(new URL('/acesso-negado', req.url));
  }

  const user = JSON.parse(portal_access);
  
  const allowedPaths = user.folders.map((folder: { path: string }) => folder.path);
  
  const isPathAllowed = allowedPaths.some((allowedPath: string) => pathname.startsWith(`${allowedPath}`));

  if (!isPathAllowed) {
    return NextResponse.redirect(new URL('/acesso-negado', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};