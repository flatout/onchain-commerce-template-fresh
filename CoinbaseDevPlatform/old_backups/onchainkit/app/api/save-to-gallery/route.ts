import { NextResponse } from 'next/server';

interface SaveToGalleryData {
  walletAddress?: string;
  fid?: string;
  timestamp: string;
}

export async function POST(request: Request) {
  try {
    const data: SaveToGalleryData = await request.json();
    
    // Get Farcaster ID from frame context if available
    const fid = request.headers.get('fc-frame-fid');
    if (fid) {
      data.fid = fid;
    }

    // Here you would typically store this data in your database
    // For now, we'll just log it
    console.log('Gallery save tracked:', {
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
    console.error('Error tracking gallery save:', error);
    return NextResponse.json(
      { error: 'Failed to track gallery save' },
      { status: 500 }
    );
  }
} 