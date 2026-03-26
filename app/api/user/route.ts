import db from '@/lib/db';
import { initDB } from '@/lib/init-db';

export async function GET() {
  initDB();  

  const users = db.prepare('SELECT * FROM users').all();
  return Response.json(users);
}

export async function POST(req: Request) {
  try {
    initDB();  

    const body = await req.json();
    const { name } = body;

    if (!name) {
      return Response.json({ error: 'Name is required' }, { status: 400 });
    }

    const result = db
      .prepare('INSERT INTO users (name) VALUES (?)')
      .run(name);

    return Response.json({
      message: 'User inserted successfully',
      id: result.lastInsertRowid,
    });
  } catch (error) {
    console.error(error);
    return Response.json({ error: 'Something went wrong' }, { status: 500 });
  }
}