# 📧 SMTP Email Configuration & Test Email Feature

## Overview
Your Skyway Suites application now includes a complete SMTP email system with test email functionality. This allows you to send automated notifications for bookings, payments, and account creation.

---

## 🎯 Features Implemented

### ✅ **Backend API**
- **Test Email Endpoint**: `/api?endpoint=test-email`
- **Professional HTML Email Template**: Beautifully designed with Skyway Suites branding
- **SMTP Integration**: Uses `nodemailer` package for reliable email delivery
- **Error Handling**: Comprehensive error messages for debugging

### ✅ **Frontend Admin Panel**
- **SMTP Configuration Form**: Complete settings management in Admin → Settings → Notifications
- **Test Email Input**: Send test emails to verify configuration
- **Real-time Validation**: Email format checking before sending
- **Loading States**: Visual feedback during email sending
- **Success/Error Notifications**: Toast messages for user feedback

### ✅ **Database Integration**
- **Persistent Settings**: All SMTP configuration saved to Neon database
- **Default Values**: Pre-configured with your company email settings
- **Auto-loading**: Settings automatically load when page opens

---

## 🔧 Default SMTP Configuration

The following settings are pre-configured in your database:

```
SMTP Server:    mail.skywaysuites.co.ke
Port:           465
Security:       SSL/TLS
Username:       info@skywaysuites.co.ke
Password:       ^we;RW{8OMGUOazE
From Email:     info@skywaysuites.co.ke
From Name:      Skyway Suites
Provider:       smtp
```

---

## 📦 Installation & Setup

### 1. Database Setup (Choose One Option)

#### **Option A: New Database Installation**
Run one of these complete setup scripts in your Neon SQL Editor:
- `/NEON_DATABASE_SCHEMA.sql` - Complete schema with SMTP settings
- `/QUICK_DATABASE_SETUP.sql` - Full setup with test data + SMTP settings

#### **Option B: Add to Existing Database**
If you already have a database, run:
- `/ADD_SMTP_SETTINGS.sql` - Adds only SMTP settings to existing database

### 2. Verify Installation
```sql
SELECT category, key, value 
FROM settings 
WHERE category = 'notifications' 
ORDER BY key;
```

You should see 8 rows with SMTP configuration.

---

## 🚀 How to Use

### **Sending a Test Email**

1. **Login to Admin Panel**
   - Go to `https://your-app.vercel.app/admin/login`
   - Login with your admin credentials

2. **Navigate to Settings**
   - Click **Settings** in the admin sidebar
   - Select the **Notifications** tab

3. **Configure SMTP (if needed)**
   - Scroll to **Email Integration** card
   - Select **SMTP** as provider
   - Modify settings if needed (optional - defaults are set)
   - Click **Save Email Settings**

4. **Send Test Email**
   - Scroll to the test email section
   - Enter your email address in the **Test Email** field
   - Click **Send Test Email** button
   - Wait for confirmation toast message

5. **Check Your Inbox**
   - Open your email client
   - Look for email from "Skyway Suites <info@skywaysuites.co.ke>"
   - Subject: "✓ SMTP Test Email - Skyway Suites"

---

## 📧 Test Email Content

The test email includes:

### **HTML Version**
- ✅ Professional header with Skyway Suites branding (#6B7C3C)
- ✅ Success confirmation message
- ✅ SMTP configuration details displayed
- ✅ List of automated notification capabilities
- ✅ Company footer with copyright
- ✅ Responsive design for all devices

### **Plain Text Version**
- ✅ Fallback for email clients that don't support HTML
- ✅ Same information in readable text format

---

## 🔑 API Endpoints

### **Test Email Endpoint**
```
POST /api?endpoint=test-email
Content-Type: application/json
Authorization: Bearer {token}

{
  "testEmail": "recipient@example.com",
  "smtpHost": "mail.skywaysuites.co.ke",
  "smtpPort": "465",
  "smtpUsername": "info@skywaysuites.co.ke",
  "smtpPassword": "^we;RW{8OMGUOazE",
  "smtpSecure": true,
  "emailFromAddress": "info@skywaysuites.co.ke",
  "emailFromName": "Skyway Suites"
}
```

### **Success Response**
```json
{
  "success": true,
  "message": "Test email sent successfully!"
}
```

### **Error Response**
```json
{
  "error": "Failed to send test email",
  "details": "Error message details"
}
```

---

## 🛠️ Troubleshooting

### **Email Not Received**

1. **Check Spam/Junk Folder**
   - Test emails may be filtered by email providers

2. **Verify SMTP Settings**
   - Ensure server address is correct: `mail.skywaysuites.co.ke`
   - Confirm port is 465 for SSL/TLS
   - Check username and password are accurate

3. **Test SMTP Server Connectivity**
   ```bash
   telnet mail.skywaysuites.co.ke 465
   ```

4. **Check Browser Console**
   - Open Developer Tools (F12)
   - Look for error messages in Console tab

5. **Check Network Tab**
   - Open Developer Tools → Network tab
   - Look for failed API requests
   - Check response for error details

### **Common Error Messages**

| Error | Cause | Solution |
|-------|-------|----------|
| "Test email address is required" | No email entered | Enter a valid email address |
| "Please enter a valid email address" | Invalid format | Use format: name@domain.com |
| "Failed to send test email" | SMTP connection issue | Check SMTP settings |
| "Authentication failed" | Wrong credentials | Verify username/password |
| "Connection timeout" | Server unreachable | Check SMTP server address |

---

## 🔐 Security Best Practices

### **Production Recommendations**

1. **Change Default Password**
   - Update the SMTP password after initial setup
   - Use a strong, unique password

2. **Use Environment Variables** (Optional)
   - For additional security, you can move credentials to environment variables
   - Update backend code to read from `process.env`

3. **Enable Two-Factor Authentication**
   - If your email provider supports it
   - Add an app-specific password for SMTP

4. **Monitor Email Logs**
   - Check your email server logs regularly
   - Watch for unauthorized access attempts

---

## 📊 Database Schema

### **Settings Table Structure**
```sql
CREATE TABLE settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category VARCHAR(100) NOT NULL,
  key VARCHAR(100) NOT NULL,
  value TEXT,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(category, key)
);
```

### **SMTP Settings Stored**
```sql
category: 'notifications'
keys:
  - smtp_host
  - smtp_port
  - smtp_username
  - smtp_password
  - smtp_secure
  - email_from_address
  - email_from_name
  - email_provider
```

---

## 🎨 Email Template Customization

The HTML email template can be customized in `/api/index.ts`:

```javascript
// Location: /api/index.ts, line ~180
await transporter.sendMail({
  from: `${emailFromName} <${emailFromAddress}>`,
  to: testEmail,
  subject: '✓ SMTP Test Email - Skyway Suites',
  html: `... your custom HTML here ...`,
  text: `... your custom text here ...`
});
```

### **Customization Options**
- Change colors by modifying inline CSS
- Update company branding in header
- Add your logo image
- Modify footer text
- Add additional information sections

---

## 📚 Future Automated Notifications

This SMTP system is ready to send automated emails for:

- ✅ **Account Creation**: Welcome new users
- ✅ **Booking Confirmations**: Notify customers of bookings
- ✅ **Payment Receipts**: Send payment confirmations
- ✅ **Booking Reminders**: Remind customers before check-in
- ✅ **Cancellation Notices**: Notify about cancellations
- ✅ **Review Requests**: Ask for reviews after checkout

---

## 📞 Support

If you encounter any issues:

1. Check the troubleshooting section above
2. Review browser console for error messages
3. Verify database settings are saved correctly
4. Test SMTP server connectivity
5. Check email server logs

---

## ✅ Verification Checklist

- [ ] Database has SMTP settings installed
- [ ] Admin panel shows SMTP configuration form
- [ ] Default values are loaded correctly
- [ ] Settings can be saved successfully
- [ ] Test email input accepts email addresses
- [ ] Test email button sends request
- [ ] Email is received in inbox
- [ ] HTML email displays correctly
- [ ] Toast notifications appear on success/error

---

## 🎉 Success!

Your SMTP email system is now fully configured and ready to use. You can send professional emails directly from your Skyway Suites application!

**Test your configuration now:**
1. Go to Admin → Settings → Notifications
2. Enter your email in the test field
3. Click "Send Test Email"
4. Check your inbox! 📬

---

**Last Updated**: March 11, 2026  
**Version**: 1.0.0  
**Author**: Skyway Suites Development Team
