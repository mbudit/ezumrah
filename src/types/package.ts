import { ImageSourcePropType } from 'react-native';

export interface Package {
  id: string;
  type: string;
  vendor: string;
  title: string;
  rating: string;
  address: string;
  distance: string;
  ratingScore: number;
  days: string;
  transport: string;
  originalPrice: string;
  discount: string;
  price: string;
  seats: number;
  totalSeats: number;
  image: ImageSourcePropType;
}

export interface Vendor {
  id: string;
  name: string;
  location: string;
  since: string;
  rating: number;
  reviews: number;
  license: string;
  startPrice: string;
  tags: string[];
  logo: ImageSourcePropType;
}

export interface PackageSearchOption {
  id: string;
  city: string;
  code: string;
  location: string;
  type: 'airport' | 'city';
}

export interface PackageListOptions {
  packages: Package[];
  vendors: Vendor[];
  departureMonths: string[];
  costRanges: string[];
  recentSearches: PackageSearchOption[];
  popularCities: string[];
}

// Details

export interface Advantage {
  id: string;
  title: string;
  description?: string;
  type: 'image' | 'icon';
  source?: ImageSourcePropType;
  icon?: any; // Lucide icon component type is a bit complex, any for now or basic generic
  color?: string;
  bgColor?: string;
}

export interface Facility {
  id: string;
  title: string;
  icon: any; // Lucide icon
}

export interface FlightDetail {
  id: string;
  type: string;
  date: string;
  departureTime: string;
  arrivalTime: string;
  departureCity: string;
  arrivalCity: string;
  duration: string;
  isVerified: boolean;
}

export interface HotelDetail {
  id: string;
  city: string;
  date: string;
  name: string;
  rating: number;
  distance: string;
  amenities: string[];
}

export interface ItineraryData {
  badge?: string;
  fullDate?: string;
  startTime?: string;
  startLoc?: string;
  endTime?: string;
  endLoc?: string;
  airline?: string;
  duration?: string;
  time?: string;
  title?: string;
}

export interface ItineraryItem {
  id: string;
  day: string;
  dayId?: string;
  date: string;
  icon: any;
  type: 'flight_card' | 'simple';
  data: ItineraryData;
}

export interface PackageDetailExtended extends Package {
  flights: FlightDetail[];
  hotels: HotelDetail[];
  advantages: Advantage[];
  facilities: Facility[];
  itinerary: ItineraryItem[];
  fullItinerary: ItineraryItem[];
  fullFacilities: Facility[];
  fullAdvantages: Advantage[];
  vendorInfo: {
    name: string;
    location: string;
    rating: string;
    properties: string;
    chatReplied: string;
    logo: ImageSourcePropType;
  };
}
