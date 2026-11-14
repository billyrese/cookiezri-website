import { getDatabase } from '@netlify/database';

export default async (req, context) => {
  try {
    const db = getDatabase();
    const result = await db.sql`SELECT * FROM promo_content ORDER BY id DESC LIMIT 1`;
    
    return new Response(JSON.stringify(result[0] || {}), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};