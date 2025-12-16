import { useState, useEffect } from 'react';
import { HomeData, PrayerTimeData } from '../types/home';

export const useHomeData = () => {
  const [data, setData] = useState<HomeData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Simulate API fetch
    const fetchHomeData = async () => {
      try {
        setIsLoading(true);
        // Simulate delay
        await new Promise(resolve => setTimeout(() => resolve(true), 1000));

        const mockPrayerData: PrayerTimeData = {
          location: 'Masjidil Haram, Makkah al-Mukarramah',
          nextPrayerName: 'Subuh',
          nextPrayerTime: '04.46 WAS',
          countdown: '— 05 : 25 : 22',
          dateString: '31 Agustus 2025',
          hijriDateString: '7 Rabiul Awal 1447',
        };

        setData({
          prayerData: mockPrayerData,
        });
        setIsLoading(false);
      } catch (err) {
        setError(err as Error);
        setIsLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  return { data, isLoading, error };
};
