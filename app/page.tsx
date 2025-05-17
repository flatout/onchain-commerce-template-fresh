"use client";

// ... existing code ...
import React from 'react';
import Head from 'next/head';
import TitleBar from './components/TitleBar';
import Image from 'next/image';
import { NFTMintCard } from '@coinbase/onchainkit/nft';
import { IdentityCard } from '@coinbase/onchainkit/identity';
import { base } from 'viem/chains';
import { useAccount } from 'wagmi';
// Removed: import { ConnectButton } from '@coinbase/onchainkit';

const BASE_URL = process.env.NEXT_PUBLIC_URL || 'http://localhost:3001';

export default function App() {
  const { address } = useAccount();
  console.log("Wallet address:", address);

  return (
    <>
      <div>THIS IS APP/PAGE.TSX</div>
      <div className="w-full flex justify-center pt-8 pb-4 bg-black">
        <Image
          src="/carculture-wing-logo.png"
          alt="CarCulture Logo"
          width={68}
          height={23}
          className="object-contain"
          priority
        />
      </div>
      <div className="flex flex-col min-h-screen font-sans bg-black text-white">
        <Head>
          <meta property="fc:frame" content="vNext" />
          <meta property="fc:frame:image" content={`${BASE_URL}/preview.png`} />
          <meta property="fc:frame:button:1" content="Mint NFT" />
          <meta property="fc:frame:post_url" content={`${BASE_URL}/api/frame`} />
          <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        </Head>

        <TitleBar />

        <main className="flex-grow flex flex-col items-center justify-center relative">
          <div className="max-w-4xl w-full p-4 flex flex-col items-center justify-center">
            <div className="flex flex-col items-center space-y-8">
              <div className="w-full max-w-lg flex flex-col items-center">
                <div className="text-center mb-4">
                  <div className="text-lg font-semibold text-white mb-1" style={{ fontSize: '21px' }}>
                    Celebrating the Art and Provenance of the Automobile
                  </div>
                  <p className="text-gray-400 text-center text-sm leading-tight" style={{ fontSize: '13px' }}>
                    Mint your exclusive Car of the Day NFT on Base Mainnet and click the Drivr gearshift below to chat with our car-savvy agent!
                  </p>
                </div>
                <div className="flex flex-col items-center w-full">
                  <NFTMintCard
                    contractAddress="0x8ef0772347e0caed0119937175d7ef9636ae1aa0"
                    tokenId="15"
                  />
                  {address && (
                    <div className="mt-4 w-full max-w-lg">
                      <IdentityCard
                        address={address}
                        chain={base}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* Drivr Gearshift Activation Button */}
          <div className="flex flex-col items-center mt-4">
            <button
              onClick={() => {
                alert('AgentKit activation coming soon!');
              }}
              className="focus:outline-none"
              aria-label="Activate Drivr Agent"
            >
              <Image
                src="/drivr-black.png"
                alt="Drivr Gearshift - Activate Agent"
                width={60}
                height={60}
                className="mx-auto transition-transform hover:scale-110"
                priority
              />
            </button>
          </div>
        </main>
      </div>
    </>
  );
}