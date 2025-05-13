import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, description, pricing, metadata, customerInfo } = body;

    // Create charge with Coinbase Commerce
    const response = await fetch('https://api.commerce.coinbase.com/charges', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CC-Api-Key': process.env.COINBASE_COMMERCE_API_KEY || '',
        'X-CC-Version': '2018-03-22',
      },
      body: JSON.stringify({
        name,
        description,
        pricing_type: 'fixed_price',
        local_price: {
          amount: pricing.amount,
          currency: pricing.currency,
        },
        metadata: {
          ...metadata,
          customerWalletAddress: customerInfo?.walletAddress,
        },
        redirect_url: `${process.env.NEXT_PUBLIC_APP_URL}/success`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cancel`,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || 'Failed to create charge');
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error creating charge:', error);
    return NextResponse.json(
      { error: 'Failed to create charge' },
      { status: 500 }
    );
  }
} 