export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  emergencyPhone?: string;
  avatar?: string;
  dateOfBirth?: string;
  gender?: 'Male' | 'Female' | 'Other';
  address?: string;
  city?: string;
  country?: string;
  postalCode?: string;
}

export interface UserStats {
  totalOrders: number;
  completedOrders: number;
  pendingOrders: number;
  points: number;
  wishlistCount: number;
}

export interface UpdateProfileData {
  name?: string;
  email?: string;
  phone?: string;
  emergencyPhone?: string;
  dateOfBirth?: string;
  gender?: 'Male' | 'Female' | 'Other';
  address?: string;
  city?: string;
  country?: string;
  postalCode?: string;
}
