import { getDatabase } from '@netlify/database';

export default async (req, context) => {
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  try {
    const { image_base64, title, description } = await req.json();
    const db = getDatabase();

    const existing = await db.sql`SELECT id FROM promo_content LIMIT 1`;
    
    if (existing.length > 0) {
      await db.sql`UPDATE promo_content SET 
        image_base64 = ${image_base64 || null}, 
        title = ${title}, 
        description = ${description},
        updated_at = NOW()
        WHERE id = ${existing[0].id}`;
    } else {
      await db.sql`INSERT INTO promo_content (image_base64, title, description) 
        VALUES (${image_base64 || null}, ${title}, ${description})`;
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};