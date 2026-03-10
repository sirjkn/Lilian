# Troubleshooting: "Failed to Add Property" Error

## What Was Fixed

I've updated the code to provide more detailed error messages and ensure all required database fields are included when creating a property.

### Changes Made:

1. **Better Error Messages** - The error toast now shows the actual error message from the API
2. **Complete Field Mapping** - Added missing calendar sync fields with default values:
   - `icalUrl: ''`
   - `airbnbCalendarUrl: ''`
   - `bookingCalendarUrl: ''`
   - `vrboCalendarUrl: ''`
   - `calendarSyncEnabled: false`

## How to Fix the Database

The "Failed to add property" error is most likely because your Neon database doesn't have the `average_rating` and `review_count` columns yet.

### Solution: Run These Migrations

**Go to your Neon Database SQL Editor and run:**

### Migration 1: Add Rating Columns
```sql
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'properties' AND column_name = 'average_rating'
    ) THEN
        ALTER TABLE properties ADD COLUMN average_rating DECIMAL(2,1) DEFAULT 0;
    END IF;
END $$;

DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'properties' AND column_name = 'review_count'
    ) THEN
        ALTER TABLE properties ADD COLUMN review_count INTEGER DEFAULT 0;
    END IF;
END $$;

UPDATE properties 
SET average_rating = 0 
WHERE average_rating IS NULL;

UPDATE properties 
SET review_count = 0 
WHERE review_count IS NULL;
```

### Migration 2: Verify All Columns Exist
```sql
-- Check what columns your properties table has
SELECT column_name, data_type, column_default
FROM information_schema.columns 
WHERE table_name = 'properties'
ORDER BY column_name;
```

**You should see these columns:**
- amenities
- airbnb_import_url
- available
- **average_rating** ← NEW
- bathrooms
- bedrooms
- booking_import_url
- calendar_sync_enabled
- category
- created_at
- description
- guests
- ical_export_url
- id
- image
- last_calendar_sync
- location
- price
- **review_count** ← NEW
- title
- vrbo_import_url

## After Running Migrations

1. **Redeploy on Vercel** (optional but recommended)
   - Go to Vercel Dashboard
   - Click "Redeploy" on your latest deployment
   - Wait for deployment to complete

2. **Try Adding a Property Again**
   - Open Admin Dashboard → Properties
   - Click "Add New Property"
   - Fill in the form
   - Click "Add Property"
   - You should see a success message!

3. **Check the Error Message**
   - If it still fails, the error toast will now show the exact error
   - Example: "Failed to add property: column 'xyz' does not exist"
   - This tells you exactly what's wrong

## Common Errors and Solutions

### Error: "column 'average_rating' does not exist"
**Solution:** Run Migration 1 above

### Error: "column 'review_count' does not exist"
**Solution:** Run Migration 1 above

### Error: "null value in column 'average_rating' violates not-null constraint"
**Solution:** The column exists but doesn't have a default. Run:
```sql
ALTER TABLE properties ALTER COLUMN average_rating SET DEFAULT 0;
ALTER TABLE properties ALTER COLUMN review_count SET DEFAULT 0;
UPDATE properties SET average_rating = 0 WHERE average_rating IS NULL;
UPDATE properties SET review_count = 0 WHERE review_count IS NULL;
```

### Error: "PREVIEW_MODE" or "API_NOT_DEPLOYED"
**Solution:** You're in Figma Make preview mode. Deploy to Vercel to test the real API.

### Error: "Failed to add property: Request failed"
**Solution:** Check Vercel function logs for the actual database error

## Verify Fix Worked

1. **Add a test property**
2. **Check it appears in the properties list**
3. **Verify in Neon Database:**
   ```sql
   SELECT id, title, price, average_rating, review_count 
   FROM properties 
   ORDER BY created_at DESC 
   LIMIT 5;
   ```

Your new property should appear with:
- `average_rating: 0`
- `review_count: 0`

## Still Having Issues?

1. **Check browser console** (F12 → Console tab)
   - Look for red error messages
   - Copy the full error message

2. **Check Vercel function logs**
   - Vercel Dashboard → Your Project → Functions → /api
   - Look for error logs when you try to add a property

3. **Check Neon database logs**
   - Neon Console → Your Project → Monitoring
   - Look for failed queries

4. **Verify DATABASE_URL**
   - Make sure it's correctly set in `/api/config/db.ts`
   - Should start with `postgresql://`

5. **Test the API directly**
   ```
   POST https://your-app.vercel.app/api?endpoint=properties
   Headers: Authorization: Bearer YOUR_TOKEN
   Body: {
     "title": "Test Property",
     "description": "Test",
     "price": 100,
     "location": "Test City",
     "bedrooms": 1,
     "bathrooms": 1,
     "guests": 2,
     "category": "Studio",
     "image": "https://example.com/image.jpg",
     "amenities": ["WiFi"],
     "available": true,
     "icalUrl": "",
     "airbnbCalendarUrl": "",
     "bookingCalendarUrl": "",
     "vrboCalendarUrl": "",
     "calendarSyncEnabled": false
   }
   ```

## Summary

The fix includes:
1. ✅ Better error messages that show the actual problem
2. ✅ All required fields now included when creating properties
3. ✅ Database migration to add missing columns
4. ✅ Default values for all new fields

**Run the migration, refresh your app, and try again!**
