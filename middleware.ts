import { auth } from '@/lib/auth'
import { NextResponse } from "next/server.js"
 
const basePathEnv = process.env.NEXT_PUBLIC_NEXT_CONFIG_BASE_PATH || '';

export default auth((req) => {
  const protectedPaths = [`${basePathEnv}/taxonomies`, "/taxonomies"];

  const { pathname, search, origin, basePath } = req.nextUrl;
  console.log("Request pathname: " + pathname);
  console.log("Request search: " + search);
  console.log("Request origin: " + origin);
  console.log("Request basePath: " + basePath);
  // Check if the current path is protected
  const isProtectedPath = protectedPaths.some((path) =>
    req.nextUrl.pathname.startsWith(path)
  );

  // This is needed because NextAuth relies on nextUrl.bathPath which doesn't seem to be defined
  if (isProtectedPath && !req.auth) {
    const redirectUrl = new URL(`${basePathEnv}/login/`, origin);
    console.log('Redirecting to:' + redirectUrl.toString());
    // const redirectResponse = NextResponse.redirect(redirectUrl);
    const redirectResponse = NextResponse.redirect("http://0.0.0.0:3000/tdt/login/");
    redirectResponse.headers.forEach((value, key) => {
      console.log(`headers: ${key}: ${value}`);
    });
    return redirectResponse;
    // return NextResponse.redirect(
    //   `${req.nextUrl.origin}${basePathEnv}/login`
    // )
  }
})

// Don't invoke Middleware on some paths
export const config = {
  matcher: [`${basePathEnv}/taxonomies/:path*`,`${basePathEnv}/((?!api|_next/static|_next/image|favicon.ico|taxonomy.png|placeholder-user.jpg).*)`]
};
