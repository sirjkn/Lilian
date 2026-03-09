# 🚀 Deploy Skyway Suites to Vercel

Complete guide to deploy your Skyway Suites application to Vercel with Neon database integration.

## 📋 Prerequisites

1. ✅ GitHub account
2. ✅ Vercel account (free at https://vercel.com)
3. ✅ Neon database already set up (you have this!)
4. ✅ Database tables created (run setup-database.sql in Neon console)

## 🎯 Step-by-Step Deployment

### Step 1: Push to GitHub

1. **Create a new repository on GitHub**:
   - Go to https://github.com/new
   - Name it: `skyway-suites`
   - Make it **Private** (recommended) or Public
   - Don't initialize with README
   - Click "Create repository"

2. **Push your code** (run these commands in your project folder):

```bash
git init
git add .
git commit -m "Initial commit - Skyway Suites with Neon DB"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/skyway-suites.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

### Step 2: Deploy to Vercel

1. **Go to Vercel**: https://vercel.com

2. **Sign in with GitHub**

3. **Import Project**:
   - Click "Add New" → "Project"
   - Select your `skyway-suites` repository
   - Click "Import"

4. **Configure Build Settings**:
   - Framework Preset: **Vite**
   - Root Directory: `./` (leave as default)
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Click "Deploy"

**WAIT! Before deploying, you need to add environment variables first!**

### Step 3: Add Environment Variables

Before clicking "Deploy", scroll down to **Environment Variables**:

1. **DATABASE_URL** (REQUIRED):
   - Key: `DATABASE_URL`
   - Value: `postgresql://neondb_owner:npg_aJ8wfM4RIeTQ@ep-floral-leaf-ag3dpaau-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require`
   - Environment: Production, Preview, Development (check all)

2. **JWT_SECRET** (REQUIRED):
   - Key: `JWT_SECRET`
   - Value: Generate a random string (use this command in terminal):
     ```bash
     node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
     ```
   - Or use: `skyway-suites-secret-key-2026-production-change-this`
   - Environment: Production, Preview, Development (check all)

3. **NODE_ENV** (Optional but recommended):
   - Key: `NODE_ENV`
   - Value: `production`
   - Environment: Production only

4. Click "Deploy" button at the bottom

### Step 4: Wait for Deployment

- Vercel will build and deploy your app
- This takes 2-5 minutes
- You'll see build logs in real-time
- ✅ Success message when complete

### Step 5: Get Your Live URL

After deployment:
- You'll get a URL like: `https://skyway-suites-abc123.vercel.app`
- Click "Visit" to open your live app!

## 🧪 Test Your Deployment

1. **Visit your live URL**
2. **Test the homepage** - should load with olive green colors
3. **Test API** - Open browser console, go to Properties page
4. **Login as admin**:
   - Email: `admin@skywaysuites.com`
   - Password: `admin123`
5. **Check admin dashboard** - should show real data from Neon database

## ⚙️ Configure Custom Domain (Optional)

1. In Vercel dashboard, click your project
2. Go to **Settings** → **Domains**
3. Add your domain (e.g., `skywaysuites.com`)
4. Follow DNS configuration instructions
5. Vercel auto-generates SSL certificate

## 🔄 How Updates Work

Every time you push to GitHub, Vercel automatically deploys:

```bash
# Make your changes
git add .
git commit -m "Update feature XYZ"
git push

# Vercel automatically deploys in ~2 minutes!
```

## 🐛 Troubleshooting

### Problem: "Module not found" errors

**Solution**: Make sure all dependencies are installed:
```bash
npm install
git add package.json package-lock.json
git commit -m "Update dependencies"
git push
```

### Problem: Database connection fails

**Solution**: Check environment variables:
1. Go to Vercel dashboard
2. Click your project
3. Settings → Environment Variables
4. Make sure `DATABASE_URL` is correct
5. Click "Redeploy" button

### Problem: API routes return 404

**Solution**: 
1. Check that `/api` folder exists in your repo
2. Verify `vercel.json` is in the root
3. Redeploy from Vercel dashboard

### Problem: CORS errors in browser console

**Solution**: The API routes have CORS enabled, but if you still see errors:
1. Clear browser cache
2. Try in incognito mode
3. Check Network tab in DevTools for actual error

### Problem: Build fails

**Solution**: Check Vercel build logs:
1. Click on the failed deployment
2. Read the error message
3. Common fixes:
   - Make sure `package.json` has all dependencies
   - Ensure TypeScript types are installed
   - Check for syntax errors in `/api` files

## 📊 Monitor Your App

### View Logs

1. Go to Vercel dashboard
2. Click your project
3. Click on "Logs" tab
4. See real-time API requests and errors

### Analytics

1. In Vercel dashboard
2. Click "Analytics" tab
3. See visitor stats, performance, etc.

## 🔒 Security Best Practices

### ✅ Already Done:
- ✅ HTTPS automatically enabled
- ✅ Environment variables secured
- ✅ Database connection string not in code
- ✅ JWT secret hidden
- ✅ CORS properly configured

### 🎯 Recommended:
1. **Enable Vercel Authentication** (for admin area):
   - Settings → Authentication → Enable Password Protection

2. **Add Rate Limiting** (future enhancement):
   - Vercel Pro plan includes DDoS protection

3. **Database Backups**:
   - Neon automatically backs up your database
   - Can restore from Neon dashboard

## 📱 Test on Mobile

Your Vercel URL works on all devices:
- Open on your phone: `https://your-app.vercel.app`
- Share with friends for testing
- Responsive design already implemented

## 🎨 What's Deployed

Your live site includes:

### Frontend:
- ✅ React SPA with React Router
- ✅ Olive green & beige color scheme
- ✅ All customer pages (Home, Properties, About, Contact)
- ✅ Admin dashboard with full CRUD
- ✅ Authentication system

### Backend API (Serverless):
- ✅ `/api/health` - Health check
- ✅ `/api/auth/login` - User login
- ✅ `/api/auth/signup` - User registration
- ✅ `/api/properties` - Properties CRUD
- ✅ `/api/bookings` - Bookings CRUD
- ✅ `/api/customers` - Customers CRUD
- ✅ `/api/payments` - Payments CRUD
- ✅ `/api/contact` - Contact form

### Database:
- ✅ Connected to Neon PostgreSQL
- ✅ Sample data already loaded
- ✅ Admin account ready

## 🚀 Performance

Vercel optimizations:
- ⚡ Edge CDN (globally distributed)
- ⚡ Automatic compression
- ⚡ Image optimization
- ⚡ Route caching
- ⚡ Serverless functions (auto-scaling)

## 💰 Cost

**Free Tier Includes:**
- ✅ 100 GB bandwidth/month
- ✅ Unlimited API requests
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ 100 GB-hours of serverless execution

**Neon Free Tier:**
- ✅ 512 MB storage
- ✅ Always-on compute (with limits)
- ✅ Automatic backups

This should be enough for testing and small production use!

## 🎯 Next Steps After Deployment

1. **Share your live URL** with stakeholders
2. **Test all features** in production
3. **Monitor Vercel logs** for errors
4. **Set up custom domain** (optional)
5. **Add more properties** via admin dashboard
6. **Invite users** to test bookings

## 🔄 Rollback if Needed

If something goes wrong:
1. Go to Vercel dashboard
2. Click "Deployments" tab
3. Find a previous working deployment
4. Click "⋯" → "Promote to Production"

## 📞 Support

- **Vercel Docs**: https://vercel.com/docs
- **Neon Docs**: https://neon.tech/docs
- **GitHub Issues**: Create issues in your repo

## ✅ Deployment Checklist

Before going live:
- [ ] Database tables created in Neon
- [ ] Sample data loaded
- [ ] Code pushed to GitHub
- [ ] Environment variables added in Vercel
- [ ] First deployment successful
- [ ] Tested login as admin
- [ ] Tested creating a property
- [ ] Tested customer booking flow
- [ ] Checked all pages load correctly
- [ ] Verified mobile responsiveness
- [ ] Database connection working

---

## 🎉 You're Live!

Your Skyway Suites application is now running on:
- **Frontend**: Vercel Edge Network
- **Backend**: Vercel Serverless Functions
- **Database**: Neon PostgreSQL (AWS)

Professional, scalable, and ready for real users! 🏠✨
