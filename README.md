# 📦 Parcel Delivery System API

A secure, scalable, and feature-rich backend API for parcel delivery management inspired by modern courier services like Pathao Courier and Sundarban. Built with Express.js, TypeScript, and MongoDB.

## 🎯 Project Overview

This system provides comprehensive parcel delivery management with role-based access control, real-time tracking, and automated fee calculation. Users can register as senders or receivers, create parcel delivery requests, track shipments, and manage deliveries through a secure API.

### ✨ Key Features

- 🔐 **JWT Authentication** with refresh tokens and Google OAuth2
- 🎭 **Role-based Authorization** (Super Admin, Admin, User, Sender, Receiver)
- 📦 **Parcel Management** with status tracking and embedded history logs
- 🔍 **Public Tracking System** with unique tracking IDs
- 💰 **Automated Fee Calculation** based on weight and location
- 🏢 **Division Management** for location-based pricing
- 📊 **Admin Dashboard** with comprehensive statistics
- 🚫 **User & Parcel Blocking** capabilities
- 🔄 **Dynamic Role Assignment** based on user activities

## 🛠 Tech Stack

- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT + Passport.js (Local & Google OAuth2)
- **Validation**: Zod schemas
- **Security**: bcryptjs, CORS, HTTP-only cookies
- **Development**: ts-node-dev, ESLint

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (v4.4 or higher)
- npm package manager

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/Nifazur/Parcel-Delivery-System
cd parcel-delivery-system
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

# Database
DB_URL=mongodb:mongodb+srv://<db_username>:<db_password>@cluster0.1tebz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

# JWT Configuration
JWT_ACCESS_SECRET=your-super-secret-access-key
JWT_ACCESS_EXPIRES=15m
JWT_REFRESH_SECRET=your-super-secret-refresh-key
JWT_REFRESH_EXPIRES=7d

# Password Hashing
BCRYPT_SALT_ROUND=12

# Super Admin Credentials
SUPER_ADMIN_EMAIL=admin@parceldelivery.com
SUPER_ADMIN_PASSWORD=SuperAdmin@123

# Google OAuth2 (Optional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=http://localhost:4000/api/v1/auth/google/callback

# Session Secret
EXPRESS_SESSION_SECRET=your-express-session-secret
```

### 4. Start the Application

#### Development Mode
```bash
npm run dev
```

#### Build for Production
```bash
npm run build
npm start
```

### 5. Initial Setup

The application will automatically:
- Connect to MongoDB
- Create a Super Admin account using the credentials from `.env`
- Seed initial data if needed

## 🔗 API Endpoints

Base URL: `http://localhost:4000/api/v1`

### 🔐 Authentication Routes (`/auth`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| `POST` | `/auth/login` | Login with email/password | Public |
| `GET` | `/auth/google` | Initiate Google OAuth | Public |
| `GET` | `/auth/google/callback` | Google OAuth callback | Public |
| `POST` | `/auth/refresh-token` | Get new access token | Public |
| `POST` | `/auth/logout` | Logout user | Public |
| `POST` | `/auth/reset-password` | Reset user password | Authenticated |

### 👥 User Management Routes (`/user`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| `POST` | `/user/register` | Register new user | Public |
| `GET` | `/user/all-users` | Get all users | Public |
| `PATCH` | `/user/:id` | Update user profile | Authenticated |

### 🏢 Division Management Routes (`/division`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| `GET` | `/division` | Get all divisions | Public |
| `GET` | `/division/:id` | Get division by ID | Public |
| `POST` | `/division/register` | Create new division | Admin Only |
| `PUT` | `/division/:id` | Update division | Admin Only |
| `DELETE` | `/division/:id` | Delete division | Admin Only |

### 📦 Parcel Management Routes (`/parcel`)

#### Public Routes
| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| `GET` | `/parcel/track/:trackingId` | Track parcel by tracking ID | Public |

#### User Routes
| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| `POST` | `/parcel/create` | Create new parcel | Authenticated |
| `GET` | `/parcel/my-parcel-history` | Get user's parcel history | Authenticated |
| `GET` | `/parcel/:id` | Get parcel details | Authenticated |

#### Sender Routes
| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| `GET` | `/parcel/sent` | Get sent parcels | Sender/Admin |
| `PATCH` | `/parcel/cancel/:id` | Cancel parcel | Sender/Admin |

#### Receiver Routes
| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| `GET` | `/parcel/received` | Get received parcels | Receiver/Admin |
| `PATCH` | `/parcel/confirm-delivery/:id` | Confirm delivery | Receiver/Admin |

#### Admin Routes
| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| `GET` | `/parcel/all` | Get all parcels | Admin Only |
| `PATCH` | `/parcel/status/:id` | Update parcel status | Admin Only |
| `PATCH` | `/parcel/block/:id` | Block parcel | Admin Only |
| `PATCH` | `/parcel/unblock/:id` | Unblock parcel | Admin Only |
| `GET` | `/parcel/admin/statistics` | Get parcel statistics | Admin Only |

## 📝 Request/Response Examples

### Create Parcel
```http
POST /api/v1/parcel/create
Authorization: Bearer <access-token>
Content-Type: application/json

{
  "type": "package",
  "weight": 2.5,
  "receiver": "receiver@example.com",
  "fromAddress": "123 Sender Street, Dhaka",
  "toAddress": "456 Receiver Avenue, Chittagong",
  "division": "Chittagong",
  "deliveryDate": "2024-01-15"
}
```

### Track Parcel
```http
GET /api/v1/parcel/track/TRK-20240101-ABC123
```

### Response Format
```json
{
  "statusCode": 200,
  "success": true,
  "message": "Operation successful",
  "data": {
    // Response data
  },
  "meta": {
    "total": 100
  }
}
```

## 🔒 Authentication & Authorization

### JWT Tokens
- **Access Token**: Short-lived (15 minutes), used for API requests
- **Refresh Token**: Long-lived (7 days), used to generate new access tokens
- Tokens are stored in HTTP-only cookies for security

### Role Hierarchy
- **SUPER_ADMIN**: Full system access
- **ADMIN**: User and parcel management
- **USER**: Basic authenticated user
- **SENDER**: Can create and manage sent parcels (auto-assigned)
- **RECEIVER**: Can receive and confirm parcels (auto-assigned)

### Authorization Header
```http
Authorization: Bearer <your-access-token>
```

## 🔄 Dynamic Role Management System

This system implements an intelligent **dynamic role assignment** mechanism that automatically manages user roles based on their parcel activities, ensuring optimal security and access control.

### Core Concept

Users in the system can act as both **senders** and **receivers** at different times, but their roles are dynamically assigned and removed based on their current parcel activities. This approach ensures:

- **Security**: Users only have access to routes relevant to their current activities
- **Clean Access Control**: No unnecessary role permissions
- **Automatic Management**: No manual role cleanup required

### Default User State

- **Initial Role**: All registered users start with the default `USER` role
- **Limited Access**: Users with only `USER` role cannot access sender or receiver-specific routes
- **Role Evolution**: Roles are automatically added when users engage in parcel activities

### Dynamic Role Assignment

#### 📤 Sender Role Assignment
When a user **creates a parcel**:
```typescript
// Automatic role assignment process
1. User creates a parcel request
2. System checks if user has "SENDER" role
3. If not present, "SENDER" role is automatically added to user's role array
4. User can now access sender-specific routes and functionalities
```

#### 📥 Receiver Role Assignment  
When a user is **designated as a receiver**:
```typescript
// Automatic role assignment process
1. Another user creates a parcel with this user as receiver
2. System checks if receiver has "RECEIVER" role
3. If not present, "RECEIVER" role is automatically added to receiver's role array
4. Receiver can now access receiver-specific routes and functionalities
```

### Intelligent Role Cleanup

The system automatically removes roles when they are no longer needed, maintaining clean access control:

#### 🧹 Sender Role Removal
After a parcel is marked as **delivered** or **cancelled**:
```typescript
// Automatic cleanup process
1. System checks if sender has any other active parcels
2. Active parcels = parcels with status NOT in ['delivered', 'cancelled']
3. If NO active parcels found:
   - "SENDER" role is automatically removed
   - User retains other roles (USER, RECEIVER if applicable)
```

#### 🧹 Receiver Role Removal
After confirming delivery or parcel cancellation:
```typescript
// Automatic cleanup process
1. System checks if receiver has any other incoming parcels
2. Incoming parcels = parcels where user is receiver with status NOT in ['delivered', 'cancelled']
3. If NO incoming parcels found:
   - "RECEIVER" role is automatically removed
   - User retains other roles (USER, SENDER if applicable)
```

### Route Protection Matrix

| Route Type | Required Roles | Access Control |
|------------|---------------|---------------|
| **Public Routes** | None | Anyone can access |
| **General User Routes** | `USER` + any role | All authenticated users |
| **Sender-Only Routes** | `SENDER` (+ `ADMIN`/`SUPER_ADMIN`) | Only active senders and admins |
| **Receiver-Only Routes** | `RECEIVER` (+ `ADMIN`/`SUPER_ADMIN`) | Only active receivers and admins |
| **Admin Routes** | `ADMIN` or `SUPER_ADMIN` | Administrative access only |

### Security Benefits

#### 🛡️ **Principle of Least Privilege**
- Users only have permissions for their current activities
- No unnecessary access to irrelevant functionalities
- Automatic permission revocation when activities complete

#### 🔒 **Cross-Role Isolation**
- A `SENDER` cannot access receiver-only routes (unless they also have `RECEIVER` role)
- A `RECEIVER` cannot access sender-only routes (unless they also have `SENDER` role)
- Users with only `USER` role have no access to parcel management routes

#### ⚡ **Real-Time Access Control**
- Role changes take effect immediately
- No manual intervention required
- Consistent security enforcement across all endpoints

### Example Role Evolution Scenarios

#### Scenario 1: New User Journey
```
1. User registers → Role: [USER]
2. User creates first parcel → Role: [USER, SENDER]
3. Someone sends parcel to user → Role: [USER, SENDER, RECEIVER]
4. User's sent parcel delivered → Role: [USER, RECEIVER] (if no other sent parcels)
5. User's received parcel delivered → Role: [USER] (if no other received parcels)
```

#### Scenario 2: Active User
```
1. User has sent 3 parcels → Role: [USER, SENDER]
2. User receives 2 parcels → Role: [USER, SENDER, RECEIVER]
3. 2 sent parcels delivered, 1 still in transit → Role: [USER, SENDER, RECEIVER]
4. Last sent parcel delivered → Role: [USER, RECEIVER] (SENDER removed)
5. All received parcels delivered → Role: [USER] (RECEIVER removed)
```

### Implementation Details

The dynamic role management is implemented through:

- **Middleware Validation**: `checkAuth` middleware validates required roles for each route
- **Service Layer Logic**: Role assignment/removal logic in parcel creation and delivery confirmation
- **Database Triggers**: Automatic role cleanup using utility functions
- **Real-time Updates**: Role changes reflected immediately in user sessions

This system ensures that users always have the appropriate level of access based on their current parcel activities while maintaining the highest security standards.

## 📊 Parcel Status Flow

```
requested → approved → dispatched → in_transit → delivered
    ↓           ↓          ↓           ↓
cancelled   cancelled  cancelled   cancelled
```

### Status Descriptions
- **requested**: Parcel creation request submitted
- **approved**: Admin approved the parcel
- **dispatched**: Parcel picked up for delivery
- **in_transit**: Parcel is on the way
- **delivered**: Parcel successfully delivered
- **cancelled**: Parcel cancelled at any stage

## 🧪 Development Scripts

```bash
# Start in development mode with auto-reload
npm run dev

# Build TypeScript files
npm run build

# Run ESLint
npm run lint

# Run tests (when implemented)
npm test
```

## 📁 Project Structure

```
src/
├── app/
│   ├── config/          # Configuration files
│   ├── errorHelpers/    # Error handling utilities
│   ├── helpers/         # Helper functions
│   ├── interfaces/      # TypeScript interfaces
│   ├── middlewares/     # Express middlewares
│   ├── modules/         # Feature modules
│   │   ├── auth/        # Authentication module
│   │   ├── division/    # Division management
│   │   ├── parcel/      # Parcel management
│   │   └── user/        # User management
│   ├── routes/          # Route definitions
│   └── utils/           # Utility functions
├── app.ts              # Express app configuration
└── server.ts           # Server entry point
```

## 🔧 Environment Variables Reference

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `PORT` | Server port | Yes | - |
| `DB_URL` | MongoDB connection string | Yes | - |
| `NODE_ENV` | Environment mode | Yes | development |
| `JWT_ACCESS_SECRET` | JWT access token secret | Yes | - |
| `JWT_REFRESH_SECRET` | JWT refresh token secret | Yes | - |
| `BCRYPT_SALT_ROUND` | Password hashing rounds | Yes | 12 |
| `SUPER_ADMIN_EMAIL` | Initial admin email | Yes | - |
| `SUPER_ADMIN_PASSWORD` | Initial admin password | Yes | - |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID | Optional | - |
| `GOOGLE_CLIENT_SECRET` | Google OAuth secret | Optional | - |
| `FRONTEND_URL` | Frontend application URL | Yes | - |

## 🚨 Error Handling

The API uses consistent error response format:

```json
{
  "success": false,
  "message": "Error description",
  "errorSources": [
    {
      "path": "field_name",
      "message": "Field specific error"
    }
  ],
  "err": "Detailed error (development only)",
  "stack": "Error stack trace (development only)"
}
```

## 🔍 Common HTTP Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request / Validation Error
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

## 📈 Features & Capabilities

### ✅ Implemented Features
- [x] JWT-based authentication with refresh tokens
- [x] Google OAuth2 integration
- [x] Role-based access control
- [x] Parcel creation and management
- [x] Real-time parcel tracking
- [x] Automated fee calculation
- [x] Division-based pricing
- [x] User management and blocking
- [x] Admin statistics dashboard
- [x] Public tracking system
- [x] Dynamic role assignment
- [x] Comprehensive error handling
- [x] Input validation with Zod
- [x] Database indexing for performance


## 👨‍💻 Author

**Parcel Delivery System Team**
- Email: support@parceldelivery.com
- GitHub: https://github.com/Nifazur



---

**Happy Coding! 🚀**
