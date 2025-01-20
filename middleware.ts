import { auth } from '@/lib/auth'
import { NextResponse } from "next/server"
 
const basePathEnv = process.env.NEXT_PUBLIC_NEXT_CONFIG_BASE_PATH || '';
const originInternal = process.env.NEXT_PUBLIC_ORIGIN_INTERNAL || '';

export default auth((req: { nextUrl: { pathname: any; search?: any; origin?: any; basePath?: any; }; auth: any; }) => {
  const protectedPaths = [`${basePathEnv}/taxonomies`, "/taxonomies", `${basePathEnv}/mytaxonomies`, "/mytaxonomies"];

  const { pathname, search, origin, basePath } = req.nextUrl;
  console.log("Request pathname: " + pathname);
  console.log("Request search: " + search);
  console.log("Request origin: " + origin);
  console.log("Request basePath: " + basePath);
  console.log("Request basePathEnv: " + basePathEnv);
  // Check if the current path is protected
  const isProtectedPath = protectedPaths.some((path) =>
    req.nextUrl.pathname.startsWith(path)
  );

  console.log('Experiment rewrite');
  // This is needed because NextAuth relies on nextUrl.bathPath which doesn't seem to be defined
  console.log("isProtectedPath: " + isProtectedPath);
  console.log("req.auth: " + req.auth);
  if (isProtectedPath && !req.auth) {
    const redirectUrl = new URL(`${basePathEnv}/login/`, origin);
    console.log('Redirecting to:' + redirectUrl.toString());
    // const redirectResponse = NextResponse.redirect(redirectUrl);
    // const redirectResponse = NextResponse.redirect("http://0.0.0.0:3000/tdt/login/", 301);
    // const redirectResponse = NextResponse.redirect("https://cellular-semantics.sanger.ac.uk/tdt/login/");
    // console.log('Redirect to:' + "https://cellular-semantics.sanger.ac.uk/tdt/login/");

    const newUrl = new URL(`${basePathEnv}/login/`, "https://cellular-semantics.sanger.ac.uk"); 
    newUrl.pathname = `${basePathEnv}/login/`
    console.log('Rewrite to:' + newUrl.toString());
    return NextResponse.rewrite(newUrl);
    // return redirectResponse;
  }
})

// Don't invoke Middleware on some paths
export const config = {
  matcher: [`${basePathEnv}/taxonomies/:path*`,`${basePathEnv}/((?!api|_next/static|_next/image|favicon.ico|taxonomy.png|placeholder-user.jpg).*)`]
};
