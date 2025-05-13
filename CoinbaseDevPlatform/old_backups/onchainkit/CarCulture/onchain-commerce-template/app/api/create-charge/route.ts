import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { price, title, description, image, contractAddress, tokenId, paymentMethod } = body;

    // Validate required fields
    if (!price || !title || !contractAddress || !tokenId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Create charge with Coinbase Commerce
    const response = await fetch('https://api.commerce.coinbase.com/charges', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CC-Api-Key': process.env.NEXT_PUBLIC_COINBASE_COMMERCE_API_KEY || '',
        'X-CC-Version': '2018-03-22',
      },
      body: JSON.stringify({
        name: title,
        description: description || `Purchase ${title} NFT`,
        pricing_type: 'fixed_price',
        local_price: {
          amount: price,
          currency: paymentMethod === 'USDC' ? 'USDC' : 'ETH',
        },
        metadata: {
          contractAddress,
          tokenId,
          network: 'base',
        },
        redirect_url: `${process.env.NEXT_PUBLIC_APP_URL}/success`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cancel`,
        image_url: image,
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