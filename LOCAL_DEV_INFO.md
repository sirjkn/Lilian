# 📝 Local Development Information

## Why Am I Seeing Mock Data?

You're currently running Skyway Suites in **local development mode**. The application is designed to work seamlessly in two environments:

### 🏠 Local Development (Current)
- Runs on `localhost:5173`
- Uses **mock/sample data**
- No database connection needed
- Perfect for testing UI and features
- Green banner shows at top: "Development Mode"

### ☁️ Production (After Vercel Deployment)
- Runs on `your-app.vercel.app`
- Connects to **real Neon PostgreSQL database**
- Serverless API functions active
- All CRUD operations work
- No banner shown

---

## 🎯 How to Use Real Database

You have **two options**:

### Option 1: Deploy to Vercel (Recommended) ⭐

**Time**: 5 minutes  
**Difficulty**: Easy  
**Best for**: Production use, testing with real data

1. Follow instructions in `/START_HERE.md`
2. Push code to GitHub
3. Deploy to Vercel with environment variables
4. ✅ App automatically connects to Neon database

**Benefits**:
- Global CDN hosting
- Auto-scaling
- HTTPS included
- Free tier available
- Professional deployment

### Option 2: Run Backend API Locally

**Time**: 2 minutes  
**Difficulty**: Medium  
**Best for**: Development with real database

1. **Terminal 1** - Start backend API:
```bash
cd backend-api
npm install
npm start
```

2. **Terminal 2** - Start frontend:
```bash
npm run dev
```

3. Backend runs on: `http://localhost:3001`
4. Frontend runs on: `http://localhost:5173`
5. Frontend automatically connects to local backend

**Note**: You need to set `DATABASE_URL` in `/backend-api/.env` file.

---

## 🔍 Current Behavior

### What's Working (Mock Data):
✅ All pages render correctly  
✅ Navigation works  
✅ UI components display  
✅ Forms can be filled  
✅ Login accepts any credentials  
✅ Admin dashboard shows sample data  
✅ All features are testable  

### What's Not Connected Yet:
❌ Database operations  
❌ Data persistence  
❌ Real authentication  
❌ API endpoints  

---

## 📊 Mock Data Overview

The app includes realistic mock data for testing:

### Properties (3 sample listings)
- Luxury Downtown Apartment - New York
- Cozy Beach House - Malibu
- Mountain Cabin Retreat - Aspen

### Bookings (2 sample bookings)
- Booking #1: Confirmed
- Booking #2: Pending

### Customers (2 sample profiles)
- John Doe - 5 bookings
- Jane Smith - 3 bookings

### Payments (2 sample transactions)
- Payment #1: $750 paid
- Payment #2: $1,400 pending

---

## 🚀 Why This Design?

This architecture provides several benefits:

1. **Instant Development** - No backend setup needed to start working
2. **UI Testing** - Test all components without database
3. **Demo Ready** - Show the app to stakeholders immediately
4. **Flexible Deployment** - Deploy when ready
5. **Graceful Fallback** - If API fails, app still works

---

## 🎨 Visual Indicator

Look for the **green banner** at the top of the page:

```
⚠️ Development Mode: Using mock data. Deploy to Vercel to connect to your Neon database.
```

This banner:
- ✅ Shows in local development
- ❌ Hidden when deployed to Vercel
- Helps you know which mode you're in

---

## 🔄 Switching Between Modes

### Currently: Local Development with Mock Data
```
Your Browser
    ↓
localhost:5173 (Frontend)
    ↓
Mock Data (in code)
```

### After Vercel Deployment:
```
Your Browser
    ↓
your-app.vercel.app (Frontend on CDN)
    ↓
Vercel Serverless Functions (/api/*)
    ↓
Neon PostgreSQL Database
```

---

## ✅ Checklist: Am I Ready to Deploy?

Before deploying to Vercel, make sure:

- [ ] Code is working in local development
- [ ] All pages load correctly
- [ ] No console errors (except API fallback messages)
- [ ] Design looks good (olive green/beige colors)
- [ ] Admin dashboard is accessible
- [ ] Navigation works properly
- [ ] "Back to Home" link works in admin

Once these are ✅, you're ready to deploy!

---

## 🆘 Common Questions

### Q: Why can't I save data?
**A**: You're using mock data. Deploy to Vercel or run the backend API locally.

### Q: How do I test with real data?
**A**: Deploy to Vercel (recommended) or run backend API server locally.

### Q: Will my changes be saved after refresh?
**A**: No, mock data resets on each page load. Deploy to Vercel for persistence.

### Q: Can I remove mock data?
**A**: Yes, but then the app won't work locally. Mock data is a fallback feature.

### Q: Is this normal?
**A**: Yes! This is by design. Many modern apps work this way.

---

## 📚 Next Steps

1. **Test everything locally** ✅ (You are here!)
2. **Review design and features** ✅
3. **Setup Neon database** (Run SQL setup)
4. **Deploy to Vercel** (5 minutes)
5. **Test with real database** ✅
6. **Share your live app** 🎉

---

## 🎯 Ready to Deploy?

When you're ready to connect to your real Neon database:

1. Open `/START_HERE.md`
2. Follow the 3-step deployment guide
3. Your app will be live in 5 minutes with full database integration!

---

## 💡 Pro Tips

- **Don't worry about the mock data** - It's a feature, not a bug!
- **Test locally first** - Make sure everything works before deploying
- **Check the console** - You'll see "Error fetching..." messages (expected)
- **Look for the banner** - Green banner = mock data mode
- **Deploy when ready** - Take your time, there's no rush

---

**Happy developing! 🚀**

Questions? Check `/START_HERE.md` or `/VERCEL_DEPLOYMENT.md` for deployment instructions.
