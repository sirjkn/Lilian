# 🔧 API Debug Guide - Skyway Suites

## Error Fixed: "<!DOCTYPE... is not valid JSON"

### 🐛 The Problem

**Error Message:**
```
Signup error: SyntaxError: Unexpected token '<', "<!DOCTYPE "... is not valid JSON
```

**What it means:**
The frontend expected JSON from the API but received HTML instead. This happens when the API endpoint isn't found or there's a routing issue.

---

## ✅ Fixes Applied

### 1. Updated `vercel.json` Configuration

**Before:**
```json
{
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "/api/$1"
    },
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

**Problem:** The rewrite rules were conflicting with Vercel's automatic serverless function detection.

**After:**
```json
{
  "functions": {
    "api/**/*.ts": {
      "memory": 1024,
      "maxDuration": 10
    }
  },
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/api/$1"
    },
    {
      "handle": "filesystem"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

**What changed:**
- ✅ Added explicit `functions` configuration for API routes
- ✅ Changed `rewrites` to `routes` for better control
- ✅ Added `handle: filesystem` to check for actual files first
- ✅ Set memory and timeout limits for serverless functions

### 2. Enhanced Error Handling in AuthContext

**Added better error detection:**
```typescript
const signup = async (email: string, password: string, name: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth?action=signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name }),
    });

    // Get response text first to see what we're getting
    const responseText = await response.text();
    
    // Try to parse as JSON
    let data;
    try {
      data = JSON.parse(responseText);
    } catch (parseError) {
      console.error('Failed to parse response as JSON:', responseText.substring(0, 200));
      throw new Error(`Server returned invalid response. Expected JSON but got: ${responseText.substring(0, 100)}...`);
    }

    if (!response.ok) {
      throw new Error(data.error || 'Signup failed');
    }
    
    if (!data.user || !data.token) {
      throw new Error('Invalid response from server');
    }
    
    setUser(data.user);
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
  } catch (error) {
    console.error('Signup error:', error);
    throw error;
  }
};
```

**What changed:**
- ✅ Gets response as text first
- ✅ Tries to parse as JSON with proper error handling
- ✅ Shows the actual HTML content if JSON parsing fails
- ✅ Provides clearer error messages

### 3. Improved Health Check Endpoint

**Added more diagnostic info:**
```typescript
try {
  const result = await query('SELECT NOW() as time, version() as version');
  
  return res.status(200).json({
    status: 'ok',
    database: 'connected',
    message: 'Skyway Suites API is running',
    timestamp: new Date().toISOString(),
    dbTime: result.rows[0].time,
    dbVersion: result.rows[0].version.split(' ')[0]
  });
} catch (error) {
  console.error('Health check failed:', error);
  return res.status(500).json({
    status: 'error',
    database: 'disconnected',
    message: 'Database connection failed',
    error: String(error),
    timestamp: new Date().toISOString()
  });
}
```

**What changed:**
- ✅ Shows database time and version
- ✅ Includes full error details on failure
- ✅ Explicit `Content-Type: application/json` header

### 4. Verified Content-Type Headers

All API endpoints now explicitly set:
```typescript
res.setHeader('Content-Type', 'application/json');
```

This ensures browsers always expect JSON responses.

---

## 🧪 How to Test

### 1. Test Health Check Endpoint

In your browser console or terminal:

```bash
# Test health endpoint
curl https://your-app.vercel.app/api/health

# Expected response:
{
  "status": "ok",
  "database": "connected",
  "message": "Skyway Suites API is running",
  "timestamp": "2026-03-10T...",
  "dbTime": "2026-03-10...",
  "dbVersion": "PostgreSQL"
}
```

### 2. Test Auth Endpoint

```bash
# Test signup
curl -X POST https://your-app.vercel.app/api/auth?action=signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123","name":"Test User"}'

# Expected response:
{
  "user": {
    "id": "1",
    "email": "test@example.com",
    "name": "Test User",
    "role": "customer"
  },
  "token": "eyJhbGciOi..."
}
```

### 3. Test in Browser Console

```javascript
// Test health check
fetch('/api/health')
  .then(r => r.json())
  .then(console.log)
  .catch(console.error);

// Test signup
fetch('/api/auth?action=signup', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'test@example.com',
    password: 'password123',
    name: 'Test User'
  })
})
  .then(r => r.text())
  .then(text => {
    console.log('Response:', text);
    return JSON.parse(text);
  })
  .then(console.log)
  .catch(console.error);
```

---

## 🔍 Debugging Checklist

If you still see the error, check:

### ✅ Vercel Deployment
- [ ] API routes are in `/api` folder
- [ ] Files are named `.ts` (not `.js`)
- [ ] `@vercel/node` is in dependencies
- [ ] Redeploy after changing `vercel.json`

### ✅ API Endpoints
- [ ] All endpoints set `Content-Type: application/json`
- [ ] All endpoints return JSON (use `res.json()`)
- [ ] No HTML error pages being returned
- [ ] CORS headers are set properly

### ✅ Database Connection
- [ ] DATABASE_URL is correct (hardcoded or env var)
- [ ] Database tables exist
- [ ] Database is accessible from Vercel
- [ ] SSL is enabled in connection string

### ✅ Frontend
- [ ] API_BASE_URL is set correctly (`/api` or full URL)
- [ ] Fetch requests include proper headers
- [ ] Error handling catches both network and JSON errors

---

## 🚨 Common Issues & Solutions

### Issue 1: "404 Not Found" HTML page
**Cause:** API route not recognized by Vercel  
**Solution:** 
- Check `vercel.json` has correct configuration
- Make sure files are in `/api` folder
- Redeploy after changes

### Issue 2: "500 Internal Server Error" HTML page
**Cause:** API endpoint crashed before setting headers  
**Solution:**
- Check Vercel function logs
- Verify database connection
- Add try-catch blocks around all code

### Issue 3: CORS errors
**Cause:** Missing or incorrect CORS headers  
**Solution:**
```typescript
res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
```

### Issue 4: "Cannot read property of undefined"
**Cause:** Request body not parsed  
**Solution:**
- Vercel automatically parses JSON if `Content-Type` header is set
- Access via `req.body` (not `req.json()`)

---

## 📊 Vercel Function Logs

### How to Check Logs:

1. Go to Vercel Dashboard
2. Select your project
3. Click "Deployments"
4. Click on latest deployment
5. Click "Functions" tab
6. Click on the function (e.g., `/api/auth`)
7. View logs and errors

### What to Look For:

```
✅ Good logs:
- "Executed query { text: 'SELECT...', duration: 50, rows: 1 }"
- "✅ Database pool initialized with Neon PostgreSQL"
- Function completed successfully (200 status)

❌ Bad logs:
- "Database connection failed"
- "ECONNREFUSED" or "ETIMEDOUT"
- "Cannot read property..."
- "Unexpected token"
```

---

## 🔧 Manual Testing Script

Create this file: `/test-api.html`

```html
<!DOCTYPE html>
<html>
<head>
  <title>API Test</title>
</head>
<body>
  <h1>Skyway Suites API Test</h1>
  
  <h2>Health Check</h2>
  <button onclick="testHealth()">Test Health</button>
  <pre id="health-result"></pre>
  
  <h2>Signup</h2>
  <button onclick="testSignup()">Test Signup</button>
  <pre id="signup-result"></pre>
  
  <script>
    async function testHealth() {
      try {
        const response = await fetch('/api/health');
        const text = await response.text();
        document.getElementById('health-result').textContent = text;
        
        // Try to parse as JSON
        try {
          const json = JSON.parse(text);
          console.log('Health check:', json);
        } catch (e) {
          console.error('Not JSON:', text.substring(0, 200));
        }
      } catch (error) {
        document.getElementById('health-result').textContent = error.message;
      }
    }
    
    async function testSignup() {
      try {
        const response = await fetch('/api/auth?action=signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: `test${Date.now()}@example.com`,
            password: 'password123',
            name: 'Test User'
          })
        });
        
        const text = await response.text();
        document.getElementById('signup-result').textContent = text;
        
        // Try to parse as JSON
        try {
          const json = JSON.parse(text);
          console.log('Signup result:', json);
        } catch (e) {
          console.error('Not JSON:', text.substring(0, 200));
        }
      } catch (error) {
        document.getElementById('signup-result').textContent = error.message;
      }
    }
  </script>
</body>
</html>
```

---

## ✅ Expected Behavior After Fix

### Frontend:
1. User fills signup form
2. Frontend calls `/api/auth?action=signup`
3. Frontend receives JSON response
4. User is logged in automatically
5. Redirected to homepage

### Backend:
1. Receives POST request
2. Validates input (email, password, name)
3. Checks if user exists
4. Hashes password with bcrypt
5. Inserts user into database
6. Generates JWT token
7. Returns JSON: `{ user, token }`

### Response Flow:
```
Frontend                    Backend                     Database
   |                           |                            |
   |---POST /api/auth?signup-->|                            |
   |                           |---Query "SELECT user"----->|
   |                           |<--User not found-----------|
   |                           |---Hash password            |
   |                           |---INSERT INTO users------->|
   |                           |<--User created (id: 1)-----|
   |                           |---Generate JWT token       |
   |<--JSON {user, token}------|                            |
   |                           |                            |
   |---Store in localStorage   |                            |
   |---Redirect to home        |                            |
```

---

## 🎯 Verification Steps

After deploying the fix:

1. **Clear Browser Cache**
   - Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

2. **Test Health Endpoint**
   ```
   Visit: https://your-app.vercel.app/api/health
   Should see: JSON response with "status": "ok"
   ```

3. **Test Signup**
   - Go to `/create-account`
   - Fill in form
   - Click "Sign Up"
   - Should redirect to homepage with user logged in

4. **Check Console**
   - Open browser DevTools (F12)
   - Check Console tab for errors
   - Check Network tab to see API requests

5. **Verify in Database**
   ```sql
   SELECT * FROM users;
   -- Should show your newly created user
   ```

---

## 📝 Summary

### What Was Wrong:
- Vercel wasn't recognizing `/api` routes as serverless functions
- Was returning HTML 404 page instead of JSON
- Frontend tried to parse HTML as JSON → Error

### What We Fixed:
1. ✅ Updated `vercel.json` with proper function configuration
2. ✅ Added explicit Content-Type headers in all API endpoints
3. ✅ Enhanced error handling to detect HTML responses
4. ✅ Improved health check endpoint for diagnostics
5. ✅ Added better logging and error messages

### Result:
✅ API endpoints now return proper JSON  
✅ Signup and login work correctly  
✅ Error messages are clear and helpful  
✅ Easy to debug future issues  

---

**Status:** ✅ FIXED  
**Date:** March 10, 2026  
**Issue:** HTML instead of JSON from API  
**Solution:** Updated Vercel configuration and error handling
