import { FrameRequest, getFrameMessage, getFrameHtmlResponse } from '@coinbase/onchainkit';
import { NextRequest, NextResponse } from 'next/server';

const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_URL || 'http://localhost:3002';
const MANIFOLD_URL = "https://app.manifold.xyz/c/man-driving-car";

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const body: FrameRequest = await req.json();
  await getFrameMessage(body, { neynarApiKey: 'NEYNAR_ONCHAIN_KIT' });

  return new NextResponse(
    getFrameHtmlResponse({
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
      postUrl: `${NEXT_PUBLIC_URL}/api/frame`,
    }),
  );
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic'; 