import { NextRequest, NextResponse } from 'next/server';
import { NeynarAPIClient } from '@neynar/nodejs-sdk';

const NEYNAR_API_KEY = process.env.NEYNAR_API_KEY || 'NEYNAR_FROG_FM';
const CONTRACT_ADDRESS = '0x44dF55B47F24B73190657fE9107Ca43234bbc21E';

const client = new NeynarAPIClient(NEYNAR_API_KEY);

export async function POST(req: NextRequest): Promise<Response> {
  try {
    const body = await req.json();
    
    // Validate the frame message using Neynar
    const { valid } = await client.validateFrameAction(body?.trustedData?.messageBytes || '');
    
    if (!valid) {
      return new NextResponse(
        JSON.stringify({
          frames: {
            version: 'vNext',
            image: 'http://localhost:3000/error.png',
            buttons: [
              {
                label: 'Invalid frame message. Click to retry',
                action: 'post'
              }
            ],
            post_url: 'http://localhost:3000/api/frame'
          }
        }),
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    // Return the mint page redirect
    return new NextResponse(
      JSON.stringify({
        frames: {
          version: 'vNext',
          image: 'http://localhost:3000/mint-preview.png',
          buttons: [
            {
              label: 'Go to Mint',
              action: 'link',
              target: `http://localhost:3000/?contract=${CONTRACT_ADDRESS}`
            }
          ]
        }
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

  } catch (error) {
    console.error('Error:', error);
    return new NextResponse(
      JSON.stringify({
        frames: {
          version: 'vNext',
          image: 'http://localhost:3000/error.png',
          buttons: [
            {
              label: 'An error occurred. Click to retry',
              action: 'post'
            }
          ],
          post_url: 'http://localhost:3000/api/frame'
        }
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}

export const dynamic = 'force-dynamic'; 