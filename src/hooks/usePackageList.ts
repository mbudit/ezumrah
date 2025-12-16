import { useState, useEffect } from 'react';
import { Package, Vendor, PackageSearchOption, PackageListOptions } from '../types/package';

const PACKAGE_DATA: Package[] = [
  {
    id: '1',
    type: 'Regular Haj',
    vendor: 'PT Azzam Albesuni',
    title: 'Hajj Plus 2026',
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
  },
  {
    id: '2',
    type: 'CNH',
    vendor: 'PT Azzam Albesuni',
    title: 'Hajj Plus 2026',
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
  },
  {
    id: '3',
    type: 'Regular Haj',
    vendor: 'PT Azzam Albesuni',
    title: 'Hajj Plus 2026',
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
  },
];

const VENDOR_DATA: Vendor[] = [
  {
    id: '1',
    name: 'ezumrah Umroh & Haji',
    location: 'South Jakarta',
    since: 'Since 2008',
    rating: 4.5,
    reviews: 90,
    license: 'PPIU U 165 • PIHK No. 3609',
    startPrice: 'IDR 27.000',
    tags: ['Hajj Plus', 'Haji Regular', 'Umrah'],
    logo: require('../assets/logo/Logo2.png'),
  },
  {
    id: '2',
    name: 'ezumrah Umroh & Haji',
    location: 'South Jakarta',
    since: 'Since 2008',
    rating: 4.5,
    reviews: 90,
    license: 'PPIU U 165 • PIHK No. 3609',
    startPrice: 'IDR 27.000',
    tags: ['Hajj Plus', 'Haji Regular', 'Umrah'],
    logo: require('../assets/logo/Logo2.png'),
  },
  {
    id: '3',
    name: 'ezumrah Umroh & Haji',
    location: 'South Jakarta',
    since: 'Since 2008',
    rating: 4.5,
    reviews: 90,
    license: 'PPIU U 165 • PIHK No. 3609',
    startPrice: 'IDR 27.000',
    tags: ['Hajj Plus', 'Haji Regular', 'Umrah'],
    logo: require('../assets/logo/Logo2.png'),
  },
  {
    id: '4',
    name: 'ezumrah Umroh & Haji',
    location: 'South Jakarta',
    since: 'Since 2008',
    rating: 4.5,
    reviews: 90,
    license: 'PPIU U 165 • PIHK No. 3609',
    startPrice: 'IDR 27.000',
    tags: ['Hajj Plus', 'Haji Regular', 'Umrah'],
    logo: require('../assets/logo/Logo2.png'),
  },
  {
    id: '5',
    name: 'ezumrah Umroh & Haji',
    location: 'South Jakarta',
    since: 'Since 2008',
    rating: 4.5,
    reviews: 90,
    license: 'PPIU U 165 • PIHK No. 3609',
    startPrice: 'IDR 27.000',
    tags: ['Hajj Plus', 'Haji Regular', 'Umrah'],
    logo: require('../assets/logo/Logo2.png'),
  },
  {
    id: '6',
    name: 'ezumrah Umroh & Haji',
    location: 'South Jakarta',
    since: 'Since 2008',
    rating: 4.5,
    reviews: 90,
    license: 'PPIU U 165 • PIHK No. 3609',
    startPrice: 'IDR 27.000',
    tags: ['Hajj Plus', 'Haji Regular', 'Umrah'],
    logo: require('../assets/logo/Logo2.png'),
  },
];

const DEPARTURE_MONTHS = [
  'January 2027',
  'February 2027',
  'March 2027',
  'April 2027',
  'May 2027',
  'June 2027',
  'July 2027',
  'August 2027',
  'September 2027',
  'October 2027',
  'November 2027',
  'December 2027',
];

const COST_RANGES = [
  '< $17.500',
  '$17.500 - $19.650',
  '$20.000 - $ 28.850',
  '$29.850 - $31.450',
  '$52.900 - $58.500',
  '$52.900 - $58.500',
];

const RECENT_SEARCHES: PackageSearchOption[] = [
  {
    id: '1',
    city: 'Soekarno Hatta International Airport',
    code: 'CGK',
    location: 'Jakarta, Indonesia',
    type: 'airport',
  },
  {
    id: '2',
    city: 'Soekarno Hatta International Airport',
    code: 'CGK',
    location: 'Jakarta, Indonesia',
    type: 'airport',
  },
  {
    id: '3',
    city: 'Kuala Lumpur',
    code: 'All airports',
    location: 'Malaysia',
    type: 'city',
  },
];

const POPULAR_CITIES = [
  'Soekarno Hatta International Airport (CGK)',
  'Kuala Lumpur (All airports)',
  'Kuala Lumpur (All airports)',
  'Soekarno Hatta International Airport (CGK)',
  'Soekarno Hatta International Airport (CGK)',
  'Kuala Lumpur (All airports)',
];

export const usePackageList = () => {
  const [data, setData] = useState<PackageListOptions | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPackageData = async () => {
      try {
        await new Promise(resolve => setTimeout(() => resolve(true), 1000));
        setData({
          packages: PACKAGE_DATA,
          vendors: VENDOR_DATA,
          departureMonths: DEPARTURE_MONTHS,
          costRanges: COST_RANGES,
          recentSearches: RECENT_SEARCHES,
          popularCities: POPULAR_CITIES,
        });
        setIsLoading(false);
      } catch (err) {
        setError('Failed to fetch package data');
        setIsLoading(false);
      }
    };

    fetchPackageData();
  }, []);

  return { data, isLoading, error };
};
