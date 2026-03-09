# Skyway Suites Backend API

Backend API server connecting to Neon PostgreSQL database.

## Setup Instructions

### 1. Install Dependencies

```bash
cd backend-api
npm install
```

### 2. Set Up Database

1. Go to your Neon console: https://console.neon.tech/
2. Open the SQL Editor
3. Copy and paste the entire contents of `setup-database.sql`
4. Click "Run" to create all tables and sample data

### 3. Start the Server

```bash
npm start
```

Or for development with auto-reload:

```bash
npm run dev
```

The API will run on `http://localhost:3001`

### 4. Test the Connection

Open your browser or use curl:

```bash
curl http://localhost:3001/api/health
```

You should see: `{"status":"ok","message":"Skyway Suites API is running"}`

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new account
- `POST /api/auth/login` - Login

### Properties
- `GET /api/properties` - Get all properties
- `GET /api/properties/:id` - Get single property
- `POST /api/properties` - Create property
- `PUT /api/properties/:id` - Update property
- `DELETE /api/properties/:id` - Delete property

### Bookings
- `GET /api/bookings` - Get all bookings
- `POST /api/bookings` - Create booking
- `PUT /api/bookings/:id` - Update booking status

### Customers
- `GET /api/customers` - Get all customers
- `POST /api/customers` - Create customer

### Payments
- `GET /api/payments` - Get all payments
- `POST /api/payments` - Create payment

### Contact
- `POST /api/contact` - Submit contact form

## Default Admin Account

After running the setup SQL:
- Email: admin@skywaysuites.com
- Password: admin123

## Deployment

### Option 1: Railway
1. Create account at railway.app
2. Click "New Project" → "Deploy from GitHub"
3. Connect your repo
4. Add environment variable: `PORT=3001`
5. Railway will auto-deploy

### Option 2: Render
1. Create account at render.com
2. Click "New" → "Web Service"
3. Connect your GitHub repo
4. Select `backend-api` directory
5. Build command: `npm install`
6. Start command: `npm start`

### Option 3: Fly.io
```bash
fly launch
fly deploy
```

## Security Notes

⚠️ **Important for Production:**

1. Move database URL to environment variable:
   ```javascript
   connectionString: process.env.DATABASE_URL
   ```

2. Change JWT_SECRET to a strong random value:
   ```javascript
   const JWT_SECRET = process.env.JWT_SECRET;
   ```

3. Use environment variables:
   ```bash
   DATABASE_URL=your_neon_connection_string
   JWT_SECRET=your-super-secret-key
   PORT=3001
   ```

4. Enable rate limiting
5. Add input validation
6. Use HTTPS in production
