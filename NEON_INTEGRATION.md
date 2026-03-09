# Connecting Skyway Suites to Neon Database

This guide will help you integrate your Neon PostgreSQL database with the Skyway Suites application.

## Database Setup

### 1. Create Your Neon Database

1. Go to [neon.tech](https://neon.tech) and create an account
2. Create a new project
3. Copy your connection string (it looks like):
   ```
   postgresql://username:password@ep-xxxx-xxxx.us-east-2.aws.neon.tech/dbname
   ```

### 2. Database Schema

Create the following tables in your Neon database:

```sql
-- Users table (for authentication)
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'customer',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Properties table
CREATE TABLE properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  location VARCHAR(255) NOT NULL,
  bedrooms INTEGER NOT NULL,
  bathrooms INTEGER NOT NULL,
  guests INTEGER NOT NULL,
  image TEXT,
  amenities TEXT[], -- Array of amenities
  available BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Customers table
CREATE TABLE customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Bookings table
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
  check_in DATE NOT NULL,
  check_out DATE NOT NULL,
  guests INTEGER NOT NULL,
  total_price DECIMAL(10, 2) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Payments table
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,
  customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
  amount DECIMAL(10, 2) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  payment_method VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Contact form submissions
CREATE TABLE contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_bookings_property ON bookings(property_id);
CREATE INDEX idx_bookings_customer ON bookings(customer_id);
CREATE INDEX idx_payments_booking ON payments(booking_id);
CREATE INDEX idx_payments_customer ON payments(customer_id);
```

## Backend API Setup

You'll need to create a backend API server to connect your frontend to Neon. Here's a recommended approach:

### Option 1: Node.js + Express

1. Create a new folder for your backend: `skyway-api`
2. Install dependencies:
   ```bash
   npm init -y
   npm install express pg bcrypt jsonwebtoken cors dotenv
   ```

3. Create `.env` file:
   ```
   DATABASE_URL=your_neon_connection_string
   JWT_SECRET=your_secret_key
   PORT=3001
   ```

4. Create basic server (`server.js`):
   ```javascript
   const express = require('express');
   const { Pool } = require('pg');
   const bcrypt = require('bcrypt');
   const jwt = require('jsonwebtoken');
   const cors = require('cors');
   require('dotenv').config();

   const app = express();
   const pool = new Pool({
     connectionString: process.env.DATABASE_URL,
     ssl: { rejectUnauthorized: false }
   });

   app.use(cors());
   app.use(express.json());

   // Properties endpoints
   app.get('/api/properties', async (req, res) => {
     const result = await pool.query('SELECT * FROM properties WHERE available = true');
     res.json(result.rows);
   });

   app.post('/api/properties', async (req, res) => {
     const { title, description, price, location, bedrooms, bathrooms, guests, image, amenities } = req.body;
     const result = await pool.query(
       'INSERT INTO properties (title, description, price, location, bedrooms, bathrooms, guests, image, amenities) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
       [title, description, price, location, bedrooms, bathrooms, guests, image, amenities]
     );
     res.json(result.rows[0]);
   });

   // Bookings endpoints
   app.get('/api/bookings', async (req, res) => {
     const result = await pool.query('SELECT * FROM bookings ORDER BY created_at DESC');
     res.json(result.rows);
   });

   app.post('/api/bookings', async (req, res) => {
     const { property_id, customer_id, check_in, check_out, guests, total_price } = req.body;
     const result = await pool.query(
       'INSERT INTO bookings (property_id, customer_id, check_in, check_out, guests, total_price) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
       [property_id, customer_id, check_in, check_out, guests, total_price]
     );
     res.json(result.rows[0]);
   });

   // Customers endpoints
   app.get('/api/customers', async (req, res) => {
     const result = await pool.query(`
       SELECT c.*, COUNT(b.id) as total_bookings 
       FROM customers c 
       LEFT JOIN bookings b ON c.id = b.customer_id 
       GROUP BY c.id
     `);
     res.json(result.rows);
   });

   // Payments endpoints
   app.get('/api/payments', async (req, res) => {
     const result = await pool.query('SELECT * FROM payments ORDER BY created_at DESC');
     res.json(result.rows);
   });

   // Auth endpoints
   app.post('/api/auth/signup', async (req, res) => {
     const { email, password, name } = req.body;
     const hashedPassword = await bcrypt.hash(password, 10);
     const result = await pool.query(
       'INSERT INTO users (email, password_hash, name) VALUES ($1, $2, $3) RETURNING id, email, name, role',
       [email, hashedPassword, name]
     );
     const token = jwt.sign({ userId: result.rows[0].id }, process.env.JWT_SECRET);
     res.json({ user: result.rows[0], token });
   });

   app.post('/api/auth/login', async (req, res) => {
     const { email, password } = req.body;
     const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
     if (result.rows.length === 0) {
       return res.status(401).json({ error: 'Invalid credentials' });
     }
     const user = result.rows[0];
     const valid = await bcrypt.compare(password, user.password_hash);
     if (!valid) {
       return res.status(401).json({ error: 'Invalid credentials' });
     }
     const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
     res.json({ user: { id: user.id, email: user.email, name: user.name, role: user.role }, token });
   });

   app.listen(process.env.PORT, () => {
     console.log(`Server running on port ${process.env.PORT}`);
   });
   ```

### Option 2: Use Neon's Serverless Driver

You can also use Neon's serverless driver directly in your frontend API routes if you're using a framework like Next.js or deploying to Vercel/Netlify.

## Update Frontend API Calls

Once your backend is running, update `/src/app/lib/api.ts` to call your actual API:

```typescript
// Replace the base URL with your backend URL
const API_BASE_URL = 'http://localhost:3001/api';

export async function getProperties(): Promise<Property[]> {
  const response = await fetch(`${API_BASE_URL}/properties`);
  return response.json();
}

export async function createProperty(property: Omit<Property, 'id'>): Promise<Property> {
  const response = await fetch(`${API_BASE_URL}/properties`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(property),
  });
  return response.json();
}

// Update all other API functions similarly...
```

## Update Authentication Context

Update `/src/app/context/AuthContext.tsx` to use real API calls:

```typescript
const login = async (email: string, password: string) => {
  const response = await fetch('http://localhost:3001/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  if (response.ok) {
    setUser(data.user);
    localStorage.setItem('token', data.token);
  } else {
    throw new Error(data.error);
  }
};
```

## Deployment

### Deploy Backend (API)
- **Railway**: Connect your GitHub repo, add Neon connection string as env variable
- **Render**: Similar to Railway, free tier available
- **Fly.io**: Great for Node.js apps with global edge deployment

### Deploy Frontend
- **Vercel**: Best for React apps, automatic deployments from GitHub
- **Netlify**: Similar to Vercel with excellent CI/CD
- **Cloudflare Pages**: Fast and free with global CDN

## Security Considerations

1. **Environment Variables**: Never commit your database credentials
2. **CORS**: Configure CORS properly in production
3. **Authentication**: Use JWT tokens with proper expiration
4. **SQL Injection**: Always use parameterized queries (as shown above)
5. **Rate Limiting**: Implement rate limiting on your API
6. **HTTPS**: Always use HTTPS in production

## Next Steps

1. Set up your Neon database with the schema above
2. Create a backend API server (or use serverless functions)
3. Update the frontend API calls to point to your backend
4. Test all functionality end-to-end
5. Deploy both frontend and backend
6. Configure environment variables in production

For more information, check out:
- [Neon Documentation](https://neon.tech/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Node.js + PostgreSQL Guide](https://node-postgres.com/)
