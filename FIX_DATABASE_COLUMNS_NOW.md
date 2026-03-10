# 🔧 FOUND THE PROBLEM! Missing Database Columns

## ❌ Error Found:
```
column "ical_export_url" of relation "properties" does not exist
```

## ✅ Solution:

Your Neon database is missing the calendar sync columns. Here's how to fix it:

### **Step 1: Open Neon SQL Editor**

1. Go to https://console.neon.tech
2. Select your **Skyway Suites** project
3. Click **SQL Editor** in the left sidebar

### **Step 2: Run This Migration**

Copy and paste this **entire script** into the SQL Editor and click **Run**:

```sql
-- Add all missing calendar sync columns
ALTER TABLE properties 
ADD COLUMN IF NOT EXISTS ical_export_url TEXT,
ADD COLUMN IF NOT EXISTS airbnb_import_url TEXT,
ADD COLUMN IF NOT EXISTS booking_import_url TEXT,
ADD COLUMN IF NOT EXISTS vrbo_import_url TEXT,
ADD COLUMN IF NOT EXISTS calendar_sync_enabled BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS last_calendar_sync TIMESTAMP,
ADD COLUMN IF NOT EXISTS average_rating DECIMAL(2,1) DEFAULT 0,
ADD COLUMN IF NOT EXISTS review_count INTEGER DEFAULT 0;

-- Set defaults for existing properties
UPDATE properties 
SET 
    ical_export_url = COALESCE(ical_export_url, ''),
    airbnb_import_url = COALESCE(airbnb_import_url, ''),
    booking_import_url = COALESCE(booking_import_url, ''),
    vrbo_import_url = COALESCE(vrbo_import_url, ''),
    calendar_sync_enabled = COALESCE(calendar_sync_enabled, false),
    average_rating = COALESCE(average_rating, 0),
    review_count = COALESCE(review_count, 0);

-- Verify success
SELECT '✅ Calendar columns added successfully!' as status;
```

### **Step 3: Verify Columns Were Added**

After running the migration, run this to verify:

```sql
SELECT column_name, data_type, column_default
FROM information_schema.columns 
WHERE table_name = 'properties'
ORDER BY column_name;
```

**You should see these columns:**
- ✅ `airbnb_import_url` (text)
- ✅ `average_rating` (numeric, default 0)
- ✅ `booking_import_url` (text)
- ✅ `calendar_sync_enabled` (boolean, default false)
- ✅ `ical_export_url` (text)
- ✅ `last_calendar_sync` (timestamp)
- ✅ `review_count` (integer, default 0)
- ✅ `vrbo_import_url` (text)

### **Step 4: Test Adding a Property**

1. Go back to your **Skyway Suites** website
2. Log in to **Admin Dashboard**
3. Go to **Properties** tab
4. Click **"Add New Property"**
5. Fill in the form:
   - Title: Beach House
   - Location: Mombasa
   - Description: Beautiful beach house
   - Price: 5000
   - Bedrooms: 3
   - Bathrooms: 2
   - Guests: 6
   - Category: House
   - Amenities: WiFi, Pool, Beach Access
6. Click **"Add Property"**

**Expected Result:** ✅ "Property added successfully!"

---

## Why This Happened

Your database schema was created before we added the calendar sync feature. The properties table didn't have these columns:

- `ical_export_url` - For exporting bookings to calendar apps
- `airbnb_import_url` - For importing Airbnb bookings
- `booking_import_url` - For importing Booking.com bookings
- `vrbo_import_url` - For importing VRBO bookings
- `calendar_sync_enabled` - Enable/disable auto-sync
- `last_calendar_sync` - Track when last sync happened
- `average_rating` - Store property rating (for reviews)
- `review_count` - Store number of reviews

The migration adds all these columns at once.

---

## What the Migration Does

1. **Adds missing columns** using `ALTER TABLE ... ADD COLUMN IF NOT EXISTS`
   - Safe to run multiple times (won't error if column exists)
   
2. **Sets default values** for existing properties
   - Empty strings for URLs
   - `false` for calendar sync
   - `0` for ratings and review count

3. **Verifies success** by listing all columns

---

## Troubleshooting

### Error: "permission denied for table properties"
**Solution:** Make sure you're logged into the correct Neon database with owner permissions.

### Error: "relation 'properties' does not exist"
**Solution:** The properties table hasn't been created yet. Run the full schema from `/NEON_DATABASE_SCHEMA.sql` first.

### Success but still getting errors
**Solution:** 
1. Make sure the migration showed "✅ Calendar columns added successfully!"
2. Hard refresh your website (Ctrl+Shift+R or Cmd+Shift+R)
3. Try adding a property again

---

## After Running Migration

Once you run the migration successfully:

✅ Adding properties will work  
✅ Updating properties will work  
✅ Calendar sync fields will be available  
✅ Reviews system will work (has rating columns)  

No need to restart anything - the changes take effect immediately!

---

## Quick Command Summary

```bash
# 1. Open Neon Console
https://console.neon.tech

# 2. Navigate to SQL Editor

# 3. Paste the migration SQL and run it

# 4. Verify with:
SELECT column_name FROM information_schema.columns 
WHERE table_name = 'properties' 
ORDER BY column_name;

# 5. Test adding a property on your website
```

---

🎉 **Run the migration and your properties will work!**
