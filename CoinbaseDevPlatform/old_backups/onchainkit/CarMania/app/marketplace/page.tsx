"use client";

import { NFTGrid } from '../components/NFTGrid';
import { WalletConnection } from '../components/WalletConnection';

export default function NFTMarketplace() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            CarMania NFT Marketplace
          </h1>
          <WalletConnection />
        </div>
        
        <div className="space-y-8">
          <NFTGrid />
        </div>
      </div>
    </div>
  );
} 