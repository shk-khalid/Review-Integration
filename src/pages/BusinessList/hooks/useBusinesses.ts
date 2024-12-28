import { useState, useEffect } from 'react';
import { Business } from '../types';
import { businessService } from '../../../services/business.service';

export function useBusinesses() {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const data = await businessService.getBusinesses();
        setBusinesses(data);
      } catch (err) {
        setError('Failed to fetch businesses');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBusinesses();
  }, []);

  return { businesses, isLoading, error };
}