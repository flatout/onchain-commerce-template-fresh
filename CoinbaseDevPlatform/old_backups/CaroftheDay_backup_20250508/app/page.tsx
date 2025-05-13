'use client';

import React from 'react';
import { ConnectWallet } from '@coinbase/onchainkit/wallet';
import { IdentityCard } from '@coinbase/onchainkit/identity';
import { NFTMintCard } from '@coinbase/onchainkit/nft';
import { base } from 'viem/chains';
import ImageSvg from './svg/Image';
import OnchainkitSvg from './svg/OnchainKit';
import Head from 'next/head';

export default function App() {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-black text-white">
      <Head>
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="https://car-of-the-1am6jcqne-flatouts-projects.vercel.app/preview.png" />
        <meta property="fc:frame:button:1" content="Button 1" />
        <meta property="fc:frame:button:2" content="Button 2" />
        <meta property="fc:frame:post_url" content="https://car-of-the-1am6jcqne-flatouts-projects.vercel.app/api/frame" />
      </Head>

      <header className="pt-4 pr-4">
        <div className="flex justify-end">
          <div className="wallet-container">
            <ConnectWallet />
          </div>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center">
        <div className="max-w-4xl w-full p-4">
          <div className="w-1/3 mx-auto mb-6">
            <ImageSvg />
          </div>
          <div className="flex justify-center mb-6">
            <a target="_blank" rel="_template" href="https://onchainkit.xyz">
              <OnchainkitSvg className="text-white" />
            </a>
          </div>
          <div className="flex flex-col items-center space-y-8">
            <IdentityCard
              address="0x17284ef3be70b4079f7e22c737ddd87c55334f60"
              chain={base}
              schemaId="0xf8b05c79f090979bf4a80270aba232dff11a10d9ca55c4f88de95317970f0de9"
            />
            <div className="w-full max-w-lg">
              <div className="text-center mb-4">
                <h2 className="text-2xl font-bold text-white mb-2">Car of the Day</h2>
                <p className="text-gray-400">Mint your exclusive Car of the Day NFT</p>
              </div>
              <NFTMintCard contractAddress="0x44dF55B47F24B73190657fE9107Ca43234bbc21E" />
            </div>
            <p className="text-center text-gray-300">
              Get started by editing
              <code className="p-1 ml-1 rounded bg-gray-800">app/page.tsx</code>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
