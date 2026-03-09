# 🚀 Quick Start Guide - Skyway Suites with Neon Database

## ✅ What's Been Done

1. ✅ Backend API created with your Neon database connection string hardcoded
2. ✅ Frontend updated to connect to the backend API
3. ✅ "Back to HOME" link added to admin dashboard
4. ✅ Color scheme updated to Olive Green, Dark Beige, and Charcoal Grey

## 📋 Setup Instructions

### Step 1: Set Up Database Tables

1. Go to your Neon console: https://console.neon.tech/
2. Navigate to your project: `ep-floral-leaf-ag3dpaau`
3. Click on **SQL Editor**
4. Open the file `/backend-api/setup-database.sql`
5. Copy ALL the SQL code
6. Paste it into the Neon SQL Editor
7. Click **Run** (this will create all tables and add sample data)

### Step 2: Install Backend Dependencies

Open a terminal and run:

```bash
cd backend-api
npm install
```

This will install:
- express (web server)
- pg (PostgreSQL client)
- bcrypt (password hashing)
- jsonwebtoken (authentication)
- cors (cross-origin requests)

### Step 3: Start the Backend Server

```bash
npm start
```

You should see:
```
✅ Successfully connected to Neon database!
🚀 Skyway Suites API server running on http://localhost:3001
```

**Keep this terminal running!**

### Step 4: Start the Frontend

Open a **NEW terminal** (keep the backend running in the first one):

```bash
# Make sure you're in the root directory (not backend-api)
npm run dev
```

The frontend will run on `http://localhost:5173` (or similar)

### Step 5: Test Everything!

1. Open your browser to the frontend URL
2. The app will automatically connect to your backend
3. Try logging in with the default admin account:
   - Email: `admin@skywaysuites.com`
   - Password: `admin123`

## 🎯 Features Now Connected to Neon Database

✅ **Authentication**
- Real user registration and login
- Password hashing with bcrypt
- JWT tokens for secure sessions

✅ **Properties**
- Create, read, update, delete properties
- All stored in your Neon database

✅ **Bookings**
- Real booking system
- Status tracking (pending, confirmed, etc.)

✅ **Customers**
- Customer management
- Booking history tracking

✅ **Payments**
- Payment tracking
- Revenue statistics

## 🔑 Default Admin Account

After running the SQL setup:
- **Email**: admin@skywaysuites.com
- **Password**: admin123

## 🧪 Testing the Connection

### Test 1: Backend API
Open your browser or use curl:
```bash
curl http://localhost:3001/api/health
```

Expected response:
```json
{"status":"ok","message":"Skyway Suites API is running"}
```

### Test 2: Database Connection
```bash
curl http://localhost:3001/api/properties
```

You should see a JSON array of properties from your database.

### Test 3: Frontend to Backend
1. Open the frontend in your browser
2. Open browser DevTools (F12)
3. Go to Console tab
4. You should see successful API calls (no CORS errors)

## 🐛 Troubleshooting

### Problem: "Cannot connect to database"

**Solution**: Check that:
1. Your Neon database is active (they auto-suspend after inactivity)
2. The connection string in `/backend-api/server.js` is correct
3. Your IP is allowed in Neon's settings

### Problem: "CORS error" in browser

**Solution**: Make sure the backend is running on port 3001. The frontend is already configured for CORS.

### Problem: "Port 3001 already in use"

**Solution**: 
```bash
# Kill the process on port 3001
lsof -ti:3001 | xargs kill -9

# Or change the port in backend-api/server.js:
const PORT = 3002;  // Use a different port
```

### Problem: Backend not connecting to database

**Check the connection string format**:
```
postgresql://username:password@host/database?sslmode=require
```

## 📦 What's Included in Sample Data

After running the SQL setup, you'll have:

- **5 Properties**: Various types (apartment, beach house, cabin, etc.)
- **3 Customers**: Sample customer accounts
- **2 Bookings**: Example bookings with different statuses
- **2 Payments**: Sample payments (one paid, one pending)
- **1 Admin User**: For testing the admin dashboard

## 🌐 Deployment

### Deploy Backend (Choose One)

#### Option 1: Railway (Recommended - Easiest)
1. Push your code to GitHub
2. Go to https://railway.app
3. Click "New Project" → "Deploy from GitHub"
4. Select your repo
5. Railway will auto-detect and deploy
6. Copy the deployed URL

#### Option 2: Render
1. Go to https://render.com
2. Click "New" → "Web Service"
3. Connect GitHub repo
4. Root directory: `backend-api`
5. Build command: `npm install`
6. Start command: `npm start`

#### Option 3: Fly.io
```bash
cd backend-api
fly launch
fly deploy
```

### Deploy Frontend

#### Vercel (Recommended)
1. Push your code to GitHub
2. Go to https://vercel.com
3. Import your GitHub repo
4. Add environment variable:
   - Key: `VITE_API_URL`
   - Value: `https://your-backend-url.com/api`
5. Deploy!

## 🔒 Security for Production

Before deploying to production:

1. **Move database URL to environment variable**:
   ```javascript
   connectionString: process.env.DATABASE_URL
   ```

2. **Change JWT secret**:
   ```javascript
   const JWT_SECRET = process.env.JWT_SECRET;
   ```

3. **Add .env file** (don't commit this!):
   ```
   DATABASE_URL=your_neon_connection_string
   JWT_SECRET=your-super-secret-random-string
   PORT=3001
   ```

4. **Update CORS** for production:
   ```javascript
   app.use(cors({
     origin: 'https://your-frontend-domain.com'
   }));
   ```

## 🎨 Color Scheme

The entire application now uses:
- **Primary (Olive Green)**: #6B7C3C
- **Secondary (Dark Beige)**: #C9B99B
- **Charcoal Grey**: #3a3a3a
- **Light Beige**: #E8E3DB

## 📚 API Endpoints Reference

All endpoints are prefixed with `/api`

### Authentication
- `POST /auth/signup` - Register new user
- `POST /auth/login` - Login

### Properties
- `GET /properties` - Get all properties
- `GET /properties/:id` - Get single property
- `POST /properties` - Create property
- `PUT /properties/:id` - Update property
- `DELETE /properties/:id` - Delete property

### Bookings
- `GET /bookings` - Get all bookings
- `POST /bookings` - Create booking
- `PUT /bookings/:id` - Update booking

### Customers
- `GET /customers` - Get all customers
- `POST /customers` - Create customer

### Payments
- `GET /payments` - Get all payments
- `POST /payments` - Create payment

### Contact
- `POST /contact` - Submit contact form

## 🎉 You're All Set!

Your Skyway Suites application is now fully connected to your Neon database with:
- ✅ Real authentication
- ✅ Database persistence
- ✅ Admin dashboard with "Back to HOME" link
- ✅ Beautiful olive green, beige, and charcoal grey color scheme
- ✅ Full CRUD operations for properties, bookings, customers, and payments

Enjoy your fully functional property booking platform! 🏠
