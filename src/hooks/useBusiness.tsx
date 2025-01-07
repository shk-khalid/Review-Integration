import { useState, useEffect } from 'react';
import { Business } from '../types/business';
import  businessService  from '../services/businessService';

const useBusiness = (userId: number) => {
  const [businesses, setBusiness] = useState<Business[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBusinesses = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await businessService.getBusinessById(userId);
        setBusiness(data);
      } catch (err: any) {
        setError(err.response?.data?.error || 'Failed to fetch businesses');
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchBusinesses();
  }, [userId]);

  return { businesses, loading, error};
}
  
export default useBusiness;