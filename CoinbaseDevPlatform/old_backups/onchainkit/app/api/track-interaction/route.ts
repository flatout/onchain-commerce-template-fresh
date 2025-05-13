import { NextResponse } from 'next/server';

interface InteractionData {
  tokenId: string;
  contractAddress: string;
  walletAddress?: string;
  action: 'view' | 'click' | 'purchase';
  timestamp: string;
  fid?: string;
}

export async function POST(request: Request) {
  try {
    const data: InteractionData = await request.json();
    
    // Get Farcaster ID from frame context if available
    const fid = request.headers.get('fc-frame-fid');
    if (fid) {
      data.fid = fid;
    }

    // Here you would typically store this data in your database
    // For now, we'll just log it
    console.log('Interaction tracked:', {
      ...data,
      fid,
      timestamp: new Date().toISOString()
    });

    // You can implement your storage solution here:
    // - Database (e.g., PostgreSQL, MongoDB)
    // - Analytics service (e.g., Mixpanel, Amplitude)
    // - Custom analytics endpoint

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error tracking interaction:', error);
    return NextResponse.json(
      { error: 'Failed to track interaction' },
      { status: 500 }
    );
  }
} 