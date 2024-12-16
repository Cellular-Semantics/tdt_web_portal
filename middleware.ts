import { auth } from '@/lib/auth'
import { NextResponse } from "next/server.js"
 
const basePath = process.env.NEXT_PUBLIC_NEXT_CONFIG_BASE_PATH || '';

export default auth((req) => {
  const protectedPaths = [`${basePath}/taxonomies`, "/taxonomies"];

  // Check if the current path is protected
  const isProtectedPath = protectedPaths.some((path) =>
    req.nextUrl.pathname.startsWith(path)
  );

  // This is needed because NextAuth relies on nextUrl.bathPath which doesn't seem to be defined
  if (isProtectedPath && !req.auth) {
    return NextResponse.redirect(
      `${req.nextUrl.origin}${basePath}/login`
    )
  }
})

// Don't invoke Middleware on some paths
export const config = {
  matcher: [`${basePath}/taxonomies/:path*`,`${basePath}/((?!api|_next/static|_next/image|favicon.ico|taxonomy.png|placeholder-user.jpg).*)`]
};
