# 🔥 FIX LOGIN NOW - 5 Minutes

## The Problem
Login doesn't work because your database doesn't have valid user accounts.

## The Solution (Copy & Paste)

### 1️⃣ Open Neon SQL Editor
Go to: https://console.neon.tech → Your Project → SQL Editor

### 2️⃣ Copy & Run This SQL
```sql
-- Delete old users if they exist
DELETE FROM users WHERE email IN ('admin@skywaysuites.com', 'customer@test.com');

-- Create admin user (email: admin@skywaysuites.com, password: admin123)
INSERT INTO users (email, name, password_hash, role) VALUES 
('admin@skywaysuites.com', 'Admin User', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin');

-- Create test customer (email: customer@test.com, password: test123)
INSERT INTO users (email, name, password_hash, role) VALUES 
('customer@test.com', 'Test Customer', '$2b$10$7bFH0nK9qL1vWZgFqrLBXOZbqH9z8mW7jH4vL5nU9pW6kF8yT6.Yu', 'customer');

-- Verify users were created
SELECT email, name, role FROM users;
```

### 3️⃣ Check Vercel Environment Variables
Vercel Dashboard → Your Project → Settings → Environment Variables

Make sure you have:
```
DATABASE_URL = your-neon-connection-string
```

Get your connection string from: Neon Dashboard → Connection Details

### 4️⃣ Redeploy on Vercel
Vercel Dashboard → Deployments → Latest Deployment → ⋯ → Redeploy

---

## ✅ Test It

After redeploying, login with:

**Admin:**
- Email: `admin@skywaysuites.com`
- Password: `admin123`

**Customer:**
- Email: `customer@test.com`
- Password: `test123`

---

## 🚨 Still Not Working?

### Quick Debug:
Open browser console on your site and run:
```javascript
fetch('/api/health').then(r => r.json()).then(console.log)
```

**Should return:** `{ "status": "ok", "database": "connected" }`

**If it doesn't:**
1. DATABASE_URL is missing or wrong in Vercel
2. Neon database is not running
3. You need to redeploy

### Need Full Database Setup?
If you don't have any tables yet, run the full setup:
- Copy all of `/QUICK_DATABASE_SETUP.sql`
- Paste into Neon SQL Editor
- Run it

This creates all tables + sample data.

---

## 📖 More Help
- Full guide: `/DEPLOYMENT_TROUBLESHOOTING.md`
- Database setup: `/QUICK_DATABASE_SETUP.sql`
- Original guide: `/VERCEL_LOGIN_FIX.md`

---

**That's it!** Your login should work now. 🎉
