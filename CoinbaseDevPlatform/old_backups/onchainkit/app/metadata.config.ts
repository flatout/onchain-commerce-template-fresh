import { getFrameMetadata } from '@coinbase/onchainkit';
import { Metadata } from 'next';

// Environment and URL Configuration
const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_URL || 'http://localhost:3003';
const MANIFOLD_URL = process.env.NEXT_PUBLIC_MANIFOLD_URL || 'https://app.manifold.xyz/c/carculture';
const CARMANIA_COLLECTION_URL = process.env.NEXT_PUBLIC_CARMANIA_COLLECTION_URL || 'https://coinbase.com/carmania';

// Mini App Configuration
// UUID v4 format: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
// where x is any hex digit and y is one of 8, 9, A, or B
const MINI_APP_ID = process.env.NEXT_PUBLIC_MINI_APP_ID;
const MINI_APP_DOMAIN = "carculture"; // Your actual domain

// Available configurations:
// 1. NEXT_PUBLIC_URL: The base URL where your app is hosted (carculture.com)
// 2. NEYNAR_API_KEY: For Farcaster frame authentication
// 3. NEXT_PUBLIC_CDP_API_KEY: Coinbase Developer Platform API key
// 4. NEXT_PUBLIC_WC_PROJECT_ID: WalletConnect project ID
// 5. NEXT_PUBLIC_MANIFOLD_URL: NFT collection URL
// 6. NEXT_PUBLIC_CARMANIA_COLLECTION_URL: CarMania gallery URL

const MINI_APP_NEW_URL = `/miniapps/${MINI_APP_ID}/${MINI_APP_DOMAIN}`;

export const metadata: Metadata = {
  title: 'CarCulture',
  description: 'CarCulture - Your Digital Car Collection',
  openGraph: {
    title: 'CarCulture',
    description: 'CarCulture - Your Digital Car Collection',
    images: [`${MANIFOLD_URL}/preview`],
  },
  other: {
    ...getFrameMetadata({
      buttons: [
        {
          label: 'Like'
        },
        {
          label: 'Recast'
        },
        {
          action: 'mint',
          label: 'Mint NFT',
          target: `${MANIFOLD_URL}/mint` // Manifold mint endpoint
        },
        {
          action: 'link',
          label: 'View Collection',
          target: CARMANIA_COLLECTION_URL
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

// Export the Mini App configuration for use in other files
export { 
  MINI_APP_ID, 
  MINI_APP_DOMAIN, 
  MINI_APP_NEW_URL,
  MANIFOLD_URL,
  CARMANIA_COLLECTION_URL
}; 