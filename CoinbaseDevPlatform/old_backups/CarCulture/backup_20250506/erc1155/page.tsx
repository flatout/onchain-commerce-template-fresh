"use client";

import { NFTMintCardDefault } from '@coinbase/onchainkit/nft';

const CONTRACT_ADDRESS = "0xbcEAbF7b3c7b784589AFB411802c7c050c4dfc00";
const TOKEN_ID = "4252625136";

export default function ERC1155MintPage() {
  const isCarOfTheDay = true;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-black">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold mb-8 text-center text-white">CarCulture ERC1155 Mint</h1>
        {isCarOfTheDay && (
          <div className="mb-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold text-center py-2 rounded-lg">
            🚗 Car of the Day!
          </div>
        )}
        <div className="flex flex-col items-center">
          <NFTMintCardDefault
            contractAddress={CONTRACT_ADDRESS}
            tokenId={TOKEN_ID}
          />
          {/* Farcaster-style footer with SVG icons */}
          <div className="mt-4 flex justify-between items-center bg-[#18181b] rounded-b-xl p-3 w-full max-w-xs">
            {/* ...SVG buttons here... */}
          </div>
        </div>
      </div>
    </main>
  );
}