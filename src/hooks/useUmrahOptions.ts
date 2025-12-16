import { useState, useEffect } from 'react';
import { UmrahFormOptions } from '../types/umrah';
import { COUNTRIES } from '../data/countries'; // Import existing data as source

export const useUmrahOptions = () => {
  const [options, setOptions] = useState<UmrahFormOptions | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        setIsLoading(true);
        // Simulate API fetch delay
        await new Promise(resolve => setTimeout(() => resolve(true), 500));

        const mockData: UmrahFormOptions = {
          countries: COUNTRIES, // Returning the full list from data file
          recentSearches: [
            {
              id: '1',
              city: 'Kuala Lumpur',
              country: 'Malaysia',
              subtext: 'All airports',
            },
            {
              id: '2',
              city: 'Kuala Lumpur',
              country: 'Malaysia',
              subtext: 'All airports',
            },
          ],
          popularCities: [
            'Kuala Lumpur',
            'Penang',
            'Langkawi',
            'Langkawi',
            'Johor Bahru',
          ],
          departureMonths: [
            'January 2027',
            'February 2027',
            'March 2027',
            'April 2027',
            'May 2027',
            'June 2027',
            'July 2027',
            'August 2027',
            'September 2027',
            'October 2027',
            'November 2027',
            'December 2027',
          ],
          costRanges: [
            '< $17.500',
            '$17.500 - $19.650',
            '$20.000 - $ 28.850',
            '$29.850 - $31.450',
            '$52.900 - $58.500',
          ],
        };

        setOptions(mockData);
        setIsLoading(false);
      } catch (err) {
        setError(err as Error);
        setIsLoading(false);
      }
    };

    fetchOptions();
  }, []);

  return { options, isLoading, error };
};
