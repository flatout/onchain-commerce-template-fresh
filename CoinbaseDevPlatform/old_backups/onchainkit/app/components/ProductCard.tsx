'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ProductType, MarketplaceLink } from '../utils/commerce';

interface ProductCardProps {
  name: string;
  description: string;
  price?: string;
  currency?: 'USD' | 'ETH' | 'USDC';
  image: string;
  productType: ProductType;
  // NFT specific props
  tokenId?: string;
  contractAddress?: string;
  network?: 'ethereum' | 'base';
  contractType?: 'erc721' | 'erc1155';
  // Physical item specific props
  sku?: string;
  inStock?: boolean;
  // Digital item specific props
  marketplaceLinks?: MarketplaceLink[];
  downloadUrl?: string;
  fileType?: string;
  fileSize?: number;
}

export default function ProductCard({
  name,
  description,
  price,
  currency,
  image,
  productType,
  tokenId,
  contractAddress,
  network,
  contractType,
  sku,
  inStock = true,
  marketplaceLinks,
  downloadUrl,
  fileType,
  fileSize
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [showMarketplaces, setShowMarketplaces] = useState(false);

  const handlePurchase = async () => {
    if (productType === 'digital' && marketplaceLinks?.length) {
      setShowMarketplaces(true);
      return;
    }

    try {
      const metadata = productType === 'nft' 
        ? {
            productType,
            tokenId,
            contractAddress,
            network,
            contractType,
            requiresShipping: false
          }
        : productType === 'physical'
        ? {
            productType,
            sku,
            requiresShipping: true
          }
        : {
            productType,
            downloadUrl,
            fileType,
            fileSize,
            requiresShipping: false
          };

      const response = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          description,
          pricing: price && currency ? {
            amount: price,
            currency
          } : undefined,
          metadata
        })
      });

      const data = await response.json();
      
      if (data.hosted_url) {
        window.location.href = data.hosted_url;
      }
    } catch (error) {
      console.error('Error creating checkout:', error);
    }
  };

  const getProductBadge = () => {
    switch (productType) {
      case 'nft':
        return `${network} ${contractType}`;
      case 'physical':
        return 'Physical Item';
      case 'digital':
        return `Digital ${fileType?.toUpperCase() || 'Item'}`;
    }
  };

  const getBadgeColor = () => {
    switch (productType) {
      case 'nft':
        return 'bg-purple-100 text-purple-800';
      case 'physical':
        return 'bg-green-100 text-green-800';
      case 'digital':
        return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-lg overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowMarketplaces(false);
      }}
    >
      <div className="relative h-48 w-full">
        <Image
          src={image}
          alt={name}
          fill
          style={{ objectFit: 'cover' }}
        />
        {isHovered && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            {showMarketplaces ? (
              <div className="flex flex-col gap-2 p-4 bg-white rounded-lg">
                {marketplaceLinks?.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between gap-4 px-4 py-2 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
                  >
                    <span className="capitalize">{link.platform}</span>
                    {link.price && link.currency && (
                      <span>{link.price} {link.currency}</span>
                    )}
                  </a>
                ))}
              </div>
            ) : (
              <button
                onClick={handlePurchase}
                disabled={productType === 'physical' && !inStock}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                {productType === 'physical' && !inStock 
                  ? 'Out of Stock'
                  : productType === 'digital' && marketplaceLinks?.length
                  ? 'View Stores'
                  : price && currency
                  ? `Buy with ${currency}`
                  : 'Learn More'}
              </button>
            )}
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold">{name}</h3>
          {price && currency && (
            <span className="text-gray-600">{price} {currency}</span>
          )}
        </div>
        
        <p className="text-gray-500 text-sm mb-2">{description}</p>
        
        <div className="flex gap-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getBadgeColor()}`}>
            {getProductBadge()}
          </span>
          {productType === 'physical' && !inStock && (
            <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
              Out of Stock
            </span>
          )}
          {fileSize && (
            <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
              {(fileSize / 1024 / 1024).toFixed(1)} MB
            </span>
          )}
        </div>
      </div>
    </div>
  );
} 