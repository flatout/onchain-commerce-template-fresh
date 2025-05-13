"use client";

import { useEffect, useState } from 'react';
import { WalletButton } from '@coinbase/onchainkit';
import { useAccount } from 'wagmi';
import { getTokenDetails, getMintDetails } from '@coinbase/onchainkit/api';
import { NFTCard } from './NFTCard';
import { StoreHeader } from './StoreHeader';
import { ContractTypeFilter } from './ContractTypeFilter';

interface NFT {
  id: string;
  name: string;
  description: string;
  image: string;
  price: string;
  contractType: 'ERC721' | 'ERC1155';
  network: 'Base' | 'CarCulture';
  contractAddress: string;
  tokenId: string;
}

type ContractType = 'ALL' | 'BASE_ERC721' | 'BASE_ERC1155' | 'CARCULTURE_ERC721' | 'CARCULTURE_ERC1155';

export default function CarManiaStore() {
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedContract, setSelectedContract] = useState<ContractType>('ALL');
  const [paymentMethod, setPaymentMethod] = useState<'CRYPTO' | 'USDC'>('CRYPTO');
  const { address } = useAccount();

  useEffect(() => {
    const fetchNFTs = async () => {
      try {
        const contracts = {
          BASE_ERC721: process.env.NEXT_PUBLIC_BASE_ERC721_CONTRACT,
          BASE_ERC1155: process.env.NEXT_PUBLIC_BASE_ERC1155_CONTRACT,
          CARCULTURE_ERC721: process.env.NEXT_PUBLIC_CARMANIA_ERC721_CONTRACT,
          CARCULTURE_ERC1155: process.env.NEXT_PUBLIC_CARMANIA_ERC1155_CONTRACT,
        };

        const nftList: NFT[] = [];

        // Fetch NFTs from each contract
        for (const [key, contractAddress] of Object.entries(contracts)) {
          if (!contractAddress) continue;

          const tokenDetails = await getTokenDetails({
            contractAddress,
            chainId: Number(process.env.NEXT_PUBLIC_NETWORK_ID),
          });

          if (tokenDetails) {
            const mintDetails = await getMintDetails({
              contractAddress,
              chainId: Number(process.env.NEXT_PUBLIC_NETWORK_ID),
            });

            nftList.push({
              id: `${contractAddress}-${tokenDetails.tokenId}`,
              name: tokenDetails.name || 'CarMania NFT',
              description: tokenDetails.description || '',
              image: tokenDetails.image || '',
              price: mintDetails?.price || '0',
              contractType: key.includes('ERC721') ? 'ERC721' : 'ERC1155',
              network: key.includes('BASE') ? 'Base' : 'CarCulture',
              contractAddress,
              tokenId: tokenDetails.tokenId,
            });
          }
        }

        setNfts(nftList);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching NFTs:', error);
        setLoading(false);
      }
    };

    fetchNFTs();
  }, []);

  const filteredNFTs = nfts.filter((nft) => {
    if (selectedContract === 'ALL') return true;
    const contractMapping = {
      BASE_ERC721: nft.network === 'Base' && nft.contractType === 'ERC721',
      BASE_ERC1155: nft.network === 'Base' && nft.contractType === 'ERC1155',
      CARCULTURE_ERC721: nft.network === 'CarCulture' && nft.contractType === 'ERC721',
      CARCULTURE_ERC1155: nft.network === 'CarCulture' && nft.contractType === 'ERC1155',
    };
    return contractMapping[selectedContract as keyof typeof contractMapping];
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <StoreHeader />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">CarMania Collection</h1>
          <WalletButton />
        </div>

        <div className="flex justify-between items-center mb-6">
          <ContractTypeFilter
            selectedType={selectedContract}
            onChange={setSelectedContract}
          />
          <div className="flex gap-4">
            <button
              onClick={() => setPaymentMethod('CRYPTO')}
              className={`px-4 py-2 rounded-lg ${
                paymentMethod === 'CRYPTO'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              Pay with Crypto
            </button>
            <button
              onClick={() => setPaymentMethod('USDC')}
              className={`px-4 py-2 rounded-lg ${
                paymentMethod === 'USDC'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              Pay with USDC
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading CarMania NFTs...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNFTs.map((nft) => (
              <NFTCard 
                key={`${nft.contractAddress}-${nft.tokenId}`} 
                nft={nft} 
                paymentMethod={paymentMethod}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
} 