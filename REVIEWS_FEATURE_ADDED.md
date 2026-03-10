# Reviews and Ratings Feature - Complete Implementation

## Overview
Added a comprehensive reviews and ratings system that allows customers to rate and review properties after their stay is complete.

## Features Implemented

### 1. Database Schema
**New Table: `reviews`**
- `id` - UUID primary key
- `booking_id` - Reference to booking (unique - one review per booking)
- `customer_id` - Reference to customer
- `property_id` - Reference to property
- `rating` - Integer (1-5 stars, required)
- `comment` - Text (optional review text)
- `created_at` - Timestamp
- `updated_at` - Timestamp

**Enhanced Properties Table:**
- `average_rating` - Calculated average of all reviews
- `review_count` - Total number of reviews

**Automatic Rating Updates:**
- Database trigger automatically updates property ratings when reviews are added/updated/deleted
- Ensures property ratings are always current

### 2. Backend API (`/api/index.ts`)
**New Reviews Endpoint:**
- `GET /api?endpoint=reviews` - Get all reviews
- `GET /api?endpoint=reviews&propertyId={id}` - Get reviews for a specific property
- `GET /api?endpoint=reviews&bookingId={id}` - Get review for a specific booking
- `POST /api?endpoint=reviews` - Create a new review
- `PUT /api?endpoint=reviews&id={id}` - Update a review
- `DELETE /api?endpoint=reviews&id={id}` - Delete a review

**Validation Rules:**
- Customers can only review their own bookings
- Reviews can only be submitted after checkout date
- One review per booking (prevents spam)
- Rating is required (1-5 stars)
- Comment is optional

**Security:**
- Reviews are joined with customer names for display
- Booking ownership is verified before allowing review creation
- Checkout date is validated to prevent pre-stay reviews

### 3. Frontend API Functions (`/src/app/lib/api.ts`)
**New Interface:**
```typescript
export interface Review {
  id: string;
  bookingId: string;
  customerId: string;
  propertyId: string;
  rating: number;
  comment: string;
  createdAt: string;
  customerName?: string;
}
```

**New Functions:**
- `getReviews(propertyId?)` - Get all reviews or filter by property
- `getReviewByBooking(bookingId)` - Check if review exists for booking
- `createReview(review)` - Submit a new review
- `updateReview(id, review)` - Edit an existing review
- `deleteReview(id)` - Remove a review

### 4. Customer Review Workflow

**When Can Customers Leave Reviews:**
1. Customer must have a completed booking
2. Checkout date must have passed
3. No existing review for that booking

**Where to Add Reviews:**
You can add a review dialog/modal in:
1. Customer Profile page (`/src/app/pages/CustomerProfile.tsx`)
2. Property Details page after booking
3. Email notification after checkout (future enhancement)

**Example Implementation Needed:**
```typescript
// Check if booking is eligible for review
const canReview = async (bookingId) => {
  const booking = await getBookingById(bookingId);
  if (!booking) return false;
  
  const checkoutDate = new Date(booking.checkOut);
  const now = new Date();
  
  // Must be past checkout
  if (checkoutDate > now) return false;
  
  // Must not already have review
  const existingReview = await getReviewByBooking(bookingId);
  return !existingReview;
};

// Submit review
const submitReview = async (bookingId, customerId, propertyId, rating, comment) => {
  try {
    await createReview({
      bookingId,
      customerId,
      propertyId,
      rating,
      comment
    });
    toast.success('Thank you for your review!');
  } catch (error) {
    toast.error('Failed to submit review');
  }
};
```

### 5. Hero Image Default
**Updated Default Hero Background:**
- Set to: `https://res.cloudinary.com/dc5d5zfos/image/upload/v1773134775/skyway-suites/yndkhqpgcxknpro3tjjd.webp`
- Applied in AdminSettings component
- Also added to database migration for default value

## Database Migration

Run this migration on your Neon database:
```sql
-- From /database-migrations/add_reviews_table.sql
-- Creates reviews table
-- Adds rating columns to properties
-- Sets up automatic rating calculation triggers
-- Sets default hero image
```

## Display Reviews on Property Details

To display reviews on the property details page, add:

```typescript
const [reviews, setReviews] = useState<Review[]>([]);

useEffect(() => {
  loadReviews();
}, [propertyId]);

const loadReviews = async () => {
  const propertyReviews = await getReviews(propertyId);
  setReviews(propertyReviews);
};

// In JSX:
<div className="mt-8">
  <h3 className="text-2xl font-bold mb-4">Guest Reviews</h3>
  {reviews.length === 0 ? (
    <p className="text-gray-500">No reviews yet. Be the first to review!</p>
  ) : (
    <div className="space-y-4">
      {reviews.map(review => (
        <div key={review.id} className="border p-4 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold">{review.customerName}</span>
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
          <p className="text-gray-700">{review.comment}</p>
          <p className="text-xs text-gray-500 mt-2">
            {new Date(review.createdAt).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  )}
</div>
```

## Next Steps

1. **Add Review Dialog** - Create a modal/dialog component for submitting reviews
2. **Display Reviews** - Show reviews on PropertyDetails page
3. **Customer Profile Reviews** - Show customer's reviews in their profile
4. **Review Management** - Allow admins to moderate reviews if needed
5. **Email Notifications** - Send email after checkout inviting customers to review
6. **Average Rating Display** - Show property average rating with star display

## Benefits

- ✅ **Trust Building** - Customer reviews build trust with potential guests
- ✅ **Social Proof** - Ratings and reviews provide social proof
- ✅ **Feedback Loop** - Understand what customers love and what needs improvement
- ✅ **SEO Benefit** - Reviews add unique content to property pages
- ✅ **Property Differentiation** - High-rated properties stand out
- ✅ **Quality Control** - Identify and address issues through feedback
