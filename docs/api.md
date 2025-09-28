# API Documentation 🔌

This document outlines the backend API endpoints used by the CitySwap UI application.

## Base URL

```
REACT_APP_BACKEND_BASE_URL=https://your-backend-url.com/api
```

## Authentication

All authenticated endpoints require a valid Firebase JWT token in the Authorization header:

```
Authorization: Bearer <firebase-jwt-token>
```

## Endpoints

### 🔍 Search & Listings

#### Find Listings
```http
POST /find
```

**Request Body:**
```json
{
  "country": "string",
  "city": "string", 
  "startDate": "YYYY-MM-DD",
  "endDate": "YYYY-MM-DD",
  "type": "string",
  "entirePlace": true,
  "user": true,
  "location": true,
  "list": true
}
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "listing-id",
      "title": "Beautiful Apartment in City Center",
      "description": "...",
      "location": {
        "country": "France",
        "city": "Paris",
        "address": "..."
      },
      "user": {
        "id": "user-id",
        "name": "John Doe",
        "avatar": "..."
      },
      "images": ["url1", "url2"],
      "amenities": ["wifi", "kitchen"],
      "price": 100,
      "availability": {
        "startDate": "2024-01-01",
        "endDate": "2024-01-31"
      }
    }
  ]
}
```

### 🏠 Listings Management

#### Create Listing
```http
POST /listings
```

#### Get Listing Details
```http
GET /listings/:id
```

#### Update Listing
```http
PUT /listings/:id
```

#### Delete Listing
```http
DELETE /listings/:id
```

### 👥 User Management

#### Get User Profile
```http
GET /users/:id
```

#### Update User Profile
```http
PUT /users/:id
```

### 💬 Messaging

#### Get Conversations
```http
GET /conversations
```

#### Send Message
```http
POST /conversations/:id/messages
```

### 📅 Bookings

#### Create Booking Request
```http
POST /bookings
```

#### Get User Bookings
```http
GET /bookings
```

#### Update Booking Status
```http
PUT /bookings/:id
```

### 💳 Payments

#### Create Payment Intent
```http
POST /payments/create-intent
```

#### Confirm Payment
```http
POST /payments/confirm
```

## Error Handling

All endpoints return errors in the following format:

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable error message",
    "details": {}
  }
}
```

### Common Error Codes

- `UNAUTHORIZED` - Invalid or missing authentication token
- `FORBIDDEN` - User doesn't have permission for this action
- `NOT_FOUND` - Requested resource doesn't exist
- `VALIDATION_ERROR` - Invalid request data
- `INTERNAL_ERROR` - Server error

## Rate Limiting

API requests are rate limited:
- **Authenticated users**: 1000 requests per hour
- **Unauthenticated users**: 100 requests per hour

## Pagination

List endpoints support pagination:

```http
GET /listings?page=1&limit=20
```

**Response:**
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "totalPages": 8
  }
}
```

## WebSocket Events

Real-time features use WebSocket connections:

### Connection
```javascript
const socket = io(BACKEND_URL, {
  auth: {
    token: firebaseToken
  }
});
```

### Events
- `message:new` - New chat message received
- `booking:updated` - Booking status changed
- `notification:new` - New notification

---

*This API documentation is maintained alongside the backend service. For the most up-to-date information, refer to the backend repository.*
