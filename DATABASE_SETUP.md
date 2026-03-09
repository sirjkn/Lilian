# Skyway Suites - Neon Database Setup Guide

## Overview
This guide will help you set up and migrate your Neon database to support the new settings management system and property calendar functionality.

## Prerequisites
- Access to your Neon database console
- Database connection credentials

## Migration Steps

### Step 1: Access Neon Console
1. Log in to your [Neon Console](https://console.neon.tech/)
2. Select your project: **Skyway Suites**
3. Navigate to the **SQL Editor**

### Step 2: Run Migration Script
1. Open the file `database-migration.sql` in this project
2. Copy the entire SQL script
3. Paste it into the Neon SQL Editor
4. Click **Run** to execute the migration

### Step 3: Verify Migration
Run these verification queries in the SQL Editor:

```sql
-- Check settings table structure
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'settings';

-- Check properties table updates
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'properties' 
AND (column_name LIKE '%calendar%' OR column_name LIKE '%ical%');

-- View all settings by category
SELECT * FROM settings_view;

-- Count settings by category
SELECT category, COUNT(*) as setting_count 
FROM settings 
GROUP BY category;
```

## What's New?

### 1. Settings Table
A unified `settings` table that stores all application settings with categories:
- **general**: Site name, email, phone, address, currency, timezone, etc.
- **users**: User registration, email verification, password policies, session management
- **roles**: Role definitions and permissions
- **notifications_email**: Email provider configuration (SMTP, SendGrid, Mailgun)
- **notifications_whatsapp**: WhatsApp provider configuration (Twilio, Wesendr)
- **hero**: Homepage hero background image

### 2. Property Calendar Fields
New fields added to the `properties` table:
- `ical_export_url` - URL for exporting property calendar (iCal format)
- `airbnb_import_url` - Airbnb calendar import URL
- `booking_import_url` - Booking.com calendar import URL
- `vrbo_import_url` - VRBO calendar import URL
- `calendar_sync_enabled` - Boolean flag to enable/disable calendar sync
- `last_calendar_sync` - Timestamp of last calendar synchronization

## API Endpoints Updated

### Settings Endpoints
- `GET/PUT /api/settings/general` - General settings
- `GET/PUT /api/settings/users` - User settings
- `GET/PUT /api/settings/roles` - Role settings
- `GET/PUT /api/settings/notifications` - Email & WhatsApp notifications
- `GET/PUT /api/settings/hero` - Hero background (updated to use new table)

### Property Endpoints
- `GET /api/properties` - List all properties (includes calendar fields)
- `POST /api/properties` - Create property (supports calendar fields)
- `GET /api/properties/[id]` - Get single property (includes calendar fields)
- `PUT /api/properties/[id]` - Update property (supports calendar fields)
- `DELETE /api/properties/[id]` - Delete property

## Default Settings

The migration script automatically inserts default values for all settings categories:

### General Settings
```
site_name: "Skyway Suites"
site_email: "info@skywaysuites.com"
site_phone: "+254 700 000 000"
site_address: "Nairobi, Kenya"
currency: "KES"
timezone: "Africa/Nairobi"
date_format: "DD/MM/YYYY"
language: "en"
```

### User Settings
```
allow_registration: true
require_email_verification: true
password_min_length: 8
session_timeout: 30 (minutes)
max_login_attempts: 5
lockout_duration: 30 (minutes)
```

### Role Settings
```
default_role: "customer"
admin_role: "admin"
manager_role: "manager"
customer_role: "customer"
enable_custom_roles: false
```

### Email Notifications
```
provider: "smtp" (options: smtp, sendgrid, mailgun)
booking_confirmation: true
booking_reminder: true
payment_received: true
booking_cancelled: true
```

### WhatsApp Notifications
```
provider: "twilio" (options: twilio, wesendr, custom)
booking_confirmation: true
booking_reminder: true
payment_received: false
booking_cancelled: true
```

## Database View
The migration creates a helpful view called `settings_view` that groups settings by category:

```sql
SELECT * FROM settings_view;
```

This returns settings in a JSON format grouped by category for easy retrieval.

## Rollback (If Needed)

If you need to rollback the migration, run:

```sql
-- Drop the settings table
DROP TABLE IF EXISTS settings CASCADE;

-- Remove calendar fields from properties
ALTER TABLE properties 
DROP COLUMN IF EXISTS ical_export_url,
DROP COLUMN IF EXISTS airbnb_import_url,
DROP COLUMN IF EXISTS booking_import_url,
DROP COLUMN IF EXISTS vrbo_import_url,
DROP COLUMN IF EXISTS calendar_sync_enabled,
DROP COLUMN IF EXISTS last_calendar_sync;

-- Drop the view
DROP VIEW IF EXISTS settings_view;

-- Drop the trigger function
DROP FUNCTION IF EXISTS update_updated_at_column CASCADE;
```

## Troubleshooting

### Issue: "relation already exists"
**Solution**: The table already exists. You can safely skip creating it or drop it first.

### Issue: "column already exists"
**Solution**: The column was already added. The migration uses `ADD COLUMN IF NOT EXISTS` so it should be safe.

### Issue: Settings not appearing
**Solution**: Check if default values were inserted:
```sql
SELECT COUNT(*) FROM settings;
```
If count is 0, manually run the INSERT statements from the migration script.

## Next Steps

After running the migration:
1. ✅ Verify all tables and columns exist
2. ✅ Check that default settings are populated
3. ✅ Test the API endpoints in your admin panel
4. ✅ Configure your notification providers (Email & WhatsApp)
5. ✅ Set up calendar import URLs for your properties

## Support

For issues or questions:
- Check the verification queries above
- Review the API endpoint documentation
- Ensure your Neon database connection is active
