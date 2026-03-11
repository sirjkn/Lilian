-- ============================================
-- ADD SMTP EMAIL SETTINGS TO EXISTING DATABASE
-- ============================================
-- Run this SQL script if you already have a Skyway Suites database
-- and want to add the SMTP email configuration settings
--
-- This will insert the default SMTP settings for Skyway Suites
-- without affecting any existing data in your database
-- ============================================

INSERT INTO settings (category, key, value) VALUES
  ('notifications', 'smtp_host', 'mail.skywaysuites.co.ke'),
  ('notifications', 'smtp_port', '465'),
  ('notifications', 'smtp_username', 'info@skywaysuites.co.ke'),
  ('notifications', 'smtp_password', '^we;RW{8OMGUOazE'),
  ('notifications', 'smtp_secure', 'true'),
  ('notifications', 'email_from_address', 'info@skywaysuites.co.ke'),
  ('notifications', 'email_from_name', 'Skyway Suites'),
  ('notifications', 'email_provider', 'smtp')
ON CONFLICT (category, key) DO UPDATE SET
  value = EXCLUDED.value,
  updated_at = CURRENT_TIMESTAMP;

-- ============================================
-- VERIFICATION
-- ============================================
-- Run this query to verify the SMTP settings were added successfully:

SELECT category, key, value 
FROM settings 
WHERE category = 'notifications' 
ORDER BY key;

-- ============================================
-- SUCCESS!
-- ============================================
-- Your SMTP settings have been added to the database.
-- 
-- Default Configuration:
-- - SMTP Server: mail.skywaysuites.co.ke
-- - Port: 465 (SSL/TLS)
-- - Username: info@skywaysuites.co.ke
-- - Password: ^we;RW{8OMGUOazE
-- - From Email: info@skywaysuites.co.ke
-- - From Name: Skyway Suites
--
-- You can now:
-- 1. Go to Admin Panel → Settings → Notifications
-- 2. Modify these settings if needed
-- 3. Send a test email to verify your configuration
-- ============================================
