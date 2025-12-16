import { useState, useEffect } from 'react';
import { UserProfile, UserStats, UpdateProfileData } from '../types/user';

const MOCK_PROFILE: UserProfile = {
  id: '1',
  name: 'Hasan Barsain',
  email: 'Hasannagoro@gmail.com',
  phone: '+60123456789',
  emergencyPhone: '+60123456788',
  dateOfBirth: '12 May 1999',
  gender: 'Male',
};

const MOCK_STATS: UserStats = {
  totalOrders: 12,
  completedOrders: 8,
  pendingOrders: 4,
  points: 1250,
  wishlistCount: 5,
};

export const useProfile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(() => resolve(true), 500));
        setProfile(MOCK_PROFILE);
        setStats(MOCK_STATS);
        setError(null);
      } catch (err) {
        setError('Failed to load profile');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const updateProfile = async (data: UpdateProfileData): Promise<boolean> => {
    try {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(() => resolve(true), 500));
      
      setProfile(prev => prev ? { ...prev, ...data } : null);
      setError(null);
      return true;
    } catch (err) {
      setError('Failed to update profile');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const uploadAvatar = async (uri: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(() => resolve(true), 500));
      
      setProfile(prev => prev ? { ...prev, avatar: uri } : null);
      setError(null);
      return true;
    } catch (err) {
      setError('Failed to upload avatar');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    profile,
    stats,
    isLoading,
    error,
    updateProfile,
    uploadAvatar,
  };
};
