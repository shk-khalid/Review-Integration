import { useState, useEffect, useCallback } from 'react';
import { DashboardData } from '../types';
import { mockDashboardData } from '../data/mockData';

export function useDashboardData() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setData(mockDashboardData);
      } catch (err) {
        setError('Failed to fetch dashboard data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleReplyToReview = useCallback(async (reviewId: string, reply: string) => {
    if (!data) return;
    
    try {
      // TODO: Implement API call
      setData(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          reviews: prev.reviews.map(review =>
            review.id === reviewId
              ? { ...review, reply, hasReplied: true }
              : review
          ),
        };
      });
    } catch (error) {
      console.error('Failed to reply to review:', error);
    }
  }, [data]);

  const handleLikeReview = useCallback(async (reviewId: string) => {
    if (!data) return;
    
    try {
      // TODO: Implement API call
      setData(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          reviews: prev.reviews.map(review =>
            review.id === reviewId
              ? {
                  ...review,
                  isLiked: !review.isLiked,
                  likes: review.isLiked ? review.likes - 1 : review.likes + 1,
                }
              : review
          ),
        };
      });
    } catch (error) {
      console.error('Failed to like review:', error);
    }
  }, [data]);

  return {
    data,
    isLoading,
    error,
    handleReplyToReview,
    handleLikeReview,
  };
}