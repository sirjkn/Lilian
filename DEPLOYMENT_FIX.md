# 🚀 API Deployment Fix

## Issue
The API endpoint is returning HTML instead of JSON, which means the Vercel serverless functions aren't deployed correctly.

## ✅ What Was Fixed

### 1. Updated `vercel.json`
```json
{
  "version": 2,
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "functions": {
    "api/**/*.ts": {
      "runtime": "nodejs20.x",
      "maxDuration": 30
    }
  },
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### 2. Better Error Detection
The API client now properly detects when HTML is returned instead of JSON and provides helpful troubleshooting steps.

## 📋 Deployment Steps

### Option 1: Deploy via Vercel CLI (Recommended)

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy to Production**:
   ```bash
   vercel --prod
   ```

### Option 2: Deploy via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New" → "Project"
3. Import your Git repository
4. Vercel will auto-detect the configuration from `vercel.json`
5. Click "Deploy"

## 🔧 Environment Variables

Make sure these environment variables are set in Vercel:

1. Go to your project settings in Vercel
2. Navigate to "Environment Variables"
3. Add these variables (or they'll use the hardcoded defaults):
   - `DATABASE_URL`: Your Neon database connection string
   - `JWT_SECRET`: Your JWT secret key
   
**Note**: The app has hardcoded fallback values in `/api/config/env.ts`, so it will work even without setting these.

## 🧪 Test API After Deployment

After deployment, test the API:

### Test Health Endpoint
```bash
curl https://your-app.vercel.app/api
```

Should return:
```json
{
  "status": "ok",
  "database": "connected",
  "message": "Skyway Suites API is running",
  "timestamp": "2026-03-10T..."
}
```

### Test Simple Endpoint
```bash
curl https://your-app.vercel.app/api/test
```

Should return:
```json
{
  "status": "ok",
  "message": "API is working!",
  "timestamp": "2026-03-10T..."
}
```

## ❌ Common Issues

### Issue 1: API still returns HTML
**Solution**: Make sure the `/api` folder is included in your deployment
- Check that `/api` folder exists in your repository
- Verify `vercel.json` is in the root directory
- Try redeploying with `vercel --prod --force`

### Issue 2: Database connection fails
**Solution**: Check your Neon database URL
- Make sure the database URL is correct in `/api/config/env.ts`
- Or set it as an environment variable in Vercel

### Issue 3: Functions timeout
**Solution**: Increase function timeout in `vercel.json`:
```json
"functions": {
  "api/**/*.ts": {
    "runtime": "nodejs20.x",
    "maxDuration": 60
  }
}
```

## 📁 File Structure

Make sure your project has this structure:
```
/
├── api/
│   ├── index.ts          ← Main API handler
│   ├── test.ts           ← Test endpoint
│   ├── proxy-ical.ts     ← iCal proxy
│   ├── config/
│   │   ├── db.ts         ← Database config
│   │   └── env.ts        ← Environment config
│   └── utils/
│       └── auth.ts       ← Auth utilities
├── src/
│   └── ...
├── vercel.json           ← Vercel config
└── package.json
```

## 🎯 Next Steps

1. **Deploy to Vercel** using one of the methods above
2. **Test the API** using the curl commands
3. **Check Browser Console** for any errors after deployment
4. **Verify Database** connection is working

If issues persist, check the Vercel deployment logs:
```bash
vercel logs --follow
```

---

**Need Help?**
Check the error logs in:
- Vercel Dashboard → Your Project → Deployments → View Function Logs
- Browser Console (F12) → Console tab
