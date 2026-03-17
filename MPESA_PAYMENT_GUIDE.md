# 🔄 M-Pesa Payment Validation Guide

## 🚨 The Problem

After a successful M-Pesa payment, the website doesn't automatically update because **M-Pesa callbacks don't work on localhost**.

### Why Callbacks Fail on Localhost:

1. **M-Pesa requires a PUBLIC HTTPS URL** to send payment confirmations
2. `localhost` or `127.0.0.1` is NOT accessible from Safaricom's servers
3. The callback URL must be reachable from the internet

---

## ✅ Solution #1: Manual Payment Status Check (RECOMMENDED for Testing)

We've added a **"Check Payment Status"** button that manually queries M-Pesa to verify if payment was completed.

### How It Works:

1. Customer initiates M-Pesa payment
2. STK Push is sent to their phone
3. Customer enters PIN and completes payment
4. Customer clicks **"Check Payment Status"** button
5. System queries M-Pesa API to confirm payment
6. Payment record is created if successful

### Customer Flow:

```
1. Go to "My Bookings" → Click "Pay Now"
2. Select "M-Pesa"
3. Enter phone number → Click "Pay with M-Pesa"
4. Check phone for M-Pesa prompt
5. Enter M-Pesa PIN
6. Click "Check Payment Status" button
7. ✅ Payment confirmed!
```

---

## ✅ Solution #2: Deploy to Production (RECOMMENDED for Live Use)

For automatic payment validation, deploy your app to a public hosting service.

### Steps:

#### 1. **Deploy to Vercel**
```bash
# Push your code to GitHub
git init
git add .
git commit -m "Initial commit"
git push origin main

# Deploy to Vercel
vercel --prod
```

#### 2. **Update M-Pesa Callback URL**

After deployment, update your callback URL in Admin Settings:

**Before (Localhost):**
```
http://localhost:3000/api?endpoint=mpesa-callback  ❌ Won't work
```

**After (Production):**
```
https://skyway-suites.vercel.app/api?endpoint=mpesa-callback  ✅ Works!
```

#### 3. **Configure in Daraja Portal**

Go to [Safaricom Daraja Portal](https://developer.safaricom.co.ke/):
1. Log in to your account
2. Go to your app settings
3. Update Callback URL to your Vercel URL
4. Save changes

---

## ✅ Solution #3: Use ngrok for Local Testing (Advanced)

If you need to test callbacks locally:

### Install ngrok:
```bash
npm install -g ngrok
```

### Start ngrok tunnel:
```bash
# Start your app on port 3000
npm start

# In another terminal, start ngrok
ngrok http 3000
```

### Update Callback URL:
```
https://abc123.ngrok.io/api?endpoint=mpesa-callback
```

**Note:** ngrok URLs change every time you restart, so you'll need to update the callback URL each time.

---

## 📊 How Payment Validation Works

### Current Implementation:

#### **M-Pesa Payment Flow:**
```
1. Customer clicks "Pay with M-Pesa"
   ↓
2. Backend initiates STK Push
   ↓
3. M-Pesa sends prompt to customer's phone
   ↓
4. Customer enters PIN
   ↓
5. M-Pesa processes payment
   ↓
6. TWO OPTIONS:
   
   Option A: Automatic (Production Only)
   ├─ M-Pesa sends callback to public URL
   ├─ Backend receives callback
   ├─ Payment record created automatically
   └─ ✅ Booking updated
   
   Option B: Manual (Works Everywhere)
   ├─ Customer clicks "Check Payment Status"
   ├─ Backend queries M-Pesa API
   ├─ Payment status retrieved
   ├─ Payment record created if successful
   └─ ✅ Booking updated
```

---

## 🧪 Testing Payment Validation

### Test the Manual Status Check:

1. **Start the app:**
   ```bash
   npm start
   ```

2. **Create a booking:**
   - Go to "All Properties"
   - Select a property
   - Create a booking (must be logged in)

3. **Make a payment:**
   - Go to "My Bookings"
   - Click "Pay Now" on your booking
   - Select "M-Pesa"
   - Enter test phone: `254708374149`
   - Click "Pay with M-Pesa"

4. **Check your phone:**
   - In sandbox mode, you'll see a simulated STK push
   - Enter PIN: `1234` (sandbox default)

5. **Verify payment:**
   - Click "Check Payment Status" button
   - System queries M-Pesa
   - If successful, payment is recorded
   - Booking status updates

---

## 🔧 Technical Details

### API Endpoints:

#### 1. **Initiate Payment**
```typescript
POST /api?endpoint=mpesa-payment
Body: {
  bookingId: string,
  phoneNumber: string,
  amount: number
}
Response: {
  success: boolean,
  checkoutRequestId: string
}
```

#### 2. **Check Payment Status**
```typescript
POST /api?endpoint=mpesa-query-status
Body: {
  checkoutRequestId: string
}
Response: {
  success: boolean,
  status: 'completed' | 'pending' | 'cancelled' | 'failed',
  message: string
}
```

#### 3. **M-Pesa Callback (Production)**
```typescript
POST /api?endpoint=mpesa-callback
Body: {
  Body: {
    stkCallback: {
      CheckoutRequestID: string,
      ResultCode: number,
      CallbackMetadata: {...}
    }
  }
}
```

---

## 📝 Database Schema

### mpesa_transactions table:
```sql
CREATE TABLE mpesa_transactions (
  id UUID PRIMARY KEY,
  checkout_request_id TEXT UNIQUE,
  booking_id UUID REFERENCES bookings(id),
  phone_number TEXT,
  amount DECIMAL,
  status TEXT, -- 'pending', 'completed', 'failed', 'cancelled'
  mpesa_receipt_number TEXT,
  created_at TIMESTAMP
);
```

### payments table:
```sql
CREATE TABLE payments (
  id UUID PRIMARY KEY,
  booking_id UUID REFERENCES bookings(id),
  customer_id UUID REFERENCES users(id),
  amount DECIMAL,
  payment_method TEXT, -- 'MPesa', 'PayPal', etc.
  status TEXT, -- 'paid', 'pending', 'failed'
  transaction_id TEXT,
  created_at TIMESTAMP
);
```

---

## 🎯 Best Practices

### For Development:
- ✅ Use "Check Payment Status" button
- ✅ Keep callback URL empty or use placeholder
- ✅ Test with sandbox credentials

### For Production:
- ✅ Deploy to Vercel/Netlify/etc.
- ✅ Configure proper callback URL
- ✅ Use live M-Pesa credentials
- ✅ Monitor callback logs
- ✅ Keep manual status check as backup

---

## 🆘 Troubleshooting

### Payment doesn't show up after clicking "Check Payment Status"

**Possible causes:**
1. Payment is still pending (customer hasn't entered PIN)
2. Customer cancelled the payment
3. Request timed out (60 seconds)
4. Insufficient funds

**Solution:**
- Check the response message
- Verify customer completed payment on their phone
- Check browser console for error details

### Callback not working in production

**Check:**
1. Callback URL is correct in Admin Settings
2. URL is publicly accessible (not localhost)
3. URL uses HTTPS (not HTTP)
4. Daraja portal has correct callback URL
5. API endpoint returns correct response

---

## 📞 Support

For M-Pesa integration issues:
- **Safaricom Support:** https://developer.safaricom.co.ke/support
- **Daraja API Docs:** https://developer.safaricom.co.ke/docs

---

## 🎉 Summary

**For Testing (Localhost):**
→ Use "Check Payment Status" button ✅

**For Production (Live):**
→ Deploy to Vercel and configure callback URL ✅

Both methods work perfectly! Choose based on your current needs.
