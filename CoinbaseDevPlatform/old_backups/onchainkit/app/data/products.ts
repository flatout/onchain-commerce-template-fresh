import { ProductType } from '../utils/commerce';

export interface Product {
  id: string;
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
  marketplaceLinks?: Array<{
    platform: 'amazon' | 'apple' | 'google' | 'other';
    url: string;
    price?: string;
    currency?: string;
  }>;
  downloadUrl?: string;
  fileType?: string;
  fileSize?: number;
  rarity?: 'rare' | 'epic' | 'legendary';
}

export const products: Product[] = [
  // NFTs
  {
    id: 'nft-1',
    name: 'CarMania Genesis #001',
    description: 'First edition CarMania NFT featuring a classic 1967 Mustang',
    price: '0.1',
    currency: 'ETH',
    image: '/nfts/genesis-001.jpg',
    productType: 'nft',
    tokenId: '1',
    contractAddress: process.env.NEXT_PUBLIC_BASE_ERC721_CONTRACT_ADDRESS,
    network: 'base',
    contractType: 'erc721'
  },
  {
    id: 'nft-2',
    name: 'CarMania Legends Pack',
    description: 'Collection of 5 legendary car NFTs',
    price: '0.5',
    currency: 'ETH',
    image: '/nfts/legends-pack.jpg',
    productType: 'nft',
    tokenId: '2',
    contractAddress: process.env.NEXT_PUBLIC_BASE_ERC1155_CONTRACT_ADDRESS,
    network: 'base',
    contractType: 'erc1155'
  },
  {
    id: 'nft-3',
    name: 'Man Driving Car',
    description: 'Limited edition daily NFT featuring a unique car design',
    price: '1',
    currency: 'USD',
    image: '/nfts/daily-special.jpg',
    productType: 'nft',
    tokenId: '3',
    contractAddress: process.env.NEXT_PUBLIC_BASE_ERC1155_CONTRACT_ADDRESS,
    network: 'base',
    contractType: 'erc1155'
  },

  // Physical Items
  {
    id: 'merch-1',
    name: 'CarMania Classic Cap',
    description: 'Vintage-style baseball cap with embroidered CarMania logo',
    price: '29.99',
    currency: 'USD',
    image: '/merch/cap.jpg',
    productType: 'physical',
    sku: 'CAP-001',
    inStock: true
  },
  {
    id: 'merch-2',
    name: 'Collector\'s Display Case',
    description: 'Premium acrylic display case for your NFT certificate',
    price: '79.99',
    currency: 'USD',
    image: '/merch/display-case.jpg',
    productType: 'physical',
    sku: 'CASE-001',
    inStock: false
  },

  // Digital Items
  {
    id: 'digital-1',
    name: 'CarMania: The Art of Collecting',
    description: 'Comprehensive guide to car collecting in the digital age',
    image: '/digital/collecting-guide.jpg',
    productType: 'digital',
    fileType: 'pdf',
    fileSize: 15000000, // 15MB
    marketplaceLinks: [
      {
        platform: 'amazon',
        url: 'https://amazon.com/carmania-collecting',
        price: '19.99',
        currency: 'USD'
      },
      {
        platform: 'apple',
        url: 'https://books.apple.com/carmania-collecting',
        price: '19.99',
        currency: 'USD'
      }
    ]
  },
  {
    id: 'digital-2',
    name: 'CarMania Wallpapers Pack',
    description: '20 high-resolution wallpapers featuring iconic cars',
    price: '4.99',
    currency: 'USD',
    image: '/digital/wallpapers.jpg',
    productType: 'digital',
    fileType: 'zip',
    fileSize: 250000000, // 250MB
    downloadUrl: '/downloads/wallpapers.zip'
  }
]; 