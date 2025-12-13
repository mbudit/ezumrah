export interface User {
  id: string;
  name: string;
  email: string;
  phoneNumber?: string;
  avatarUrl?: string;
}

export interface Flight {
  id: string;
  type: 'Depart' | 'Return';
  date: string;
  departureTime: string;
  departureCity: string;
  arrivalTime: string;
  arrivalCity: string;
  airline: string;
  duration: string;
  isVerified: boolean;
}

export interface Hotel {
  id: string;
  city: string;
  date: string;
  name: string; // "hotel" in mock data
  rating: number;
  distance: string;
  amenities: string[];
  imageUrl?: any; // For require() assets
}

export interface Vendor {
  id: string;
  name: string;
  logo: any;
  rating?: number;
  location?: string;
  verified?: boolean;
}

export interface PackageDetail {
  id: string;
  title: string;
  price: number; // Stored as number, formatted string in hooks
  originalPrice?: number;
  rating: number;
  reviews: number;
  vendor: Vendor;
  flights: Flight[];
  hotels: Hotel[];
  description?: string;
  images: any[];
  availableDates?: string[];
}

export interface ContactDetails {
  fullName: string;
  email: string;
  phoneNumber: string;
  countryCode: string; // e.g., "+60"
}

export interface Passenger {
  id: string;
  type: 'Adult' | 'Child' | 'Infant';
  title: 'Mr' | 'Mrs' | 'Ms' | 'Mstr' | 'Miss';
  fullName: string;
  passportNumber?: string;
  birthDate?: string;
  nationality?: string;
}

export interface BookingRequest {
  packageId: string;
  contactDetails: ContactDetails;
  passengers: Passenger[];
  totalPrice: number;
}

export interface PaymentMethod {
  id: string;
  label: string;
  category: 'QRIS' | 'Virtual Account' | 'E-wallet' | 'Credit/Debit Card';
  image?: any;
}

export interface Order {
  id: string;
  orderId: string; // e.g "1999120524"
  package: PackageDetail;
  status: 'Waiting' | 'Paid' | 'Cancelled' | 'expired';
  bookingDate: string;
  totalAmount: number;
  paymentMethod?: PaymentMethod;
  paymentDeadline?: string;
}

export interface ChatRoom {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  unreadCount: number;
  avatar: any;
  vendorId?: string;
}

export interface ChatMessage {
  id: string;
  text: string;
  time: string;
  isSender: boolean;
  isRead: boolean;
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string; // e.g. "2h ago"
  type: 'promo' | 'order' | 'system';
  isRead: boolean;
}

export interface Voucher {
  id: string;
  code: string;
  description: string;
  discountAmount: number;
  minPurchase?: number;
  expiryDate: string;
}
