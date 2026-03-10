-- Ensure properties table has all required columns
-- This migration can be run safely multiple times (idempotent)

-- Add average_rating column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'properties' AND column_name = 'average_rating'
    ) THEN
        ALTER TABLE properties ADD COLUMN average_rating DECIMAL(2,1) DEFAULT 0;
    END IF;
END $$;

-- Add review_count column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'properties' AND column_name = 'review_count'
    ) THEN
        ALTER TABLE properties ADD COLUMN review_count INTEGER DEFAULT 0;
    END IF;
END $$;

-- Ensure all properties have default values for rating columns
UPDATE properties 
SET average_rating = 0 
WHERE average_rating IS NULL;

UPDATE properties 
SET review_count = 0 
WHERE review_count IS NULL;
