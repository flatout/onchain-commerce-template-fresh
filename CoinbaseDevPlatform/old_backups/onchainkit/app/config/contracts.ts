export const CONTRACTS = {
  // Ethereum L1 Contracts (CarMania)
  ethereum: {
    erc721: {
      address: process.env.NEXT_PUBLIC_ETH_ERC721_CONTRACT_ADDRESS || '',
      name: 'CarMania ERC721',
      network: 'ethereum',
      chainId: 1
    },
    erc1155: {
      address: process.env.NEXT_PUBLIC_ETH_ERC1155_CONTRACT_ADDRESS || '',
      name: 'CarMania ERC1155',
      network: 'ethereum',
      chainId: 1
    }
  },
  // Base L2 Contracts (CarMania.eth)
  base: {
    erc721: {
      address: process.env.NEXT_PUBLIC_BASE_ERC721_CONTRACT_ADDRESS || '',
      name: 'CarMania Base ERC721',
      network: 'base',
      chainId: 8453
    },
    erc1155: {
      address: process.env.NEXT_PUBLIC_BASE_ERC1155_CONTRACT_ADDRESS || '',
      name: 'CarMania Base ERC1155',
      network: 'base',
      chainId: 8453
    }
  }
} as const;

export type ContractType = 'erc721' | 'erc1155';
export type NetworkType = 'ethereum' | 'base';

export const getContractAddress = (network: NetworkType, type: ContractType): string => {
  return CONTRACTS[network][type].address;
};

export const getContractConfig = (network: NetworkType, type: ContractType) => {
  return CONTRACTS[network][type];
}; 