# 🚀 Skyway Suites - Quick Start Guide

## ⚡ 5-Minute Setup

Your Skyway Suites app is configured for **real-time database connectivity**. Follow these steps to get it running:

---

## Step 1: Create Neon Database (2 minutes)

1. Go to [neon.tech](https://neon.tech)
2. Click **"Sign Up"** or **"Login"**
3. Create new project: **"Skyway Suites"**
4. Copy your connection string (looks like this):
   ```
   postgresql://user:password@host.neon.tech/database
   ```

---

## Step 2: Create Database Tables (1 minute)

1. In Neon dashboard, click **"SQL Editor"**
2. Paste this SQL and click **"Run"**:

```sql
-- Users table
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

-- Settings table
CREATE TABLE settings (
  id SERIAL PRIMARY KEY,
  category VARCHAR(100) NOT NULL,
  key VARCHAR(100) NOT NULL,
  value TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(category, key)
);
```

---

## Step 3: Create Admin User (1 minute)

### Option A: Use Signup Page (Easiest)
1. Skip this step for now
2. After deployment, go to `/create-account`
3. Create account
4. Manually update role to 'admin' in database:
   ```sql
   UPDATE users SET role = 'admin' WHERE email = 'your@email.com';
   ```

### Option B: Use SQL (Requires bcrypt hash)
You'll need to generate a password hash first. For now, use Option A.

---

## Step 4: Deploy to Vercel (1 minute)

1. Push your code to GitHub:
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. Go to [vercel.com](https://vercel.com)
3. Click **"Import Project"**
4. Select your GitHub repository
5. Click **"Deploy"**

---

## Step 5: Set Environment Variables (30 seconds)

In Vercel dashboard:

1. Go to **Settings** → **Environment Variables**
2. Add these variables:

   **Name:** `DATABASE_URL`  
   **Value:** Your Neon connection string  
   (Example: `postgresql://user:pass@host.neon.tech/db`)

   **Name:** `JWT_SECRET`  
   **Value:** Any random string  
   (Example: `my-super-secret-key-change-this-in-production`)

3. Click **"Save"**
4. Redeploy: **Deployments** → **⋮** → **Redeploy**

---

## ✅ You're Done!

Visit your Vercel URL:
```
https://your-app.vercel.app
```

### First Login

1. Go to `/create-account`
2. Create your account
3. Open Neon SQL editor
4. Make yourself admin:
   ```sql
   UPDATE users SET role = 'admin' 
   WHERE email = 'your@email.com';
   ```
5. Refresh the page
6. Access admin panel via menu
7. Create properties!

---

## 🎯 Common Issues

### Issue: "Login failed"
**Solution:** Make sure you created an account first via signup page

### Issue: "Request failed"
**Solution:** 
- Check DATABASE_URL is set in Vercel
- Check DATABASE_URL is correct (test in Neon dashboard)
- Redeploy after setting env variables

### Issue: "Can't access admin panel"
**Solution:** Make sure your user role is 'admin' in database

### Issue: Empty properties page
**Solution:** You haven't created any properties yet. Use admin panel to create them.

---

## 📱 Local Development (Optional)

If you want to run locally:

1. Install backend dependencies:
   ```bash
   cd backend-api
   npm install
   ```

2. Create `.env` file in `backend-api` folder:
   ```env
   DATABASE_URL=your_neon_connection_string
   JWT_SECRET=any-secret-key
   PORT=3000
   ```

3. Start backend:
   ```bash
   npm start
   ```

4. In another terminal, start frontend:
   ```bash
   npm run dev
   ```

5. Open `http://localhost:5173`

---

## 🎓 Next Steps

After setup:

1. ✅ Login with your account
2. ✅ Make yourself admin (SQL update)
3. ✅ Access admin panel
4. ✅ Create your first property
5. ✅ View property on homepage
6. ✅ Create a booking
7. ✅ Test the entire flow!

---

## 📚 Full Documentation

- **Setup Guide:** `/REAL_TIME_API_SETUP.md`
- **Changes Summary:** `/CHANGES_SUMMARY.md`
- **Database Schema:** See Step 2 above

---

## 🆘 Need Help?

Check the full setup guide in `/REAL_TIME_API_SETUP.md` for:
- Detailed API documentation
- Troubleshooting steps
- Database monitoring queries
- Testing commands
- Architecture overview

---

## ✨ Features

Once set up, you'll have:

- ✅ Real-time property management
- ✅ Booking system with conflict detection
- ✅ Payment tracking
- ✅ Customer management
- ✅ Admin dashboard
- ✅ User authentication
- ✅ Secure API with JWT tokens
- ✅ All data persisted in Neon database

**Everything runs in real-time with your Neon database!** 🚀

---

**Total Setup Time:** ~5 minutes  
**Difficulty:** Easy  
**Requirements:** Neon account + Vercel account (both free)
