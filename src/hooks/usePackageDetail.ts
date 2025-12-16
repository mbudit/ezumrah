import { useState, useEffect } from 'react';
import { PackageDetailExtended } from '../types/package';
import {
  Plane,
  Building,
  Briefcase,
  Utensils,
  Scissors,
  Armchair,
  Luggage,
  TrainFront,
  ShoppingBag,
  Stethoscope,
  Wifi,
  ChefHat,
} from 'lucide-react-native';

const MOCK_DETAIL: PackageDetailExtended = {
  id: '1',
  type: 'Regular Haj',
  vendor: 'PT Azzam Albesuni',
  title: 'Haji Plus 2027',
  rating: '1.538',
  address: 'Address Jamal Omar',
  distance: "500m from Ka'bah",
  ratingScore: 5,
  days: '21 Days',
  transport: 'Transport VIP',
  originalPrice: 'RM 31.598',
  discount: '-4%',
  price: 'RM 30.334',
  seats: 23,
  totalSeats: 30,
  image: require('../assets/banner/umrah.png'),
  
  flights: [
    {
      id: '1',
      type: 'Depart',
      date: '04 Sept 2025',
      departureTime: '15:50',
      arrivalTime: '21:45',
      departureCity: 'Jakarta (CGK)',
      arrivalCity: 'Jeddah (Jed)',
      duration: '9h 50m Direct',
      isVerified: true,
    },
    // Mocking return flight if needed or just one
    {
       id: '2',
       type: 'Return',
       date: '25 Sept 2025',
       departureTime: '10:00',
       arrivalTime: '23:00',
       departureCity: 'Jeddah (Jed)',
       arrivalCity: 'Jakarta (CGK)',
       duration: '13h 00m Direct', 
       isVerified: true,
     },
  ],
  hotels: [
    {
       id: '1',
       city: 'Makkah',
       date: '12 Sept 2025',
       name: 'Makkah Clock Royal Tower A Fairmont Hotel',
       rating: 5,
       distance: "500m from Ka'bah",
       amenities: ['Double Bed', 'No Smoking'],
    },
    {
       id: '2',
       city: 'Madinah',
       date: '18 Sept 2025',
       name: 'Anwar Al Madinah Mövenpick Hotel',
       rating: 5,
       distance: "300m from Masjid Nabawi",
       amenities: ['Twin Bed', 'Breakfast included'],
    }
  ],
  advantages: [
    {
      id: '1',
      title: 'Garuda Indonesia',
      type: 'image',
      source: require('../assets/icons/flight.png'),
    },
    {
      id: '2',
      title: 'Travel Guide',
      type: 'image',
      source: require('../assets/icons/mutawwif.png'),
    },
  ],
  facilities: [
    {
      id: '1',
      title: 'Inclusive Round-Trip Airline Ticket',
      icon: Plane,
    },
    {
      id: '2',
      title: 'Haramain High Speed Railway',
      icon: TrainFront,
    },
    {
      id: '3',
      title: 'Tour Equipment',
      icon: Briefcase,
    },
    {
      id: '4',
      title: 'Eat 3 times a day with full board',
      icon: Utensils,
    },
  ],
  itinerary: [
    {
      id: '1',
      day: 'Day 1',
      date: '04 Sept',
      icon: Plane,
      type: 'flight_card',
      data: {
        badge: 'Depart',
        fullDate: 'Wed, 04 Sept 2025',
        startTime: '15:50',
        startLoc: 'Jakarta (CGK)',
        endTime: '21:45',
        endLoc: 'Jeddah (Jed)',
        airline: 'Garuda Indonesia',
        duration: '9h 50m Direct',
      },
    },
    {
      id: '2',
      day: '',
      date: '',
      icon: Building,
      type: 'simple',
      data: {
        time: '18:00',
        title: 'Check-in',
      },
    },
    {
      id: '3',
      day: 'Day 2',
      date: '06 Sept',
      icon: Plane, // Should be Building or generic for worship? Original code used Plane/Building mixed
      type: 'simple',
      data: {
        time: '18:00',
        title: 'prayers, sunnah worship, and increasing sunnah tawaf.',
      },
    },
  ],
  fullItinerary: [
    {
      id: '1',
      day: 'Day 01',
      dayId: 'Day 01',
      date: '04 Sept',
      icon: Plane,
      type: 'flight_card',
      data: {
        badge: 'Depart',
        fullDate: 'Wed, 04 Sept 2025',
        startTime: '15:50',
        startLoc: 'Jakarta (CGK)',
        endTime: '21:45',
        endLoc: 'Jeddah (Jed)',
        airline: 'Garuda Indonesia',
        duration: '9h 50m Direct',
      },
    },
    // ... add more as per original or truncated for brevity, standard pattern
  ],
  fullFacilities: [
    {
      id: '1',
      title: 'Exclusive Round-Trip Flight Tickets',
      icon: Plane,
    },
    {
      id: '2',
      title: 'Haramain High-Speed Railway',
      icon: TrainFront,
    },
    {
      id: '3',
      title: 'Tour Equipment',
      icon: Briefcase,
    },
    {
      id: '4',
      title: 'Eat 3 times a day with full board',
      icon: Utensils,
    },
    {
      id: '5',
      title: 'Ihram Cloth (for Ikhwan)',
      icon: Scissors,
    },
    {
      id: '6',
      title: 'Ihram Cloth Belt (for Ikhwan)',
      icon: Armchair,
    },
    {
      id: '7',
      title: '24-inch and 20-inch suitcases',
      icon: Luggage,
    },
  ],
  fullAdvantages: [
    {
      id: '1',
      title: 'Near from Ka’bah',
      description: '500meter from kakbah',
      type: 'image',
      source: require('../assets/icons/kiblat.png'),
    },
    {
      id: '2',
      title: 'Near from Masjid Nabawi',
      description: '500meter from kakbah',
      type: 'image',
      source: require('../assets/icons/umrah.png'),
    },
    {
      id: '3',
      title: 'Garuda Indonesia',
      description:
        'Direct flights to Jeddah and Medina with Indonesian-speaking crew.',
      type: 'image',
      source: require('../assets/icons/flight.png'),
    },
    {
      id: '4',
      title: 'Muthawwif/muthawwifah',
      description:
        'Experienced guides, guidance on rituals, and accompanying tour leaders.',
      type: 'image',
      source: require('../assets/icons/vendor_mutawwif.png'),
    },
    {
      id: '5',
      title: 'Complete Hotel Facilities',
      description:
        'Halal restaurants, laundry, 24-hour dining, and meeting rooms for rituals.',
      type: 'image',
      source: require('../assets/icons/hotel.png'),
    },
    {
      id: '6',
      title: 'Near Shopping Centers',
      description:
        "It's easy to find souvenirs, local food, or daily necessities.",
      type: 'icon',
      icon: ShoppingBag,
      color: '#0D9488',
      bgColor: '#E0F2F1',
    },
    {
      id: '7',
      title: 'Near Health Facilities',
      description:
        'Nearby hospitals and clinics, plus doctors accompanying pilgrims.',
      type: 'icon',
      icon: Stethoscope,
      color: '#EF4444',
      bgColor: '#FEE2E2',
    },
    {
      id: '8',
      title: 'Indonesian cuisine',
      description: 'Daily Indonesian food menu',
      type: 'icon',
      icon: ChefHat,
      color: '#F59E0B',
      bgColor: '#FEF3C7',
    },
    {
      id: '9',
      title: 'Additional Facilities',
      description: 'Free WiFi, currency exchange, and quick laundry service.',
      type: 'icon',
      icon: Wifi,
      color: '#D97706',
      bgColor: '#FEF3C7',
    },
  ],
  vendorInfo: {
    name: 'Ezumrah',
    location: 'Kuala Lumpur, Malaysia',
    rating: '5.0',
    properties: '10',
    chatReplied: '100%',
    logo: require('../assets/logo/Logo2.png'),
  },
};

export const usePackageDetail = (id: string | undefined) => {
  const [data, setData] = useState<PackageDetailExtended | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        await new Promise(resolve => setTimeout(() => resolve(true), 1000));
        setData(MOCK_DETAIL);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to fetch package detail');
        setIsLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  return { data, isLoading, error };
};
