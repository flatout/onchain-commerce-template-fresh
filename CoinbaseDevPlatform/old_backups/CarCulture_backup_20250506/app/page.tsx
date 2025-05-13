"use client";

import dynamic from 'next/dynamic';
import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownDisconnect,
} from "@coinbase/onchainkit/wallet";
import {
  Name,
  Identity,
  Address,
  Avatar,
  EthBalance,
} from "@coinbase/onchainkit/identity";

// Dynamically import NFTGrid with no SSR
const NFTGrid = dynamic(() => import('./components/NFTGrid').then(mod => mod.NFTGrid), {
  ssr: false,
});

export default function App() {
  return (
    <div className="flex flex-col min-h-screen font-sans text-[var(--app-foreground)] mini-app-theme from-[var(--app-background)] to-[var(--app-gray)]">
      <div className="w-full max-w-6xl mx-auto px-4 py-3">
        <header className="flex justify-between items-center mb-6 h-11">
          <h1 className="text-2xl font-bold">CarMania NFT Gallery</h1>
          <div className="flex items-center space-x-2">
            <Wallet className="z-10">
              <ConnectWallet>
                <Name className="text-inherit" />
              </ConnectWallet>
              <WalletDropdown>
                <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
                  <Avatar />
                  <Name />
                  <Address />
                  <EthBalance />
                </Identity>
                <WalletDropdownDisconnect />
              </WalletDropdown>
            </Wallet>
          </div>
        </header>

        <main className="flex-1">
          <NFTGrid />
        </main>

        <footer className="mt-8 pt-4 flex justify-center border-t border-[var(--app-card-border)]">
          <p className="text-sm text-[var(--app-foreground-muted)]">
            Built on Base with OnchainKit
          </p>
        </footer>
      </div>
    </div>
  );
}
