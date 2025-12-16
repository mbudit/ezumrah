import { useState, useEffect } from 'react';
import {
  VendorDetailData,
  VendorStaff,
  VendorReview,
  VendorProduct,
  VendorCategory,
} from '../types/vendor';

const MUTAWWIF_DATA: VendorStaff[] = [
  {
    id: '1',
    name: 'Muhammad Hasan',
    image: require('../assets/logo/Logo2.png'),
  },
  {
    id: '2',
    name: 'Barsain Wiroganagoro',
    image: require('../assets/logo/Logo2.png'),
  },
  {
    id: '3',
    name: 'Lathif Al-Azhar',
    image: require('../assets/logo/Logo2.png'),
  },
  { id: '4', name: 'Ahmad Husain', image: require('../assets/logo/Logo2.png') },
  {
    id: '5',
    name: 'Muhammad Hasan',
    image: require('../assets/logo/Logo2.png'),
  },
  {
    id: '6',
    name: 'Barsain Wiroganagoro',
    image: require('../assets/logo/Logo2.png'),
  },
  {
    id: '7',
    name: 'Lathif Al-Azhar',
    image: require('../assets/logo/Logo2.png'),
  },
  { id: '8', name: 'Ahmad Husain', image: require('../assets/logo/Logo2.png') },
];

const MUTAWWIFAH_DATA: VendorStaff[] = [
  {
    id: '1',
    name: 'Deandra Athifa',
    image: require('../assets/logo/Logo2.png'),
  },
  {
    id: '2',
    name: 'Hanifa Hafshah',
    image: require('../assets/logo/Logo2.png'),
  },
  {
    id: '3',
    name: 'Yasmin Azzahra',
    image: require('../assets/logo/Logo2.png'),
  },
  {
    id: '4',
    name: 'Humaira Zahira',
    image: require('../assets/logo/Logo2.png'),
  },
  {
    id: '5',
    name: 'Deandra Athifa',
    image: require('../assets/logo/Logo2.png'),
  },
  {
    id: '6',
    name: 'Hanifa Hafshah',
    image: require('../assets/logo/Logo2.png'),
  },
  {
    id: '7',
    name: 'Yasmin Azzahra',
    image: require('../assets/logo/Logo2.png'),
  },
  {
    id: '8',
    name: 'Humaira Zahira',
    image: require('../assets/logo/Logo2.png'),
  },
];

const REVIEWS_DATA: VendorReview[] = [
  {
    id: '1',
    name: 'Siti Aminah',
    initials: 'SA',
    rating: 5,
    date: 'Two days ago',
    text: "I'm very satisfied with their service. From the registration process to the departure, everything was well-organized and transparent. The admin team was responsive.",
  },
  {
    id: '2',
    name: 'Rayyan',
    initials: 'RA',
    rating: 5,
    date: 'Two weeks ago',
    text: "I'm very satisfied with their service. From the registration process to the departure, everything was well-organized and transparent. The admin team was responsive.",
  },
  {
    id: '3',
    name: 'Raiham',
    initials: 'RH',
    rating: 5,
    date: '1 month ago',
    text: "I'm very satisfied with their service. From the registration process to the departure, everything was well-organized and transparent. The admin team was responsive.",
  },
];

const PRODUCTS_DATA: VendorProduct[] = [
  {
    id: '1',
    title: 'Umrah with Turki',
    rating: 4.5,
    reviews: 90,
    price: '$1.456',
    originalPrice: '$2.500',
    image: require('../assets/banner/umrah.png'),
  },
  {
    id: '2',
    title: 'Hajj Regular 2027',
    rating: 4.5,
    reviews: 90,
    price: '$ 17.595',
    originalPrice: '$19.500',
    image: require('../assets/banner/umrah.png'),
  },
  {
    id: '3',
    title: 'Hajj Regular 2028',
    rating: 4.5,
    reviews: 90,
    price: '$ 17.595',
    originalPrice: '$19.500',
    image: require('../assets/banner/umrah.png'),
  },
  {
    id: '4',
    title: 'Hajj ONH 2028',
    rating: 4.5,
    reviews: 90,
    price: '$ 17.595',
    originalPrice: '$19.500',
    image: require('../assets/banner/umrah.png'),
  },
  {
    id: '5',
    title: 'Umrah with Turki',
    rating: 4.5,
    reviews: 90,
    price: '$1.456',
    originalPrice: '$2.500',
    image: require('../assets/banner/umrah.png'),
  },
  {
    id: '6',
    title: 'Umrah with Turki',
    rating: 4.5,
    reviews: 90,
    price: '$1.456',
    originalPrice: '$2.500',
    image: require('../assets/banner/umrah.png'),
  },
];

const CATEGORIES_DATA: VendorCategory[] = [
  { id: '1', title: 'All Items', count: 12 },
  { id: '2', title: 'Hajj Fund', count: 2 },
  { id: '3', title: 'PJH (Penyelenggara Ibadah Haji Khusus)', count: 12 },
  { id: '4', title: 'Umrah', count: 12 },
  { id: '5', title: 'Umrah + Turki', count: 12 },
];

export const useVendorDetail = (vendorId: string | undefined) => {
  const [data, setData] = useState<VendorDetailData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVendorDetail = async () => {
      try {
        await new Promise(resolve => setTimeout(() => resolve(true), 1000));
        setData({
          profile: {
            name: 'Ezumrah',
            location: 'Kuala Lumpur, Malaysia',
            description:
              'Founded in 2017 in Indonesia as a travel agency specializing in flight services and Umrah and Hajj charters. In 2023, the company officially transformed into EZUMRAH DIGITAL TECH SDN BHD.',
            license: 'MOTAC:000 • PHJ:000 • PPIU/PIHK:000 • IOT/IOTU:000',
            fullAddress:
              'Kuala Lumpur, Malaysia, at: 15th Floor, West Block, 1525, Kuala Lumpur, Federal Territory.',
            stats: {
              rating: '5.0',
              properties: '10',
              chatReplied: '100%',
            },
          },
          mutawwif: MUTAWWIF_DATA,
          mutawwifah: MUTAWWIFAH_DATA,
          reviews: REVIEWS_DATA,
          recommended: PRODUCTS_DATA.slice(0, 2), // Mock recommended
          products: PRODUCTS_DATA,
          categories: CATEGORIES_DATA,
          productFilters: ['Top Sales', 'Promo', 'Hajj', 'Umroh', 'Price'],
        });
        setIsLoading(false);
      } catch (err) {
        setError('Failed to fetch vendor detail');
        setIsLoading(false);
      }
    };

    fetchVendorDetail();
  }, [vendorId]);

  return { data, isLoading, error };
};
