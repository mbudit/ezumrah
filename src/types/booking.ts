import { ImageSourcePropType } from 'react-native';

export interface BookingPackageInfo {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  duration: string;
  startLocation: string;
  endLocation: string;
  airlineName: string;
  airlineLogo: ImageSourcePropType;
  hotelName: string;
  hotelCity: string;
  pricePerPerson: number;
}

export interface ContactDetails {
  fullName: string;
  email: string;
  phoneNumber: string;
}

export interface Passenger {
  id: string;
  type: 'Adult' | 'Child' | 'Infant';
  title: string;
  givenName?: string;
  surname?: string;
  singleName?: boolean;
  fullName: string;
  gender?: string;
  job?: string;
  phoneNumber?: string;
  passportNumber?: string;
  passportPublicationDate?: string;
  passportExpiry?: string;
  birthDate?: string;
  nationality?: string;
  passportScan?: string; // URI or generic
  photo?: string; // URI
  vaccineStatus?: boolean;
}

export interface BookingState {
  packageInfo: BookingPackageInfo | null;
  contactDetails: ContactDetails;
  passengers: Passenger[];
  selectedPaymentMethod?: string;
  totalPrice: number;
  paymentType: 'Full' | 'Deposit';
  priceBreakdown: {
    basePrice: number;
    discount: number;
    taxIncluded: boolean;
  };
  selectedEnhancements: Record<string, number>; // enhancementId -> quantity
  selectedVoucher?: {
    code: string;
    discount: number;
    type: 'percentage' | 'fixed';
  } | null;
}

export interface BookingSummary {
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
}
