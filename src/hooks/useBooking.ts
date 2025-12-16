import { useState, useEffect } from 'react';
import { BookingState, BookingPackageInfo, Passenger, ContactDetails } from '../types/booking';

const MOCK_PACKAGE: BookingPackageInfo = {
  id: '1',
  title: 'Haji Plus 2027',
  startDate: '04 Sept 2025',
  endDate: '25 Sept 2025',
  duration: '21 Days',
  startLocation: 'Jakarta (CGK)',
  endLocation: 'Jeddah (JED)',
  airlineName: 'Garuda Indonesia',
  airlineLogo: require('../assets/logo/garuda.png'),
  hotelName: 'Makkah Clock Royal Tower',
  hotelCity: 'Makkah',
  pricePerPerson: 17500, // stored as number, display formatted
};

const INITIAL_CONTACT: ContactDetails = {
  fullName: 'Budi Santoso',
  email: 'budi@example.com',
  phoneNumber: '+6281234567890',
};

const INITIAL_PASSENGERS: Passenger[] = [
  {
    id: '1',
    type: 'Adult',
    title: 'Mr',
    fullName: 'Budi Santoso',
  },
];

// Simple in-memory store for mock persistence across screens
let GLOBAL_STATE: BookingState = {
  packageInfo: null,
  contactDetails: INITIAL_CONTACT,
  passengers: INITIAL_PASSENGERS,
  totalPrice: 0,
  paymentType: 'Full',
  priceBreakdown: {
    basePrice: 0,
    discount: 0,
    taxIncluded: true,
  },
  selectedEnhancements: {},
  selectedVoucher: null,
};

export const useBooking = (packageId: string | undefined) => {
  const [bookingState, setBookingState] = useState<BookingState>(GLOBAL_STATE);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBookingContext = async () => {
      // If global state is already populated (has package info), use it immediately
      if (GLOBAL_STATE.packageInfo) {
        setBookingState(GLOBAL_STATE);
        setIsLoading(false);
        return;
      }

      await new Promise(resolve => setTimeout(() => resolve(true), 500));
      
      const price = MOCK_PACKAGE.pricePerPerson * INITIAL_PASSENGERS.length;
      
      const newState = {
        ...GLOBAL_STATE,
        packageInfo: MOCK_PACKAGE,
        totalPrice: price,
      };
      
      GLOBAL_STATE = newState;
      setBookingState(newState);
      setIsLoading(false);
    };

    fetchBookingContext();
  }, [packageId]);

  const updateState = (newState: BookingState) => {
    GLOBAL_STATE = newState;
    setBookingState(newState);
  };

  const updateContactDetails = (details: Partial<ContactDetails>) => {
    const newState = {
      ...bookingState,
      contactDetails: { ...bookingState.contactDetails, ...details },
    };
    updateState(newState);
  };

  const addPassenger = () => {
    const newId = (bookingState.passengers.length + 1).toString();
    const newPassenger: Passenger = {
      id: newId,
      type: 'Adult',
      title: 'Mr',
      fullName: '',
    };
    
    const newPassengers = [...bookingState.passengers, newPassenger];
    const newState = {
      ...bookingState,
      passengers: newPassengers,
      totalPrice: (bookingState.packageInfo?.pricePerPerson || 0) * newPassengers.length,
      priceBreakdown: {
         basePrice: (bookingState.packageInfo?.pricePerPerson || 0) * newPassengers.length,
         discount: 0,
         taxIncluded: true,
      },
    };
    updateState(newState);
  };

  const removePassenger = (id: string) => {
    if (bookingState.passengers.length <= 1) return;
    
    const newPassengers = bookingState.passengers.filter(p => p.id !== id);
    const newState = {
       ...bookingState,
       passengers: newPassengers,
       totalPrice: (bookingState.packageInfo?.pricePerPerson || 0) * newPassengers.length,
       priceBreakdown: {
         basePrice: (bookingState.packageInfo?.pricePerPerson || 0) * newPassengers.length,
         discount: 0,
         taxIncluded: true,
      },
    };
    updateState(newState);
  };

  const updatePassenger = (id: string, details: Partial<Passenger>) => {
    const newState = {
      ...bookingState,
      passengers: bookingState.passengers.map(p => 
        p.id === id ? { ...p, ...details } : p
      ),
    };
    updateState(newState);
  };

  const setPaymentType = (type: 'Full' | 'Deposit') => {
      const newState = { ...bookingState, paymentType: type };
      updateState(newState);
  };

  const uploadPassengerDocument = async (passengerId: string, type: 'passport' | 'photo', uri: string) => {
      // Mock upload
      setIsLoading(true);
      await new Promise<void>(resolve => setTimeout(() => resolve(), 1000));
      
      const field = type === 'passport' ? 'passportScan' : 'photo';
      updatePassenger(passengerId, { [field]: uri });
      setIsLoading(false);
  };

  const toggleEnhancement = (enhancementId: string, quantity: number, pricePerUnit: number) => {
      const newEnhancements = { ...bookingState.selectedEnhancements };
      if (quantity > 0) {
          newEnhancements[enhancementId] = quantity;
      } else {
          delete newEnhancements[enhancementId];
      }
      
      const newState = { 
          ...bookingState, 
          selectedEnhancements: newEnhancements 
      };
      updateState(newState);
  };

  const calculateTotalPrice = (enhancementTotal: number) => {
      const base = (bookingState.packageInfo?.pricePerPerson || 0) * bookingState.passengers.length;
      const total = base + enhancementTotal;
      if (total !== bookingState.totalPrice) {
          updateState({ ...bookingState, totalPrice: total });
      }
  };

  const applyVoucher = (voucher: { code: string; discount: number; type: 'percentage' | 'fixed' }) => {
      const basePrice = (bookingState.packageInfo?.pricePerPerson || 0) * bookingState.passengers.length;
      const enhancementTotal = Object.entries(bookingState.selectedEnhancements).reduce((sum, [id, qty]) => sum + qty, 0);
      
      let discountAmount = 0;
      if (voucher.type === 'percentage') {
          discountAmount = (basePrice + enhancementTotal) * (voucher.discount / 100);
      } else {
          discountAmount = voucher.discount;
      }
      
      const newState = {
          ...bookingState,
          selectedVoucher: voucher,
          priceBreakdown: {
              ...bookingState.priceBreakdown,
              discount: discountAmount,
          },
          totalPrice: basePrice + enhancementTotal - discountAmount,
      };
      updateState(newState);
  };

  const removeVoucher = () => {
      const basePrice = (bookingState.packageInfo?.pricePerPerson || 0) * bookingState.passengers.length;
      const enhancementTotal = Object.entries(bookingState.selectedEnhancements).reduce((sum, [id, qty]) => sum + qty, 0);
      
      const newState = {
          ...bookingState,
          selectedVoucher: null,
          priceBreakdown: {
              ...bookingState.priceBreakdown,
              discount: 0,
          },
          totalPrice: basePrice + enhancementTotal,
      };
      updateState(newState);
  };

  return {
    bookingState,
    isLoading,
    updateContactDetails,
    addPassenger,
    removePassenger,
    updatePassenger,
    setPaymentType,
    uploadPassengerDocument,
    toggleEnhancement,
    calculateTotalPrice,
    applyVoucher,
    removeVoucher,
  };
};
