import { useState, useMemo, useEffect } from 'react';
import MiniAppNFT from './MiniAppNFT';
import { getTokenDetails, getMintDetails, type TokenDetails, type MintDetails, type APIError } from '@coinbase/onchainkit/api';

interface NFT {
  id: string;
  tokenId: string;
  contractAddress: string;
  network: 'ethereum' | 'base';
  contractType: 'erc721' | 'erc1155';
  price: string;
  currency: 'USD' | 'ETH' | 'USDC';
  title: string;
  description: string;
  imageUrl: string;
  year?: string;
  brand?: string;
  rarity?: 'common' | 'rare' | 'legendary';
  manifoldLink: string;
}

type SortOption = 'price-asc' | 'price-desc' | 'year-desc' | 'year-asc';

function isTokenDetails(response: TokenDetails | APIError): response is TokenDetails {
  return !('error' in response);
}

function isMintDetails(response: MintDetails | APIError): response is MintDetails {
  return !('error' in response);
}

export default function NFTGallery() {
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedNetwork, setSelectedNetwork] = useState<'ethereum' | 'base'>('ethereum');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('price-asc');
  const [selectedRarity, setSelectedRarity] = useState<NFT['rarity'] | 'all'>('all');

  useEffect(() => {
    const fetchNFTs = async () => {
      try {
        const contractAddress = process.env.NEXT_PUBLIC_BASE_ERC1155_CONTRACT_ADDRESS as `0x${string}`;
        if (!contractAddress) return;

        const tokenDetails = await getTokenDetails({
          contractAddress,
        });

        if (tokenDetails && isTokenDetails(tokenDetails)) {
          const mintDetails = await getMintDetails({
            contractAddress,
          });

          const nft: NFT = {
            id: `${contractAddress}-${tokenDetails.metadata.tokenId}`,
            tokenId: tokenDetails.metadata.tokenId,
            contractAddress,
            network: 'base',
            contractType: 'erc1155',
            price: isMintDetails(mintDetails) ? mintDetails.price : '1',
            currency: 'USD',
            title: tokenDetails.metadata.name,
            description: tokenDetails.metadata.description,
            imageUrl: tokenDetails.metadata.image,
            year: '2024',
            brand: 'CarMania',
            manifoldLink: 'https://app.manifold.xyz/c/man-driving-car'
          };

          setNfts([nft]);
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching NFTs:', error);
        setIsLoading(false);
      }
    };

    fetchNFTs();
  }, []);

  const filteredNFTs = useMemo(() => {
    return nfts.filter(nft => {
      const matchesNetwork = nft.network === selectedNetwork;
      const matchesSearch = nft.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          nft.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRarity = selectedRarity === 'all' || nft.rarity === selectedRarity;
      return matchesNetwork && matchesSearch && matchesRarity;
    });
  }, [nfts, selectedNetwork, searchQuery, selectedRarity]);

  const sortedNFTs = useMemo(() => {
    return [...filteredNFTs].sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return parseFloat(a.price) - parseFloat(b.price);
        case 'price-desc':
          return parseFloat(b.price) - parseFloat(a.price);
        case 'year-desc':
          return (b.year || '').localeCompare(a.year || '');
        case 'year-asc':
          return (a.year || '').localeCompare(b.year || '');
        default:
          return 0;
      }
    });
  }, [filteredNFTs, sortBy]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div className="flex gap-4">
          <button
            onClick={() => setSelectedNetwork('ethereum')}
            className={`px-4 py-2 rounded-lg ${
              selectedNetwork === 'ethereum'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            Ethereum
          </button>
          <button
            onClick={() => setSelectedNetwork('base')}
            className={`px-4 py-2 rounded-lg ${
              selectedNetwork === 'base'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            Base
          </button>
        </div>

        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Search NFTs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="year-desc">Year: Newest First</option>
            <option value="year-asc">Year: Oldest First</option>
          </select>
          <select
            value={selectedRarity}
            onChange={(e) => setSelectedRarity(e.target.value as NFT['rarity'] | 'all')}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Rarities</option>
            <option value="common">Common</option>
            <option value="rare">Rare</option>
            <option value="legendary">Legendary</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sortedNFTs.map((nft) => (
          <MiniAppNFT
            key={nft.id}
            tokenId={nft.tokenId}
            contractAddress={nft.contractAddress}
            network={nft.network}
            contractType={nft.contractType}
            price={nft.price}
            currency={nft.currency}
            title={nft.title}
            description={nft.description}
            imageUrl={nft.imageUrl}
            year={nft.year}
            brand={nft.brand}
            rarity={nft.rarity}
            manifoldLink={nft.manifoldLink}
          />
        ))}
      </div>
    </div>
  );
} 