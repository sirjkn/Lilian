import type { VercelRequest, VercelResponse } from '@vercel/node';
import { query } from './config/db';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS and set Content-Type
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Test database connection
    const result = await query('SELECT NOW() as time, version() as version');
    
    return res.status(200).json({
      status: 'ok',
      database: 'connected',
      message: 'Skyway Suites API is running',
      timestamp: new Date().toISOString(),
      dbTime: result.rows[0].time,
      dbVersion: result.rows[0].version.split(' ')[0]
    });
  } catch (error) {
    console.error('Health check failed:', error);
    return res.status(500).json({
      status: 'error',
      database: 'disconnected',
      message: 'Database connection failed',
      error: String(error),
      timestamp: new Date().toISOString()
    });
  }
}