# 📧 Email System Testing Guide

## Step 1: Check Email Diagnostics

1. **Go to Admin Panel** → **Email Diagnostics** (new menu item)
2. **Check the diagnostics page** - it will show you:
   - ✅ SMTP Configuration Status
   - ✅ Customer Database Status
   - ✅ System Readiness

## Step 2: Fix Any Issues

### If "SMTP Not Configured" shows:
1. Go to **Admin** → **Settings** → **Notifications** tab
2. Click the green **"Initialize Raptor Mail Server"** button
3. Wait for success message
4. Go back to **Email Diagnostics** and refresh

### If "No customers with email" shows:
1. Create a test customer account:
   - Go to the main website
   - Click **"Create Account"**
   - Fill in: Name, Email, Phone, Password
   - Click **Create Account**
2. You should receive a **Welcome Email** immediately!

## Step 3: Test Each Email Type

### Test 1: Account Creation Email ✅
**How to trigger:**
1. Go to main website
2. Click **"Create Account"**
3. Fill in all details with a valid email
4. Click **Create Account**
5. **Expected Result:** Welcome email sent to the new user

**Email Subject:** "🎉 Welcome to Skyway Suites!"

---

### Test 2: Booking Creation Email ✅
**How to trigger:**
1. **Admin Panel** → **Bookings** → **Add Booking**
2. Fill in:
   - Select a Property
   - Select a Customer (one with a valid email)
   - Check-in date
   - Check-out date
   - Number of guests
   - Total price
3. Click **Create Booking**
4. **Expected Result:** 
   - Customer receives: "🎉 New Booking Created"
   - Admin receives: "🔔 New Booking Alert"

---

### Test 3: Payment Confirmation Email ✅
**How to trigger:**
1. First create a booking (see Test 2)
2. **Admin Panel** → **Payments** → **Add Payment**
3. Fill in:
   - Select the booking you just created
   - Customer: (auto-filled from booking)
   - Amount: Enter the FULL booking price (e.g., if booking is 5000, enter 5000)
   - Payment Method: e.g., "M-Pesa"
   - Status: **"paid"** (important!)
4. Click **Create Payment**
5. **Expected Result:**
   - Booking status automatically changes to "confirmed"
   - Customer receives: "✅ Payment Confirmed"
   - Admin receives: "💰 Payment Received"

---

## Troubleshooting

### Emails Not Sending?

1. **Check Email Diagnostics first** - it will tell you exactly what's wrong

2. **Check Browser Console (F12)**:
   - Look for any error messages
   - Check the Network tab for API responses

3. **Common Issues**:

   **Issue:** "SMTP not configured"
   **Fix:** Go to Settings → Notifications → Click "Initialize Raptor Mail Server"

   **Issue:** "No customers with email"
   **Fix:** Create a test customer account with a real email

   **Issue:** "Customer email missing"
   **Fix:** Make sure you selected a customer with a valid email when creating booking

   **Issue:** Email sent but not received
   **Fix:** 
   - Check spam/junk folder
   - Verify the email address is correct
   - Try a different email address

4. **Check Vercel Logs**:
   - Go to Vercel dashboard
   - Check the function logs for any errors
   - Look for console.log messages starting with 📧 or ✅

---

## Expected Email Flow

### New Account Created:
```
User fills form → Account created → Welcome email sent
```

### New Booking Created:
```
Admin creates booking → 
  → Customer receives "Booking Created" email
  → Admin receives "New Booking Alert" email
```

### Payment Received:
```
Admin creates payment (status: paid) →
  → System checks if fully paid →
  → If yes: Booking status → "confirmed" →
  → Customer receives "Payment Confirmed" email →
  → Admin receives "Payment Received" email
```

---

## Quick Test Checklist

- [ ] SMTP settings initialized
- [ ] Test email works (Settings → Notifications → Send Test Email)
- [ ] Customer with valid email exists
- [ ] Account creation email works
- [ ] Booking creation email works (customer + admin)
- [ ] Payment confirmation email works (customer + admin)

---

## Email Preview

All emails include:
- Professional Skyway Suites branding
- Olive Green (#6B7C3C) color scheme
- Responsive HTML design
- Clear action items
- Company footer

**From:** Skyway Suites <info@skywaysuites.co.ke>
**SMTP Server:** raptor.vivawebhost.com:587
