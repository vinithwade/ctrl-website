import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

// This endpoint is for admin use only - returns all reviews including unapproved ones
export async function GET() {
  try {
    const db = await getDb();
    const reviews = await db.all(
      'SELECT * FROM reviews ORDER BY created_at DESC'
    );
    
    return NextResponse.json(reviews);
  } catch (error) {
    console.error('Error fetching all reviews:', error);
    return NextResponse.json(
      { error: 'Failed to fetch reviews' },
      { status: 500 }
    );
  }
} 