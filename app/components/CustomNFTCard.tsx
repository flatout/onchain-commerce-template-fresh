import React from 'react';
import { NFTMintCard } from '@coinbase/onchainkit/nft';

interface CustomNFTCardProps {
  imageUrl: string;
  title: string;
  description: string;
  contractAddress: string;
  layout?: 'square' | 'horizontal' | 'vertical';
}

const layoutStyles = {
  square: 'flex flex-col items-center w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg',
  vertical: 'flex flex-col items-center w-full max-w-xs sm:max-w-sm',
  horizontal: 'flex flex-row items-center w-full max-w-2xl',
};

export default function CustomNFTCard({ imageUrl, title, description, contractAddress, layout = 'square' }: CustomNFTCardProps) {
  return (
    <div className={`bg-gray-900 rounded-xl shadow-lg ${layoutStyles[layout]} border-4 border-gray-800 p-0 overflow-hidden`}>
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-auto object-cover rounded-t-xl"
      />
      <div className="flex flex-col items-center w-full px-6 py-4">
        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mt-2 mb-1 w-full text-center">{title}</h3>
        <p className="text-gray-400 mb-4 w-full text-center text-sm sm:text-base">{description}</p>
        <NFTMintCard contractAddress={contractAddress as `0x${string}`} />
      </div>
    </div>
  );
} 