import { type SmartAccountClient } from '@coinbase/onchainkit';

export interface PaymasterConfig {
  sponsorUserOperation?: boolean;
  gasless?: boolean;
}

export const createPaymasterTransaction = async (
  client: SmartAccountClient,
  contractAddress: string,
  tokenId: string,
  price: string,
  paymasterConfig: PaymasterConfig
) => {
  try {
    const tx = await client.sendTransaction({
      to: contractAddress,
      value: price,
      data: `0x`, // Add your contract method call data here
      gasless: paymasterConfig.gasless,
      sponsorUserOperation: paymasterConfig.sponsorUserOperation
    });

    return tx;
  } catch (error) {
    console.error('Paymaster transaction error:', error);
    throw error;
  }
};

export const estimatePaymasterGas = async (
  client: SmartAccountClient,
  contractAddress: string,
  tokenId: string,
  price: string,
  paymasterConfig: PaymasterConfig
) => {
  try {
    const gasEstimate = await client.estimateGas({
      to: contractAddress,
      value: price,
      data: `0x`, // Add your contract method call data here
      gasless: paymasterConfig.gasless,
      sponsorUserOperation: paymasterConfig.sponsorUserOperation
    });

    return gasEstimate;
  } catch (error) {
    console.error('Gas estimation error:', error);
    throw error;
  }
}; 