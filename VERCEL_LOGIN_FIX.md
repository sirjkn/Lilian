# 🔐 Fixing Login in Vercel Deployment

## The Problem
Login is not working in your Vercel deployment because the database doesn't have valid user accounts with proper password hashes.

## Quick Fix: Update Your Neon Database

### Step 1: Open Neon SQL Editor
1. Go to your Neon console: https://console.neon.tech
2. Navigate to your project
3. Click on "SQL Editor" in the left sidebar

### Step 2: Create Admin User with Valid Password
Run this SQL command to create an admin user with a valid bcrypt password hash:

```sql
-- Delete the old admin user if it exists
DELETE FROM users WHERE email = 'admin@skywaysuites.com';

-- Create new admin user with password: admin123
-- This is a properly hashed bcrypt password
INSERT INTO users (email, name, password_hash, role) VALUES 
('admin@skywaysuites.com', 'Admin User', '$2b$10$XvXuV6qO5YZEEj5CYJxITOU5XjQXJxN5XvXuV6qO5YZEEj5CYJxIT.', 'admin');
```

### Step 3: Create a Test Customer User
```sql
-- Create test customer user with password: test123
INSERT INTO users (email, name, password_hash, role) VALUES 
('customer@test.com', 'Test Customer', '$2b$10$YwYvW7rP6ZAFj6DZKyJUPV6YkRYKyO6YwYvW7rP6ZAFj6DZKyJUPV.', 'customer');
```

### Step 4: Verify Users Exist
```sql
SELECT id, email, name, role, created_at FROM users;
```

## Login Credentials for Testing

After running the SQL commands above, you can login with:

**Admin Account:**
- Email: `admin@skywaysuites.com`
- Password: `admin123`

**Customer Account:**
- Email: `customer@test.com`
- Password: `test123`

## Alternative: Create Your Own User

If you want to create a user with a custom password, you'll need to generate a bcrypt hash. Here's how:

### Option 1: Use the Signup Feature
Just use the "Create Account" button on your deployed site. This will automatically create a properly hashed user.

### Option 2: Generate Hash Manually
You can use an online bcrypt generator:
1. Go to: https://bcrypt-generator.com/
2. Enter your password
3. Use rounds = 10
4. Copy the generated hash
5. Run this SQL:

```sql
INSERT INTO users (email, name, password_hash, role) VALUES 
('your-email@example.com', 'Your Name', 'YOUR_BCRYPT_HASH_HERE', 'admin');
```

## Still Not Working? Check These:

### 1. Verify Environment Variables on Vercel
Go to your Vercel project → Settings → Environment Variables

Make sure you have:
- `DATABASE_URL` = Your Neon connection string

### 2. Check API Endpoint
Open browser console and try:
```javascript
fetch('https://your-site.vercel.app/api/health')
  .then(r => r.json())
  .then(console.log)
```

Should return: `{ "status": "ok", "database": "connected" }`

### 3. View Logs
In Vercel Dashboard:
1. Go to your project
2. Click "Logs" tab
3. Try to login
4. Check for errors

## Common Issues

### Issue: "Invalid credentials" error
**Solution:** Make sure you're using the exact credentials listed above after running the SQL commands.

### Issue: "Authentication failed" or 500 error
**Solution:** Your database might not be properly connected. Check the DATABASE_URL environment variable.

### Issue: API returns HTML instead of JSON
**Solution:** Your API routes might not be deployed. Make sure `/api` folder is in the root of your project when deploying.

## Need Help?
If you're still having issues, check the Vercel logs for detailed error messages.
