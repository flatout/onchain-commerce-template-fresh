import '@coinbase/onchainkit/styles.css';
import './globals.css';
import Providers from './components/Providers';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "CarMania NFT Platform",
  description: "Mint your favorite car NFTs",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-background dark">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
