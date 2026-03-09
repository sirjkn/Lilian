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
      // Get all user settings
      const result = await query(
        "SELECT key, value FROM settings WHERE category = 'users'"
      );

      const settings: { [key: string]: string } = {};
      result.rows.forEach((row: any) => {
        settings[row.key] = row.value;
      });

      return res.status(200).json(settings);
    } else if (req.method === 'PUT') {
      // Update user settings
      const settingsData = req.body;

      // Update each setting
      for (const [key, value] of Object.entries(settingsData)) {
        await query(
          `INSERT INTO settings (category, key, value) 
           VALUES ('users', $1, $2) 
           ON CONFLICT (category, key) 
           DO UPDATE SET value = $2, updated_at = CURRENT_TIMESTAMP`,
          [key, value]
        );
      }

      return res.status(200).json({ message: 'Settings updated successfully' });
    } else {
      res.setHeader('Allow', ['GET', 'PUT']);
      return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }
  } catch (error) {
    console.error('Error handling user settings:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
