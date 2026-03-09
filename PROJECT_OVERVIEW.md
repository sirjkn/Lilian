# Skyway Suites - Airbnb-like Web Application

A comprehensive property booking platform built with React, TypeScript, and ready to connect to your Neon PostgreSQL database.

## 🎯 Features Implemented

### Frontend (Customer-Facing)
- **Home Page**: Hero section, search bar, featured properties, features showcase
- **About Us**: Company story, values, and statistics
- **All Properties**: Property listings with search and filter functionality
- **Property Details**: Individual property pages with booking functionality
- **Contact Us**: Contact form with company information
- **Authentication**: Login and Create Account pages

### Backend (Admin Dashboard)
- **Properties Management**: List, add, edit, and delete properties
- **Bookings Management**: View all bookings, create new bookings, track status
- **Customers Management**: Customer database with booking history
- **Payments Management**: Track payments, process new payments, view revenue
- **Settings**: 
  - General settings (business info, database connection)
  - Users & Roles (admin user management, permissions)
  - Notifications (email and push notification preferences)

## 📁 Project Structure

```
/src/app/
├── App.tsx                      # Main app component with routing
├── routes.tsx                   # React Router configuration
├── context/
│   └── AuthContext.tsx          # Authentication state management
├── lib/
│   ├── api.ts                   # API functions (ready for Neon integration)
│   └── utils.ts                 # Utility functions
├── components/
│   ├── Layout.tsx               # Main layout wrapper
│   ├── Header.tsx               # Navigation header
│   ├── Footer.tsx               # Footer component
│   ├── PropertyCard.tsx         # Property card component
│   ├── ui/                      # Reusable UI components
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   └── card.tsx
│   └── admin/
│       └── AdminLayout.tsx      # Admin dashboard layout
├── pages/
│   ├── Home.tsx
│   ├── About.tsx
│   ├── AllProperties.tsx
│   ├── PropertyDetails.tsx
│   ├── Contact.tsx
│   ├── Login.tsx
│   ├── CreateAccount.tsx
│   └── admin/
│       ├── AdminProperties.tsx
│       ├── AdminBookings.tsx
│       ├── AdminCustomers.tsx
│       ├── AdminPayments.tsx
│       └── AdminSettings.tsx
```

## 🚀 Getting Started

### Current State (Demo Mode)
The application is currently running with mock data. All functionality works, but data is stored in memory and resets on page refresh.

### To Connect to Neon Database
Follow the detailed guide in `/NEON_INTEGRATION.md` to:
1. Set up your Neon database
2. Create the required tables
3. Build a backend API
4. Connect the frontend to your API

## 🎨 Design & Styling
- **Framework**: React with TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React
- **Routing**: React Router v7 (Data mode)
- **Notifications**: Sonner toasts

## 🔐 Authentication Flow

1. **Demo Mode** (Current):
   - Login with any email/password
   - Use "admin@example.com" for admin access
   - Use any other email for customer access

2. **Production** (After Neon Integration):
   - Real user authentication with JWT tokens
   - Password hashing with bcrypt
   - Role-based access control (customer/admin)

## 📊 Data Models

### Property
- Title, Description, Location
- Price per night
- Bedrooms, Bathrooms, Max Guests
- Image URL
- Amenities (array)
- Availability status

### Booking
- Property ID, Customer ID
- Check-in/Check-out dates
- Number of guests
- Total price
- Status (pending/confirmed/cancelled/completed)

### Customer
- Name, Email, Phone
- Total bookings count
- Member since date

### Payment
- Booking ID, Customer ID
- Amount
- Status (pending/paid/refunded)
- Payment method

## 🔄 Admin Dashboard Features

### Properties Page
- View all properties in a table
- Add new properties with a form
- Edit/delete existing properties
- Navigate to Bookings and Customers

### Bookings Page
- View all bookings with status
- Stats cards (total, pending, confirmed, completed)
- Create new bookings
- Navigate to Customers and Properties

### Customers Page
- View customer database
- Add new customers
- See booking history per customer
- Stats for total customers and new members

### Payments Page
- View all payments
- Revenue statistics
- Process new payments
- Filter by status

### Settings Page
- **General**: Business info, database connection, booking rules
- **Users & Roles**: Manage admin users and permissions
- **Notifications**: Email and push notification preferences

## 🌐 Routing Structure

### Public Routes
- `/` - Home page
- `/about` - About us
- `/properties` - All properties listing
- `/properties/:id` - Property details
- `/contact` - Contact form
- `/login` - Login page
- `/create-account` - Sign up page

### Admin Routes (Protected)
- `/admin` or `/admin/properties` - Properties management
- `/admin/bookings` - Bookings management
- `/admin/customers` - Customer management
- `/admin/payments` - Payment tracking
- `/admin/settings` - Application settings

## 💡 Demo Accounts

For testing purposes:
- **Admin**: admin@example.com (any password)
- **Customer**: user@example.com (any password)

## 📦 Dependencies

All required packages are already installed:
- react-router (v7.13.0)
- lucide-react (icons)
- sonner (notifications)
- @radix-ui/* (UI primitives)
- tailwind-merge & clsx (styling utilities)

## 🔜 Next Steps

1. **Set Up Neon Database**
   - Create account at neon.tech
   - Run the SQL schema from NEON_INTEGRATION.md
   - Get your connection string

2. **Create Backend API**
   - Set up Node.js + Express server
   - Connect to Neon database
   - Implement authentication endpoints
   - Implement CRUD operations for all models

3. **Connect Frontend**
   - Update `/src/app/lib/api.ts` with real API calls
   - Update `/src/app/context/AuthContext.tsx` with real auth
   - Test all functionality end-to-end

4. **Deploy**
   - Deploy backend API (Railway, Render, or Fly.io)
   - Deploy frontend (Vercel, Netlify, or Cloudflare Pages)
   - Configure environment variables
   - Test in production

## 📄 Additional Documentation

- `NEON_INTEGRATION.md` - Complete guide for database integration
- Code comments throughout the application
- TypeScript types for type safety

## 🛡️ Security Notes

⚠️ **Important**: This is a demonstration application. For production use:
- Implement proper authentication with JWT
- Use HTTPS everywhere
- Validate all inputs on the backend
- Implement rate limiting
- Follow GDPR/privacy regulations for user data
- Use environment variables for sensitive data
- Implement proper error handling
- Add logging and monitoring

## 🎉 Features Highlights

✅ Fully responsive design
✅ Modern UI with Tailwind CSS
✅ Type-safe with TypeScript
✅ Ready for Neon database integration
✅ Complete admin dashboard
✅ Customer-facing property booking
✅ Authentication system (structure ready)
✅ Search and filter functionality
✅ Toast notifications for user feedback
✅ Modal dialogs for forms
✅ Protected admin routes
✅ Clean, maintainable code structure

---

Built with ❤️ for Skyway Suites
