import { useState, useEffect } from 'react';

export interface ReferenceOption {
  id: string;
  label: string;
  value: string;
}

const MOCK_JOBS: ReferenceOption[] = [
  { id: '1', label: 'Private Employee', value: 'Private Employee' },
  { id: '2', label: 'Government Employee', value: 'Government Employee' },
  { id: '3', label: 'Entrepreneur', value: 'Entrepreneur' },
  { id: '4', label: 'Student', value: 'Student' },
  { id: '5', label: 'Housewife', value: 'Housewife' },
  { id: '6', label: 'Retired', value: 'Retired' },
  { id: '7', label: 'Other', value: 'Other' },
];

const MOCK_NATIONALITIES: ReferenceOption[] = [
  { id: '1', label: 'Indonesia', value: 'Indonesia' },
  { id: '2', label: 'Malaysia', value: 'Malaysia' },
  { id: '3', label: 'Singapore', value: 'Singapore' },
  { id: '4', label: 'Brunei', value: 'Brunei' },
  { id: '5', label: 'Saudi Arabia', value: 'Saudi Arabia' },
];

const MOCK_GENDERS: ReferenceOption[] = [
  { id: '1', label: 'Male', value: 'Male' },
  { id: '2', label: 'Female', value: 'Female' },
];

export const useReferenceData = () => {
  const [jobs, setJobs] = useState<ReferenceOption[]>([]);
  const [nationalities, setNationalities] = useState<ReferenceOption[]>([]);
  const [genders, setGenders] = useState<ReferenceOption[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(() => resolve(true), 500));
      
      setJobs(MOCK_JOBS);
      setNationalities(MOCK_NATIONALITIES);
      setGenders(MOCK_GENDERS);
      
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return {
    jobs,
    nationalities,
    genders,
    isLoading,
  };
};
