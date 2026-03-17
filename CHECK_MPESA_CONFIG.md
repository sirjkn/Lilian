# 🔍 M-Pesa Configuration Checklist

## The Error: "M-Pesa service temporarily unavailable"

This error appears when:
1. ❌ M-Pesa credentials are NOT configured
2. ❌ M-Pesa credentials are INCORRECT
3. ❌ Network error connecting to M-Pesa API
4. ❌ M-Pesa sandbox is down

---

## ✅ Step 1: Check if M-Pesa is Configured

### Go to Admin Settings:
1. Open browser: http://localhost:3000/admin
2. Login as admin
3. Click **"Settings"** tab
4. Scroll down to **"Payment Settings (M-Pesa & PayPal)"** section

### Check These Fields:

#### Required Fields (ALL must be filled):
- ✅ **Consumer Key** - Should NOT be empty
- ✅ **Consumer Secret** - Should NOT be empty  
- ✅ **Business Shortcode** - Should NOT be empty
- ✅ **Passkey** - Should NOT be empty
- ✅ **Environment** - Should be "Sandbox (Testing)"

#### Optional Field:
- **Callback URL** - Can be empty for localhost testing

---

## 🔑 Get Sandbox Credentials (If Not Configured)

### Option 1: Use Safaricom Test Credentials

If you haven't registered for Daraja, use these **official sandbox test credentials**:

```
Consumer Key: 9v38Dtu5u2BpsITPmLcXNWGMsjZRWSTG
Consumer Secret: bclwIPbFqQFP8RZP
Business Shortcode: 174379
Passkey: bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919
Environment: Sandbox (Testing)
```

### Option 2: Register for Your Own Credentials

1. Go to https://developer.safaricom.co.ke
2. Create account / Login
3. Create a new app (Sandbox)
4. Copy your Consumer Key and Consumer Secret
5. For sandbox:
   - Shortcode: `174379` (default sandbox shortcode)
   - Passkey: `bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919`

---

## 🛠️ Configure M-Pesa in Admin

### Step-by-Step:

1. **Go to Admin Settings:**
   - URL: http://localhost:3000/admin
   - Click "Settings" tab

2. **Scroll to "Payment Settings"**

3. **Fill in M-Pesa credentials:**

   **Consumer Key:**
   ```
   9v38Dtu5u2BpsITPmLcXNWGMsjZRWSTG
   ```

   **Consumer Secret:**
   ```
   bclwIPbFqQFP8RZP
   ```

   **Business Shortcode:**
   ```
   174379
   ```

   **Passkey:**
   ```
   bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919
   ```

   **Environment:**
   ```
   Sandbox (Testing)
   ```

   **Callback URL:**
   ```
   (Leave empty or use: http://localhost:3000/api?endpoint=mpesa-callback)
   ```

4. **Click "Save Settings"**

5. **Wait for success message**

---

## 🧪 Test M-Pesa Configuration

### Option 1: Use Built-in Test Button

In Admin Settings → Payment Settings section:

1. Enter test phone: `254708374149`
2. Click **"Test M-Pesa"** button
3. Check for success message

### Option 2: Try Making a Payment

1. Go to "My Bookings"
2. Click "Pay Now"
3. Select M-Pesa
4. Enter phone: `254708374149`
5. Click "Send Payment Request"
6. Should see: "📱 M-Pesa payment request sent!"

---

## 🔍 Debug the Error

### Check Browser Console:

1. Open Developer Tools (F12)
2. Go to "Console" tab
3. Look for error messages
4. You should see:
   ```
   🔍 M-Pesa Payment Request: {bookingId, phoneNumber, amount}
   ```

5. If you see error, what does it say?

### Check Server Logs:

Look in your terminal where the app is running. You should see:

```
✅ Expected logs:
🔍 M-Pesa Payment Request: { bookingId: '...', phoneNumber: '254...', amount: 25000 }
🔍 Settings fetched: 6 rows
🔍 M-Pesa Settings loaded: ['mpesaConsumerKey', 'mpesaConsumerSecret', ...]
✅ M-Pesa credentials validated, environment: sandbox
🔍 Getting M-Pesa access token from: https://sandbox.safaricom.co.ke/...
✅ M-Pesa access token obtained
🔍 Initiating STK Push to: https://sandbox.safaricom.co.ke/...
✅ M-Pesa STK Response: { ResponseCode: '0', ... }
```

```
❌ If credentials missing:
🔍 Settings fetched: 0 rows
❌ M-Pesa credentials missing: { hasKey: false, ... }
```

```
❌ If credentials wrong:
❌ Failed to get M-Pesa token: { errorCode: '...', errorMessage: '...' }
```

---

## 🚨 Common Issues

### Issue 1: Settings Not Saving
**Symptoms:** Click "Save Settings" but nothing happens
**Solution:** 
- Check browser console for errors
- Make sure you're logged in as admin
- Try refreshing the page

### Issue 2: "M-Pesa credentials missing"
**Symptoms:** Error says credentials are missing
**Solution:**
- Fill in ALL required fields (Consumer Key, Secret, Shortcode, Passkey)
- Click "Save Settings"
- Wait for confirmation toast

### Issue 3: "Invalid M-Pesa credentials"
**Symptoms:** Error says credentials are invalid
**Solution:**
- Double-check you copied credentials correctly
- Make sure there are no extra spaces
- Try using the test credentials above

### Issue 4: Token fetch fails
**Symptoms:** "Failed to get M-Pesa token"
**Solution:**
- Check your internet connection
- Verify Consumer Key and Consumer Secret are correct
- Try refreshing credentials in Daraja portal

### Issue 5: STK Push fails
**Symptoms:** "Failed to initiate M-Pesa payment"
**Solution:**
- Check phone number format (254XXXXXXXXX)
- Verify Business Shortcode is correct
- Check Passkey is correct

---

## 📞 Quick Fix: Use These Test Credentials

**Copy and paste these into Admin Settings:**

| Field | Value |
|-------|-------|
| Consumer Key | `9v38Dtu5u2BpsITPmLcXNWGMsjZRWSTG` |
| Consumer Secret | `bclwIPbFqQFP8RZP` |
| Business Shortcode | `174379` |
| Passkey | `bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919` |
| Environment | Sandbox (Testing) |
| Callback URL | (Leave empty) |

**Test Phone Number:** `254708374149`

---

## ✅ After Configuration

1. Save settings
2. Refresh the page
3. Try making a payment again
4. You should see STK Push on phone simulator
5. Enter PIN: `1234`
6. Click "Check Payment Status"
7. ✅ Payment confirmed!

---

## 🔄 Next Steps

### If Still Not Working:

1. **Share the error details:**
   - Browser console error
   - Server terminal logs
   - Screenshot of Admin Settings

2. **Verify database:**
   - Check if settings are saved in database
   - Check mpesa_transactions table exists

3. **Check network:**
   - Can you access https://sandbox.safaricom.co.ke?
   - Any firewall blocking requests?

---

**Try configuring the credentials above and test again! 🚀**
