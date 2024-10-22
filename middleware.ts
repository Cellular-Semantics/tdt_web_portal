import { auth } from '@/lib/auth'
import { NextResponse } from "next/server.js"
 
export default auth((req) => {
  const protectedPaths = ['/taxonomies'];

  // Check if the current path is protected
  const isProtectedPath = protectedPaths.some((path) =>
    req.nextUrl.pathname.startsWith(path)
  );

  // This is needed because NextAuth relies on nextUrl.bathPath which doesn't seem to be defined
  if (isProtectedPath && !req.auth) {
    return NextResponse.redirect(
      `${req.nextUrl.origin}/login`
    )
  }
})

// Don't invoke Middleware on some paths
export const config = {
  matcher: ['/taxonomies/:path*','/((?!api|_next/static|_next/image|favicon.ico).*)']
};
