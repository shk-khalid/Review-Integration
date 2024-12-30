import api from '../lib/api';
import { LoginResponse, RegisterResponse, GoogleAuthResponse } from '../types/auth';

export const authService = {
  async login(email: string, password: string): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>('/auth/login', {
      email,
      password,
    });
    return response.data;
  },

  async register(name: string, email: string, password: string): Promise<RegisterResponse> {
    const response = await api.post<RegisterResponse>('/auth/register', {
      name,
      email,
      password,
    });
    return response.data;
  },

  async googleLogin(): Promise<string> {
    try {
      const response = await api.get<{ url: string }>('/google/login');
      return response.data.url;
    } catch (error) {
      console.error('Google login error:', error);
      throw new Error('Failed to initialize Google login');
    }
  },

  async handleGoogleCallback(code: string): Promise<GoogleAuthResponse> {
    try {
      const response = await api.get<GoogleAuthResponse>(`/google/callback?code=${code}`);
      return response.data;
    } catch (error) {
      console.error('Google callback error:', error);
      throw new Error('Failed to complete Google authentication');
    }
  },

  async logout(): Promise<void> {
    await api.post('/auth/logout');
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
  },
};