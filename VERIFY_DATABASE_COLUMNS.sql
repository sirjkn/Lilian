-- =============================================
-- VERIFY DATABASE COLUMNS FOR PROPERTIES TABLE
-- =============================================
-- Run this in your Neon SQL Editor to see what columns exist

-- 1. Check all columns in properties table
SELECT 
    column_name, 
    data_type, 
    column_default,
    is_nullable
FROM information_schema.columns 
WHERE table_name = 'properties'
ORDER BY ordinal_position;

-- Expected columns:
-- id                      | uuid          | gen_random_uuid()  | NO
-- title                   | varchar(255)  |                    | NO
-- description             | text          |                    | YES
-- price                   | numeric(10,2) |                    | NO
-- location                | varchar(255)  |                    | YES
-- bedrooms                | integer       |                    | YES
-- bathrooms               | integer       |                    | YES
-- guests                  | integer       |                    | YES
-- category                | varchar(100)  |                    | YES
-- image                   | text          |                    | YES
-- amenities               | ARRAY         |                    | YES
-- available               | boolean       | true               | YES
-- average_rating          | numeric(2,1)  | 0                  | YES  ← MUST EXIST
-- review_count            | integer       | 0                  | YES  ← MUST EXIST
-- ical_export_url         | text          |                    | YES
-- airbnb_import_url       | text          |                    | YES
-- booking_import_url      | text          |                    | YES
-- vrbo_import_url         | text          |                    | YES
-- calendar_sync_enabled   | boolean       | false              | YES
-- last_calendar_sync      | timestamp     |                    | YES
-- created_at              | timestamp     | CURRENT_TIMESTAMP  | YES

-- =============================================
-- 2. If MISSING columns, run this to add them:
-- =============================================

-- Add average_rating if missing
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'properties' AND column_name = 'average_rating'
    ) THEN
        ALTER TABLE properties ADD COLUMN average_rating DECIMAL(2,1) DEFAULT 0;
        RAISE NOTICE 'Added average_rating column';
    ELSE
        RAISE NOTICE 'average_rating column already exists';
    END IF;
END $$;

-- Add review_count if missing
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'properties' AND column_name = 'review_count'
    ) THEN
        ALTER TABLE properties ADD COLUMN review_count INTEGER DEFAULT 0;
        RAISE NOTICE 'Added review_count column';
    ELSE
        RAISE NOTICE 'review_count column already exists';
    END IF;
END $$;

-- Set defaults for existing properties
UPDATE properties 
SET average_rating = 0 
WHERE average_rating IS NULL;

UPDATE properties 
SET review_count = 0 
WHERE review_count IS NULL;

-- =============================================
-- 3. Test inserting a property manually
-- =============================================

-- Try inserting a test property to see if there are any errors
-- (This will help identify the exact problem)

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
    'This is a test to verify all columns work',
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

-- If the above works, delete the test property:
-- DELETE FROM properties WHERE title = 'Test Property';

-- =============================================
-- 4. Check for any constraints that might fail
-- =============================================

SELECT
    con.conname AS constraint_name,
    con.contype AS constraint_type,
    col.column_name,
    con.convalidated
FROM pg_constraint con
JOIN information_schema.columns col 
    ON col.table_name = 'properties'
WHERE con.conrelid = 'properties'::regclass
ORDER BY con.conname;
