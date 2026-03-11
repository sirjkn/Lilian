# 🐛 Debug Guide: Property Status "Booked, Available from [date]"

## How to Debug

I've added detailed console logging to help you debug why the property status might not be showing correctly.

### **Step 1: Open Browser Console**
1. Open your app in the browser
2. Press `F12` to open Developer Tools
3. Click the "Console" tab

### **Step 2: Check the Console Logs**

You should see logs like this:

#### **On Property Listing Page (PropertyCard):**
```
🔍 PropertyCard [Luxury Beach House]: {
  totalBookings: 2,
  totalPayments: 5,
  propertyId: "abc123"
}

📅 Active confirmed bookings: [
  {
    id: "booking123",
    propertyId: "abc123",
    status: "confirmed",
    checkIn: "2026-03-15",
    checkOut: "2026-03-20",
    totalPrice: 5000
  }
]

💰 Booking booking123: {
  totalPrice: 5000,
  totalPaid: 5000,
  isFullyPaid: true,
  payments: [
    { id: "pay1", amount: 3000, status: "paid" },
    { id: "pay2", amount: 2000, status: "paid" }
  ]
}

✅ Property BOOKED until 3/20/2026
```

#### **On Admin Properties Page:**
```
🔍 AdminProperties - Property abc123: {
  totalBookings: 2,
  activeBookings: 1,
  totalPayments: 5
}

⏭️ Skipping booking xyz789 - status: pending

💰 Confirmed Booking booking123: {
  status: "confirmed",
  totalPrice: 5000,
  totalPaid: 5000,
  isFullyPaid: true,
  checkOut: "2026-03-20"
}

✅ Property BOOKED - Available from 3/20/2026
```

---

## 🔍 Troubleshooting

### **Problem 1: Property shows "Available" but should be "Booked"**

**Check the console for:**
```
📅 Active confirmed bookings: []
```

**Possible Issues:**

#### **Issue A: No confirmed bookings**
```
⏭️ Skipping booking abc123 - status: pending
```
**Solution:** Change booking status from "pending" to "confirmed"
- Go to Admin → Bookings
- Find the booking
- Change status to "confirmed"

#### **Issue B: Booking not fully paid**
```
💰 Booking booking123: {
  totalPrice: 5000,
  totalPaid: 3000,  // ❌ Not enough!
  isFullyPaid: false
}
```
**Solution:** Make full payment
- Go to Admin → Payments
- Make payment for remaining amount (KES 2,000)

#### **Issue C: Checkout date has passed**
```
📅 Active confirmed bookings: []  // ✅ Correct - checkout was yesterday
```
**Solution:** This is correct behavior - property becomes available after checkout

---

### **Problem 2: Console shows "Property BOOKED" but badge doesn't appear**

**Possible Issues:**

#### **Issue A: React state not updating**
- Refresh the page (F5)
- Clear browser cache (Ctrl + Shift + Delete)

#### **Issue B: Badge rendering issue**
Check if `bookedUntil` state has value:
```javascript
// In PropertyCard component
console.log('bookedUntil state:', bookedUntil);
```

---

### **Problem 3: Payment not counting**

**Check console for:**
```
💰 Booking booking123: {
  payments: []  // ❌ No payments found!
}
```

**Possible Issues:**

#### **Issue A: Payment status is "pending"**
```
payments: [
  { id: "pay1", amount: 5000, status: "pending" }  // ❌ Must be "paid"
]
```
**Solution:** Payment must have status = "paid"

#### **Issue B: Wrong booking ID**
```
// Payment
{ bookingId: "xyz", amount: 5000, status: "paid" }

// Booking
{ id: "abc", ... }  // ❌ IDs don't match!
```
**Solution:** Ensure payment.bookingId matches booking.id

---

## 📋 Complete Checklist

For a property to show as "Booked, Available from [date]":

- [ ] **Booking exists** in database
- [ ] **Booking status** = "confirmed" (not "pending")
- [ ] **Checkout date** is in the future
- [ ] **Payment exists** for this booking
- [ ] **Payment status** = "paid" (not "pending")
- [ ] **Payment amount** >= Booking total price
- [ ] **Payment bookingId** matches booking.id

---

## 🔬 Manual Testing

### **Test Case: Create a Booked Property**

**Step 1: Create a booking**
```sql
-- In your Neon database
INSERT INTO bookings (id, property_id, customer_id, check_in, check_out, total_price, status)
VALUES ('test-booking-1', 'your-property-id', 'your-user-id', '2026-03-15', '2026-03-20', 5000, 'confirmed');
```

**Step 2: Create a full payment**
```sql
INSERT INTO payments (id, booking_id, customer_id, amount, status, payment_method)
VALUES ('test-payment-1', 'test-booking-1', 'your-user-id', 5000, 'paid', 'MPesa');
```

**Step 3: Refresh the page**
- You should now see "Booked, Available from 3/20/2026"

---

## 🔧 Database Verification Queries

### **Check bookings:**
```sql
SELECT 
  id,
  property_id,
  customer_id,
  check_in,
  check_out,
  total_price,
  status,
  created_at
FROM bookings
WHERE property_id = 'your-property-id'
ORDER BY created_at DESC;
```

### **Check payments:**
```sql
SELECT 
  p.id,
  p.booking_id,
  p.amount,
  p.status,
  p.payment_method,
  b.total_price as booking_total
FROM payments p
JOIN bookings b ON p.booking_id = b.id
WHERE b.property_id = 'your-property-id'
ORDER BY p.created_at DESC;
```

### **Check property availability (combined):**
```sql
SELECT 
  b.id as booking_id,
  b.status as booking_status,
  b.check_in,
  b.check_out,
  b.total_price,
  COALESCE(SUM(p.amount), 0) as total_paid,
  CASE 
    WHEN b.check_out < CURRENT_DATE THEN 'Past'
    WHEN b.status != 'confirmed' THEN 'Not Confirmed'
    WHEN COALESCE(SUM(p.amount), 0) < b.total_price THEN 'Not Fully Paid'
    ELSE 'BOOKED'
  END as availability_status
FROM bookings b
LEFT JOIN payments p ON p.booking_id = b.id AND p.status = 'paid'
WHERE b.property_id = 'your-property-id'
  AND b.check_out >= CURRENT_DATE
GROUP BY b.id, b.status, b.check_in, b.check_out, b.total_price
ORDER BY b.check_in;
```

---

## 📊 Expected Console Output (Success)

When everything is working correctly, you should see:

```
🔍 PropertyCard [Beach House]: {
  totalBookings: 1,
  totalPayments: 1,
  propertyId: "abc123"
}

📅 Active confirmed bookings: [
  {
    id: "booking123",
    status: "confirmed",
    checkIn: "2026-03-15T00:00:00.000Z",
    checkOut: "2026-03-20T00:00:00.000Z",
    totalPrice: 5000
  }
]

💰 Booking booking123: {
  totalPrice: 5000,
  totalPaid: 5000,
  isFullyPaid: true,
  payments: [
    {
      id: "payment123",
      bookingId: "booking123",
      amount: 5000,
      status: "paid"
    }
  ]
}

✅ Property BOOKED until 3/20/2026
```

**On the page:**
- Property card should show red badge: "Booked until 3/20/2026"
- Admin table should show red status: "Booked, Available from 3/20/2026"
- Property details should show red banner: "Booked - Available after 3/20/2026"

---

## 📞 Quick Fixes

### **Fix 1: Booking status is pending**
```javascript
// Admin → Bookings → Change status to "confirmed"
```

### **Fix 2: Payment not made**
```javascript
// Admin → Payments → Make Payment → Select booking → Enter full amount
```

### **Fix 3: Payment status is pending**
```sql
-- In Neon database
UPDATE payments 
SET status = 'paid' 
WHERE id = 'your-payment-id';
```

### **Fix 4: Clear cache and reload**
```javascript
// Press Ctrl + Shift + R (hard reload)
```

---

## 🎯 Next Steps

1. **Open browser console** (F12)
2. **Navigate to properties page**
3. **Look for console logs** starting with 🔍, 📅, 💰
4. **Compare with examples above**
5. **Identify which step is failing**
6. **Apply the fix from this guide**

If you share the console output with me, I can tell you exactly what's wrong!

---

**Created:** March 11, 2026  
**Version:** 1.0.0  
**Status:** Debug logging active
