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
                <h2 className="text-2xl font-bold text-white mb-2">Collectible Cars for Maniacs</h2>
                <p className="text-gray-400">Mint your exclusive Car of the Day NFT on Base Network</p>
              </div>
              <div className="flex flex-col items-center w-full">
                <Image
                  src="/1155-images/man-driving-car.jpg"
                  alt="Car of the Day NFT"
                  width={400}
                  height={400}
                  className="object-contain rounded-lg mb-4"
                />
                <NFTMintCard 
                  contractAddress="0x0f83d2f2cfd23222414e19db3246aa7695862992"
                />
                <NFTDetails 
                  initialTitle="Man Driving Car"
                  initialDescription="Let your hair blow back behind the wheel of a fine automobile"
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
      <Footer />
    </div>
  );
}
