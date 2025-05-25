import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    // Get database connection
    const db = await getDb();
    const data = await req.json();
    
    // Basic validation
    if (!data.name || !data.comment || !data.rating) {
      return NextResponse.json(
        { error: 'Name, comment, and rating are required' },
        { status: 400 }
      );
    }
    
    // Validate rating
    const rating = parseInt(data.rating);
    if (isNaN(rating) || rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: 'Rating must be between 1 and 5 stars' },
        { status: 400 }
      );
    }
    
    // Insert into database
    const result = await db.run(
      'INSERT INTO reviews (name, title, rating, comment, is_approved) VALUES (?, ?, ?, ?, ?)',
      [data.name, data.title || null, rating, data.comment, false]
    );
    
    return NextResponse.json({ 
      success: true,
      id: result.lastID,
      message: 'Thank you for your review! It will be displayed after approval.'
    });
  } catch (error) {
    console.error('Error saving review:', error);
    return NextResponse.json(
      { error: 'Failed to save review' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const db = await getDb();
    const reviews = await db.all(
      'SELECT * FROM reviews WHERE is_approved = TRUE ORDER BY created_at DESC'
    );
    
    return NextResponse.json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json(
      { error: 'Failed to fetch reviews' },
      { status: 500 }
    );
  }
} 