import { FrameRequest, getFrameMessage, getFrameHtmlResponse } from '@coinbase/onchainkit';
import { NextRequest, NextResponse } from 'next/server';
import { MINI_APP_NEW_URL } from '../../metadata.config';

const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_URL || 'http://localhost:3003';
const MANIFOLD_URL = "https://app.manifold.xyz/c/man-driving-car";

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const body: FrameRequest = await req.json();
  const { isValid } = await getFrameMessage(body, { neynarApiKey: process.env.NEYNAR_API_KEY });

  if (!isValid) {
    return new NextResponse('Invalid frame request', { status: 400 });
  }

  // Check if the request is from a mobile app
  const userAgent = req.headers.get('user-agent') || '';
  const isMobileApp = userAgent.includes('CoinbaseWallet') || userAgent.includes('CoinbaseApp');

  if (isMobileApp) {
    // Use new URL format for mobile apps
    return NextResponse.redirect(MINI_APP_NEW_URL);
  }

  return new NextResponse(
    getFrameHtmlResponse({
      buttons: [
        {
          label: 'Like'
        },
        {
          label: 'Recast'
        },
        {
          label: 'Share'
        },
        {
          action: 'link',
          label: 'Open App',
          target: MINI_APP_NEW_URL
        }
      ],
      image: {
        src: `${MANIFOLD_URL}/preview`,
        aspectRatio: '1:1'
      },
      postUrl: `${NEXT_PUBLIC_URL}/api/frame`
    })
  );
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic'; 