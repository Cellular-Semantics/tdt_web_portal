import './globals.css';
import { auth } from '@/lib/auth'
import { SessionProvider } from 'next-auth/react';

export const metadata = {
  title: 'Taxonomy Development Platform',
  description:
    'A taxonomy management tool for building, curating and publishing BICAN taxonomies in a collaborative fashion.'
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const session = await auth()
  return (
    <html lang="en">
      <body className="flex min-h-screen w-full flex-col">
        <SessionProvider session={session} basePath="/tdt/api/auth">
            {children}
        </SessionProvider>
        </body>
    </html>
  );
}
