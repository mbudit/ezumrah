import { useState, useEffect } from 'react';
import { Order, RecentlyViewedItem, OrderData } from '../types/order';

const HISTORY_DATA: Order[] = [
  {
    id: '1',
    title: 'Haji Plus 2027',
    date: '20 Mei - 10 Juni 2025',
    status: 'success',
    price: 'RM 30.334', // Example
    image: require('../assets/icons/kaaba.png'),
  },
];

const ACTIVE_ORDER: Order = {
  id: '1999120524',
  title: 'Haji Plus 2026',
  price: 'IDR 240.000.000',
  status: 'waiting',
  image: require('../assets/icons/kaaba.png'),
  secondsRemaining: 792, // 00:13:12
};

const RECENTLY_VIEWED: RecentlyViewedItem[] = [
  {
    id: '1',
    title: 'Makkah Clock Royal Tower A Fairmont Hotel',
    rating: 4.5,
    reviews: 312,
    price: 'IDR 3.825.552',
    originalPrice: 'IDR 5.100.736',
    image: require('../assets/icons/kaaba.png'),
  },
  {
    id: '2',
    title: 'Makkah Clock Royal Tower A Fairmont Hotel',
    rating: 4.5,
    reviews: 312,
    price: 'IDR 3.825.552',
    originalPrice: 'IDR 5.100.736',
    image: require('../assets/icons/kaaba.png'),
  },
];

export const useOrderData = () => {
  const [data, setData] = useState<OrderData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        await new Promise(resolve => setTimeout(() => resolve(true), 1000));
        setData({
          activeOrder: ACTIVE_ORDER,
          historyOrders: HISTORY_DATA,
          recentlyViewed: RECENTLY_VIEWED,
        });
        setIsLoading(false);
      } catch (err) {
        setError('Failed to fetch order data');
        setIsLoading(false);
      }
    };

    fetchOrderData();
  }, []);

  return { data, isLoading, error };
};
