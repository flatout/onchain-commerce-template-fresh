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
  square: 'flex flex-col items-center w-full max-w-[250px] sm:max-w-xs md:max-w-sm lg:max-w-lg mx-auto p-1 sm:p-2',
  vertical: 'flex flex-col items-center w-full max-w-[250px] sm:max-w-xs mx-auto p-1 sm:p-2',
  horizontal: 'flex flex-row items-center w-full max-w-sm sm:max-w-2xl mx-auto p-1 sm:p-2',
};

export default function CustomNFTCard({ imageUrl, title, description, contractAddress, layout = 'square' }: CustomNFTCardProps) {
  return (
    <div className={`bg-gray-900 rounded-xl shadow-lg ${layoutStyles[layout]} border-4 border-gray-800 p-0 overflow-hidden`}>
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-[120px] sm:h-auto object-cover rounded-t-xl"
      />
      <div className="flex flex-col items-center w-full px-6 py-4">
        <h3 className="text-sm sm:text-base md:text-xl font-bold text-white mt-1 mb-1 w-full text-center">{title}</h3>
        <p className="text-[11px] sm:text-xs md:text-base text-gray-400 mb-2 w-full text-center">{description}</p>
        <NFTMintCard contractAddress={contractAddress as `0x${string}`} />
      </div>
    </div>
  );
} 