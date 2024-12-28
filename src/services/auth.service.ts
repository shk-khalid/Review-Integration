import { LoginCredentials, RegisterCredentials, User } from '../types/auth';
import { ApiError } from './api';
import axios from './api/axios';
import { endpoints } from './api/endpoints';

class AuthService {
  private token: string | null = null;
  private readonly TOKEN_KEY = 'auth_token';

  constructor() {
    this.token = localStorage.getItem(this.TOKEN_KEY);
  }

  async login(credentials: LoginCredentials): Promise<{ token: string; user_id: number }> {
    try {
      const response = await axios.post(endpoints.auth.login, credentials);
      const { token, user_id } = response.data;
      this.saveToken(token);
      return {token, user_id};
    } catch (error: any) {
      if (error.response?.status === 401) {
        throw new ApiError(401, 'Invalid credentials.')
      }
      throw new ApiError(500,'Login failed.');
    }
  }

  async register(credentials: RegisterCredentials): Promise<{ user_id: number; message: string }> {
    try {
      const response = await axios.post(endpoints.auth.register, credentials);
      const { message, user_id } = response.data;
      return {user_id, message};
    } catch (error: any) {
      if (error.response?.status === 400) {
        throw new ApiError(400, error.response?.data?.error || 'User already exists.');
      }
      throw new ApiError(500, 'Registration failed.');
    }
  }

  async logout(): Promise<void> {
    try {
      await axios.get(endpoints.auth.logout);
    } finally {
      this.clearToken();
    }
  }

  async googleLogin(): Promise<string> {
    try {
      const response = await axios.get(endpoints.auth.googleLogin);
      return response.data.redirect_url;
    } catch (error: any) {
      throw new ApiError(500, 'Failed to initiate Google Authentication.')
    }
  }

  async googleCallback(query: string): Promise<{ token: string; user: User }> {
    try {
      const response = await axios.get(`${endpoints.auth.googleCallback}?${query}`);
      const { token, user } = response.data;
      this.saveToken(token);
      return { token, user };
    } catch (error: any) {
      throw new ApiError(500, 'Google login callback failed.');
    }
  }

  async fetchProtectedData(): Promise<User> {
    try {
      const response = await axios.get(endpoints.auth.protected);
      return response.data.user;
    } catch (error: any) {
      throw new ApiError(401, 'Unauthorized access.');
    }
  }

  getToken(): string | null {
    return this.token;
  }

  private saveToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
    this.token = token;
  }

  private clearToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.token = null;
  }
}

export const authService = new AuthService();