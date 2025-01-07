import api from './api';

class AuthService {
  async register(name: string, email: string, password: string) {
    try {
      const response = await api.post('/auth/register', { name, email, password });
      return response.data;
    } catch (error: any) {
      throw error.response ? error.response.data : error.message;
    }
  }

  async login(email: string, password: string) {
    try {
      const response = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', response.data.user);
      return response.data;
    } catch (error: any) {
      throw error.response ? error.response.data : error.message;
    }
  }

  async getUserProfile() {
    try {
      const response = await api.get('/auth/user');
      return response.data;
    } catch (error: any) {
      throw error.response ? error.response.data : error.message;
    }
  }

  async logout() {
    try {
      await api.get('/auth/logout');
      // Remove token and user_id from localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user_id');
    } catch (error: any) {
      throw error.response ? error.response.data : error.message;
    }
  }

  async googleOAuth(code: string) {
    try {
      const response = await api.post('/auth/google', { code });
      return response.data;
    } catch (error: any) {
      console.error("Google login error: ", error.response?.data || error.message);
      throw error.response?.data || { error: "An error occurred during Google login" };
    }
  };
}

export default new AuthService();