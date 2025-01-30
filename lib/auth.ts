import NextAuth from 'next-auth';
import type { NextAuthConfig, Profile } from 'next-auth'
// import GitHub from 'next-auth/providers/github';
import GitHubProvider from 'next-auth/providers/github';

const basePath = process.env.NEXT_PUBLIC_NEXT_CONFIG_BASE_PATH ?? ''

// Custom github provider to include username
const GitHub = GitHubProvider({
  clientId: process.env.AUTH_GITHUB_ID,
  clientSecret: process.env.AUTH_GITHUB_SECRET,
  profile(profile) {
    return {
      id: profile.id.toString(),
      name: profile.name,
      email: profile.email,
      image: profile.avatar_url,
      username: profile.login, // Add GitHub username
    };
  },
});

export const { handlers, signIn, signOut, auth } = NextAuth({
  basePath: `${basePath}/api/auth`,
  providers: [GitHub],
  session: {
    strategy: 'jwt',
    // how long (seconds) a user's session is valid before expiring
    maxAge: 432000, // 5days
  },
  callbacks: {
    async session({ session, token }: { session: any, token: any }) {
      if (token.profile) {
        session.user.username = token.profile.login;
      }
      return session;
    },
    async jwt({ token, user, profile }: { token: any, user: any, profile?: Profile }) {
      if (user) {
        token.user = user;
      }
      if (profile) {
        token.profile = profile;
      }
      return token;
    },
    async redirect({ url, baseUrl }) {
      // This is added to handle port 10235 issue on PROD
      // console.log('gh Redirecting to url:' + url);
      // console.log('gh Redirecting to baseUrl:' + baseUrl);
     return url
   }
 }
}satisfies NextAuthConfig);
