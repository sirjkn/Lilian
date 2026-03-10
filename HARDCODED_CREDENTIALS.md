# 🔐 Hardcoded Credentials - Skyway Suites

## ✅ Environment Variables (Hardcoded)

Your Skyway Suites application now has the following credentials **hardcoded** directly into the source code:

```env
DATABASE_URL=postgresql://neondb_owner:npg_aJ8wfM4RIeTQ@ep-floral-leaf-ag3dpaau-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require

JWT_SECRET=skyway-suites-secret-key-2026-production-change-this

PORT=3000
```

---

## 📂 Where They're Used

### 1. Database Connection (`/api/config/db.ts`)
```typescript
const DATABASE_URL = 'postgresql://neondb_owner:npg_aJ8wfM4RIeTQ@ep-floral-leaf-ag3dpaau-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require';

pool = new Pool({
  connectionString: process.env.DATABASE_URL || DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});
```

**What it does:** Connects to your Neon PostgreSQL database

### 2. JWT Authentication (`/api/utils/auth.ts`)
```typescript
const JWT_SECRET = 'skyway-suites-secret-key-2026-production-change-this';

export function generateToken(userId: string): string {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' });
}
```

**What it does:** Signs and verifies authentication tokens

### 3. Centralized Configuration (`/api/config/env.ts`)
```typescript
export const ENV = {
  DATABASE_URL: 'postgresql://...',
  JWT_SECRET: 'skyway-suites-secret-key-2026-production-change-this',
  PORT: 3000,
  DB_POOL: { max: 10, ... },
  JWT_EXPIRES_IN: '7d',
};
```

**What it does:** Central location for all environment configuration

---

## 🚀 How It Works

### Priority Order:
1. **First:** Checks for actual environment variable (`process.env.DATABASE_URL`)
2. **Fallback:** Uses hardcoded value if env var not found

This means:
- ✅ Works immediately without any setup
- ✅ Can still be overridden by environment variables in production
- ✅ No need to configure .env files for development

---

## 🎯 No Setup Required!

### For Figma Make Preview:
```bash
# Just works! No configuration needed
# Uses hardcoded credentials automatically
```

### For Local Development:
```bash
# Just run the app
npm run dev

# Backend API uses hardcoded credentials
# No .env file needed
```

### For Production (Vercel):
```bash
# Deploy directly
vercel deploy

# Hardcoded credentials work immediately
# Optional: Override in Vercel dashboard for better security
```

---

## 🔒 Security Considerations

### ⚠️ Important Notes:

1. **Public Repository:** 
   - ⚠️ These credentials are now in your source code
   - ⚠️ Anyone with access to your code can see them
   - ⚠️ Don't commit this to public GitHub unless you're okay with that

2. **Production Security:**
   - Consider using Vercel environment variables for production
   - Rotate JWT_SECRET periodically
   - Monitor database access logs

3. **Neon Database:**
   - Your database has connection pooling enabled
   - SSL is enforced
   - Connection is to the pooler (not direct)

---

## 🔄 How to Override (Optional)

If you want to use different credentials in production:

### Vercel Dashboard:
1. Go to **Settings** → **Environment Variables**
2. Add:
   - `DATABASE_URL` = Your production database URL
   - `JWT_SECRET` = Your production secret
3. Redeploy

The code will automatically use environment variables **over** hardcoded values.

---

## 📊 Database Connection Details

### Neon Database Info:
- **Host:** `ep-floral-leaf-ag3dpaau-pooler.c-2.eu-central-1.aws.neon.tech`
- **Database:** `neondb`
- **User:** `neondb_owner`
- **Region:** EU Central 1 (AWS)
- **SSL:** Required
- **Channel Binding:** Required
- **Connection Type:** Pooler (optimized for serverless)

### Connection Pool Settings:
- **Max Connections:** 10
- **Idle Timeout:** 30 seconds
- **Connection Timeout:** 2 seconds

---

## 🧪 Testing Connection

### Test Database Connection:
```bash
# Install pg client (if not already)
npm install pg

# Test connection
node -e "const {Pool} = require('pg'); const pool = new Pool({connectionString: 'postgresql://neondb_owner:npg_aJ8wfM4RIeTQ@ep-floral-leaf-ag3dpaau-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require', ssl: {rejectUnauthorized: false}}); pool.query('SELECT NOW()', (err, res) => {console.log(err ? err : res.rows); pool.end();});"
```

Expected output:
```
[ { now: 2026-03-10T... } ]
```

### Test JWT Secret:
```bash
# Test token generation
node -e "const jwt = require('jsonwebtoken'); const token = jwt.sign({userId: '1'}, 'skyway-suites-secret-key-2026-production-change-this', {expiresIn: '7d'}); console.log('Token:', token);"
```

---

## 📝 Files Updated

### Created:
- ✅ `/api/config/env.ts` - Centralized environment configuration

### Modified:
- ✅ `/api/config/db.ts` - Database connection with hardcoded URL
- ✅ `/api/utils/auth.ts` - JWT authentication with hardcoded secret

---

## ✅ Verification Checklist

To verify hardcoded credentials are working:

- [ ] Database connection string is hardcoded in `/api/config/env.ts`
- [ ] JWT secret is hardcoded in `/api/config/env.ts`
- [ ] Database pool uses hardcoded config in `/api/config/db.ts`
- [ ] Auth utilities use hardcoded JWT secret in `/api/utils/auth.ts`
- [ ] Code falls back to hardcoded values if env vars missing
- [ ] App works without any .env file configuration

---

## 🎉 Benefits

### ✅ Instant Setup
- No environment variable configuration needed
- Works immediately after deployment
- No .env files to manage

### ✅ Consistent Across Environments
- Same credentials in development, preview, and production
- No environment-specific configuration
- Easier debugging

### ✅ Zero Configuration
- Clone repo and run - that's it!
- No secret management setup
- No Vercel environment variable setup required

---

## 🔐 Your Credentials Summary

```plaintext
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🗄️  DATABASE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
URL:      postgresql://neondb_owner:npg_aJ8wfM4RIeTQ@...
Provider: Neon (https://neon.tech)
Database: neondb
Region:   EU Central 1
SSL:      Required ✅

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔑  AUTHENTICATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
JWT Secret:   skyway-suites-secret-key-2026-production-change-this
Token Expiry: 7 days
Algorithm:    HS256

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🖥️  SERVER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Port:         3000 (local development)
Max Pool:     10 connections
Pool Timeout: 30s idle, 2s connection

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## 🚦 Status

**✅ HARDCODED CREDENTIALS ACTIVE**

Your application is now configured to use hardcoded credentials everywhere. No additional setup needed!

---

**Last Updated:** March 10, 2026  
**Configuration:** Hardcoded (No .env required)  
**Database:** Neon PostgreSQL (EU Central 1)  
**JWT Secret:** Hardcoded  
**Ready to Deploy:** ✅ YES
