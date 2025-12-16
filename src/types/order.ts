import { ImageSourcePropType } from 'react-native';

export type OrderStatus = 'waiting' | 'success' | 'cancelled';

export interface Order {
  id: string;
  title: string;
  price: string;
  originalPrice?: string;
  status: OrderStatus;
  date?: string; // For history
  image: ImageSourcePropType;
  
  // Details for specific views
  rating?: number;
  reviews?: number;
  distance?: string;
  
  // Timer for waiting status (in seconds remaining)
  secondsRemaining?: number;
}

export interface RecentlyViewedItem {
  id: string;
  title: string;
  rating: number;
  reviews: number;
  price: string;
  originalPrice: string;
  image: ImageSourcePropType;
}

export interface OrderData {
  activeOrder: Order | null;
  historyOrders: Order[];
  recentlyViewed: RecentlyViewedItem[];
}
