# SMB Panel - Social Media Marketing Platform

A production-ready SMB (Social Media Marketing) Panel built with Next.js, Express, PostgreSQL, and Redis.

## Features

### User Features
- 🔐 **Authentication**: JWT-based auth with refresh tokens
- 💰 **Wallet System**: Manual payment methods (GCash, PayMaya, PayPal)
- 📦 **Order Management**: Place and track SMB service orders
- 🎫 **Support Tickets**: Customer support system
- 🔑 **API Access**: External API for resellers

### Admin Features
- 📊 **Dashboard**: Overview of revenue, users, orders
- 👥 **User Management**: Ban/unban, balance adjustment
- 📋 **Order Management**: Status updates, refunds
- ⚙️ **Service Management**: CRUD operations for services
- 📁 **Categories**: Organize services
- 🔌 **API Providers**: Connect external SMB providers
- 💳 **Top-up Approval**: Manual payment verification
- 📝 **Activity Logs**: Track admin actions

## Tech Stack

### Frontend
- **Next.js 14** - React framework
- **Tailwind CSS** - Styling
- **React Query** - Data fetching & caching
- **Zustand** - State management
- **React Hook Form** - Form handling
- **Zod** - Validation

### Backend
- **Express.js** - API server
- **Prisma** - ORM
- **PostgreSQL** - Database
- **Redis** - Caching & queues
- **BullMQ** - Background jobs
- **JWT** - Authentication

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL 15+
- Redis 7+

### Local Development

1. **Clone the repository**
```bash
git clone <repository-url>
cd smb-panel
```

2. **Setup Backend**
```bash
cd backend
npm install

# Create environment file (Cursor may block .env.example creation)
# 1) Create backend/.env manually
# 2) Copy contents from backend/env.example.txt into backend/.env
# 3) Edit backend/.env with your database + Gmail SMTP credentials

# Run migrations
npx prisma migrate dev

# Seed database (optional)
npx prisma db seed

# Start server
npm run dev
```

3. **Setup Frontend**
```bash
cd frontend
npm install

# Copy environment file
copy .env.example .env.local

# Start development server
npm run dev
```

4. **Access the application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api

### Default Admin Account
After running the seed:
- Email: admin@smpanel.com
- Password: admin123

### Docker Deployment

1. **Create environment file**
```bash
copy .env.example .env
# Edit .env with production values
```

2. **Start services**
```bash
docker-compose up -d
```

3. **Run migrations**
```bash
docker-compose exec backend npx prisma migrate deploy
```

## Project Structure

```
smb-panel/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── seed.js
│   └── src/
│       ├── config/
│       ├── middleware/
│       ├── modules/
│       │   ├── admin/
│       │   ├── auth/
│       │   ├── order/
│       │   ├── service/
│       │   ├── ticket/
│       │   ├── user/
│       │   └── wallet/
│       ├── routes/
│       ├── utils/
│       ├── jobs/
│       └── app.js
├── frontend/
│   └── src/
│       ├── components/
│       │   ├── layout/
│       │   └── ui/
│       ├── hooks/
│       ├── lib/
│       ├── pages/
│       │   ├── admin/
│       │   ├── orders/
│       │   └── tickets/
│       └── store/
└── docker-compose.yml
```

## API Documentation

### Authentication
```
POST /api/v1/auth/register    - Register new user
POST /api/v1/auth/login       - Login
POST /api/v1/auth/refresh     - Refresh access token
POST /api/v1/auth/logout      - Logout
```

### Services
```
GET  /api/v1/services          - List services
GET  /api/v1/services/:id      - Get service details
GET  /api/v1/services/categories - List categories
```

### Orders
```
GET  /api/v1/orders            - List user orders
POST /api/v1/orders            - Create new order
GET  /api/v1/orders/:id        - Get order details
```

### Wallet
```
GET  /api/v1/wallet/balance       - Get balance
GET  /api/v1/wallet/transactions  - List transactions
POST /api/v1/wallet/topup         - Request top-up
```

### External API (for resellers)
```
POST /api/external/v2
  action=services              - List services
  action=add                   - Create order
  action=status                - Check order status
  action=balance               - Check balance
```

## Environment Variables

### Backend (.env)
```env
NODE_ENV=development
PORT=5000
DATABASE_URL=postgresql://user:password@localhost:5432/smb_panel
REDIS_HOST=localhost
REDIS_PORT=6379
JWT_SECRET=your-jwt-secret
JWT_REFRESH_SECRET=your-refresh-secret
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
CORS_ORIGIN=http://localhost:3000
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_APP_NAME=SMB Panel
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

This project is licensed under the MIT License.
