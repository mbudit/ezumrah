# Ezumrah Mobile App - Frontend

A React Native mobile application for Umrah and Hajj travel booking services.

# BEFORE YOU GO AHEAD

Use JDK 17 and make sure the project's NDK matches your device's NDK in your Android's SDK folder.

## 📱 Project Overview

This is a mobile-first application built with React Native that allows users to:

- Search and book Umrah and Hajj packages
- Book flights and hotels
- Manage bookings and payments
- Chat with vendors
- View order history and vouchers

## 🏗️ Project Structure

```
src/
├── screens/              # Screen components (organized by feature)
│   ├── auth/            # Authentication screens
│   ├── home/            # Home and main navigation
│   ├── profile/         # User profile screens
│   ├── umrah/           # Umrah package screens
│   ├── hajj/            # Hajj package screens
│   ├── booking/         # Booking flow screens
│   ├── payment/         # Payment screens
│   ├── flight/          # Flight booking screens
│   ├── hotel/           # Hotel booking screens
│   ├── chat/            # Chat screens
│   ├── orders/          # Order management screens
│   └── vouchers/        # Voucher and promo screens
├── components/          # Reusable UI components
├── navigation/          # Navigation configuration
├── hooks/              # Custom React hooks (API integration layer)
├── types/              # TypeScript type definitions
├── theme/              # Theme and styling constants
└── assets/             # Images, fonts, and static files
```

## 🔌 Backend Integration Guide

### For Backend Developers

This app is **backend-ready** with a clear separation between UI and data layers. All API integrations should be done through **custom hooks** located in `src/hooks/`.

### Key Integration Points

#### 1. **Custom Hooks (API Layer)**

All data fetching and state management is centralized in custom hooks:

| Hook                  | Location                           | Purpose                 | Status       |
| --------------------- | ---------------------------------- | ----------------------- | ------------ |
| `useAuth`             | `src/hooks/useAuth.ts`             | User authentication     | 🔴 Mock Data |
| `useProfile`          | `src/hooks/useProfile.ts`          | User profile management | 🔴 Mock Data |
| `useHomeData`         | `src/hooks/useHomeData.ts`         | Home screen data        | 🔴 Mock Data |
| `useUmrahOptions`     | `src/hooks/useUmrahOptions.ts`     | Umrah search options    | 🔴 Mock Data |
| `useBooking`          | `src/hooks/useBooking.ts`          | Booking management      | 🔴 Mock Data |
| `useTripEnhancements` | `src/hooks/useTripEnhancements.ts` | Trip add-ons            | 🔴 Mock Data |
| `usePayment`          | `src/hooks/usePayment.ts`          | Payment methods         | 🔴 Mock Data |
| `useFlightSearch`     | `src/hooks/useFlightSearch.ts`     | Flight search           | 🔴 Mock Data |
| `useFlightBooking`    | `src/hooks/useFlightBooking.ts`    | Flight booking          | 🔴 Mock Data |
| `useChat`             | `src/hooks/useChat.ts`             | Chat conversations      | 🔴 Mock Data |
| `useReferenceData`    | `src/hooks/useReferenceData.ts`    | Countries, titles, etc. | 🔴 Mock Data |

#### 2. **Type Definitions**

All API request/response types are defined in `src/types/`:

- `src/types/user.ts` - User profile types
- `src/types/booking.ts` - Booking types
- `src/types/flight.ts` - Flight search and booking types
- `src/types/umrah.ts` - Umrah package types
- `src/types/chat.ts` - Chat message types
- `src/types/enhancement.ts` - Trip enhancement types

#### 3. **Screen-to-API Mapping**

##### Authentication Flow

- **Screens**: `src/screens/auth/`
- **Hook**: `useAuth` (to be created)
- **Endpoints Needed**:
  - `POST /auth/login` - User login
  - `POST /auth/register` - User registration
  - `POST /auth/verify-otp` - OTP verification
  - `POST /auth/logout` - User logout

##### Umrah/Hajj Booking Flow

- **Screens**: `src/screens/umrah/`, `src/screens/hajj/`
- **Hooks**: `useUmrahOptions`, `useBooking`
- **Endpoints Needed**:
  - `GET /umrah/search-options` - Countries, cities, dates
  - `POST /umrah/packages/search` - Search packages
  - `GET /umrah/packages/:id` - Package details
  - `GET /umrah/vendors/:id` - Vendor details
  - `POST /bookings` - Create booking

##### Flight Booking Flow

- **Screens**: `src/screens/flight/`
- **Hooks**: `useFlightSearch`, `useFlightBooking`
- **Endpoints Needed**:
  - `POST /flights/search` - Search flights
  - `GET /flights/:id` - Flight details
  - `POST /flights/bookings` - Create flight booking

##### Payment Flow

- **Screens**: `src/screens/payment/`
- **Hooks**: `usePayment`, `useBooking`
- **Endpoints Needed**:
  - `GET /payment/methods` - Available payment methods
  - `POST /payment/vouchers/apply` - Apply voucher code
  - `POST /payment/confirm` - Confirm payment
  - `GET /payment/instructions/:orderId` - Payment instructions

##### Profile & Orders

- **Screens**: `src/screens/profile/`, `src/screens/orders/`
- **Hooks**: `useProfile`, `useBooking`
- **Endpoints Needed**:
  - `GET /users/profile` - Get user profile
  - `PUT /users/profile` - Update profile
  - `POST /users/avatar` - Upload avatar
  - `GET /orders` - List user orders
  - `GET /orders/:id` - Order details

##### Chat

- **Screens**: `src/screens/chat/`
- **Hook**: `useChat`
- **Endpoints Needed**:
  - `GET /chat/conversations` - List conversations
  - `GET /chat/conversations/:id/messages` - Get messages
  - `POST /chat/conversations/:id/messages` - Send message
  - `PUT /chat/conversations/:id/read` - Mark as read

### 🔧 How to Integrate Backend APIs

#### Step 1: Set up API client

Create `src/services/api.ts`:

```typescript
import axios from 'axios';

const API_BASE_URL = process.env.API_BASE_URL || 'https://api.ezumrah.com';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
apiClient.interceptors.request.use(config => {
  const token = getAuthToken(); // Implement token storage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

#### Step 2: Replace mock data in hooks

Example - Update `useFlightSearch.ts`:

```typescript
// BEFORE (Mock Data)
export const useFlightSearch = () => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const searchFlights = async (params: FlightSearchParams) => {
    setIsSearching(true);
    // Mock delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    setFlights(MOCK_FLIGHTS);
    setIsSearching(false);
  };

  return { flights, searchFlights, isSearching };
};

// AFTER (Real API)
export const useFlightSearch = () => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const searchFlights = async (params: FlightSearchParams) => {
    setIsSearching(true);
    try {
      const response = await apiClient.post('/flights/search', params);
      setFlights(response.data.flights);
    } catch (error) {
      console.error('Flight search failed:', error);
      // Handle error
    } finally {
      setIsSearching(false);
    }
  };

  return { flights, searchFlights, isSearching };
};
```

#### Step 3: Environment Configuration

Create `.env` file:

```
API_BASE_URL=https://api.ezumrah.com
API_TIMEOUT=10000
```

### 📋 Backend Integration Checklist

- [ ] Set up API client with base URL and interceptors
- [ ] Implement authentication token storage (AsyncStorage)
- [ ] Replace mock data in `useAuth`
- [ ] Replace mock data in `useProfile`
- [ ] Replace mock data in `useHomeData`
- [ ] Replace mock data in `useUmrahOptions`
- [ ] Replace mock data in `useBooking`
- [ ] Replace mock data in `useTripEnhancements`
- [ ] Replace mock data in `usePayment`
- [ ] Replace mock data in `useFlightSearch`
- [ ] Replace mock data in `useFlightBooking`
- [ ] Replace mock data in `useChat`
- [ ] Implement error handling and retry logic
- [ ] Add loading states and error messages
- [ ] Test all API endpoints
- [ ] Implement offline support (optional)

## 🚀 Getting Started

### Prerequisites

- Node.js 16+
- React Native CLI
- Android Studio (for Android)
- Xcode (for iOS, macOS only)

### Installation

```bash
# Install dependencies
npm install

# Install iOS pods (macOS only)
cd ios && pod install && cd ..

# Run on Android
npx react-native run-android

# Run on iOS (macOS only)
npx react-native run-ios
```

### Development

```bash
# Start Metro bundler
npm start

# Run linter
npm run lint

# Run type check
npm run type-check
```

## 🎨 Design System

The app uses a consistent design system defined in `src/theme/theme.ts`:

- **Colors**: Primary (#20A39E), Secondary, etc.
- **Spacing**: Consistent spacing scale (xs, s, m, l, xl)
- **Typography**: Inter font family with predefined sizes

## 📱 Navigation Structure

Navigation is managed by React Navigation v6:

- **Stack Navigator**: Main navigation flow
- **Bottom Tabs**: Home, Orders, Wishlist, Chat, Profile
- **Modal Screens**: Filters, selections, etc.

See `src/navigation/AppNavigator.tsx` for complete navigation setup.

## 🔐 Authentication Flow

1. Splash Screen → Language Selection
2. Login Selection → Login/Register
3. OTP Verification
4. Home Screen

## 📦 Key Features Status

| Feature        | Status         | Backend Ready |
| -------------- | -------------- | ------------- |
| Authentication | ✅ UI Complete | 🔴 Mock Data  |
| Home Screen    | ✅ UI Complete | 🔴 Mock Data  |
| Umrah Search   | ✅ UI Complete | 🔴 Mock Data  |
| Hajj Search    | ✅ UI Complete | 🔴 Mock Data  |
| Flight Booking | ✅ UI Complete | 🔴 Mock Data  |
| Hotel Booking  | ✅ UI Complete | 🔴 Mock Data  |
| Booking Flow   | ✅ UI Complete | 🔴 Mock Data  |
| Payment        | ✅ UI Complete | 🔴 Mock Data  |
| Chat           | ✅ UI Complete | 🔴 Mock Data  |
| Profile        | ✅ UI Complete | 🔴 Mock Data  |
| Orders         | ✅ UI Complete | 🔴 Mock Data  |

## 🤝 Contributing

### For Frontend Developers

- Follow the existing component structure
- Use TypeScript for all new code
- Follow the design system in `theme.ts`
- Keep components small and reusable

### For Backend Developers

- Start with `src/hooks/` - this is your integration layer
- Check `src/types/` for expected data structures
- All API calls should go through custom hooks
- Don't modify screen components directly
