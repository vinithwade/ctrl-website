import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import path from 'path';
import fs from 'fs-extra';

let db: Database | null = null;

export async function getDb() {
  if (db) return db;
  
  // For Vercel serverless environment, use /tmp directory
  const dbDir = process.env.NODE_ENV === 'production' 
    ? '/tmp' 
    : path.join(process.cwd(), 'db');
    
  await fs.ensureDir(dbDir);
  
  const dbPath = path.join(dbDir, 'ctrl.db');
  
  // Check if we need to initialize the database
  const dbExists = await fs.pathExists(dbPath);
  
  // Open database connection
  db = await open({
    filename: dbPath,
    driver: sqlite3.Database
  });
  
  // Initialize database tables if they don't exist
  await initDb(db, !dbExists);
  
  return db;
}

async function initDb(db: Database, isNewDb: boolean = false) {
  // Create early_access_requests table if it doesn't exist
  await db.exec(`
    CREATE TABLE IF NOT EXISTS early_access_requests (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      role TEXT NOT NULL,
      message TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
  
  // Create reviews table if it doesn't exist
  await db.exec(`
    CREATE TABLE IF NOT EXISTS reviews (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      title TEXT,
      rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
      comment TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      is_approved BOOLEAN DEFAULT FALSE
    )
  `);
  
  // Insert some sample reviews if it's a new database
  if (isNewDb) {
    const sampleReviews = [
      {
        name: 'Alex Thompson',
        title: 'Product Designer',
        rating: 5,
        comment: 'CTRL revolutionized our workflow. The seamless integration between design and code has cut our development time in half.',
        is_approved: true
      },
      {
        name: 'Sarah Chen',
        title: 'Frontend Developer',
        rating: 5,
        comment: 'As someone who codes, I was skeptical. But CTRL generates clean, maintainable code that I can actually work with. Game changer!',
        is_approved: true
      },
      {
        name: 'Marcus Johnson',
        title: 'Startup Founder',
        rating: 4,
        comment: 'We launched our MVP in weeks instead of months. The visual programming features are intuitive enough for our non-technical team members.',
        is_approved: true
      }
    ];
    
    for (const review of sampleReviews) {
      await db.run(
        'INSERT INTO reviews (name, title, rating, comment, is_approved) VALUES (?, ?, ?, ?, ?)',
        [review.name, review.title, review.rating, review.comment, review.is_approved]
      );
    }
  }
} 