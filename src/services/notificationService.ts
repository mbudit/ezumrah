import { api } from './api';
import { NotificationItem } from '../types';

const MOCK_NOTIFICATIONS: NotificationItem[] = [
     {
        id: '1',
        title: 'Payment Successful',
        description: 'Your payment for Haji Plus 2026 has been confirmed.',
        time: '2 mins ago',
        type: 'order',
        isRead: false
    },
    {
        id: '2',
        title: 'New Promo Alert!',
        description: 'Get 10% off on Ramadhan packages.',
        time: '2 hours ago',
        type: 'promo',
        isRead: true
    }
];

export const notificationService = {
  getNotifications: async (): Promise<NotificationItem[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(MOCK_NOTIFICATIONS);
      }, 500);
    });
  },

  markAsRead: async (id: string): Promise<boolean> => {
      return new Promise((resolve) => {
          // Logic to update local mock state could go here
          setTimeout(() => resolve(true), 200);
      });
  }
};
