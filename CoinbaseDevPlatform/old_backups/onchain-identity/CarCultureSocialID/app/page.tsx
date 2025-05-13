'use client';

import React from 'react';
import { ConnectWallet } from '@coinbase/onchainkit/wallet';
import { IdentityCard } from '@coinbase/onchainkit/identity';
import { NFTMintCard } from '@coinbase/onchainkit/nft';
import { base } from 'viem/chains';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24 bg-black text-white">
      <div className="max-w-4xl w-full space-y-8">
        <h1 className="text-4xl font-bold text-center">CarCulture</h1>
        <div className="flex flex-col items-center space-y-6">
          <ConnectWallet />
          <IdentityCard
            address="0x17284ef3be70b4079f7e22c737ddd87c55334f60"
            chain={base}
            schemaId="0xf8b05c79f090979bf4a80270aba232dff11a10d9ca55c4f88de95317970f0de9"
          />
          <NFTMintCard contractAddress="0x44dF55B47F24B73190657fE9107Ca43234bbc21E" />
        </div>
      </div>
    </div>
  );
}
