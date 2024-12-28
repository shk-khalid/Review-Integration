import { Business } from '../pages/BusinessList/types';
import { ApiError } from './api';
import axios from './api/axios';
import { endpoints } from './api/endpoints';

class BusinessService {
  async getBusinesses(): Promise<Business[]> {
    try {
      return await axios.get(endpoints.businesses.list);
    } catch (error) {
      throw new ApiError(error.response?.status || 500, 'Failed to fetch businesses');
    }
  }

  async getBusinessById(id: string): Promise<Business> {
    try {
      return await axios.get(endpoints.businesses.details(id));
    } catch (error) {
      if (error.response?.status === 404) {
        throw new ApiError(404, 'Business not found');
      }
      throw new ApiError(500, 'Failed to fetch business details');
    }
  }

  async getBusinessReviews(id: string) {
    try {
      return await axios.get(endpoints.businesses.reviews(id));
    } catch (error) {
      throw new ApiError(error.response?.status || 500, 'Failed to fetch reviews');
    }
  }

  async replyToReview(reviewId: string, reply: string) {
    try {
      return await axios.post(endpoints.reviews.reply(reviewId), { reply });
    } catch (error) {
      throw new ApiError(error.response?.status || 500, 'Failed to reply to review');
    }
  }

  async likeReview(reviewId: string) {
    try {
      return await axios.post(endpoints.reviews.like(reviewId));
    } catch (error) {
      throw new ApiError(error.response?.status || 500, 'Failed to like review');
    }
  }
}

export const businessService = new BusinessService();