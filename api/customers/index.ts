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
      // Get all customers
      const result = await query(`
        SELECT c.*, COUNT(b.id)::int as total_bookings 
        FROM customers c 
        LEFT JOIN bookings b ON c.id = b.customer_id 
        GROUP BY c.id
        ORDER BY c.created_at DESC
      `);
      return res.status(200).json(result.rows);
    }

    if (req.method === 'POST') {
      // Create customer
      const { name, email, phone } = req.body;

      const result = await query(
        'INSERT INTO customers (name, email, phone) VALUES ($1, $2, $3) RETURNING *',
        [name, email, phone]
      );

      return res.status(200).json(result.rows[0]);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Customers API error:', error);
    return res.status(500).json({ error: 'Failed to process request' });
  }
}
