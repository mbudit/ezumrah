import { api } from './api';
import { User } from '../types';

const MOCK_USER: User = {
  id: 'u1',
  name: 'Budi Santoso',
  email: 'budi@example.com',
  phoneNumber: '+628123456789',
};

export const authService = {
  login: async (email: string, password: string): Promise<{ user: User; token: string }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          user: MOCK_USER,
          token: 'mock-jwt-token',
        });
      }, 1000);
    });
  },

  register: async (data: any): Promise<{ user: User; token: string }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          user: MOCK_USER,
          token: 'mock-jwt-token',
        });
      }, 1000);
    });
  },

  verifyOtp: async (email: string, otp: string): Promise<boolean> => {
     return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 1000);
    });
  },

  logout: async () => {
     return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 500);
    });
  }
};
