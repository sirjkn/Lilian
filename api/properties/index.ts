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
      // Get all properties
      const result = await query('SELECT * FROM properties WHERE available = true ORDER BY created_at DESC');
      return res.status(200).json(result.rows);
    }

    if (req.method === 'POST') {
      // Create property
      const { 
        title, 
        description, 
        price, 
        location, 
        bedrooms, 
        bathrooms, 
        guests, 
        image, 
        amenities,
        ical_export_url,
        airbnb_import_url,
        booking_import_url,
        vrbo_import_url,
        calendar_sync_enabled
      } = req.body;

      const result = await query(
        `INSERT INTO properties 
         (title, description, price, location, bedrooms, bathrooms, guests, image, amenities,
          ical_export_url, airbnb_import_url, booking_import_url, vrbo_import_url, calendar_sync_enabled) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *`,
        [title, description, price, location, bedrooms, bathrooms, guests, image, amenities,
         ical_export_url, airbnb_import_url, booking_import_url, vrbo_import_url, calendar_sync_enabled]
      );

      return res.status(200).json(result.rows[0]);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Properties API error:', error);
    return res.status(500).json({ error: 'Failed to process request' });
  }
}