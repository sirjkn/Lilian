-- Reviews and Ratings Table
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,
  customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(booking_id) -- One review per booking
);

-- Index for faster queries
CREATE INDEX idx_reviews_property ON reviews(property_id);
CREATE INDEX idx_reviews_customer ON reviews(customer_id);
CREATE INDEX idx_reviews_created ON reviews(created_at DESC);

-- Add average rating and review count to properties table
ALTER TABLE properties 
ADD COLUMN IF NOT EXISTS average_rating DECIMAL(2,1) DEFAULT 0,
ADD COLUMN IF NOT EXISTS review_count INTEGER DEFAULT 0;

-- Function to update property rating
CREATE OR REPLACE FUNCTION update_property_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE properties
  SET 
    average_rating = (
      SELECT COALESCE(AVG(rating), 0)
      FROM reviews
      WHERE property_id = COALESCE(NEW.property_id, OLD.property_id)
    ),
    review_count = (
      SELECT COUNT(*)
      FROM reviews
      WHERE property_id = COALESCE(NEW.property_id, OLD.property_id)
    )
  WHERE id = COALESCE(NEW.property_id, OLD.property_id);
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update property rating when review is added/updated/deleted
DROP TRIGGER IF EXISTS trigger_update_property_rating ON reviews;
CREATE TRIGGER trigger_update_property_rating
AFTER INSERT OR UPDATE OR DELETE ON reviews
FOR EACH ROW
EXECUTE FUNCTION update_property_rating();

-- Insert default hero image setting
INSERT INTO settings (category, key, value)
VALUES ('hero', 'background_image', 'https://res.cloudinary.com/dc5d5zfos/image/upload/v1773134775/skyway-suites/yndkhqpgcxknpro3tjjd.webp')
ON CONFLICT (category, key) 
DO UPDATE SET value = 'https://res.cloudinary.com/dc5d5zfos/image/upload/v1773134775/skyway-suites/yndkhqpgcxknpro3tjjd.webp';
