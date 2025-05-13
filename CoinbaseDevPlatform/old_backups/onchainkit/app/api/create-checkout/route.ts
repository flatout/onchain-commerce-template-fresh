import { NextResponse } from 'next/server';
import { createDynamicCheckout } from '../../utils/commerce';
import type { NFTCheckoutMetadata, CheckoutPricing } from '../../utils/commerce';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, description, pricing, metadata } = body as {
      name: string;
      description: string;
      pricing: CheckoutPricing;
      metadata: NFTCheckoutMetadata;
    };

    // Create the checkout session
    const checkout = await createDynamicCheckout(
      name,
      description,
      pricing,
      metadata,
      {} // Empty customer info - will be collected by Coinbase Commerce
    );

    return NextResponse.json(checkout);
  } catch (error) {
    console.error('Error creating checkout:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout' },
      { status: 500 }
    );
  }
} 