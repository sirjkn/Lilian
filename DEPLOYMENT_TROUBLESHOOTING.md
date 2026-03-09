# 🚀 Skyway Suites - Deployment Troubleshooting Guide

## Issue: Login Not Working on Vercel

### Root Cause
The login feature requires a properly configured Neon database with valid user accounts. If the database isn't set up correctly or doesn't have users with valid bcrypt password hashes, login will fail.

---

## ✅ SOLUTION: 3-Step Quick Fix

### Step 1: Run Database Setup Script

1. **Open your Neon console**: https://console.neon.tech
2. **Navigate to your project**
3. **Click "SQL Editor"** in the left sidebar
4. **Copy the entire contents** of `/QUICK_DATABASE_SETUP.sql` from this project
5. **Paste into the SQL Editor**
6. **Click "Run"** or press `Ctrl+Enter`

This will:
- Create all required tables
- Add 2 test users with working passwords
- Add sample properties, bookings, and payments
- Set up all necessary indexes

### Step 2: Verify Environment Variables in Vercel

1. Go to your **Vercel project dashboard**
2. Click **Settings** → **Environment Variables**
3. Ensure you have:

```
DATABASE_URL = postgresql://neondb_owner:YOUR_PASSWORD@YOUR_HOST.neon.tech/neondb?sslmode=require
```

**Important:** Use the connection string from your Neon dashboard (Database → Connection Details)

### Step 3: Redeploy Your Application

After setting up the database and environment variables:

1. Go to your Vercel project
2. Click **Deployments** tab
3. Click the **⋯** menu on the latest deployment
4. Select **Redeploy**

---

## 🔑 Test Login Credentials

After running the database setup script, you can login with:

### Admin Account
- **Email**: `admin@skywaysuites.com`
- **Password**: `admin123`

### Customer Account
- **Email**: `customer@test.com`
- **Password**: `test123`

---

## 🔍 Debugging Steps

### 1. Check if API is Working

Open your browser console and run:

```javascript
fetch('https://your-site.vercel.app/api/health')
  .then(r => r.json())
  .then(console.log)
```

**Expected Response:**
```json
{
  "status": "ok",
  "database": "connected"
}
```

**If you get an error:**
- Check DATABASE_URL environment variable
- Verify Neon database is running
- Check Vercel function logs

### 2. Test Login API Directly

```javascript
fetch('https://your-site.vercel.app/api/auth?action=login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'admin@skywaysuites.com',
    password: 'admin123'
  })
})
  .then(r => r.json())
  .then(console.log)
```

**Expected Response:**
```json
{
  "user": {
    "id": "...",
    "email": "admin@skywaysuites.com",
    "name": "Admin User",
    "role": "admin"
  },
  "token": "..."
}
```

### 3. Check Vercel Function Logs

1. Go to Vercel Dashboard → Your Project
2. Click **Logs** tab
3. Try to login on your site
4. Watch for errors in real-time

**Common errors and solutions:**

#### Error: "relation 'users' does not exist"
**Solution:** Run the database setup script

#### Error: "password authentication failed"
**Solution:** Check your DATABASE_URL is correct

#### Error: "Invalid credentials"
**Solution:** Make sure you're using the correct test credentials

---

## 🔧 Advanced Troubleshooting

### Generate Your Own Password Hash

If you want to create your own user with a custom password:

#### Option 1: Use Online Tool
1. Go to https://bcrypt-generator.com/
2. Enter your password
3. Set rounds to **10**
4. Copy the generated hash
5. Run in Neon SQL Editor:

```sql
INSERT INTO users (email, name, password_hash, role) VALUES 
('your-email@example.com', 'Your Name', 'YOUR_BCRYPT_HASH_HERE', 'admin');
```

#### Option 2: Use Node.js Script
1. Run: `node generate-password-hash.js`
2. Copy the generated hash
3. Use in SQL INSERT statement

### Check Database Connection

Run this in Neon SQL Editor to verify tables exist:

```sql
-- Check if users table exists
SELECT COUNT(*) as user_count FROM users;

-- View all users (without passwords)
SELECT id, email, name, role, created_at FROM users;

-- Check properties
SELECT COUNT(*) as property_count FROM properties;
```

### Reset Everything

If nothing works, start fresh:

```sql
-- This will delete EVERYTHING and start over
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;

-- Then run the QUICK_DATABASE_SETUP.sql script again
```

---

## 📝 Common Mistakes

### ❌ Wrong: Using Mock Passwords in Production
The old setup script had placeholder bcrypt hashes that don't work. Always use real hashes.

### ❌ Wrong: Missing DATABASE_URL
The serverless functions need this environment variable to connect to Neon.

### ❌ Wrong: Not Redeploying After Changes
Vercel caches deployments. Always redeploy after changing environment variables.

### ❌ Wrong: Using HTTP Instead of HTTPS
Always use `https://` for your production URL.

---

## ✨ Verification Checklist

Use this checklist to verify everything is working:

- [ ] Database tables created (run setup script)
- [ ] Test users exist in database (check with SELECT query)
- [ ] DATABASE_URL set in Vercel environment variables
- [ ] Latest code deployed to Vercel
- [ ] API health check returns success
- [ ] Can login with test credentials
- [ ] Admin dashboard accessible for admin user
- [ ] Properties are visible on homepage

---

## 🆘 Still Having Issues?

### Check These Files:
1. `/api/auth.ts` - Authentication logic
2. `/api/config/db.ts` - Database connection
3. `/vercel.json` - Vercel configuration

### Environment Information:
- Node.js Version: 20.x (Vercel default)
- Database: Neon PostgreSQL
- Framework: Vite + React
- Deployment: Vercel Serverless Functions

### Get Help:
- Check Neon status: https://neon.tech/status
- Check Vercel status: https://www.vercel-status.com/
- Review Vercel function logs for detailed errors
- Open browser console to see frontend errors

---

## 📚 Additional Resources

- [Neon Documentation](https://neon.tech/docs)
- [Vercel Serverless Functions](https://vercel.com/docs/functions/serverless-functions)
- [Bcrypt Documentation](https://github.com/kelektiv/node.bcrypt.js)

---

**Last Updated:** March 9, 2026
**Project:** Skyway Suites
**Environment:** Production (Vercel + Neon)
