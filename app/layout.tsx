import './globals.css';

import { Analytics } from '@vercel/analytics/react';

export const metadata = {
  title: 'Taxonomy Development Tools',
  description:
    'A taxonomy management tool for building, curating and publishing BICAN taxonomies in a collaborative fashion.'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen w-full flex-col">{children}</body>
      <Analytics />
    </html>
  );
}
