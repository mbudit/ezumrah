import { api } from './api';
import { Vendor } from '../types';

const MOCK_VENDORS: Vendor[] = [
  {
    id: '1',
    name: 'Tazkiyah Tour',
    logo: require('../../assets/icons/vendor_logo.png'), 
    verified: true,
    rating: 4.8,
    location: 'Kuala Lumpur, Malaysia'
  },
  {
    id: '2',
    name: 'Al-Haramain',
    logo: require('../../assets/icons/vendor_logo.png'),
    verified: true,
    rating: 4.5,
    location: 'Jakarta, Indonesia'
  }
];

export const vendorService = {
  getVendor: async (id: string): Promise<Vendor | undefined> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(MOCK_VENDORS.find(v => v.id === id));
      }, 500);
    });
  }
};
