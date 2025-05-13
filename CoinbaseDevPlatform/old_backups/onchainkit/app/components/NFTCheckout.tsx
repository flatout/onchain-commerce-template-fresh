import { useState } from 'react';
import { useAccount } from 'wagmi';
import { NFTCheckoutMetadata, CheckoutPricing } from '../utils/commerce';

interface NFTCheckoutProps {
  tokenId: string;
  contractAddress: string;
  network: 'ethereum' | 'base';
  contractType: 'erc721' | 'erc1155';
  price: string;
  currency: 'USD' | 'ETH' | 'USDC';
  title: string;
  description: string;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export default function NFTCheckout({
  tokenId,
  contractAddress,
  network,
  contractType,
  price,
  currency,
  title,
  description,
  onSuccess,
  onError
}: NFTCheckoutProps) {
  const [loading, setLoading] = useState(false);
  const [includesPrint, setIncludesPrint] = useState(false);
  const { address } = useAccount();

  const handleCheckout = async () => {
    if (!address) return;
    
    setLoading(true);
    try {
      const metadata: NFTCheckoutMetadata = {
        tokenId,
        contractAddress,
        network,
        contractType,
        includesPrint
      };

      const pricing: CheckoutPricing = {
        amount: price,
        currency
      };

      const response = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: title,
          description,
          pricing,
          metadata,
          customerInfo: {
            walletAddress: address
          }
        })
      });

      const data = await response.json();
      
      if (data.hosted_url) {
        window.location.href = data.hosted_url;
        onSuccess?.();
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      onError?.(error as Error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4 border rounded-lg">
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="includePrint"
          checked={includesPrint}
          onChange={(e) => setIncludesPrint(e.target.checked)}
          className="rounded border-gray-300"
        />
        <label htmlFor="includePrint">Include Physical Print</label>
      </div>
      
      <button
        onClick={handleCheckout}
        disabled={loading || !address}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors disabled:opacity-50"
      >
        {loading ? 'Processing...' : `Buy Now (${price} ${currency})`}
      </button>
      
      {!address && (
        <p className="text-red-500 text-sm">Please connect your wallet to continue</p>
      )}
    </div>
  );
} 