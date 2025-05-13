'use client';

import React from 'react';
import { ConnectWallet } from '@coinbase/onchainkit/wallet';
import { IdentityCard } from '@coinbase/onchainkit/identity';
import { base } from 'viem/chains';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center gap-8">
          <h1 className="text-3xl font-bold">CarCulture Identity</h1>
          <ConnectWallet />
          <div className="w-full max-w-xl">
            <IdentityCard
              address="0x1c6d27a76f4f706cccb698acc236c31f886c5421"
              chain={base}
              schemaId="0xf8b05c79f090979bf4a80270aba232dff11a10d9ca55c4f88de95317970f0de9"
            />
          </div>
        </div>
      </main>
    </div>
  );
} 