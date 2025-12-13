import { api } from './api';
import { PackageDetail } from '../types';

// Mock Data
const MOCK_PACKAGES: PackageDetail[] = [
  {
    id: '1',
    title: 'Haji Plus 2026',
    price: 240000000,
    originalPrice: 260000000,
    rating: 4.8,
    reviews: 120,
    description: 'Comprehensive Haji Plus package with 5-star facilities.',
    vendor: {
        id: '1',
        name: 'Tazkiyah Tour',
        logo: require('../assets/banner/umrah.png'), // Placeholder
        verified: true,
        rating: 4.8
    },
    flights: [
      {
        id: '1',
        type: 'Depart',
        date: 'Wed, 04 Sept 2025',
        departureTime: '15:50',
        departureCity: 'Jakarta (CGK)',
        arrivalTime: '21:45',
        arrivalCity: 'Jeddah (Jed)',
        airline: 'Garuda Indonesia',
        duration: '9h 50m Direct',
        isVerified: true,
      },
      {
        id: '2',
        type: 'Return',
        date: 'Wed, 18 Sept 2025',
        departureTime: '05:30',
        departureCity: 'Jeddah (Jed)',
        arrivalTime: '20:01',
        arrivalCity: 'Jakarta (CGK)',
        airline: 'Garuda Indonesia',
        duration: '9h 30m Direct',
        isVerified: true,
      },
    ],
    hotels: [
      {
        id: '1',
        city: 'Makkah',
        date: '04-20 Sept 2025',
        name: 'Address Jamal Omar',
        rating: 5,
        distance: '500m from Masjidil Haram',
        amenities: ['1 Twin bed', 'Non-smoking Room'],
      },
      {
        id: '2',
        city: 'Madinah',
        date: '20-24 Sept 2025',
        name: 'Pullman Zamzam',
        rating: 5,
        distance: '100m from Masjid Nabawi',
        amenities: ['1 Twin bed', 'Non-smoking Room'],
      },
    ],
    images: [
        require('../assets/icons/kaaba.png'),
    ],
    availableDates: ['2026-06-01', '2026-06-15']
  },
   {
    id: '2',
    title: 'Umrah Ramadhan',
    price: 35000000,
    originalPrice: 38000000,
    rating: 4.7,
    reviews: 80,
    description: 'Spiritual journey during the holy month.',
     vendor: {
        id: '2',
        name: 'Al-Haramain',
        logo: require('../assets/banner/umrah.png'),
        verified: true,
        rating: 4.5
    },
     flights: [],
    hotels: [],
    images: [
        require('../assets/icons/kaaba.png'),
    ],
    availableDates: ['2025-03-01', '2025-03-10']
  },
];

export const packageService = {
  getPackages: async (): Promise<PackageDetail[]> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(MOCK_PACKAGES);
      }, 500);
    });
  },

  getPackageDetail: async (id: string): Promise<PackageDetail | undefined> => {
       return new Promise((resolve) => {
      setTimeout(() => {
        const pkg = MOCK_PACKAGES.find(p => p.id === id);
        resolve(pkg);
      }, 500);
    });
  },
  
  // Future: Real API call
  // getPackages: () => api.get<PackageDetail[]>('/packages').then(res => res.data),
};
