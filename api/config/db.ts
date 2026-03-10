import { Pool } from 'pg';
import { ENV } from './env';

// Singleton connection pool
let pool: Pool | null = null;

export function getPool(): Pool {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL || ENV.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false
      },
      max: ENV.DB_POOL.max,
      idleTimeoutMillis: ENV.DB_POOL.idleTimeoutMillis,
      connectionTimeoutMillis: ENV.DB_POOL.connectionTimeoutMillis,
    });
    
    console.log('✅ Database pool initialized with Neon PostgreSQL');
  }
  return pool;
}

export async function query(text: string, params?: any[]) {
  const pool = getPool();
  const start = Date.now();
  const res = await pool.query(text, params);
  const duration = Date.now() - start;
  console.log('Executed query', { text, duration, rows: res.rowCount });
  return res;
}