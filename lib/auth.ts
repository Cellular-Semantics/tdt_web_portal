import NextAuth from 'next-auth';
import type { NextAuthConfig } from 'next-auth'
import GitHub from 'next-auth/providers/github';

const basePath = process.env.NEXT_PUBLIC_NEXT_CONFIG_BASE_PATH ?? ''

export const { handlers, signIn, signOut, auth } = NextAuth({
  basePath: `${basePath}/api/auth`,
  providers: [GitHub],
  session: {
    strategy: 'jwt',
    // how long (seconds) a user's session is valid before expiring
    maxAge: 432000, // 5days
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      // if (url.startsWith("/")) return `${baseUrl}${url}`

      // Allows callback URLs on the same origin
      // if (new URL(url).origin === baseUrl) return url
      console.log('gh Redirecting to url:' + url);
      console.log('gh Redirecting to baseUrl:' + baseUrl);

     return url
   }
 }
}satisfies NextAuthConfig);
