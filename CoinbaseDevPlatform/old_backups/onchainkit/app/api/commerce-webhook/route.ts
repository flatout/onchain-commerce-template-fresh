import { NextResponse } from 'next/server';
import crypto from 'crypto';

const WEBHOOK_SECRET = process.env.COINBASE_COMMERCE_WEBHOOK_SECRET;

interface CommerceWebhookData {
  id: string;
  type: string;
  metadata: {
    tokenId: string;
    contractAddress: string;
    network: 'ethereum' | 'base';
    contractType: 'erc721' | 'erc1155';
    includesPrint: boolean;
  };
  pricing: {
    local: {
      amount: string;
      currency: string;
    };
  };
  customer?: {
    name?: string;
    email?: string;
    address?: string;
    walletAddress?: string;
  };
}

function verifySignature(signature: string, body: string): boolean {
  if (!WEBHOOK_SECRET) {
    console.error('Missing WEBHOOK_SECRET environment variable');
    return false;
  }

  const hmac = crypto.createHmac('sha256', WEBHOOK_SECRET);
  hmac.update(body);
  const computedSignature = hmac.digest('hex');
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(computedSignature)
  );
}

export async function POST(request: Request) {
  try {
    const body = await request.text();
    const signature = request.headers.get('x-cc-webhook-signature');

    if (!signature) {
      return NextResponse.json(
        { error: 'Missing signature' },
        { status: 400 }
      );
    }

    // Verify webhook signature
    if (!verifySignature(signature, body)) {
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 401 }
      );
    }

    const event = JSON.parse(body) as { event: { type: string; data: CommerceWebhookData } };
    const { type, data } = event.event;

    // Handle different webhook events
    switch (type) {
      case 'charge:confirmed':
        // Payment confirmed, mint the NFT
        const { tokenId, contractAddress, network, contractType } = data.metadata;
        const customerWalletAddress = data.customer?.walletAddress;

        if (!customerWalletAddress) {
          throw new Error('Missing customer wallet address');
        }

        // TODO: Add your NFT minting logic here
        console.log('Minting NFT:', {
          tokenId,
          contractAddress,
          network,
          contractType,
          customerWalletAddress
        });

        break;

      case 'charge:failed':
        // Handle failed payment
        console.log('Payment failed:', data.id);
        break;

      case 'charge:delayed':
        // Handle delayed payment (e.g., pending blockchain confirmation)
        console.log('Payment delayed:', data.id);
        break;

      default:
        console.log('Unhandled event type:', type);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 