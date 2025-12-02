// This is a mock service to simulate backend calls.
// It helps the backend developer understand the expected data structure.

export interface ServiceItem {
  id: string;
  title: string;
  icon: string; // In a real app, this might be a URL or an icon name
  description: string;
}

const MOCK_SERVICES: ServiceItem[] = [
  {
    id: '1',
    title: 'Umrah Packages',
    icon: 'kaaba',
    description: 'Browse our premium Umrah packages.',
  },
  {
    id: '2',
    title: 'Visa Processing',
    icon: 'passport',
    description: 'Fast and reliable visa assistance.',
  },
  {
    id: '3',
    title: 'Hotels',
    icon: 'hotel',
    description: 'Luxury stays near the Haram.',
  },
  {
    id: '4',
    title: 'Transport',
    icon: 'bus',
    description: 'Comfortable transfers and ziyarah.',
  },
];

export const fetchServices = async (): Promise<ServiceItem[]> => {
  // Simulate network delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_SERVICES);
    }, 1000);
  });
};

export const fetchUserProfile = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                name: 'Abdullah',
                avatar: 'https://via.placeholder.com/150',
            });
        }, 500);
    });
}
