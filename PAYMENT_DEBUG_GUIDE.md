# 🐛 M-Pesa Payment Validation Debug Guide

## Your Situation:
- ✅ You enter your real phone number
- ✅ STK Push prompt arrives on your phone
- ✅ You enter PIN and pay successfully
- ✅ You receive M-Pesa transaction SMS
- ❌ **BUT system doesn't validate the payment**

---

## 🔍 Step 1: Check What's Happening

### When You Click "Check Payment Status":

1. **Open Browser Console (F12)**
2. **Go to Console tab**
3. **Click "Check Payment Status" button**
4. **Look for these logs:**

```
Expected Logs:
🔍 Querying M-Pesa transaction status: ws_CO_xxxxx
✅ M-Pesa Query Response: { ... }
🔍 ResultCode: "0" Type: string
🔍 ResponseCode: undefined Type: undefined
✅ Payment record created from query
```

### What to Check:

#### A) Is the query happening?
- Look for: `🔍 Querying M-Pesa transaction status`
- If NO → Frontend issue
- If YES → Continue

#### B) What's the ResultCode?
- Look for: `🔍 ResultCode: "???" Type: ???`
- Expected for SUCCESS: `ResultCode: "0"` or `ResultCode: 0`
- If it's something else, copy it and share it

#### C) What's the full response?
- Look for: `✅ M-Pesa Query Response: {...}`
- Copy the entire object

---

## 🚨 Common Issues & Fixes

### Issue 1: "Request pending" (ResultCode: 1)
**Meaning:** M-Pesa hasn't processed it yet
**Solution:** Wait 5-10 seconds, click "Check Payment Status" again

### Issue 2: ResultCode is NOT "0" even though you paid
**Possible causes:**
1. M-Pesa API delay (wait and retry)
2. Wrong CheckoutRequestID stored
3. Credentials mismatch (sandbox vs live)

**Debug:**
```javascript
// In browser console, check:
console.log('Checking payment for:', checkoutRequestId);
```

### Issue 3: ResultCode is "0" but payment not created
**Meaning:** Payment validation worked but database insert failed
**Look for:**
- `✅ Payment record created from query` ← Should see this
- If missing, check server logs for database errors

### Issue 4: "Failed to query payment status"
**Meaning:** API call to M-Pesa failed
**Possible causes:**
1. No internet connection
2. M-Pesa API down
3. Wrong credentials
4. Credentials mismatch (using live phone with sandbox credentials)

---

## 🔧 Step 2: Check Your M-Pesa Configuration

### Are You Using LIVE or SANDBOX?

**If using YOUR REAL PHONE NUMBER:**
- You MUST use **LIVE/PRODUCTION** M-Pesa credentials
- Sandbox credentials WON'T work with real phone numbers

**If using SANDBOX TEST NUMBER (254708374149):**
- You MUST use **SANDBOX** credentials
- Live credentials WON'T work with test numbers

### How to Check Your Setup:

1. Go to: http://localhost:3000/admin
2. Settings tab
3. Look at **"Environment"** dropdown
4. Check what's selected:
   - **"Sandbox (Testing)"** → Only works with test numbers
   - **"Live (Production)"** → Only works with real numbers

---

## ✅ Fix: Switch to Correct Environment

### Option A: Testing with Sandbox

**Use these settings:**
- **Consumer Key:** `9v38Dtu5u2BpsITPmLcXNWGMsjZRWSTG`
- **Consumer Secret:** `bclwIPbFqQFP8RZP`
- **Business Shortcode:** `174379`
- **Passkey:** `bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919`
- **Environment:** `Sandbox (Testing)`

**Test Phone:** `254708374149`

**Note:** With sandbox, you won't see prompt on real phone. Use M-Pesa sandbox app or simulator.

---

### Option B: Production with Your Real Credentials

**If you have LIVE M-Pesa credentials from Safaricom:**

1. Go to: https://developer.safaricom.co.ke
2. Create a **PRODUCTION** app (not sandbox)
3. Get your **Live** credentials
4. In Admin Settings, enter:
   - **Consumer Key:** Your live consumer key
   - **Consumer Secret:** Your live consumer secret
   - **Business Shortcode:** Your live shortcode (usually your Till Number or Paybill)
   - **Passkey:** Your live passkey
   - **Environment:** `Live (Production)`

5. Test with YOUR real phone number
6. You'll get real STK Push
7. Pay with real money (will be credited to your M-Pesa account)

---

## 🧪 Step 3: Test Again with Correct Setup

### If Using Sandbox:
1. Configure sandbox credentials (Option A above)
2. Save settings
3. Use phone: `254708374149`
4. STK won't appear on phone (sandbox limitation)
5. But in sandbox dashboard, you can simulate payment
6. Click "Check Payment Status"

### If Using Live/Production:
1. Configure live credentials (Option B above)
2. Save settings
3. Use your REAL phone number
4. You'll get REAL STK Push
5. Enter REAL M-Pesa PIN
6. Payment will be REAL (money debited)
7. Click "Check Payment Status"
8. Should see: ✅ "Payment confirmed!"

---

## 🔍 Step 4: Check Server Logs

### In your terminal where app is running, look for:

**After clicking "Check Payment Status":**
```
🔍 Querying M-Pesa transaction status: ws_CO_17032025xxxxx
✅ M-Pesa Query Response: {
  ResponseCode: '0',
  ResponseDescription: 'The service request has been accepted successfully',
  MerchantRequestID: 'xxxxx',
  CheckoutRequestID: 'ws_CO_xxxxx',
  ResultCode: '0',
  ResultDesc: 'The service request is processed successfully.'
}
🔍 ResultCode: 0 Type: number
✅ Payment record created from query
```

**If you see different ResultCode:**
```
🔍 ResultCode: 1 Type: number  ← Payment still pending
🔍 ResultCode: 1032 Type: number  ← User cancelled
🔍 ResultCode: 1037 Type: number  ← Request timeout
```

---

## 📋 Debugging Checklist

- [ ] Browser console open (F12)
- [ ] Network tab open (to see API requests)
- [ ] Terminal/server logs visible
- [ ] Know which environment I'm using (Sandbox or Live)
- [ ] Using correct phone number for environment
- [ ] Clicked "Check Payment Status" after paying
- [ ] Waited at least 5 seconds after payment
- [ ] Checked server logs for errors

---

## 🚀 Quick Test Script

### Test in Browser Console:

```javascript
// Check if checkoutRequestId exists
console.log('Stored checkout ID:', checkoutRequestId);

// Manually query status
fetch('/api?endpoint=mpesa-query-status', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ 
    checkoutRequestId: 'ws_CO_17032025xxxxx' // Replace with your actual ID
  })
})
.then(r => r.json())
.then(data => {
  console.log('Manual Query Result:', data);
});
```

---

## 📊 What Each ResultCode Means

| Code | Meaning | Action |
|------|---------|--------|
| 0 | Success | ✅ Payment completed |
| 1 | Insufficient funds | ❌ Failed |
| 17 | Invalid phone | ❌ Failed |
| 26 | System error | ⚠️ Retry |
| 1032 | Cancelled by user | ❌ User cancelled |
| 1037 | Timeout | ⏱️ User didn't enter PIN in time |
| 2001 | Wrong PIN | ❌ Failed |
| 1 (pending) | Still processing | ⏳ Wait and check again |

---

## 🎯 Expected vs Actual

### Expected Flow:
1. Click "Pay Now" ✅
2. Select M-Pesa ✅
3. Enter phone ✅
4. STK Push sent ✅
5. Enter PIN on phone ✅
6. Payment completed ✅
7. Click "Check Payment Status" ✅
8. **ResultCode = 0** ✅
9. **Payment record created** ✅
10. **Booking status = confirmed** ✅
11. Dialog closes ✅

### Your Current Flow:
1. Click "Pay Now" ✅
2. Select M-Pesa ✅
3. Enter phone ✅
4. STK Push sent ✅
5. Enter PIN on phone ✅
6. Payment completed ✅
7. Click "Check Payment Status" ✅
8. **ResultCode = ???** ❓ ← **CHECK THIS**
9. **Payment record created?** ❓ ← **CHECK THIS**
10. **Booking status?** ❌ ← **NOT UPDATING**
11. Dialog stays open ❌

---

## 🔧 Next Steps

### Please Do This and Report Back:

1. **Make a test payment with your phone**
2. **After paying, DON'T close the dialog**
3. **Open browser console (F12)**
4. **Click "Check Payment Status"**
5. **Copy and share:**
   - The logs from browser console
   - The logs from server terminal
   - What ResultCode you see
   - What error message appears (if any)

### Share This Info:
```
Browser Console:
[Paste logs here]

Server Terminal:
[Paste logs here]

ResultCode: [What code did you get?]

Environment: [Sandbox or Live?]

Phone used: [Your number or test number?]

Payment SMS received: [Yes/No]
```

---

**Do the test above and share the logs so I can see exactly what's happening! 🚀**
