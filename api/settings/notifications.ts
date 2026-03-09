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
      // Get email and WhatsApp notification settings
      const emailResult = await query(
        "SELECT key, value FROM settings WHERE category = 'notifications_email'"
      );
      
      const whatsappResult = await query(
        "SELECT key, value FROM settings WHERE category = 'notifications_whatsapp'"
      );

      const emailSettings: { [key: string]: string } = {};
      emailResult.rows.forEach((row: any) => {
        emailSettings[row.key] = row.value;
      });

      const whatsappSettings: { [key: string]: string } = {};
      whatsappResult.rows.forEach((row: any) => {
        whatsappSettings[row.key] = row.value;
      });

      return res.status(200).json({
        email: emailSettings,
        whatsapp: whatsappSettings
      });
    } else if (req.method === 'PUT') {
      // Update notification settings
      const { email, whatsapp } = req.body;

      // Update email settings
      if (email) {
        for (const [key, value] of Object.entries(email)) {
          await query(
            `INSERT INTO settings (category, key, value) 
             VALUES ('notifications_email', $1, $2) 
             ON CONFLICT (category, key) 
             DO UPDATE SET value = $2, updated_at = CURRENT_TIMESTAMP`,
            [key, value]
          );
        }
      }

      // Update WhatsApp settings
      if (whatsapp) {
        for (const [key, value] of Object.entries(whatsapp)) {
          await query(
            `INSERT INTO settings (category, key, value) 
             VALUES ('notifications_whatsapp', $1, $2) 
             ON CONFLICT (category, key) 
             DO UPDATE SET value = $2, updated_at = CURRENT_TIMESTAMP`,
            [key, value]
          );
        }
      }

      return res.status(200).json({ message: 'Settings updated successfully' });
    } else {
      res.setHeader('Allow', ['GET', 'PUT']);
      return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }
  } catch (error) {
    console.error('Error handling notification settings:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
