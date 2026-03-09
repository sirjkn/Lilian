# 🗄️ Using Real Data with Neon Database

## Overview

You've successfully implemented all the features! Now it's time to connect to your real Neon database and stop using mock data.

## ✅ What's Been Implemented

### 1. Homepage Updates
- ✅ Title changed to: **"Find Your Perfect Stay !"**
- ✅ Subtitle changed to: **"Discover unforgettable experiences around in Nairobi and its Environs"**
- ✅ Search module removed
- ✅ Hero background fetches from Neon database
- ✅ Default background shows Nairobi cityscape

### 2. Admin Settings - Hero Background
- ✅ New "Hero Background" settings card in Admin > Settings > General
- ✅ Input field to paste image URL
- ✅ Save button to update background in database
- ✅ Changes saved to Neon `hero_settings` table

### 3. Database Schema
- ✅ New `hero_settings` table created
- ✅ Stores background_image URL
- ✅ Pre-populated with Nairobi cityscape image

### 4. API Endpoints
- ✅ `GET /api/settings/hero` - Fetch hero background
- ✅ `PUT /api/settings/hero` - Update hero background
- ✅ Serverless function ready for Vercel deployment

---

## 🚀 How to Start Using Real Data

You have **TWO options**:

### Option 1: Deploy to Vercel (Recommended) ⭐

This is the **easiest and best** way to use real data.

#### Step 1: Setup Neon Database

1. **Go to [neon.tech](https://neon.tech)** and create a free account
2. **Create a new project** called "skyway-suites"
3. **Copy your connection string** (looks like: `postgresql://username:password@host/database`)
4. **Keep this handy** - you'll need it in Step 3

#### Step 2: Run Database Setup

1. **Open the Neon SQL Editor** in your dashboard
2. **Copy the entire contents** of `/backend-api/setup-database.sql`
3. **Paste and run** the SQL script in Neon SQL Editor
4. **Verify tables were created** - you should see:
   - users
   - properties
   - customers
   - bookings
   - payments
   - contact_submissions
   - hero_settings

#### Step 3: Deploy to Vercel

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Add hero background settings and Nairobi theme"
   git push
   ```

2. **Go to [vercel.com](https://vercel.com)** and sign in with GitHub

3. **Click "New Project"** and select your repository

4. **Add environment variable:**
   - Name: `DATABASE_URL`
   - Value: Your Neon connection string from Step 1

5. **Click "Deploy"** and wait 2-3 minutes

6. **Done!** Your app is now live with real database connection! 🎉

#### Step 4: Test Your App

1. Visit your Vercel URL (e.g., `https://skyway-suites.vercel.app`)
2. Homepage should show the Nairobi hero background
3. Login to admin (email: `admin@skywaysuites.com`, password: `admin123`)
4. Go to **Settings > General > Hero Background**
5. Paste a new image URL and click "Save Background"
6. Refresh the homepage - new background should appear!

---

### Option 2: Run Backend Locally

This is for **development with real database** connection.

#### Step 1: Setup Neon Database
- Same as Option 1, Step 1 & 2

#### Step 2: Configure Backend API

1. **Navigate to backend folder:**
   ```bash
   cd backend-api
   ```

2. **Create `.env` file:**
   ```bash
   touch .env
   ```

3. **Add your database URL to `.env`:**
   ```
   DATABASE_URL=postgresql://username:password@host/database
   PORT=3001
   JWT_SECRET=your-secret-key-change-this
   ```

4. **Install dependencies:**
   ```bash
   npm install
   ```

5. **Start the backend server:**
   ```bash
   npm start
   ```

   You should see:
   ```
   ✅ Database connected successfully
   🚀 Server running on http://localhost:3001
   ```

#### Step 3: Start Frontend

1. **Open a new terminal** (keep backend running)

2. **Navigate to project root:**
   ```bash
   cd ..
   ```

3. **Start the frontend:**
   ```bash
   npm run dev
   ```

4. **Open browser** to `http://localhost:5173`

#### Step 4: Test Your App

- Frontend runs on: `http://localhost:5173`
- Backend API runs on: `http://localhost:3001`
- Frontend automatically connects to local backend
- All database operations now work with real Neon data!

---

## 🎨 How to Change Hero Background

### Method 1: Using Admin Panel

1. **Login to admin** at `/admin/login`
   - Email: `admin@skywaysuites.com`
   - Password: `admin123`

2. **Go to Settings > General**

3. **Scroll to "Hero Background" card**

4. **Upload an image to a hosting service:**
   - [Imgur.com](https://imgur.com) - Free, no account needed
   - [Cloudinary.com](https://cloudinary.com) - Free tier
   - [ImageKit.io](https://imagekit.io) - Free tier
   - Or use Unsplash URL directly

5. **Copy the image URL**

6. **Paste into "Background Image URL" field**

7. **Click "Save Background"**

8. **Refresh homepage** to see the new background!

### Method 2: Using Database Directly

1. **Open Neon SQL Editor**

2. **Run this SQL:**
   ```sql
   UPDATE hero_settings 
   SET background_image = 'https://your-image-url.com/image.jpg'
   WHERE id = 1;
   ```

3. **Refresh homepage** to see changes

### Method 3: Using Unsplash

Get free high-quality images from Unsplash:

1. **Go to [unsplash.com](https://unsplash.com)**
2. **Search for:** "Nairobi Kenya" or "luxury hotel"
3. **Right-click on image** > "Copy image address"
4. **Use that URL** in admin panel or database

---

## 📊 Sample Data Included

The database setup script (`/backend-api/setup-database.sql`) includes:

### Properties (5 listings)
- Luxury Downtown Apartment - $150/night
- Cozy Beach House - $200/night
- Mountain Cabin Retreat - $120/night
- Urban Loft Studio - $95/night
- Lakefront Villa - $300/night

### Customers (3 profiles)
- John Doe - john@example.com
- Jane Smith - jane@example.com
- Michael Brown - michael@example.com

### Bookings (2 bookings)
- Confirmed booking for $750
- Pending booking for $1,400

### Payments (2 transactions)
- Paid: $750
- Pending: $1,400

### Hero Settings
- Default Nairobi cityscape background

### Admin User
- Email: `admin@skywaysuites.com`
- Password: `admin123`
- **⚠️ CHANGE THIS PASSWORD** in production!

---

## 🔄 Switching from Mock to Real Data

### Current Behavior (Mock Data):
```
Frontend → API Call → Fails → Returns Mock Data
```

### After Deployment (Real Data):
```
Frontend → Vercel Serverless Function → Neon Database → Real Data
```

### After Local Backend (Real Data):
```
Frontend → localhost:3001 → Neon Database → Real Data
```

---

## 🛠️ API Endpoints Available

All these endpoints are ready to use with real data:

### Properties
- `GET /api/properties` - List all properties
- `GET /api/properties/:id` - Get single property
- `POST /api/properties` - Create property
- `PUT /api/properties/:id` - Update property
- `DELETE /api/properties/:id` - Delete property

### Bookings
- `GET /api/bookings` - List all bookings
- `POST /api/bookings` - Create booking
- `PUT /api/bookings/:id` - Update booking

### Customers
- `GET /api/customers` - List all customers
- `POST /api/customers` - Create customer

### Payments
- `GET /api/payments` - List all payments
- `POST /api/payments` - Create payment

### Settings
- `GET /api/settings/hero` - Get hero background
- `PUT /api/settings/hero` - Update hero background ⭐ NEW

### Contact
- `POST /api/contact` - Submit contact form

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

---

## ✅ Verification Checklist

After deploying, verify everything works:

### Homepage
- [ ] Hero section shows Nairobi background
- [ ] Title says "Find Your Perfect Stay !"
- [ ] Subtitle mentions Nairobi and its Environs
- [ ] Search module is removed
- [ ] Properties load from database (5 properties)

### Admin Panel
- [ ] Can login with admin@skywaysuites.com
- [ ] Settings > General shows Hero Background card
- [ ] Can paste new image URL
- [ ] Save button works
- [ ] Success toast appears
- [ ] Homepage refreshes with new background

### Database
- [ ] All tables created successfully
- [ ] Sample data inserted
- [ ] Hero settings table has default background
- [ ] Can query data in Neon SQL Editor

---

## 🎯 Next Steps After Deployment

1. **Change Admin Password**
   ```sql
   UPDATE users 
   SET password_hash = 'new-hashed-password'
   WHERE email = 'admin@skywaysuites.com';
   ```

2. **Add Real Properties**
   - Use admin panel to add Nairobi properties
   - Upload real images to Cloudinary or Imgur
   - Set accurate prices in KES or USD

3. **Customize Hero Background**
   - Find a great Nairobi image
   - Use Admin Settings to update

4. **Test All Features**
   - Create bookings
   - Add customers
   - Process payments
   - Update properties

5. **Monitor Database Usage**
   - Check Neon dashboard for usage
   - Free tier includes 3GB storage
   - Monitor connection limits

---

## 🚨 Troubleshooting

### "Failed to update hero background"
- **Check:** Is your app deployed to Vercel?
- **Fix:** Deploy to Vercel or run backend locally

### "Background not changing"
- **Check:** Did you refresh the page?
- **Fix:** Hard refresh with Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

### "Database connection error"
- **Check:** Is DATABASE_URL set correctly in Vercel?
- **Fix:** Add environment variable in Vercel project settings

### "API endpoint not found"
- **Check:** Are you running the app locally without backend?
- **Fix:** Either deploy to Vercel OR run backend server locally

### "Hero background shows old image"
- **Check:** Browser cache
- **Fix:** Clear cache or use incognito mode

---

## 📚 Documentation Files

- `/START_HERE.md` - Vercel deployment guide
- `/VERCEL_DEPLOYMENT.md` - Detailed deployment steps
- `/backend-api/setup-database.sql` - Database schema
- `/LOCAL_DEV_INFO.md` - Local development info
- `/ERRORS_FIXED.md` - Error fixes documentation
- **`/USING_REAL_DATA.md`** - This file! ⭐

---

## 🎉 You're Ready!

Everything is set up and ready to use real data:

1. ✅ Homepage updated with new title/subtitle
2. ✅ Search module removed
3. ✅ Hero background loads from database
4. ✅ Admin settings to change background
5. ✅ Database schema ready
6. ✅ API endpoints ready
7. ✅ Deployment ready

**Just deploy to Vercel and you're live with real data!**

Need help? Check:
- `/START_HERE.md` for deployment
- `/VERCEL_DEPLOYMENT.md` for detailed steps
- Neon docs: [neon.tech/docs](https://neon.tech/docs)
- Vercel docs: [vercel.com/docs](https://vercel.com/docs)

Happy coding! 🚀
