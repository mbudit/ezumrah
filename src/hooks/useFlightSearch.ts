import { useState } from 'react';
import { Flight, FlightSearchParams } from '../types/flight';

const MOCK_FLIGHTS: Flight[] = [
  {
    id: '1',
    date: '02 Oct 2025',
    departureTime: '06:45',
    departureCode: 'KUL',
    duration: '1h 10m',
    isDirect: true,
    arrivalTime: '07:45',
    arrivalCode: 'SIN',
    airline: 'Scoot',
    class: 'Economy',
    price: '417,100',
    nonRefundable: true,
    logo: require('../assets/airlines/scoot.png'),
  },
  {
    id: '2',
    date: '02 Oct 2025',
    departureTime: '09:00',
    departureCode: 'KUL',
    duration: '1h 10m',
    isDirect: true,
    arrivalTime: '10:10',
    arrivalCode: 'SIN',
    airline: 'AirAsia',
    class: 'Economy',
    price: '450,000',
    nonRefundable: false,
    logo: require('../assets/airlines/scoot.png'),
  },
  {
    id: '3',
    date: '03 Oct 2025',
    departureTime: '14:30',
    departureCode: 'KUL',
    duration: '1h 15m',
    isDirect: true,
    arrivalTime: '15:45',
    arrivalCode: 'SIN',
    airline: 'Malaysia Airlines',
    class: 'Economy',
    price: '520,000',
    nonRefundable: true,
    logo: require('../assets/airlines/scoot.png'),
  },
  {
    id: '4',
    date: '04 Oct 2025',
    departureTime: '18:00',
    departureCode: 'KUL',
    duration: '1h 05m',
    isDirect: true,
    arrivalTime: '19:05',
    arrivalCode: 'SIN',
    airline: 'Scoot',
    class: 'Economy',
    price: '390,000',
    nonRefundable: true,
    logo: require('../assets/airlines/scoot.png'),
  },
];

export const useFlightSearch = () => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchParams, setSearchParams] = useState<FlightSearchParams | null>(null);

  const searchFlights = async (params: FlightSearchParams): Promise<Flight[]> => {
    try {
      setIsSearching(true);
      setSearchParams(params);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(() => resolve(true), 800));
      
      // Filter mock flights based on search params
      const results = MOCK_FLIGHTS.filter(flight => {
        // In a real app, this would be done by the backend
        return flight.departureCode === params.from && flight.arrivalCode === params.to;
      });
      
      setFlights(results.length > 0 ? results : MOCK_FLIGHTS);
      return results.length > 0 ? results : MOCK_FLIGHTS;
    } catch (error) {
      console.error('Flight search error:', error);
      return [];
    } finally {
      setIsSearching(false);
    }
  };

  const getFlightDetails = async (id: string): Promise<Flight | null> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(() => resolve(true), 300));
    
    const flight = MOCK_FLIGHTS.find(f => f.id === id);
    return flight || null;
  };

  return {
    flights,
    isSearching,
    searchParams,
    searchFlights,
    getFlightDetails,
  };
};
