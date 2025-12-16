import { useState } from 'react';
import { FlightBooking, Flight, TicketOption, PassengerInfo, ContactInfo } from '../types/flight';

export const useFlightBooking = () => {
  const [booking, setBooking] = useState<FlightBooking | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createBooking = async (
    flight: Flight,
    ticket: TicketOption,
    passengers: PassengerInfo[],
    contactDetails: ContactInfo
  ): Promise<FlightBooking | null> => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(() => resolve(true), 800));
      
      const newBooking: FlightBooking = {
        id: Date.now().toString(),
        flight,
        ticket,
        passengers,
        contactDetails,
        totalPrice: ticket.price,
        status: 'pending',
      };
      
      setBooking(newBooking);
      return newBooking;
    } catch (err) {
      setError('Failed to create booking');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const getBooking = async (id: string): Promise<FlightBooking | null> => {
    try {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(() => resolve(true), 500));
      
      // Return current booking if ID matches
      if (booking && booking.id === id) {
        return booking;
      }
      
      return null;
    } catch (err) {
      setError('Failed to fetch booking');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const confirmBooking = async (bookingId: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(() => resolve(true), 500));
      
      if (booking && booking.id === bookingId) {
        setBooking({ ...booking, status: 'confirmed' });
        return true;
      }
      
      return false;
    } catch (err) {
      setError('Failed to confirm booking');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    booking,
    isLoading,
    error,
    createBooking,
    getBooking,
    confirmBooking,
  };
};
