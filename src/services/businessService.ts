import api from "./api"
import { Business } from '../types/business';

class BusinessService {
  async getBusinessById(user_id: number): Promise<Business[]> {
    try {
      const response = await api.get(`/business/${user_id}`);
      return response.data.businesses;
    } catch (error: any) {
      console.error('Error fetching user businesses:', error.response?.data || error.message);
      throw error;
    }
  }
}


export default new BusinessService();