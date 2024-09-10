import type { Metadata } from 'next';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import React from 'react';
import { Notifications } from '@mantine/notifications';

export const metadata: Metadata = {
  title: 'ShortURL',
  description: 'A simple URL shortener',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>ShortURL</title>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider>
          <Notifications position="top-right" limit={3} autoClose={5000} />
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
