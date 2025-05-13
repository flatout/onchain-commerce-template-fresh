'use client';

import React from 'react';
import { OnchainKitProvider } from '@coinbase/onchainkit';
import { base } from 'viem/chains';
import '@coinbase/onchainkit/styles.css';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <OnchainKitProvider
          config={{
            appearance: {
              mode: 'dark',
            },
          }}
          chain={base}
        >
          {children}
        </OnchainKitProvider>
      </body>
    </html>
  );
} 