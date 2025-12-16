import { LucideIcon } from 'lucide-react-native';

export type EnhancementCategory = 'add-on' | 'protection' | 'refund' | 'reschedule';

export interface Enhancement {
  id: string;
  category: EnhancementCategory;
  title: string;
  description: string;
  price: number;
  unit: string; // e.g., '/5 kg', '/pax', '/item'
  iconName: string; // Lucide icon name stored as string to mapping
  benefits?: string[]; // For protection/insurance details
  maxQuantity?: number; // If applicable (e.g. baggage)
  recommended?: boolean;
}

export interface EnhancementSelection {
  enhancementId: string;
  quantity: number;
}
