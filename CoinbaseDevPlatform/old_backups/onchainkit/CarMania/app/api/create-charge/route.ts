import { NextResponse } from 'next/server';
import { Client, resources } from 'coinbase-commerce-node';

Client.init(process.env.COINBASE_COMMERCE_API_KEY || '');
const { Charge } = resources;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, description, pricing, metadata, customerInfo } = body;

    const chargeData = {
      name,
      description,
      pricing_type: 'fixed_price',
      local_price: {
        amount: pricing.amount,
        currency: pricing.currency
      },
      metadata: {
        ...metadata,
        customer_id: customerInfo.walletAddress
      },
      redirect_url: `${process.env.NEXT_PUBLIC_APP_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cancel`
    };

    const charge = await Charge.create(chargeData);

    return NextResponse.json(charge);
  } catch (error) {
    console.error('Error creating charge:', error);
    return NextResponse.json(
      { error: 'Failed to create charge' },
      { status: 500 }
    );
  }
} 