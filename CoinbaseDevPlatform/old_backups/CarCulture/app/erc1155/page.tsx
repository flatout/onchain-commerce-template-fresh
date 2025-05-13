"use client";

import { Identity, Avatar, Name, Badge, Address } from '@coinbase/onchainkit/identity';
import { ConnectWallet, Wallet } from '@coinbase/onchainkit/wallet';
import { useAccount } from 'wagmi';
import { base } from 'viem/chains';

export default function ERC1155MintPage() {
  const { address } = useAccount();
  const isCarOfTheDay = true;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8 bg-black">
      {/* Identity Card Section */}
      <div className="w-full max-w-md mb-8">
        <Wallet>
          {address ? (
            <div className="bg-black rounded-lg p-4">
              <Identity
                address={address}
                chain={base}
                schemaId="0xf8b05c79f090979bf4a80270aba232dff11a10d9ca55c4f88de95317970f0de9"
                className="mini-app-theme"
              >
                <Avatar />
                <Name />
                <Badge />
                <Address />
              </Identity>
            </div>
          ) : (
            <div className="text-center">
              <ConnectWallet>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Connect Wallet to View Identity
                </button>
              </ConnectWallet>
            </div>
          )}
        </Wallet>
      </div>

      {/* Car of the Day Section */}
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold mb-8 text-center text-white">CarCulture NFT Mint</h1>
        {isCarOfTheDay && (
          <div className="mb-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold text-center py-2 rounded-lg">
            🚗 Car of the Day!
          </div>
        )}
        <div className="flex flex-col items-center">
          <div className="text-white text-center">
            <p className="text-lg mb-4">Coming Soon: New NFT Collection</p>
            <p className="text-sm text-gray-400">We&apos;re preparing something special for you!</p>
          </div>
        </div>
      </div>
    </main>
  );
}