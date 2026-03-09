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
      // Get hero background settings
      const result = await query(
        'SELECT background_image FROM hero_settings WHERE id = 1'
      );

      if (result.rows.length === 0) {
        return res.status(200).json({ backgroundImage: null });
      }

      return res.status(200).json({
        backgroundImage: result.rows[0].background_image,
      });
    } else if (req.method === 'PUT') {
      // Update hero background settings
      const { backgroundImage } = req.body;

      if (!backgroundImage) {
        return res.status(400).json({ error: 'Background image URL is required' });
      }

      // Try to update first, if no rows exist, insert
      const updateResult = await query(
        'UPDATE hero_settings SET background_image = $1 WHERE id = 1 RETURNING *',
        [backgroundImage]
      );

      if (updateResult.rows.length === 0) {
        // No existing record, insert new one
        const insertResult = await query(
          'INSERT INTO hero_settings (id, background_image) VALUES (1, $1) RETURNING *',
          [backgroundImage]
        );
        return res.status(200).json({
          backgroundImage: insertResult.rows[0].background_image,
        });
      }

      return res.status(200).json({
        backgroundImage: updateResult.rows[0].background_image,
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
