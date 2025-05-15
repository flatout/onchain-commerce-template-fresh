import { ConnectWallet, Wallet } from '@coinbase/onchainkit/wallet';
import { IdentityCard } from '@coinbase/onchainkit/identity';
import { base } from 'viem/chains';
import { useAccount } from 'wagmi';

// ...existing code...

export default function Page() {
  const { address } = useAccount();

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-black py-8">
      <h1 className="text-3xl font-bold text-white mb-8">Mint Your NFTs</h1>
      <div className="flex flex-col md:flex-row gap-8">
        {/* ...your NFT cards... */}
      </div>
      {/* Wallet and Identity Card */}
      <div className="mt-8 flex justify-center w-full">
        <Wallet>
          {address ? (
            <div className="bg-gray-900 rounded-lg p-6">
              <IdentityCard
                address={address}
                chain={base}
                schemaId="0xf8b05c79f090979bf4a80270aba232dff11a10d9ca55c4f88de95317970f0de9"
              />
            </div>
          ) : (
            <div className="text-center">
              <ConnectWallet>
                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                  Connect Wallet
                </button>
              </ConnectWallet>
            </div>
          )}
        </Wallet>
      </div>
    </main>
  );
}
