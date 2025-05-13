import { http, createConfig } from 'wagmi';
import { base } from 'wagmi/chains';

// Ensure the contract address is properly formatted with 0x prefix and 40 characters
const CONTRACT_ADDRESS_RAW = process.env.NEXT_PUBLIC_BASE_ERC721_CONTRACT_ADDRESS || '';
export const CONTRACT_ADDRESS = CONTRACT_ADDRESS_RAW.startsWith('0x') 
  ? CONTRACT_ADDRESS_RAW as `0x${string}`
  : `0x${CONTRACT_ADDRESS_RAW}` as `0x${string}`;

// Configure wagmi client
export const config = createConfig({
  chains: [base],
  transports: {
    [base.id]: http(),
  },
}); 