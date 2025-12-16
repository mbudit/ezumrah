export interface Airport {
  city: string;
  code: string;
  name: string;
}

export interface FlightSearchParams {
  from: string;
  to: string;
  departDate: string;
  returnDate?: string;
  passengers: number;
  seatClass: string;
  isRoundTrip: boolean;
}

export interface Flight {
  id: string;
  date: string;
  departureTime: string;
  departureCode: string;
  arrivalTime: string;
  arrivalCode: string;
  airline: string;
  flightNumber?: string;
  class: string;
  price: string;
  duration: string;
  isDirect: boolean;
  stops?: number;
  nonRefundable: boolean;
  logo: any;
}

export interface TicketOption {
  id: number;
  type: string;
  price: string;
  baggage: string;
  cabin: string;
  benefits: string[];
}

export interface FlightBooking {
  id: string;
  flight: Flight;
  ticket: TicketOption;
  passengers: PassengerInfo[];
  contactDetails: ContactInfo;
  totalPrice: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}

export interface PassengerInfo {
  id: string;
  title: string;
  firstName: string;
  lastName: string;
  dateOfBirth?: string;
  nationality?: string;
}

export interface ContactInfo {
  fullName: string;
  phone: string;
  email: string;
}
