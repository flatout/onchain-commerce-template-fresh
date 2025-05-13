'use client';

import React from 'react';
import { ConnectWallet, Wallet } from '@coinbase/onchainkit/wallet';
import { IdentityCard } from '@coinbase/onchainkit/identity';
import { NFTMintCard } from '@coinbase/onchainkit/nft';
import { base } from 'viem/chains';
import Head from 'next/head';
import { useAccount } from 'wagmi';
import TitleBar from './components/TitleBar';
import Footer from './components/Footer';
import NFTDetails from './components/NFTDetails';

const BASE_URL = process.env.NEXT_PUBLIC_URL || 'http://localhost:3001';

export default function App() {
  const { address } = useAccount();

  return (
    <div className="flex flex-col min-h-screen font-sans bg-black text-white">
      <Head>
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content={`${BASE_URL}/preview.png`} />
        <meta property="fc:frame:button:1" content="Mint NFT" />
        <meta property="fc:frame:post_url" content={`${BASE_URL}/api/frame`} />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
      </Head>

      <TitleBar />

      <main className="flex-grow flex items-center justify-center relative">
        <div className="max-w-4xl w-full p-4">
          <div className="flex flex-col items-center space-y-8">
            <div className="w-full max-w-lg">
              <div className="text-center mb-4">
                <h2 className="text-2xl font-bold text-white mb-2">Car of the Day</h2>
                <p className="text-gray-400">Mint your exclusive Car of the Day NFT on Base Network</p>
              </div>
              <NFTMintCard 
                contractAddress="0x44dF55B47F24B73190657fE9107Ca43234bbc21E"
                chain={base}
              />
              <NFTDetails 
                initialTitle="Rules of the Road 1"
                initialDescription="A unique NFT capturing the essence of road safety and driving culture."
              />
            </div>
          </div>
        </div>

        {/* Identity Card positioned at bottom left */}
        <div className="absolute bottom-8 left-8">
          <Wallet>
            {address ? (
              <div className="bg-gray-900 rounded-lg p-6">
                <IdentityCard
                  address={address}
                  chain={base}
                  schemaId="0xf8b05c79f090979bf4a80270aba232dff11a10d9ca55c4f88de95317970f0de9"
                />
              </div>
            ) : (
              <div className="text-center">
                <ConnectWallet>
                  <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                    Connect Wallet
                  </button>
                </ConnectWallet>
              </div>
            )}
          </Wallet>
        </div>
      </main>
      <Footer />
    </div>
  );
}
