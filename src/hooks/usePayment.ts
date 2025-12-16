import { useState, useEffect } from 'react';
import { PaymentCategory, PaymentInstruction, PaymentMethod, TransactionSummary } from '../types/payment';

// Mock Data
const PAYMENT_CATEGORIES: PaymentCategory[] = [
  {
    title: 'QRIS Payment',
    data: [
      {
        id: 'QRIS',
        label: 'QRIS',
        image: require('../assets/icons/qris.png'),
        category: 'QRIS Payment',
      },
    ],
  },
  {
    title: 'Virtual Account',
    data: [
      {
        id: 'BCA',
        label: 'BCA Virtual Account',
        image: require('../assets/icons/bca.png'),
        category: 'Virtual Account',
      },
      {
        id: 'Mandiri',
        label: 'Mandiri Virtual Account',
        image: require('../assets/icons/mandiri.png'),
        category: 'Virtual Account',
      },
      {
        id: 'BNI',
        label: 'BNI Virtual Account',
        image: require('../assets/icons/bni.png'),
        category: 'Virtual Account',
      },
      {
        id: 'BSI',
        label: 'BSI Virtual Account',
        image: require('../assets/icons/bsi.png'),
        category: 'Virtual Account',
      },
      {
        id: 'CIMB',
        label: 'CIMB Niaga Virtual Account',
        image: require('../assets/icons/cimbniaga.png'),
        category: 'Virtual Account',
      },
      {
        id: 'RHB',
        label: 'RHB Bank Virtual Account',
        image: require('../assets/icons/rhbank.png'),
        category: 'Virtual Account',
      },
      {
        id: 'Toyyibpay',
        label: 'Toyyibpay Virtual Account',
        image: require('../assets/icons/toyyibpay.png'),
        category: 'Virtual Account',
      },
    ],
  },
  {
    title: 'E-wallet',
    data: [
      {
        id: 'GoPay',
        label: 'GoPay',
        image: require('../assets/icons/gopay.png'),
        category: 'E-wallet',
      },
      {
        id: 'OVO',
        label: 'OVO',
        image: require('../assets/icons/ovo.png'),
        category: 'E-wallet',
      },
      {
        id: 'ShopeePay',
        label: 'ShopeePay',
        image: require('../assets/icons/shopeepay.png'),
        category: 'E-wallet',
      },
      {
        id: 'Dana',
        label: 'Dana',
        image: require('../assets/icons/dana.png'),
        category: 'E-wallet',
      },
    ],
  },
  {
    title: 'Credit/Debit Card',
    data: [
      {
        id: 'CC',
        label: 'Visa/Mastercard',
        image: require('../assets/icons/visamastercard.png'),
        category: 'Credit/Debit Card',
      },
    ],
  },
];

const FLIGHT_DETAILS_MOCK = [
    {
      id: '1',
      from: 'Jakarta',
      to: 'Jeddah',
      date: 'Wed, 04 Sept 2025 · 15:50',
    },
    {
      id: '2',
      from: 'Jeddah',
      to: 'Jakarta',
      date: 'Thu, 18 Sept 2025 · 20:10',
    },
];

export const usePayment = () => {
  const [isLoading, setIsLoading] = useState(false);
  
  const getPaymentCategories = async (): Promise<PaymentCategory[]> => {
    setIsLoading(true);
    // Simulate API delay
    await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
    setIsLoading(false);
    return PAYMENT_CATEGORIES;
  };

  const getPaymentInstruction = async (methodId: string): Promise<PaymentInstruction> => {
     setIsLoading(true);
     await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
     
     // Mock dynamic instruction based on method
     const method = PAYMENT_CATEGORIES.flatMap(c => c.data).find(m => m.id === methodId);
     const label = method ? method.label : methodId;
     
     setIsLoading(false);
     return {
         paymentMethodId: methodId,
         accountNumber: '1420 2010 0538 3789',
         accountHolder: 'EZUMRAH DIGITAL',
         expirationDate: '2025-09-12T00:06:00',
         steps: [
            {
              title: `${label} Mobile`,
              content: 'Step 1: Open App...\nStep 2: Select Pay...',
            },
            {
              title: 'Internet Banking',
              content: 'Step 1: Login...\nStep 2: Select Transfer...',
            },
            { title: 'ATM', content: 'Step 1: Insert Card...\nStep 2: Enter PIN...' },
         ]
     };
  };

  const getTransactionSummary = async (orderId: string): Promise<TransactionSummary> => {
      setIsLoading(true);
      await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
      setIsLoading(false);
      
      return {
          orderId,
          totalAmount: 35000,
          currency: 'USD',
          status: 'PENDING',
          flights: FLIGHT_DETAILS_MOCK,
      };
  };

  return {
      isLoading,
      getPaymentCategories,
      getPaymentInstruction,
      getTransactionSummary,
      PAYMENT_CATEGORIES, // Export static for initial render if needed
  };
};
