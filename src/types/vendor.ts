import { ImageSourcePropType } from 'react-native';

export interface VendorStaff {
  id: string;
  name: string;
  image: ImageSourcePropType;
}

export interface VendorReview {
  id: string;
  name: string;
  initials: string;
  rating: number;
  date: string;
  text: string;
}

export interface VendorProduct {
  id: string;
  title: string;
  rating: number;
  reviews: number;
  price: string;
  originalPrice: string;
  image: ImageSourcePropType;
}

export interface VendorCategory {
  id: string;
  title: string;
  count: number;
}

export interface VendorProfile {
  name: string;
  location: string;
  description: string;
  license: string;
  fullAddress: string;
  stats: {
    rating: string;
    properties: string;
    chatReplied: string;
  };
}

export interface VendorDetailData {
  profile: VendorProfile;
  mutawwif: VendorStaff[];
  mutawwifah: VendorStaff[];
  reviews: VendorReview[];
  recommended: VendorProduct[];
  products: VendorProduct[];
  categories: VendorCategory[];
  productFilters: string[];
}
