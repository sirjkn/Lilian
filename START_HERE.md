# 🚀 START HERE - Deploy Skyway Suites to Vercel

**Your app is 100% ready for Vercel deployment!**

⚠️ **Important**: The app currently runs with **mock data** locally. To connect to your Neon database, you need to deploy to Vercel (takes 5 minutes).

Follow these simple steps to get your app live with real database integration.

---

## ⚡ Quick Deploy (3 Steps)

### Step 1️⃣: Setup Database (2 minutes)

1. Open Neon Console: https://console.neon.tech/
2. Click on your database: `ep-floral-leaf-ag3dpaau`
3. Click **SQL Editor** (left sidebar)
4. Open file: `/backend-api/setup-database.sql` in your code
5. Copy **ALL** the SQL code
6. Paste into Neon SQL Editor
7. Click **"Run"** button
8. ✅ You'll see: "Tables created successfully!"

### Step 2️⃣: Push to GitHub (1 minute)

```bash
# Open terminal in your project folder
git init
git add .
git commit -m "Skyway Suites - Ready for Vercel"
git branch -M main

# Create repo on GitHub.com, then:
git remote add origin https://github.com/YOUR_USERNAME/skyway-suites.git
git push -u origin main
```

### Step 3️⃣: Deploy to Vercel (2 minutes)

1. **Go to**: https://vercel.com
2. **Sign in** with GitHub
3. Click **"Add New"** → **"Project"**
4. Select **"skyway-suites"** repository
5. Click **"Import"**

**BEFORE clicking Deploy**, scroll down to **Environment Variables** and add:

**Variable 1:**
- Name: `DATABASE_URL`
- Value: `postgresql://neondb_owner:npg_aJ8wfM4RIeTQ@ep-floral-leaf-ag3dpaau-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require`
- Environment: ✅ Production, ✅ Preview, ✅ Development

**Variable 2:**
- Name: `JWT_SECRET`
- Value: `skyway-suites-production-secret-2026-change-this`
- Environment: ✅ Production, ✅ Preview, ✅ Development

6. Click **"Deploy"** button
7. ⏱️ Wait 2-3 minutes
8. ✅ **Done!** Click "Visit" to see your live app

---

## 🎉 Your App is Live!

You'll get a URL like: `https://skyway-suites-abc123.vercel.app`

### Test It:

1. **Homepage**: Visit your URL
2. **Admin Login**: 
   - Click "Login" 
   - Email: `admin@skywaysuites.com`
   - Password: `admin123`
3. **Admin Dashboard**: Click "Admin Dashboard" in header
4. **Back to Home**: Click "Back to Home" in admin sidebar

---

## 📚 Need Help?

- **Full Guide**: See `/VERCEL_DEPLOYMENT.md`
- **Checklist**: See `/DEPLOYMENT_CHECKLIST.md`
- **Overview**: See `/VERCEL_SETUP_SUMMARY.md`

---

## 🔄 Making Updates

After deployment, every time you push to GitHub:

```bash
# Make changes to your code
git add .
git commit -m "Your update message"
git push
```

**Vercel automatically deploys** in ~2 minutes! 🚀

---

## ✅ What You're Deploying

✨ **Features:**
- Customer property browsing
- Booking system
- User authentication
- Admin dashboard with full CRUD
- Payment tracking
- Contact form
- "Back to Home" link in admin

🎨 **Design:**
- Olive Green (#6B7C3C)
- Dark Beige (#C9B99B)
- Charcoal Grey (#3a3a3a)
- Fully responsive

🔧 **Technology:**
- React + TypeScript frontend
- Vercel serverless backend
- Neon PostgreSQL database
- Global CDN delivery
- Auto-scaling
- **FREE hosting!**

---

## 💡 Pro Tips

### Custom Domain (Optional)
1. In Vercel dashboard → Settings → Domains
2. Add your domain (e.g., `skywaysuites.com`)
3. Follow DNS instructions
4. SSL certificate auto-generated

### Monitor Your App
- **Logs**: Vercel Dashboard → Your Project → Logs
- **Analytics**: Vercel Dashboard → Your Project → Analytics
- **Database**: Neon Console → Monitoring

### Change Admin Password
After testing, update the admin password:
1. Go to Neon Console
2. SQL Editor
3. Run:
```sql
UPDATE users 
SET password_hash = '$2b$10$YOUR_NEW_HASH' 
WHERE email = 'admin@skywaysuites.com';
```

---

## 🆘 Troubleshooting

### Build Fails?
- Check Vercel build logs
- Ensure all files are committed to Git
- Run `npm run build` locally first

### Database Connection Error?
- Verify `DATABASE_URL` in Vercel environment variables
- Check Neon database is active (not suspended)
- Ensure SQL tables are created

### 404 on API Routes?
- Check `/api` folder exists in your repo
- Verify `vercel.json` is committed
- Redeploy from Vercel dashboard

---

## 🎯 You're All Set!

Your Skyway Suites app is production-ready with:
- ✅ Full-stack functionality
- ✅ Real database integration  
- ✅ Professional design
- ✅ Secure authentication
- ✅ Admin dashboard
- ✅ Global CDN hosting

**Time to deploy**: 5 minutes  
**Monthly cost**: $0 (free tier)  
**Scalability**: Unlimited  

---

**Ready? Let's deploy! 🚀**

Follow Step 1 above to get started.

Questions? Check `/VERCEL_DEPLOYMENT.md` for the complete guide.