-- ============================================
-- Skyway Suites Database Migration Script
-- ============================================
-- This script creates/updates tables for settings and property calendar management
-- Run this script in your Neon database console

-- 1. Create settings table for general, users, roles, and notifications
CREATE TABLE IF NOT EXISTS settings (
  id SERIAL PRIMARY KEY,
  category VARCHAR(50) NOT NULL,
  key VARCHAR(100) NOT NULL,
  value TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(category, key)
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_settings_category ON settings(category);

-- 2. Update properties table to add calendar URLs
ALTER TABLE properties 
ADD COLUMN IF NOT EXISTS ical_export_url TEXT,
ADD COLUMN IF NOT EXISTS airbnb_import_url TEXT,
ADD COLUMN IF NOT EXISTS booking_import_url TEXT,
ADD COLUMN IF NOT EXISTS vrbo_import_url TEXT,
ADD COLUMN IF NOT EXISTS calendar_sync_enabled BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS last_calendar_sync TIMESTAMP;

-- 3. Insert default settings for General Settings
INSERT INTO settings (category, key, value) VALUES
  ('general', 'site_name', 'Skyway Suites'),
  ('general', 'site_email', 'info@skywaysuites.com'),
  ('general', 'site_phone', '+254 700 000 000'),
  ('general', 'site_address', 'Nairobi, Kenya'),
  ('general', 'currency', 'KES'),
  ('general', 'timezone', 'Africa/Nairobi'),
  ('general', 'date_format', 'DD/MM/YYYY'),
  ('general', 'language', 'en')
ON CONFLICT (category, key) DO NOTHING;

-- 4. Insert default settings for User Settings
INSERT INTO settings (category, key, value) VALUES
  ('users', 'allow_registration', 'true'),
  ('users', 'require_email_verification', 'true'),
  ('users', 'password_min_length', '8'),
  ('users', 'session_timeout', '30'),
  ('users', 'max_login_attempts', '5'),
  ('users', 'lockout_duration', '30')
ON CONFLICT (category, key) DO NOTHING;

-- 5. Insert default settings for Roles & Permissions
INSERT INTO settings (category, key, value) VALUES
  ('roles', 'default_role', 'customer'),
  ('roles', 'admin_role', 'admin'),
  ('roles', 'manager_role', 'manager'),
  ('roles', 'customer_role', 'customer'),
  ('roles', 'enable_custom_roles', 'false')
ON CONFLICT (category, key) DO NOTHING;

-- 6. Insert default settings for Email Notifications
INSERT INTO settings (category, key, value) VALUES
  ('notifications_email', 'provider', 'smtp'),
  ('notifications_email', 'smtp_host', ''),
  ('notifications_email', 'smtp_port', '587'),
  ('notifications_email', 'smtp_username', ''),
  ('notifications_email', 'smtp_password', ''),
  ('notifications_email', 'smtp_encryption', 'tls'),
  ('notifications_email', 'sendgrid_api_key', ''),
  ('notifications_email', 'mailgun_api_key', ''),
  ('notifications_email', 'mailgun_domain', ''),
  ('notifications_email', 'from_email', 'noreply@skywaysuites.com'),
  ('notifications_email', 'from_name', 'Skyway Suites'),
  ('notifications_email', 'booking_confirmation', 'true'),
  ('notifications_email', 'booking_reminder', 'true'),
  ('notifications_email', 'payment_received', 'true'),
  ('notifications_email', 'booking_cancelled', 'true')
ON CONFLICT (category, key) DO NOTHING;

-- 7. Insert default settings for WhatsApp Notifications
INSERT INTO settings (category, key, value) VALUES
  ('notifications_whatsapp', 'provider', 'twilio'),
  ('notifications_whatsapp', 'twilio_account_sid', ''),
  ('notifications_whatsapp', 'twilio_auth_token', ''),
  ('notifications_whatsapp', 'twilio_phone_number', ''),
  ('notifications_whatsapp', 'wesendr_api_key', ''),
  ('notifications_whatsapp', 'wesendr_sender_number', ''),
  ('notifications_whatsapp', 'custom_api_endpoint', ''),
  ('notifications_whatsapp', 'custom_api_key', ''),
  ('notifications_whatsapp', 'booking_confirmation', 'true'),
  ('notifications_whatsapp', 'booking_reminder', 'true'),
  ('notifications_whatsapp', 'payment_received', 'false'),
  ('notifications_whatsapp', 'booking_cancelled', 'true')
ON CONFLICT (category, key) DO NOTHING;

-- 8. Insert default settings for Hero Background
INSERT INTO settings (category, key, value) VALUES
  ('hero', 'background_image', 'https://images.unsplash.com/photo-1741991109886-90e70988f27b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxOYWlyb2JpJTIwS2VueWElMjBjaXR5c2NhcGUlMjBza3lsaW5lfGVufDF8fHx8MTc3MzAzNTM5OXww&ixlib=rb-4.1.0&q=80&w=1080')
ON CONFLICT (category, key) DO NOTHING;

-- 9. Create trigger to auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_settings_updated_at BEFORE UPDATE ON settings
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 10. Create a view for easier settings retrieval
CREATE OR REPLACE VIEW settings_view AS
SELECT 
  category,
  json_object_agg(key, value) as settings
FROM settings
GROUP BY category;

-- ============================================
-- VERIFICATION QUERIES
-- ============================================
-- Run these to verify the migration was successful:

-- Check settings table structure
-- SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'settings';

-- Check properties table updates
-- SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'properties' AND column_name LIKE '%calendar%' OR column_name LIKE '%ical%';

-- View all settings by category
-- SELECT * FROM settings_view;

-- Count settings by category
-- SELECT category, COUNT(*) as setting_count FROM settings GROUP BY category;
