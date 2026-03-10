# Fixed: Internal Server Error When Adding Property

## What Was Wrong

The frontend was sending field names in **camelCase** format:
- `icalUrl`, `airbnbCalendarUrl`, `bookingCalendarUrl`, `vrboCalendarUrl`, `calendarSyncEnabled`

But the API expected **snake_case** format:
- `ical_export_url`, `airbnb_import_url`, `booking_import_url`, `vrbo_import_url`, `calendar_sync_enabled`

This caused the API to receive `undefined` values for these fields, which caused the database INSERT to fail.

## What I Fixed

✅ Updated `/src/app/lib/api.ts`:
- **`createProperty()`** - Now transforms camelCase to snake_case before sending to API
- **`updateProperty()`** - Now transforms camelCase to snake_case before sending to API

The functions now correctly map:
```typescript
icalUrl → ical_export_url
airbnbCalendarUrl → airbnb_import_url
bookingCalendarUrl → booking_import_url
vrboCalendarUrl → vrbo_import_url
calendarSyncEnabled → calendar_sync_enabled
```

## What You Need to Do

### Step 1: Verify Your Database Has Required Columns

Run this in your **Neon SQL Editor** to check what columns exist:

```sql
-- Check all columns in properties table
SELECT 
    column_name, 
    data_type, 
    column_default
FROM information_schema.columns 
WHERE table_name = 'properties'
ORDER BY column_name;
```

**You MUST have these columns:**
- `average_rating` (numeric, default 0)
- `review_count` (integer, default 0)

### Step 2: Add Missing Columns (if needed)

If the above query doesn't show `average_rating` and `review_count`, run:

```sql
-- Add rating columns
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

-- Set defaults for existing properties
UPDATE properties 
SET average_rating = 0 
WHERE average_rating IS NULL;

UPDATE properties 
SET review_count = 0 
WHERE review_count IS NULL;
```

### Step 3: Test Adding a Property

1. **Refresh your application** (hard refresh: Ctrl+Shift+R or Cmd+Shift+R)
2. Go to **Admin Dashboard → Properties**
3. Click **"Add New Property"**
4. Fill in the form:
   - Title: Test Property
   - Location: Test City
   - Description: Testing add property
   - Price: 100
   - Bedrooms: 1
   - Bathrooms: 1
   - Guests: 2
   - Category: Studio
   - Amenities: WiFi, Kitchen
5. Click **"Add Property"**

**Expected result:** ✅ "Property added successfully!"

## What If It Still Fails?

The error message will now show you the exact problem. Common issues:

### Error: "column 'X' does not exist"
**Solution:** The column is missing from your database. Run the migration in Step 2.

### Error: "null value in column 'X' violates not-null constraint"
**Solution:** A required column doesn't have a default value. Check which column and run:
```sql
ALTER TABLE properties ALTER COLUMN column_name SET DEFAULT 'default_value';
```

### Error: "invalid input syntax for type X"
**Solution:** Data type mismatch. Check that:
- `price` is a number
- `bedrooms`, `bathrooms`, `guests` are integers
- `amenities` is an array of strings

### Error: "relation 'properties' does not exist"
**Solution:** The properties table doesn't exist. Run the full schema from `/NEON_DATABASE_SCHEMA.sql`

## Test the Fix Manually in Database

You can test the INSERT directly in Neon SQL Editor:

```sql
INSERT INTO properties (
    title, 
    description, 
    price, 
    location, 
    bedrooms, 
    bathrooms, 
    guests, 
    category, 
    image, 
    amenities,
    ical_export_url,
    airbnb_import_url,
    booking_import_url,
    vrbo_import_url,
    calendar_sync_enabled
) VALUES (
    'Test Property',
    'Testing insert',
    100.00,
    'Test City',
    1,
    1,
    2,
    'Studio',
    'https://example.com/test.jpg',
    ARRAY['WiFi', 'Kitchen'],
    '',
    '',
    '',
    '',
    false
) RETURNING *;
```

If this works, your database is fine and the issue is elsewhere.

If this fails, the error message will tell you exactly what's wrong with your database schema.

To delete the test property:
```sql
DELETE FROM properties WHERE title = 'Test Property';
```

## Debugging Checklist

- [ ] Ran column verification query
- [ ] `average_rating` column exists with default 0
- [ ] `review_count` column exists with default 0
- [ ] All calendar columns exist (ical_export_url, airbnb_import_url, etc.)
- [ ] Manual INSERT test works in Neon SQL Editor
- [ ] Refreshed the application (hard refresh)
- [ ] Tried adding a property through the UI
- [ ] Checked browser console for error message
- [ ] Checked Vercel function logs for detailed error

## Vercel Function Logs

To see the exact database error:

1. Go to **Vercel Dashboard**
2. Select your project
3. Click **Functions** in the left sidebar
4. Click on the **/api** function
5. Look at the **Logs** tab
6. Try adding a property
7. Look for the error message in the logs

This will show you the exact PostgreSQL error.

## Summary

✅ **Fixed:** Field name mismatch between frontend and API
✅ **Added:** Proper camelCase to snake_case transformation
✅ **Required:** Database must have `average_rating` and `review_count` columns
✅ **Next:** Run the migration and test adding a property

The internal server error should now be fixed! If you still get an error, the error message will tell you exactly what's wrong.
