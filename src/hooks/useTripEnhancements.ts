import { useState, useEffect } from 'react';
import { Enhancement } from '../types/enhancement';

const MOCK_ENHANCEMENTS: Enhancement[] = [
  {
    id: 'baggage-5kg',
    category: 'add-on',
    title: 'Extra Baggage',
    description: 'Clothes, souvenirs, shoes, and stuff. You sure 10 kg is enough?',
    price: 90000,
    unit: '/5 kg',
    iconName: 'Luggage',
  },
  {
    id: 'flight-delay',
    category: 'protection',
    title: 'Flight Delay Insurance',
    description: 'Get compensated if your flight delay above 90 minutes',
    price: 76700,
    unit: '/pax',
    iconName: 'Plane',
    benefits: ['Get compensated if your flight delay above 90 minutes up to IDR 600.000'],
  },
  {
    id: 'baggage-lost',
    category: 'protection',
    title: 'Baggage Lost Insurance',
    description: 'Lost or damaged baggage protection',
    price: 13300,
    unit: '/pax',
    iconName: 'Briefcase',
    benefits: ['Lost or damaged baggage up to IDR 5 million/item', 'Repair cost IDR 1 million'],
  },
  {
    id: 'refund-guarantee',
    category: 'refund',
    title: '100% Refund Guarantee',
    description: 'Covers any cancellation reasons',
    price: 80000,
    unit: '/pax',
    iconName: 'Shield',
    benefits: ['Covers any cancellation reasons, including personal reason', 'Flexibility to cancel for any reason up to 24 hours before departure.'],
    recommended: true,
  },
  {
    id: 'reschedule-protection',
    category: 'reschedule',
    title: 'Airline Reschedule Protection',
    description: 'Covers up to 50% of the price of the canceled ticket',
    price: 30000,
    unit: '/pax',
    iconName: 'Clock',
    benefits: ['Covers up to 50% of the price of the canceled ticket (max. IDR 4 million)'],
  },
];

export const useTripEnhancements = () => {
  const [enhancements, setEnhancements] = useState<Enhancement[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEnhancements = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(() => resolve(true), 500));
      setEnhancements(MOCK_ENHANCEMENTS);
      setIsLoading(false);
    };

    fetchEnhancements();
  }, []);

  return { enhancements, isLoading };
};
