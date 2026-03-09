import type { VercelRequest, VercelResponse } from '@vercel/node';
import { query } from '../config/db';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Property ID is required' });
  }

  try {
    if (req.method === 'GET') {
      // Get single property
      const result = await query('SELECT * FROM properties WHERE id = $1', [id]);

      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Property not found' });
      }

      return res.status(200).json(result.rows[0]);
    }

    if (req.method === 'PUT') {
      // Update property
      const { title, description, price, location, bedrooms, bathrooms, guests, image, amenities, available } = req.body;

      const result = await query(
        'UPDATE properties SET title = $1, description = $2, price = $3, location = $4, bedrooms = $5, bathrooms = $6, guests = $7, image = $8, amenities = $9, available = $10 WHERE id = $11 RETURNING *',
        [title, description, price, location, bedrooms, bathrooms, guests, image, amenities, available, id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Property not found' });
      }

      return res.status(200).json(result.rows[0]);
    }

    if (req.method === 'DELETE') {
      // Delete property
      await query('DELETE FROM properties WHERE id = $1', [id]);
      return res.status(200).json({ message: 'Property deleted successfully' });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Property API error:', error);
    return res.status(500).json({ error: 'Failed to process request' });
  }
}
