import { getFrameMetadata } from '@coinbase/onchainkit';
import type { Metadata } from 'next';

const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_URL || 'http://localhost:3002';
const MANIFOLD_URL = "https://app.manifold.xyz/c/man-driving-car";

export const metadata: Metadata = {
  title: 'Car of the Day',
  description: 'Exclusive Car of the Day NFT Collection',
  openGraph: {
    title: 'Car of the Day',
    description: 'Exclusive Car of the Day NFT Collection',
    images: [`${MANIFOLD_URL}/preview`],
  },
  other: {
    ...getFrameMetadata({
      buttons: [
        {
          label: 'Comment'
        },
        {
          label: 'Recast'
        },
        {
          label: 'Like'
        },
        {
          label: 'Menu'
        },
        {
          label: 'Share'
        }
      ],
      image: {
        src: `${MANIFOLD_URL}/preview`,
        aspectRatio: '1:1'
      },
      postUrl: `${NEXT_PUBLIC_URL}/api/frame`
    }),
  },
};

export default function Page() {
  return (
    <main className="min-h-screen bg-black">
      <div className="max-w-4xl mx-auto">
        <iframe 
          src="/miniapp"
          className="w-full h-[600px] border-none"
          frameBorder="0"
        />
      </div>
    </main>
  );
}