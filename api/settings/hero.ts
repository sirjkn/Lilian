import type { VercelRequest, VercelResponse } from '@vercel/node';
import { query } from '../config/db';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (req.method === 'GET') {
      // Get hero background settings from new settings table
      const result = await query(
        "SELECT value FROM settings WHERE category = 'hero' AND key = 'background_image'"
      );

      if (result.rows.length === 0) {
        return res.status(200).json({ backgroundImage: null });
      }

      return res.status(200).json({
        backgroundImage: result.rows[0].value,
      });
    } else if (req.method === 'PUT') {
      // Update hero background settings in new settings table
      const { backgroundImage } = req.body;

      if (!backgroundImage) {
        return res.status(400).json({ error: 'Background image URL is required' });
      }

      // Insert or update using the new settings table
      await query(
        `INSERT INTO settings (category, key, value) 
         VALUES ('hero', 'background_image', $1) 
         ON CONFLICT (category, key) 
         DO UPDATE SET value = $1, updated_at = CURRENT_TIMESTAMP`,
        [backgroundImage]
      );

      return res.status(200).json({
        backgroundImage: backgroundImage,
      });
    } else {
      res.setHeader('Allow', ['GET', 'PUT']);
      return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }
  } catch (error) {
    console.error('Error handling hero settings:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}