"use client";

// ... existing code ...
import React from 'react';
import { ConnectWallet, Wallet } from '@coinbase/onchainkit/wallet';
import { IdentityCard } from '@coinbase/onchainkit/identity';
import { base } from 'viem/chains';
import Head from 'next/head';
import { useAccount } from 'wagmi';
import TitleBar from './components/TitleBar';
import Image from 'next/image';
import { NFTMintCard } from '@coinbase/onchainkit/nft';
// Removed: import { ConnectButton } from '@coinbase/onchainkit';

const BASE_URL = process.env.NEXT_PUBLIC_URL || 'http://localhost:3001';

export default function App() {
  const { address } = useAccount();

  return (
    <>
      <div className="w-full flex justify-center pt-8 pb-4 bg-black">
        <Image
          src="/carculture-wing-logo.png"
          alt="CarCulture Logo"
          width={120}
          height={40}
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
                  <p className="text-gray-400 text-center">
                    Mint your exclusive Car of the Day NFT on Base Mainnet<br />
                    and click the Drivr gearshift below to chat with our car-savvy agent!
                  </p>
                </div>
                <div className="flex flex-col items-center w-full">
                  <NFTMintCard
                    contractAddress="0x8ef0772347e0caed0119937175d7ef9636ae1aa0"
                    tokenId="14"
                  />
                </div>
                <div className="mt-8 flex justify-center w-full">
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
              </div>
            </div>
          </div>
          {/* Drivr Gearshift Activation Button */}
          <div className="flex flex-col items-center mt-12">
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
                width={120}
                height={120}
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