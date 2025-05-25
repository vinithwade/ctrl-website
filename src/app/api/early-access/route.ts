import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const db = await getDb();
    const data = await req.json();
    
    // Basic validation
    if (!data.name || !data.email || !data.role) {
      return NextResponse.json(
        { error: 'Name, email, and role are required' },
        { status: 400 }
      );
    }
    
    // Insert into database
    const result = await db.run(
      'INSERT INTO early_access_requests (name, email, role, message) VALUES (?, ?, ?, ?)',
      [data.name, data.email, data.role, data.message || '']
    );
    
    return NextResponse.json({ 
      success: true,
      id: result.lastID
    });
  } catch (error) {
    console.error('Error saving early access request:', error);
    return NextResponse.json(
      { error: 'Failed to save request' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const db = await getDb();
    const requests = await db.all('SELECT * FROM early_access_requests ORDER BY created_at DESC');
    
    return NextResponse.json(requests);
  } catch (error) {
    console.error('Error fetching early access requests:', error);
    return NextResponse.json(
      { error: 'Failed to fetch requests' },
      { status: 500 }
    );
  }
} 