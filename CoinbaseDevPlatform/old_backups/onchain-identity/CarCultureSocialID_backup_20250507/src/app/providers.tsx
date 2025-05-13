'use client';

import { OnchainKitProvider } from '@coinbase/onchainkit';
import { base } from 'viem/chains';
import { type ReactNode } from 'react';

export function Providers({ children }: { children: ReactNode }) {
  return (
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
  );
} 