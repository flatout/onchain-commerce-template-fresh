// Trigger Vercel redeploy
'use client';

import React from 'react';
import { ConnectWallet, Wallet } from '@coinbase/onchainkit/wallet';
import { IdentityCard } from '@coinbase/onchainkit/identity';
import { base } from 'viem/chains';
import Head from 'next/head';
import { useAccount } from 'wagmi';
import TitleBar from './components/TitleBar';
import CustomNFTCard from './components/CustomNFTCard';
import Image from 'next/image';

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

      <main className="flex-grow flex flex-col items-center justify-center relative">
        <div className="max-w-4xl w-full p-4 flex flex-col items-center justify-center">
          <div className="flex flex-col items-center space-y-8">
            <div className="w-full max-w-lg flex flex-col items-center">
              <div className="text-center mb-4">
                <Image
                  src="/carmania-trans-logo.png"
                  alt="CarMania Logo"
                  width={316}
                  height={106}
                  className="object-contain mx-auto mb-2"
                  style={{ marginTop: '20px' }}
                  priority
                />
                <div className="text-lg font-semibold text-white mb-1">Celebrating Art and Provenance</div>
                <p className="text-gray-400">Mint your exclusive Car of the Day NFT on Base Mainnet</p>
              </div>
              <div className="flex flex-col items-center w-full">
                <CustomNFTCard
                  imageUrl="/1155-images/man-driving-car.jpg"
                  title="Man Driving Car"
                  description="Let your hair blow back behind the wheel of a fine automobile"
                  contractAddress="0x0f83d2f2cfd23222414e19db3246aa7695862992"
                  layout="square"
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
      </main>
    </div>
  );
}
