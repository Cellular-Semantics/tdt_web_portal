import NextAuth from 'next-auth';

/**
 * Below are augmented interfaces on top of the default
 * next-auth interfaces https://next-auth.js.org/getting-started/typescript#main-module
 */
declare module 'next-auth' {
  interface Session {
    user: {
      username: string;
    } & DefaultSession['user']
  }
}