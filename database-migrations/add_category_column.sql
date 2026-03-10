-- ============================================
-- MIGRATION: Add Category Column to Properties
-- ============================================
-- Run this script if you already have an existing database
-- and just want to add the category field to properties

-- Add category column to properties table
ALTER TABLE properties ADD COLUMN IF NOT EXISTS category VARCHAR(50);

-- Optionally update existing properties with a default category
-- You can customize these based on your existing data
UPDATE properties SET category = 'Studio' WHERE bedrooms = 0 AND category IS NULL;
UPDATE properties SET category = '1 Bedroom' WHERE bedrooms = 1 AND category IS NULL;
UPDATE properties SET category = '2 Bedroom' WHERE bedrooms = 2 AND category IS NULL;
UPDATE properties SET category = '3 Bedroom' WHERE bedrooms = 3 AND category IS NULL;
UPDATE properties SET category = 'Villa' WHERE bedrooms >= 4 AND category IS NULL;

-- Verify the migration
SELECT id, title, bedrooms, category FROM properties LIMIT 10;

-- ============================================
-- SUCCESS!
-- ============================================
-- The category column has been added to your properties table.
-- You can now use the Category dropdown when adding/editing properties.
-- ============================================
