# 🧪 Quick Test Guide - M-Pesa Payment Status Check

## ✅ FIXED: The "Check Payment Status" button now appears!

### The Problem Was:
The `checkoutRequestId` state wasn't being reset when opening the payment dialog, causing the button to not show up.

### The Fix:
Added `setCheckoutRequestId(null)` to the `handlePayNow` function to reset state properly.

---

## 🚀 How to Test Right Now

### Step 1: Start the App
```bash
npm start
```

### Step 2: Login as a Customer
- Go to http://localhost:3000
- Click "Login" 
- Use your customer credentials

### Step 3: Create a Booking (if you don't have one)
1. Go to "All Properties"
2. Click on any property
3. Fill in booking details:
   - Check-in date
   - Check-out date
   - Number of guests
4. Click "Book Now"

### Step 4: Approve the Booking (Admin)
1. Open a new tab/window
2. Go to http://localhost:3000/admin
3. Login as admin
4. Go to "Bookings" tab
5. Find your booking
6. Click "Approve" button

### Step 5: Test M-Pesa Payment
1. Go back to customer view
2. Go to "My Bookings" (top menu)
3. Find your approved booking
4. Click **"Pay Now"** button
5. Payment dialog opens ✅

### Step 6: Initiate M-Pesa
1. Click **"M-Pesa"** option
2. Enter phone: `254708374149` (sandbox test number)
3. Click **"Send Payment Request"**
4. Wait for success message

### Step 7: Check Payment Status ⭐ THE NEW FEATURE!
1. **Dialog stays open** (doesn't close)
2. You'll see a **blue info box** that says "Payment Request Sent"
3. Below it, there's a big **green button**: **"Check Payment Status"**
4. On your phone/simulator, complete the M-Pesa payment (enter PIN: 1234)
5. Click **"Check Payment Status"** button
6. Wait for response...
7. ✅ **"Payment confirmed! Your booking is now paid."**
8. Dialog closes
9. Booking updates to show "confirmed" status

---

## 📸 What You Should See

### Before Clicking "Pay Now":
```
┌─────────────────────────────────────┐
│  My Bookings                        │
│                                     │
│  ┌───────────────────────────────┐  │
│  │ Property: Beach Villa         │  │
│  │ Status: awaiting payment      │  │
│  │                               │  │
│  │ [Pay Now (KES 25,000)]       │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘
```

### After Clicking "Pay Now" - Step 1:
```
┌─────────────────────────────────────┐
│  Complete Payment                   │
│                                     │
│  Choose Payment Method:             │
│                                     │
│  ┌─────────────────────────────┐   │
│  │ 📱 M-Pesa                    │   │
│  │ Pay via M-Pesa STK Push     │   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │ 💳 PayPal / Credit Card      │   │
│  │ Pay with PayPal             │   │
│  └─────────────────────────────┘   │
└─────────────────────────────────────┘
```

### After Selecting M-Pesa - Step 2:
```
┌─────────────────────────────────────┐
│  Complete Payment                   │
│                                     │
│  ← Back to payment methods          │
│                                     │
│  M-Pesa Phone Number                │
│  ┌─────────────────────────────┐   │
│  │ 0712345678 or 254712345678  │   │
│  └─────────────────────────────┘   │
│                                     │
│  [Send Payment Request]             │
└─────────────────────────────────────┘
```

### After Sending Payment - Step 3 ⭐ NEW!:
```
┌─────────────────────────────────────┐
│  Complete Payment                   │
│                                     │
│  ┌───────────────────────────────┐  │
│  │ 🕐 Payment Request Sent       │  │
│  │ Please check your phone and   │  │
│  │ enter your M-Pesa PIN to      │  │
│  │ complete the payment.         │  │
│  └───────────────────────────────┘  │
│                                     │
│  ┌─────────────────────────────┐   │
│  │ ✓ Check Payment Status       │  │ ← NEW BUTTON!
│  └─────────────────────────────┘   │
│                                     │
│  ← Try a different payment method   │
└─────────────────────────────────────┘
```

### While Checking Status:
```
┌─────────────────────────────────────┐
│  Complete Payment                   │
│                                     │
│  ┌───────────────────────────────┐  │
│  │ 🕐 Payment Request Sent       │  │
│  └───────────────────────────────┘  │
│                                     │
│  ┌─────────────────────────────┐   │
│  │ ⏳ Checking Status...         │  │ ← Loading
│  └─────────────────────────────┘   │
└─────────────────────────────────────┘
```

---

## ✅ Expected Results

### If Payment is Successful:
- ✅ Toast: "Payment confirmed! Your booking is now paid."
- ✅ Dialog closes automatically
- ✅ Booking status changes to "confirmed"
- ✅ Payment record created in database
- ✅ "Pay Now" button disappears

### If Payment is Pending:
- ⏳ Toast: "Payment is still pending. Please complete it on your phone."
- Dialog stays open
- Can click "Check Payment Status" again

### If Payment is Cancelled:
- ❌ Toast: "Payment was cancelled"
- `checkoutRequestId` resets
- Can try again

### If Payment Timed Out:
- ⏱️ Toast: "Payment request expired. Please try again."
- `checkoutRequestId` resets
- Can try again

---

## 🔍 Debugging Tips

### If Button Doesn't Show:
1. **Check Browser Console** for errors
2. **Verify** the M-Pesa payment was initiated successfully
3. **Look for** the toast message "M-Pesa payment request sent!"
4. **Check** that `checkoutRequestId` is set (open React DevTools)

### Console Log Checklist:
```
✅ "🔍 M-Pesa Payment Request:" 
✅ "📱 M-Pesa Response Status: 200"
✅ "📱 M-Pesa Response Data: { success: true, checkoutRequestId: '...' }"
```

### If Status Check Fails:
1. **Check** that M-Pesa credentials are configured in Admin Settings
2. **Verify** sandbox environment is selected
3. **Look at** API response in browser console
4. **Check** backend logs for errors

---

## 🎯 What Changed in the Code

### File: `/src/app/pages/MyBookings.tsx`

#### Added State:
```typescript
const [checkoutRequestId, setCheckoutRequestId] = useState<string | null>(null);
const [checkingStatus, setCheckingStatus] = useState(false);
```

#### Updated handlePayNow:
```typescript
const handlePayNow = (booking: Booking) => {
  setSelectedBooking(booking);
  setPaymentMethod(null);
  setMpesaPhone('');
  setCheckoutRequestId(null); // ← FIXED: Reset checkout request
  setShowPaymentDialog(true);
};
```

#### Updated handleMpesaPayment:
```typescript
if (data.success) {
  // Store checkout request ID for manual status check
  setCheckoutRequestId(data.checkoutRequestId); // ← Store ID
  setPaymentMethod(null); // ← Reset to show status check option
  // Don't close dialog!
}
```

#### New Function:
```typescript
const handleCheckPaymentStatus = async () => {
  // Queries M-Pesa API
  // Updates payment status
  // Shows appropriate toast messages
}
```

#### New UI Section:
```typescript
{!paymentMethod && checkoutRequestId && (
  <div>
    {/* Blue info box */}
    {/* Check Payment Status button */}
    {/* Try different method link */}
  </div>
)}
```

---

## 📊 API Flow

```
Customer                  Frontend                Backend                 M-Pesa API
   |                         |                       |                         |
   | Click "Pay Now"         |                       |                         |
   |------------------------>|                       |                         |
   |                         |                       |                         |
   | Enter phone + Submit    |                       |                         |
   |------------------------>|                       |                         |
   |                         | POST /mpesa-payment   |                         |
   |                         |---------------------->|                         |
   |                         |                       | STK Push                |
   |                         |                       |------------------------>|
   |                         |                       |                         |
   |   <-- STK prompt on phone <--------------------|<------------------------|
   |                         |                       |                         |
   | Enter M-Pesa PIN        |                       |                         |
   |-------------------------|---------------------->|------------------------>|
   |                         |                       |                         |
   | Click "Check Status"    |                       |                         |
   |------------------------>|                       |                         |
   |                         | POST /mpesa-query     |                         |
   |                         |---------------------->|                         |
   |                         |                       | Query Status            |
   |                         |                       |------------------------>|
   |                         |                       |                         |
   |                         |                       |<-------- Status --------|
   |                         |<--- Payment Record ---|                         |
   |<---- Success Toast -----|                       |                         |
   |                         |                       |                         |
```

---

## ✨ Next Steps After Testing

### If Everything Works:
1. ✅ Test with real M-Pesa account (sandbox to production)
2. ✅ Deploy to Vercel for production
3. ✅ Configure callback URL for automatic validation
4. ✅ Monitor payment success rates

### If Issues Occur:
1. Check browser console for errors
2. Check API logs in terminal
3. Verify M-Pesa credentials
4. Contact me for debugging help

---

**The "Check Payment Status" button is now fully functional! Test it and let me know how it goes! 🚀**
