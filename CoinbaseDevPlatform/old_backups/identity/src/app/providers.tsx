'use client';

import { OnchainKitProvider } from '@coinbase/onchainkit';
import { base } from 'viem/chains';
import { type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { coinbaseWallet } from 'wagmi/connectors';

const config = createConfig({
  chains: [base],
  connectors: [
    coinbaseWallet({
      appName: 'CarCulture Identity',
    }),
  ],
  transports: {
    [base.id]: http(),
  },
});

const queryClient = new QueryClient();

export function Providers({ children }: { children: ReactNode }) {
  // Debug: Log the API key being used (first 6 chars only for security)
  const apiKey = process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY;
  console.log('API Key prefix:', apiKey?.substring(0, 6));
  
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <OnchainKitProvider
          apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
          chain={base}
          config={{
            appearance: {
              theme: 'default',
              mode: 'dark'
            }
          }}
        >
          {children}
        </OnchainKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
} 