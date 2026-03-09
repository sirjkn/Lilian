import type { VercelRequest, VercelResponse } from '@vercel/node';
import { query } from '../config/db';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (req.method === 'GET') {
      // Get all bookings
      const result = await query('SELECT * FROM bookings ORDER BY created_at DESC');
      return res.status(200).json(result.rows);
    }

    if (req.method === 'POST') {
      // Create booking
      const { property_id, customer_id, check_in, check_out, guests, total_price } = req.body;

      const result = await query(
        'INSERT INTO bookings (property_id, customer_id, check_in, check_out, guests, total_price, status) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
        [property_id, customer_id, check_in, check_out, guests, total_price, 'pending']
      );

      return res.status(200).json(result.rows[0]);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Bookings API error:', error);
    return res.status(500).json({ error: 'Failed to process request' });
  }
}
