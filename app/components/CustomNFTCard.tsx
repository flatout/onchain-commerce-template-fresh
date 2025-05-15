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
  square: 'flex flex-col items-center w-full max-w-[62px] sm:max-w-xs md:max-w-sm lg:max-w-lg mx-auto p-0 sm:p-1',
  vertical: 'flex flex-col items-center w-full max-w-[62px] sm:max-w-xs mx-auto p-0 sm:p-1',
  horizontal: 'flex flex-row items-center w-full max-w-xs sm:max-w-2xl mx-auto p-0 sm:p-1',
};

export default function CustomNFTCard({ imageUrl, title, description, contractAddress, layout = 'square' }: CustomNFTCardProps) {
  return (
    <div className={`bg-gray-900 rounded-xl shadow-lg ${layoutStyles[layout]} border-4 border-gray-800 p-0 overflow-hidden`}>
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-[30px] sm:h-auto object-cover rounded-t-xl"
      />
      <div className="flex flex-col items-center w-full px-6 py-4">
        <h3 className="text-[6px] sm:text-base md:text-xl font-bold text-white mt-0 mb-0 w-full text-center">{title}</h3>
        <p className="text-[4px] sm:text-xs md:text-base text-gray-400 mb-0 w-full text-center">{description}</p>
        <NFTMintCard contractAddress={contractAddress as `0x${string}`} />
      </div>
    </div>
  );
} 