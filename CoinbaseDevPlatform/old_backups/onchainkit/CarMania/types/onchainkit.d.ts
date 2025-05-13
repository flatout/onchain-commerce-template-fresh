declare module '@coinbase/onchainkit/api' {
  export interface TokenMetadata {
    tokenId: string;
    name: string;
    description: string;
    image: string;
    attributes?: Array<{
      trait_type: string;
      value: string;
    }>;
  }

  export interface TokenDetails {
    metadata: TokenMetadata;
    owner?: string;
    balance?: string;
  }

  export interface MintDetails {
    price: string;
    currency: string;
    maxSupply?: string;
    totalSupply?: string;
  }

  export interface GetTokenDetailsParams {
    contractAddress: `0x${string}`;
    tokenId?: string;
  }

  export interface GetMintDetailsParams {
    contractAddress: `0x${string}`;
    tokenId?: string;
  }

  export type APIError = {
    error: string;
    message: string;
  };

  export type GetTokenDetailsResponse = TokenDetails | APIError;
  export type GetMintDetailsResponse = MintDetails | APIError;

  export function getTokenDetails(params: GetTokenDetailsParams): Promise<GetTokenDetailsResponse>;
  export function getMintDetails(params: GetMintDetailsParams): Promise<GetMintDetailsResponse>;
} 