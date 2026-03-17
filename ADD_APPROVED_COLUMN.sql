-- =============================================
-- ADD APPROVED COLUMN TO BOOKINGS TABLE
-- =============================================
-- Copy and paste this entire script into your Neon SQL Editor and run it

-- Add approved column to bookings table
ALTER TABLE bookings 
ADD COLUMN IF NOT EXISTS approved BOOLEAN DEFAULT false;

-- Set default values for existing bookings (mark as approved if status is confirmed)
UPDATE bookings 
SET approved = CASE 
    WHEN status = 'confirmed' THEN true 
    ELSE false 
END
WHERE approved IS NULL;

-- Verify the column was added
SELECT column_name, data_type, column_default
FROM information_schema.columns 
WHERE table_name = 'bookings'
AND column_name = 'approved'
ORDER BY column_name;

-- Success message
SELECT '✅ Approved column added successfully!' as status;
