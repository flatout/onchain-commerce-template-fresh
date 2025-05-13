"use client";

import { WagmiProvider, createConfig, http } from 'wagmi';
import { base } from 'viem/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create wagmi config
const config = createConfig({
  chains: [base],
  transports: {
    [base.id]: http(),
  },
  ssr: true,
});

export function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
} 