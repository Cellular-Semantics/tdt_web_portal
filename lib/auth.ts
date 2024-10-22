import NextAuth from 'next-auth';
import type { NextAuthConfig } from 'next-auth'
import GitHub from 'next-auth/providers/github';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
  session: {
    strategy: 'jwt',
    // how long (seconds) a user's session is valid before expiring
    maxAge: 432000, // 5days
  },
}satisfies NextAuthConfig);
