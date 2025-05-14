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
  square: 'flex flex-col items-center w-[499px]',
  vertical: 'flex flex-col items-center w-64',
  horizontal: 'flex flex-row items-center w-full max-w-2xl',
};

const imageStyles = {
  square: { width: '499px', height: '499px', objectFit: 'cover' as React.CSSProperties['objectFit'], borderTopLeftRadius: '0.75rem', borderTopRightRadius: '0.75rem' },
  vertical: { width: '100%', height: '200px', objectFit: 'cover' as React.CSSProperties['objectFit'], borderTopLeftRadius: '0.75rem', borderTopRightRadius: '0.75rem' },
  horizontal: { width: '192px', height: '192px', objectFit: 'cover' as React.CSSProperties['objectFit'], borderRadius: '0.75rem', marginRight: '1.5rem' },
};

export default function CustomNFTCard({ imageUrl, title, description, contractAddress, layout = 'square' }: CustomNFTCardProps) {
  return (
    <div className={`bg-gray-900 rounded-xl shadow-lg ${layoutStyles[layout]} border-4 border-gray-800 p-0 overflow-hidden`}>
      <img
        src={imageUrl}
        alt={title}
        style={imageStyles[layout]}
      />
      <div className="flex flex-col items-center w-full px-6 py-4">
        <h3 className="text-xl font-bold text-white mt-2 mb-1 w-full text-center">{title}</h3>
        <p className="text-gray-400 mb-4 w-full text-center">{description}</p>
        <NFTMintCard contractAddress={contractAddress as `0x${string}`} />
      </div>
    </div>
  );
} 