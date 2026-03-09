# 🚀 Neon Database - 5-Minute Quick Start

## ❌ Problem
Your Skyway Suites app is using **mock data** instead of real Neon database.

## ✅ Solution
Follow these 3 simple steps:

---

## Step 1: Create Neon Database (2 minutes)

1. Go to **[neon.tech](https://neon.tech)** → Sign up (free)
2. Create project: **"skyway-suites"**
3. Copy your **connection string** (looks like):
   ```
   postgresql://user:pass@host.neon.tech/db?sslmode=require
   ```
4. In Neon **SQL Editor**, paste and run: `/backend-api/setup-database.sql`
5. Verify: You should see ✅ success messages

---

## Step 2: Deploy to Vercel (2 minutes)

1. Push code to GitHub:
   ```bash
   git add .
   git commit -m "Connect to Neon"
   git push
   ```

2. Go to **[vercel.com](https://vercel.com)** → Import project

3. **CRITICAL:** Add environment variable:
   - Name: `DATABASE_URL`
   - Value: Your connection string from Step 1
   - Environments: All ✅

4. Click **"Deploy"**

---

## Step 3: Test (1 minute)

1. Visit your Vercel URL
2. Go to `/admin/login`
   - Email: `admin@skywaysuites.com`
   - Password: `admin123`
3. Create a property
4. Refresh page
5. ✅ **Property still there?** → SUCCESS!
6. ❌ **Property gone?** → See troubleshooting below

---

## 🔍 Troubleshooting

### Still seeing mock data?

**Check #1:** Is `DATABASE_URL` set in Vercel?
- Go to: Project → Settings → Environment Variables
- If missing, add it and **redeploy**

**Check #2:** Did you run the SQL script?
- In Neon SQL Editor, run:
  ```sql
  SELECT COUNT(*) FROM properties;
  ```
- Should return a number (not an error)

**Check #3:** Is connection string correct?
- Must end with `?sslmode=require`
- No extra spaces
- Copy fresh from Neon dashboard

**Check #4:** Did you redeploy after adding env var?
- Vercel → Deployments → ... → Redeploy

---

## 📚 Detailed Guides

- **Full troubleshooting:** `/NEON_CONNECTION_GUIDE.md`
- **Complete setup:** `/USING_REAL_DATA.md`
- **Deployment details:** `/VERCEL_DEPLOYMENT.md`
- **Database schema:** `/backend-api/setup-database.sql`

---

## 💡 Quick Commands

### View in Neon SQL Editor
```sql
-- See all properties
SELECT * FROM properties;

-- See all bookings
SELECT * FROM bookings;

-- See all customers
SELECT * FROM customers;

-- Check table structure
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public';
```

### Reset Data (if needed)
```sql
-- Run the entire setup-database.sql script again
-- It will drop and recreate all tables
```

---

## ✅ Success Checklist

Your Neon connection is working when:
- [ ] No console errors about "API endpoint not available"
- [ ] Properties persist after page refresh
- [ ] Can create/edit/delete data in admin panel
- [ ] Changes save to database (verify in Neon SQL Editor)
- [ ] Admin login stays logged in

---

## 🆘 Still Stuck?

1. **Read:** `/NEON_CONNECTION_GUIDE.md` (comprehensive troubleshooting)
2. **Check:** Vercel deployment logs (Deployments → Functions tab)
3. **Verify:** Neon database is active (dashboard shows green status)
4. **Test:** Run SQL queries directly in Neon SQL Editor

---

## 🎉 That's It!

Once deployed with `DATABASE_URL` set correctly, your app will use real Neon data automatically.

**No code changes needed** - the API endpoints are already configured! 🚀
