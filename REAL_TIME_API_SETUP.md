# 🔥 Real-Time API Configuration - Skyway Suites

## ✅ What Changed

Your Skyway Suites app now **ALWAYS** connects to the real Neon database API, whether you're running in:
- 🎨 Figma Make preview
- 💻 Local development
- 🚀 Production deployment

**No more mock data. No more fallbacks. Only real-time database operations.**

---

## 🏗️ Architecture

```
Frontend (React)
    ↓
API calls via /api
    ↓
Backend API (Vercel Serverless Functions)
    ↓
Neon PostgreSQL Database
```

**This flow works EVERYWHERE - no environment detection, no switching.**

---

## 📋 Setup Requirements

### 1. Backend API Must Be Running

Your app expects API endpoints at `/api/*`. You have two options:

#### Option A: Deploy to Vercel (Recommended)
```bash
# 1. Push code to GitHub
git add .
git commit -m "Real-time API setup"
git push origin main

# 2. Deploy to Vercel
# - Import your GitHub repository
# - Vercel auto-detects the /api folder
# - Add DATABASE_URL environment variable

# 3. Set environment variable
# In Vercel dashboard:
DATABASE_URL=postgresql://user:password@host/database
```

#### Option B: Run Local API Server
```bash
# 1. Navigate to backend-api folder
cd backend-api

# 2. Install dependencies
npm install

# 3. Create .env file
echo "DATABASE_URL=your_neon_connection_string" > .env
echo "JWT_SECRET=your_secret_key" >> .env

# 4. Start the server
npm start

# Server runs on http://localhost:3000
```

### 2. Neon Database Setup

Your Neon database must have these tables:

```sql
-- Users table (for authentication)
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'customer',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Properties table
CREATE TABLE properties (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  location VARCHAR(255),
  bedrooms INTEGER,
  bathrooms INTEGER,
  guests INTEGER,
  image TEXT,
  images TEXT[],
  amenities TEXT[],
  available BOOLEAN DEFAULT true,
  ical_url TEXT,
  airbnb_calendar_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bookings table
CREATE TABLE bookings (
  id SERIAL PRIMARY KEY,
  property_id INTEGER REFERENCES properties(id),
  customer_id INTEGER REFERENCES users(id),
  check_in DATE NOT NULL,
  check_out DATE NOT NULL,
  guests INTEGER,
  total_price DECIMAL(10, 2),
  amount_paid DECIMAL(10, 2),
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payments table
CREATE TABLE payments (
  id SERIAL PRIMARY KEY,
  booking_id INTEGER REFERENCES bookings(id),
  customer_id INTEGER REFERENCES users(id),
  amount DECIMAL(10, 2) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  payment_method VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Settings table (for hero background, etc.)
CREATE TABLE settings (
  id SERIAL PRIMARY KEY,
  category VARCHAR(100) NOT NULL,
  key VARCHAR(100) NOT NULL,
  value TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(category, key)
);
```

Run this in your Neon SQL editor.

### 3. Create Initial Admin User

```sql
-- Create admin user
-- Password: admin123 (hashed with bcrypt)
INSERT INTO users (email, password_hash, name, role)
VALUES (
  'admin@skyway.com',
  '$2b$10$rK3pZxZqH4Q4h8xJYvZ0R.zYzJ0M1Q9Y5h5hHxKx5Y5Y5Y5Y5Y5Y5',
  'Admin User',
  'admin'
);

-- Note: You'll need to generate the password_hash using bcrypt
-- Or use the signup page to create users
```

To generate a password hash:
```javascript
const bcrypt = require('bcrypt');
const hash = await bcrypt.hash('your_password', 10);
console.log(hash);
```

---

## 🔐 Authentication Flow

### Login Process (Real-Time)

1. **User enters credentials** on `/login` page
2. **Frontend calls** `POST /api/auth?action=login`
3. **Backend validates** credentials against Neon database
4. **Backend returns** JWT token + user data
5. **Frontend stores** token in localStorage
6. **User is authenticated** ✅

### Signup Process (Real-Time)

1. **User enters details** on `/create-account` page
2. **Frontend calls** `POST /api/auth?action=signup`
3. **Backend creates** user in Neon database
4. **Backend returns** JWT token + user data
5. **User is authenticated** ✅

### All Other API Calls

Every API call includes the JWT token:
```javascript
headers: {
  'Authorization': 'Bearer <token>',
  'Content-Type': 'application/json'
}
```

---

## 🎯 API Endpoints

### Authentication
- `POST /api/auth?action=login` - Login
- `POST /api/auth?action=signup` - Create account

### Properties
- `GET /api/properties` - Get all properties
- `GET /api/properties?id=123` - Get single property
- `POST /api/properties` - Create property (admin)
- `PUT /api/properties?id=123` - Update property (admin)
- `DELETE /api/properties?id=123` - Delete property (admin)

### Bookings
- `GET /api/bookings` - Get all bookings
- `POST /api/bookings` - Create booking
- `PUT /api/bookings?id=123` - Update booking
- `DELETE /api/bookings?id=123` - Delete booking

### Customers
- `GET /api/customers` - Get all customers (admin)
- `POST /api/customers` - Create customer (admin)
- `PUT /api/customers?id=123` - Update customer (admin)
- `DELETE /api/customers?id=123` - Delete customer (admin)

### Payments
- `GET /api/payments` - Get all payments
- `POST /api/payments` - Create payment
- `DELETE /api/payments?id=123` - Delete payment

### Settings
- `GET /api/settings?category=hero` - Get hero settings
- `PUT /api/settings?category=hero` - Update hero settings (admin)

---

## 🔧 Frontend Configuration

### API Base URL

The frontend automatically uses the correct API URL:

```typescript
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';
```

#### In Figma Make Preview:
- Uses `/api` (relative path)
- Must proxy to your deployed Vercel API
- Or configure VITE_API_URL in environment

#### In Production (Vercel):
- Uses `/api` (same domain)
- Vercel automatically routes to `/api` folder

#### In Local Development:
- Set `VITE_API_URL=http://localhost:3000/api`
- Points to local backend server

### Environment Variables

Create `.env` file in frontend:
```env
# For local development with local API server
VITE_API_URL=http://localhost:3000/api

# Or point to deployed Vercel API
# VITE_API_URL=https://your-app.vercel.app/api
```

---

## 🚀 Deployment Workflow

### 1. Deploy Backend (Vercel)
```bash
# Vercel automatically deploys /api folder as serverless functions
vercel deploy

# Set environment variable
vercel env add DATABASE_URL
# Enter your Neon connection string
```

### 2. Deploy Frontend (Vercel)
```bash
# Same deployment
# Frontend and backend deploy together
```

### 3. Configure CORS (if needed)
If frontend and backend are on different domains:

In `/api/properties.js` (and all API files):
```javascript
// Add CORS headers
res.setHeader('Access-Control-Allow-Origin', 'https://your-frontend.vercel.app');
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
```

---

## 🧪 Testing Real-Time API

### Test Authentication
```bash
# Login
curl -X POST http://localhost:3000/api/auth?action=login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@skyway.com","password":"admin123"}'

# Expected response:
{
  "user": {
    "id": "1",
    "email": "admin@skyway.com",
    "name": "Admin User",
    "role": "admin"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Test Properties Endpoint
```bash
# Get all properties (with auth token)
curl -X GET http://localhost:3000/api/properties \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"

# Expected response:
[
  {
    "id": "1",
    "title": "Luxury Downtown Apartment",
    "price": 150,
    ...
  }
]
```

### Test Create Property
```bash
curl -X POST http://localhost:3000/api/properties \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Beach House",
    "description": "Beautiful beach house",
    "price": 200,
    "location": "Miami, FL",
    "bedrooms": 3,
    "bathrooms": 2,
    "guests": 6,
    "image": "https://...",
    "amenities": ["WiFi", "Pool"],
    "available": true
  }'
```

---

## 🐛 Troubleshooting

### Issue: "Request failed" on all API calls

**Cause:** Backend API not running or not accessible

**Solutions:**
1. Check if backend is deployed to Vercel
2. Check DATABASE_URL is set in Vercel environment
3. Check `/api` folder exists with serverless functions
4. Test API endpoint directly: `curl https://your-app.vercel.app/api/properties`

### Issue: "Login failed" error

**Cause:** No users in database or wrong credentials

**Solutions:**
1. Check if users table exists in Neon
2. Check if user exists: `SELECT * FROM users WHERE email = 'admin@skyway.com'`
3. Create user via signup page
4. Or insert user manually with hashed password

### Issue: "Unauthorized" on API calls

**Cause:** JWT token missing or invalid

**Solutions:**
1. Check localStorage has token: `localStorage.getItem('token')`
2. Login again to get fresh token
3. Check JWT_SECRET matches in backend

### Issue: Empty data on pages

**Cause:** No data in database

**Solutions:**
1. Use admin panel to create properties
2. Insert sample data in Neon SQL editor
3. Check API returns data: `curl https://your-app.vercel.app/api/properties`

### Issue: CORS errors

**Cause:** Frontend and backend on different domains

**Solutions:**
1. Deploy frontend and backend together on Vercel (same domain)
2. Or add CORS headers to all API endpoints
3. Use relative `/api` path instead of absolute URL

---

## 📊 Database Monitoring

### Check Connection
```sql
-- In Neon SQL editor
SELECT current_database(), current_user, version();
```

### Check Tables
```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public';
```

### Check Data
```sql
-- Count records
SELECT 
  'users' as table_name, COUNT(*) as count FROM users
UNION ALL
SELECT 'properties', COUNT(*) FROM properties
UNION ALL
SELECT 'bookings', COUNT(*) FROM bookings
UNION ALL
SELECT 'payments', COUNT(*) FROM payments;
```

### Check Recent Activity
```sql
-- Recent logins
SELECT email, name, role, created_at 
FROM users 
ORDER BY created_at DESC 
LIMIT 10;

-- Recent bookings
SELECT * FROM bookings 
ORDER BY created_at DESC 
LIMIT 10;
```

---

## ✅ Checklist

Before using the app, ensure:

- [ ] Neon database created
- [ ] All tables created (users, properties, bookings, payments, settings)
- [ ] At least one admin user exists
- [ ] Backend deployed to Vercel OR running locally
- [ ] DATABASE_URL environment variable set
- [ ] JWT_SECRET environment variable set
- [ ] Frontend can access `/api` endpoints
- [ ] Login works and returns JWT token
- [ ] Admin panel accessible with admin user

---

## 🎉 Success!

When everything is set up correctly:

1. ✅ Login works with real credentials
2. ✅ Properties load from Neon database
3. ✅ Admin can create/edit/delete properties
4. ✅ Bookings save to database
5. ✅ Payments tracked in database
6. ✅ All changes persist and sync in real-time

**No mock data. No fallbacks. Pure real-time database power!** 🚀

---

## 📝 Quick Start Commands

```bash
# 1. Setup Neon database
# - Create database on Neon.tech
# - Run SQL schema (see Database Setup section)
# - Create admin user

# 2. Deploy to Vercel
git add .
git commit -m "Deploy Skyway Suites"
git push origin main
vercel deploy
vercel env add DATABASE_URL
vercel env add JWT_SECRET

# 3. Test
# - Go to https://your-app.vercel.app/login
# - Login with admin credentials
# - Access admin panel
# - Create properties
# - View on homepage

# Done! ✅
```

---

**Last Updated:** March 10, 2026  
**Mode:** Real-Time Only (No Mock Data)  
**Database:** Neon PostgreSQL  
**Deployment:** Vercel Serverless Functions
