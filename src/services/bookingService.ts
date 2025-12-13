import { api } from './api';
import { BookingRequest, Order } from '../types';

export const bookingService = {
  createBooking: async (bookingData: BookingRequest): Promise<Order> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: 'ord_' + Math.random().toString(36).substr(2, 9),
          orderId: '1999120524',
          package: {
              id: bookingData.packageId,
              title: 'Haji Plus 2026', // In real app, fetch from ID
              price: bookingData.totalPrice,
              rating: 0,
              reviews: 0,
              vendor: { id: 'v1', name: 'Tazkiyah', logo: null },
              flights: [],
              hotels: [],
              images: []
          },
          status: 'Waiting',
          bookingDate: new Date().toISOString(),
          totalAmount: bookingData.totalPrice,
        });
      }, 1500);
    });
  },
};
