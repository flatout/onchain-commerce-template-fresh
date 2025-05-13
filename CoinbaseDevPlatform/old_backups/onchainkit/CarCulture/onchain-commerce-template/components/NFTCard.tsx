import Image from 'next/image';
import { useState } from 'react';

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

interface NFTCardProps {
  nft: NFT;
  paymentMethod: 'CRYPTO' | 'USDC';
}

export function NFTCard({ nft, paymentMethod }: NFTCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handlePurchase = async () => {
    try {
      // Create Coinbase Commerce charge
      const response = await fetch('/api/create-charge', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          price: nft.price,
          title: nft.name,
          description: nft.description,
          image: nft.image,
          contractAddress: nft.contractAddress,
          tokenId: nft.tokenId,
          paymentMethod,
        }),
      });

      const data = await response.json();
      
      // Redirect to Coinbase Commerce checkout
      if (data.hosted_url) {
        window.location.href = data.hosted_url;
      }
    } catch (error) {
      console.error('Error creating charge:', error);
    }
  };

  const getContractBadge = () => {
    const badgeColor = nft.network === 'Base' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800';
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${badgeColor}`}>
        {nft.network} {nft.contractType}
      </span>
    );
  };

  return (
    <div 
      className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-square">
        <Image
          src={nft.image}
          alt={nft.name}
          layout="fill"
          objectFit="cover"
          className="transition-opacity duration-300"
          priority
        />
        {isHovered && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300">
            <button
              onClick={handlePurchase}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Buy for {nft.price} {paymentMethod}
            </button>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold text-gray-900">{nft.name}</h3>
          {getContractBadge()}
        </div>
        <p className="mt-2 text-gray-600 line-clamp-2">{nft.description}</p>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-lg font-medium text-gray-900">
            {nft.price} {paymentMethod}
          </span>
          <button
            onClick={handlePurchase}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
} 