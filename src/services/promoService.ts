import { api } from './api';
import { Voucher } from '../types';

const MOCK_VOUCHERS: Voucher[] = [
    {
        id: '1',
        code: 'HEMAT10',
        description: 'Discount 10% for all packages',
        discountAmount: 10, // Percent?
        expiryDate: '2025-12-31'
    }
];

export const promoService = {
  getVouchers: async (): Promise<Voucher[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(MOCK_VOUCHERS);
      }, 500);
    });
  },

  applyPromoCode: async (code: string): Promise<{ valid: boolean; discount?: number; voucher?: Voucher }> => {
      return new Promise((resolve) => {
          setTimeout(() => {
              if (code === 'HEMAT10') {
                  resolve({ valid: true, discount: 10, voucher: MOCK_VOUCHERS[0] });
              } else {
                  resolve({ valid: false });
              }
          }, 800);
      });
  }
};
