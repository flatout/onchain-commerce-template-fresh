export interface NFTCheckoutMetadata {
  tokenId: string;
  contractAddress: string;
  network: 'ethereum' | 'base';
  contractType: 'erc721' | 'erc1155';
  includesPrint: boolean;
}

export interface CheckoutPricing {
  amount: string;
  currency: 'USD' | 'ETH' | 'USDC';
}

export interface CustomerInfo {
  walletAddress: string;
}

export interface ChargeRequest {
  name: string;
  description: string;
  pricing: CheckoutPricing;
  metadata: NFTCheckoutMetadata;
  customerInfo: CustomerInfo;
} 