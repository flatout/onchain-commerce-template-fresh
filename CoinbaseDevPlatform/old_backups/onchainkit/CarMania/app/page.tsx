"use client";

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
import { NFTGrid } from "./components/NFTGrid";

export default function App() {
  return (
    <div className="flex flex-col min-h-screen font-sans text-white bg-black">
      <div className="w-full max-w-6xl mx-auto px-4 py-6">
        <header className="flex justify-between items-center mb-8 h-11">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            CarMania NFT Gallery
          </h1>
          <div className="flex items-center space-x-2">
            <Wallet className="z-10">
              <ConnectWallet>
                <Name className="text-white" />
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

        <footer className="mt-12 pt-6 flex justify-center border-t border-gray-800">
          <p className="text-sm text-gray-400">
            Built on Base with OnchainKit
          </p>
        </footer>
      </div>
    </div>
  );
}
