"use client";

import { useState } from 'react';
import { WalletConnection } from '../components/WalletConnection';
import { useWriteContract, useWatchContractEvent } from 'wagmi';
import { parseEther } from 'viem';
import { CONTRACT_ADDRESS } from '../config/wagmi';

// Custom ABI for the minting function
const MINT_ABI = [{
  name: 'mint',
  type: 'function',
  stateMutability: 'payable',
  inputs: [{ name: 'amount', type: 'uint256' }],
  outputs: [],
}] as const;

const PRICE_PER_NFT = '0.08';

export default function MintPage() {
  const [mintAmount, setMintAmount] = useState(1);
  const [isMinting, setIsMinting] = useState(false);
  
  const { writeContract } = useWriteContract();

  // Watch for Transfer events
  useWatchContractEvent({
    address: CONTRACT_ADDRESS,
    abi: MINT_ABI,
    eventName: 'Transfer',
    onLogs(logs) {
      console.log('New NFT minted:', logs);
      setIsMinting(false);
    },
  });

  const handleMint = async () => {
    try {
      setIsMinting(true);
      const mintPrice = parseEther(
        (Number(PRICE_PER_NFT) * mintAmount).toString()
      );
      
      await writeContract({
        abi: MINT_ABI,
        address: CONTRACT_ADDRESS,
        functionName: 'mint',
        args: [BigInt(mintAmount)],
        value: mintPrice,
      });
    } catch (error) {
      console.error('Minting error:', error);
      setIsMinting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Mint CarMania NFT
          </h1>
          <WalletConnection />
        </div>

        <div className="max-w-lg mx-auto space-y-8 bg-[#1a1a1a] p-8 rounded-xl">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Mint Your CarMania NFT</h2>
            <p className="text-gray-400">
              Join the exclusive CarMania collection by minting your unique NFT.
            </p>
            <p className="text-sm text-gray-500">
              Price: {PRICE_PER_NFT} ETH per NFT
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <button
              className="px-3 py-1 bg-gray-800 rounded-lg disabled:opacity-50"
              onClick={() => setMintAmount(Math.max(1, mintAmount - 1))}
              disabled={mintAmount <= 1 || isMinting}
            >
              -
            </button>
            <span className="text-xl font-semibold">{mintAmount}</span>
            <button
              className="px-3 py-1 bg-gray-800 rounded-lg disabled:opacity-50"
              onClick={() => setMintAmount(Math.min(5, mintAmount + 1))}
              disabled={mintAmount >= 5 || isMinting}
            >
              +
            </button>
          </div>

          <div className="text-center text-sm text-gray-400 mb-4">
            Total: {(Number(PRICE_PER_NFT) * mintAmount).toFixed(2)} ETH
          </div>

          <button
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg font-semibold disabled:opacity-50"
            onClick={handleMint}
            disabled={isMinting}
          >
            {isMinting ? 'Minting...' : `Mint ${mintAmount} NFT${mintAmount > 1 ? 's' : ''}`}
          </button>
        </div>
      </div>
    </div>
  );
} 