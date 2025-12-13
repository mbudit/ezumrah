import { api } from './api';
import { PaymentMethod, Order } from '../types';

const MOCK_PAYMENT_METHODS: PaymentMethod[] = [
    { id: 'QRIS', label: 'QRIS', category: 'QRIS', image: require('../../assets/icons/qris.png') },
    { id: 'BCA', label: 'BCA Virtual Account', category: 'Virtual Account', image: require('../../assets/icons/bca.png') },
    // Add others as needed matching the screen data
];

export const paymentService = {
  getPaymentMethods: async (): Promise<PaymentMethod[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(MOCK_PAYMENT_METHODS);
      }, 500);
    });
  },

  selectPaymentMethod: async (orderId: string, methodId: string): Promise<boolean> => {
      return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true); // Payment method attached to order
      }, 500);
    });
  },

  processPayment: async (orderId: string): Promise<{ success: boolean, transactionId: string }> => {
     return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
            success: true,
            transactionId: 'tx_' + Math.random().toString(36).substr(2, 9)
        });
      }, 2000);
    });
  },
  
  checkPaymentStatus: async (orderId: string): Promise<Order['status']> => {
      return new Promise((resolve) => {
      setTimeout(() => {
        // Randomly return success or waiting for demo purposes, or default to waiting
        resolve('Waiting'); 
      }, 1000);
    });
  }
};
