import { VercelRequest, VercelResponse } from '@vercel/node';
import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  connectionString: "postgresql://neondb_owner:DFITqEFz5y2J@ep-black-mud-a5e5xf7u.us-east-2.aws.neon.tech/skyway-suites-db?sslmode=require",
  ssl: {
    rejectUnauthorized: false
  }
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    // Get all properties
    const result = await pool.query(`
      SELECT id, title, updated_at, created_at 
      FROM properties 
      WHERE status = 'active'
      ORDER BY created_at DESC
    `);

    const properties = result.rows;
    const baseUrl = 'https://www.skywaysuites.co.ke';
    const today = new Date().toISOString().split('T')[0];

    // Generate XML sitemap
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <!-- Homepage -->
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  
  <!-- All Properties Page -->
  <url>
    <loc>${baseUrl}/properties</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  
  <!-- About Page -->
  <url>
    <loc>${baseUrl}/about</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  
  <!-- Contact Page -->
  <url>
    <loc>${baseUrl}/contact</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  
  <!-- Individual Properties -->
${properties.map(property => {
  const lastmod = property.updated_at || property.created_at;
  const formattedDate = new Date(lastmod).toISOString().split('T')[0];
  
  return `  <url>
    <loc>${baseUrl}/properties/${property.id}</loc>
    <lastmod>${formattedDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
}).join('\n')}
</urlset>`;

    // Set headers for XML
    res.setHeader('Content-Type', 'application/xml');
    res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600');
    
    return res.status(200).send(sitemap);
  } catch (error) {
    console.error('Sitemap generation error:', error);
    return res.status(500).json({ error: 'Failed to generate sitemap' });
  }
}
