import { useAccount, useChainId, useSwitchChain } from 'wagmi';
import { CheckoutMetadata, CheckoutPricing } from '../utils/commerce';

interface MiniAppNFTProps {
  tokenId: string;
  contractAddress: string;
  network: 'ethereum' | 'base';
  contractType: 'erc721' | 'erc1155';
  price: string;
  currency: 'USD' | 'ETH' | 'USDC';
  title: string;
  description: string;
  imageUrl: string;
  year?: string;
  brand?: string;
}

export default function MiniAppNFT({
  tokenId,
  contractAddress,
  network,
  contractType,
  price,
  currency,
  title,
  description,
  imageUrl,
  year,
  brand
}: MiniAppNFTProps) {
  const { address } = useAccount();
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();

  const targetChainId = network === 'base' ? 8453 : 1;

  const handleLike = async () => {
    try {
      if (window.farcaster?.actions) {
        await window.farcaster.actions.like();
      }
    } catch (error) {
      console.error('Error liking:', error);
    }
  };

  const handleRecast = async () => {
    try {
      if (window.farcaster?.actions) {
        await window.farcaster.actions.recast();
      }
    } catch (error) {
      console.error('Error recasting:', error);
    }
  };

  const handleQuoteCast = async () => {
    try {
      if (window.farcaster?.actions) {
        const quoteText = `Check out this ${brand} ${year} NFT on CarCulture! ${title}`;
        await window.farcaster.actions.quoteCast(quoteText);
      }
    } catch (error) {
      console.error('Error quote casting:', error);
    }
  };

  const handleMessage = async () => {
    try {
      if (window.farcaster?.actions) {
        const messageText = `Hi! I'm interested in the ${brand} ${year} NFT: ${title}`;
        await window.farcaster.actions.message({ text: messageText });
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleMint = async () => {
    if (chainId !== targetChainId) {
      await switchChain?.({ chainId: targetChainId });
      return;
    }

    const metadata: CheckoutMetadata = {
      productType: 'nft',
      tokenId,
      contractAddress,
      network,
      contractType
    };

    const pricing: CheckoutPricing = {
      amount: price,
      currency
    };

    const response = await fetch('/api/create-charge', {
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
    if (!response.ok) {
      throw new Error(data.error || 'Failed to create charge');
    }

    return data;
  };

  return (
    <div className="flex flex-col bg-black text-white min-h-screen">
      <div className="flex justify-between items-center p-4">
        <h1 className="text-xl font-bold">Car of the Day</h1>
        <button
          onClick={handleMint}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
        >
          MINT
        </button>
      </div>
      
      {/* Image Container */}
      <div className="flex-grow relative">
        <img 
          src={imageUrl} 
          alt={title}
          className="w-full h-full object-contain"
        />
      </div>
      
      {/* Action Buttons */}
      <div className="flex justify-between p-2 border-t border-gray-800">
        <button 
          onClick={handleLike}
          className="flex-1 text-center py-2 hover:bg-gray-800 rounded"
        >
          ❤️ Like
        </button>
        <button 
          onClick={handleRecast}
          className="flex-1 text-center py-2 hover:bg-gray-800 rounded"
        >
          🔄 Recast
        </button>
        <button 
          onClick={handleQuoteCast}
          className="flex-1 text-center py-2 hover:bg-gray-800 rounded"
        >
          💬 Quote
        </button>
        <button 
          onClick={handleMessage}
          className="flex-1 text-center py-2 hover:bg-gray-800 rounded"
        >
          ✉️ Message
        </button>
      </div>
    </div>
  );
} 