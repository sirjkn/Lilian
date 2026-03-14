-- Create email_templates table for storing customizable email templates
CREATE TABLE IF NOT EXISTS email_templates (
  id TEXT PRIMARY KEY,
  subject TEXT NOT NULL,
  html_template TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add some helpful comments
COMMENT ON TABLE email_templates IS 'Stores customizable email templates for automated notifications';
COMMENT ON COLUMN email_templates.id IS 'Template identifier (e.g., booking_customer, payment_admin)';
COMMENT ON COLUMN email_templates.subject IS 'Email subject line with template variables';
COMMENT ON COLUMN email_templates.html_template IS 'HTML email template with template variables';

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_email_templates_id ON email_templates(id);
