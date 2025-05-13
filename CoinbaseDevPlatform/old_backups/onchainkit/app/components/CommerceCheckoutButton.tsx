import { useState } from 'react';
import { NFTCheckoutMetadata, CheckoutPricing } from '../utils/commerce';

interface CommerceCheckoutButtonProps {
  name: string;
  description: string;
  pricing: CheckoutPricing;
  metadata: NFTCheckoutMetadata;
  onSuccess?: () => void;
  onFailure?: (error: Error) => void;
}

export default function CommerceCheckoutButton({
  name,
  description,
  pricing,
  metadata,
  onSuccess,
  onFailure
}: CommerceCheckoutButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          description,
          pricing,
          metadata,
        }),
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
      onFailure?.(error as Error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
    >
      {loading ? 'Processing...' : 'Buy Now with Coinbase'}
    </button>
  );
} 