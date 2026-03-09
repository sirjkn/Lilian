# 🔧 Neon Database Connection - Step-by-Step Guide

## 🚨 Problem: Neon Connection Not Working

If you're seeing mock data instead of real data from Neon, follow this guide to fix it.

---

## ✅ Quick Diagnosis

**Are you getting real data or mock data?**

### Signs You're Using Mock Data:
- ✅ Properties show "Luxury Downtown Apartment", "Cozy Beach House", etc.
- ✅ Admin login works but changes don't persist after refresh
- ✅ All data resets when you refresh the page
- ✅ Console shows "API endpoint not available" errors

### Signs You're Using Real Data:
- ✅ Properties from your Neon database appear
- ✅ Changes persist after page refresh
- ✅ No console errors about API endpoints
- ✅ Data stays consistent across sessions

---

## 🎯 Solution: 3 Simple Steps

### Step 1: Set Up Your Neon Database

#### 1.1 Create Neon Account
1. Go to **[neon.tech](https://neon.tech)**
2. Click **"Sign Up"** (free account)
3. Create a new project: **"skyway-suites"**
4. Select region: **Choose closest to you** (e.g., US East, EU Central, Asia Pacific)

#### 1.2 Get Your Connection String
1. In your Neon dashboard, click your project
2. Click **"Connection Details"**
3. Copy the **Connection String** (looks like this):
   ```
   postgresql://neondb_owner:abc123xyz@ep-cool-name-123456.us-east-1.aws.neon.tech/neondb?sslmode=require
   ```
4. **Keep this safe** - you'll need it in Step 3!

#### 1.3 Create Database Tables
1. In Neon dashboard, click **"SQL Editor"**
2. Open the file `/database-migration.sql` from this project
3. **Copy ALL the SQL code** from that file
4. **Paste it** into the Neon SQL Editor
5. Click **"Run"** or press `Ctrl+Enter`
6. You should see: ✅ **"Success"** messages

**What this does:** Creates all the tables (users, properties, bookings, customers, payments, settings)

---

### Step 2: Update Your Database Configuration

#### 2.1 Update the Connection String in Code

**Option A: Using Environment Variable (Recommended)**

1. Create a file named `.env` in your project root (next to `package.json`)
2. Add this line:
   ```
   DATABASE_URL=your_neon_connection_string_here
   ```
3. Replace `your_neon_connection_string_here` with the actual connection string from Step 1.2

**Option B: Hardcode (For Testing Only)**

Open `/api/config/db.ts` and replace line 9 with your connection string:

```typescript
connectionString: 'postgresql://your_actual_connection_string_here',
```

⚠️ **Warning:** Never commit real credentials to GitHub! Use `.env` for production.

#### 2.2 Add Password Field to Customers Table

Since we just added password support, run this SQL in Neon:

```sql
ALTER TABLE customers 
ADD COLUMN IF NOT EXISTS password_hash VARCHAR(255);
```

---

### Step 3: Deploy to Vercel (Easiest Way)

#### Why Vercel?
- ✅ The `/api/` folder is designed for Vercel serverless functions
- ✅ Works out-of-the-box with no extra setup
- ✅ Free tier includes everything you need
- ✅ Automatic HTTPS and global CDN

#### 3.1 Push to GitHub
```bash
git add .
git commit -m "Add Neon database integration"
git push origin main
```

#### 3.2 Deploy to Vercel
1. Go to **[vercel.com](https://vercel.com)**
2. Click **"Sign Up with GitHub"**
3. Click **"New Project"**
4. Select your **skyway-suites** repository
5. Click **"Import"**

#### 3.3 Add Environment Variable
**This is the MOST IMPORTANT step!**

1. Before clicking "Deploy", scroll down to **"Environment Variables"**
2. Add this variable:
   - **Name:** `DATABASE_URL`
   - **Value:** Your Neon connection string (from Step 1.2)
   - **Environment:** All (Production, Preview, Development)
3. Click **"Add"**

#### 3.4 Deploy
1. Click **"Deploy"**
2. Wait 2-3 minutes
3. Click **"Visit"** to see your live site!

---

## 🧪 Testing Your Connection

### Test 1: Homepage
1. Visit your Vercel URL (e.g., `https://skyway-suites.vercel.app`)
2. Open browser console (`F12` → Console tab)
3. Refresh the page
4. **Look for errors:**
   - ❌ If you see "API endpoint not available" → Go to **Troubleshooting** section
   - ✅ If no errors → Your connection works!

### Test 2: Admin Panel
1. Go to `/admin/login`
2. Login with:
   - Email: `admin@skywaysuites.com`
   - Password: `admin123`
3. Create a new property
4. Refresh the page
5. **Check if property still exists:**
   - ✅ Property still there → Real data working!
   - ❌ Property disappeared → Still using mock data

### Test 3: Database Direct Check
1. Go to Neon dashboard
2. Click **"SQL Editor"**
3. Run this query:
   ```sql
   SELECT COUNT(*) FROM properties;
   ```
4. You should see a number (how many properties are in your database)

---

## 🔍 Troubleshooting

### Problem 1: "API endpoint not available"

**Cause:** Frontend is trying to call `/api/` endpoints, but they're not working.

**Solution:**
1. ✅ Make sure you deployed to Vercel (not just running `npm run dev`)
2. ✅ Check that `DATABASE_URL` is set in Vercel environment variables
3. ✅ Redeploy: In Vercel dashboard, go to "Deployments" → Click "..." → "Redeploy"

### Problem 2: "Connection timeout" or "ECONNREFUSED"

**Cause:** Can't connect to Neon database.

**Solution:**
1. ✅ Verify your connection string is correct
2. ✅ Make sure it includes `?sslmode=require` at the end
3. ✅ Check Neon dashboard - is your database active?
4. ✅ Try this test SQL in Neon SQL Editor:
   ```sql
   SELECT NOW();
   ```
   If this fails, your Neon database has an issue.

### Problem 3: "relation does not exist"

**Cause:** Database tables weren't created.

**Solution:**
1. ✅ Run the entire `/database-migration.sql` script in Neon SQL Editor
2. ✅ Verify tables exist with this SQL:
   ```sql
   SELECT table_name 
   FROM information_schema.tables 
   WHERE table_schema = 'public';
   ```
   You should see: `users`, `properties`, `customers`, `bookings`, `payments`, `settings`

### Problem 4: "password authentication failed"

**Cause:** Wrong credentials in connection string.

**Solution:**
1. ✅ Go to Neon dashboard
2. ✅ Reset your database password
3. ✅ Get a fresh connection string
4. ✅ Update `DATABASE_URL` in Vercel environment variables
5. ✅ Redeploy

### Problem 5: Data still not persisting

**Cause:** Frontend is falling back to mock data.

**Solution:**
1. Open `/src/app/lib/api.ts`
2. Look for functions like `getProperties()`
3. Each function has a `catch` block that returns mock data:
   ```typescript
   } catch (error) {
     return getMockProperties(); // THIS LINE
   }
   ```
4. This is intentional - it falls back when backend is unavailable
5. **To fix:** Deploy to Vercel so backend API endpoints work

### Problem 6: Working locally but not on Vercel

**Cause:** Environment variable not set correctly.

**Solution:**
1. Go to Vercel dashboard
2. Click your project → **"Settings"** → **"Environment Variables"**
3. Verify `DATABASE_URL` is there
4. If not, add it:
   - Name: `DATABASE_URL`
   - Value: Your Neon connection string
   - Environments: All
5. Go to **"Deployments"** → **"Redeploy"**

---

## 🎯 Alternative: Run Backend Locally (For Development)

If you want to develop locally with real data:

### 1. Create `.env` file
In project root, create `.env`:
```
DATABASE_URL=your_neon_connection_string
```

### 2. Use Node.js Backend (Optional)
The project includes a `/backend-api/` folder with an Express server:

```bash
cd backend-api
npm install
npm start
```

This starts a server on `http://localhost:3001`

### 3. Update API Base URL
In `/src/app/lib/api.ts`, change line 3:
```typescript
const API_BASE_URL = 'http://localhost:3001/api';
```

---

## 📊 Database Schema Summary

Your Neon database should have these tables:

| Table | Purpose | Key Fields |
|-------|---------|------------|
| **users** | Admin/customer authentication | email, password_hash, role |
| **properties** | Property listings | title, price, location, images |
| **customers** | Customer profiles | name, email, phone, password_hash |
| **bookings** | Booking records | property_id, customer_id, check_in, check_out |
| **payments** | Payment transactions | booking_id, amount, payment_method |
| **settings** | App settings | category, key, value |

---

## ✅ Success Checklist

Before considering your Neon connection "working", verify:

- [ ] Neon account created
- [ ] Database tables created (run `/database-migration.sql`)
- [ ] Connection string copied
- [ ] Deployed to Vercel
- [ ] `DATABASE_URL` environment variable set in Vercel
- [ ] No "API endpoint not available" errors in console
- [ ] Can create property in admin panel
- [ ] Property persists after page refresh
- [ ] Can create booking
- [ ] Booking persists after refresh
- [ ] Admin login works and stays logged in

---

## 🚀 Quick Start Commands

### Deploy to Vercel (Recommended)
```bash
# 1. Push to GitHub
git add .
git commit -m "Ready for deployment"
git push origin main

# 2. Deploy on vercel.com
# - Import from GitHub
# - Add DATABASE_URL environment variable
# - Click Deploy
```

### Run Backend Locally (Alternative)
```bash
# 1. Set up backend
cd backend-api
npm install

# 2. Create .env file
echo "DATABASE_URL=your_connection_string" > .env
echo "PORT=3001" >> .env
echo "JWT_SECRET=your_secret_key" >> .env

# 3. Start backend
npm start

# 4. In new terminal, start frontend
cd ..
npm run dev
```

---

## 📚 Additional Resources

- **Neon Docs:** [neon.tech/docs](https://neon.tech/docs)
- **Vercel Docs:** [vercel.com/docs](https://vercel.com/docs)
- **PostgreSQL Docs:** [postgresql.org/docs](https://www.postgresql.org/docs/)
- **Project Docs:**
  - `/USING_REAL_DATA.md` - Comprehensive data guide
  - `/VERCEL_DEPLOYMENT.md` - Deployment details
  - `/NEON_INTEGRATION.md` - Integration overview
  - `/database-migration.sql` - Database schema

---

## 🆘 Still Not Working?

### Check These Files:
1. `/api/config/db.ts` - Database connection config
2. `/api/properties/index.ts` - Properties API endpoint
3. `/src/app/lib/api.ts` - Frontend API calls
4. `/vercel.json` - Vercel configuration

### Common Issues:
- ❌ Forgot to set `DATABASE_URL` in Vercel
- ❌ Connection string missing `?sslmode=require`
- ❌ Didn't run database migration script
- ❌ Running locally without backend server
- ❌ Didn't redeploy after adding environment variable

### Last Resort:
1. Delete your Vercel project
2. Create a new Neon database
3. Run database migration script again
4. Deploy fresh to Vercel with correct `DATABASE_URL`

---

## 💡 Pro Tips

1. **Use Vercel:** It's the easiest way to get real data working
2. **Check Logs:** In Vercel dashboard → "Deployments" → Click deployment → "Functions" tab
3. **Test in Neon:** Always verify SQL queries work in Neon SQL Editor first
4. **Environment Variables:** After changing env vars in Vercel, always redeploy
5. **Browser Cache:** Clear cache if you see old data (Ctrl+Shift+R)

---

## 🎉 Success!

Once everything is working, you should see:
- ✅ Real properties from your Neon database
- ✅ Changes persist after refresh
- ✅ No console errors
- ✅ Admin panel fully functional
- ✅ Bookings and payments work
- ✅ Settings save to database

**Your Skyway Suites application is now running with real Neon data!** 🚀

For questions about specific features, check the other documentation files in the project root.

Happy coding! 💻
