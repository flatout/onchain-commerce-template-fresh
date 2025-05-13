'use client';

import { useState } from 'react';

interface MiniAppFrameProps {
  manifoldUrl: string;
  carmaniaUrl: string;
}

export default function MiniAppFrame({ manifoldUrl, carmaniaUrl }: MiniAppFrameProps) {
  const [loading, setLoading] = useState(false);

  const handleMint = async () => {
    setLoading(true);
    window.location.href = manifoldUrl;
  };

  const handleGalleryView = () => {
    window.location.href = carmaniaUrl;
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4 justify-center">
        <button
          onClick={handleGalleryView}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          disabled={loading}
        >
          View in Gallery
        </button>
        <button
          onClick={handleMint}
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          disabled={loading}
        >
          {loading ? 'Redirecting...' : 'Mint NFT'}
        </button>
      </div>
      {loading && (
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
        </div>
      )}
    </div>
  );
} 