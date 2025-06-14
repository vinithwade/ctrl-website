import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

interface RouteParams {
  params: {
    id: string;
  };
}

export async function PUT(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = params;
    if (!id) {
      return NextResponse.json(
        { error: 'Review ID is required' },
        { status: 400 }
      );
    }

    const db = await getDb();
    await db.run('UPDATE reviews SET is_approved = TRUE WHERE id = ?', [id]);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error approving review:', error);
    return NextResponse.json(
      { error: 'Failed to approve review' },
      { status: 500 }
    );
  }
} 