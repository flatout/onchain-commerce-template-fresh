"use client";

import { ConnectWallet } from '@coinbase/onchainkit/wallet';
import { useAccount } from 'wagmi';
import { erc721Abi } from 'viem';
import { useEffect, useState } from 'react';
import { useReadContract, useReadContracts } from 'wagmi';

type NFTData = {
  tokenId: bigint;
  uri: string;
  image?: string;
  name?: string;
};

export function NFTGrid() {
  const { isConnected } = useAccount();
  const [mounted, setMounted] = useState(false);
  const [nftData, setNftData] = useState<NFTData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const CONTRACT_ADDRESS = "0x8ef0772347e0caed0119937175d7ef9636ae1aa0";

  useEffect(() => {
    setMounted(true);
  }, []);

  // Get total supply of NFTs
  const { data: totalSupply, isPending: isSupplyLoading } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: erc721Abi,
    functionName: 'totalSupply',
  });

  // Get token URIs for all NFTs
  const { data: tokenUriData, isPending: isTokenUriLoading } = useReadContracts({
    contracts: totalSupply && isConnected
      ? Array.from({ length: Number(totalSupply) }).map((_, i) => ({
          address: CONTRACT_ADDRESS as `0x${string}`,
          abi: erc721Abi,
          functionName: 'tokenURI',
          args: [BigInt(i)],
        }))
      : [],
  });

  useEffect(() => {
    const fetchMetadata = async () => {
      if (!tokenUriData || !isConnected) return;

      setIsLoading(true);
      setError(null);

      try {
        const nfts: NFTData[] = [];
        for (let i = 0; i < tokenUriData.length; i++) {
          const tokenId = BigInt(i);
          const uri = tokenUriData[i].result as string;
          
          try {
            const response = await fetch(uri);
            if (!response.ok) {
              throw new Error(`Failed to fetch metadata for token ${tokenId}`);
            }
            const metadata = await response.json();
            nfts.push({
              tokenId,
              uri,
              image: metadata.image,
              name: metadata.name,
            });
          } catch (error) {
            console.error('Error fetching metadata:', error);
          }
        }
        setNftData(nfts);
      } catch (error) {
        setError('Failed to load NFT metadata');
        console.error('Error loading NFTs:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (mounted) {
      fetchMetadata();
    }
  }, [tokenUriData, isConnected, mounted]);

  if (!mounted) {
    return null;
  }

  if (!isConnected) {
    return (
      <div className="bg-[#1a1a1a] rounded-lg p-8 text-center">
        <h2 className="text-xl font-semibold mb-4">CarMania NFT Collection</h2>
        <p className="text-gray-400 mb-6">
          Connect your wallet to view the NFT collection.
        </p>
        <div className="p-8 border-2 border-dashed border-gray-700 rounded-lg">
          <ConnectWallet>
            <p className="text-gray-500">
              🔐 Connect Wallet
            </p>
          </ConnectWallet>
        </div>
      </div>
    );
  }

  const isLoadingState = isSupplyLoading || isTokenUriLoading || isLoading;

  return (
    <div className="bg-[#1a1a1a] rounded-lg p-8">
      <h2 className="text-xl font-semibold mb-4">CarMania NFT Collection</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {isLoadingState ? (
          <div className="col-span-full flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--app-accent)]" />
          </div>
        ) : error ? (
          <div className="col-span-full text-center py-8">
            <p className="text-red-500">{error}</p>
          </div>
        ) : nftData.length > 0 ? (
          nftData.map((nft) => (
            <div
              key={nft.tokenId.toString()}
              className="rounded-lg overflow-hidden border border-[var(--app-card-border)] p-4 hover:border-[var(--app-accent)] transition-colors bg-[#2a2a2a]"
            >
              {nft.image ? (
                <img
                  src={nft.image}
                  alt={nft.name || `NFT #${nft.tokenId.toString()}`}
                  className="aspect-square object-cover rounded-lg mb-2"
                />
              ) : (
                <div className="aspect-square bg-[var(--app-gray)] rounded-lg mb-2" />
              )}
              <p className="text-[var(--app-foreground-muted)]">
                {nft.name || `NFT #${nft.tokenId.toString()}`}
              </p>
            </div>
          ))
        ) : (
          <p className="text-[var(--app-foreground-muted)] col-span-full text-center py-8">
            No NFTs found in the collection
          </p>
        )}
      </div>
    </div>
  );
} 