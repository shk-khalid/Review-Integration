import { LoginCredentials, RegisterCredentials, User } from '../types/auth';
import { ApiError } from './api';
import axios from './api/axios';
import { endpoints } from './api/endpoints';

class AuthService {
  private token: string | null = null;
  private readonly TOKEN_KEY = 'auth_token';

  constructor() {
    this.token = localStorage.getItem(this.TOKEN_KEY);
    this.setAuthHeader(); // Set token in axios headers if already available
  }

  async login(credentials: LoginCredentials): Promise<void> {
    try {
      const response = await axios.post(endpoints.auth.login, credentials);
      const { token } = response.data;
      this.saveToken(token);
      window.location.href = '/businesses'; // Redirect to /businesses upon successful login
    } catch (error: any) {
      if (error.response?.status === 401) {
        throw new ApiError(401, 'Invalid credentials.');
      }
      throw new ApiError(500, 'Login failed.');
    }
  }

  async register(credentials: RegisterCredentials): Promise<void> {
    try {
      await axios.post(endpoints.auth.register, credentials);
      alert('Registration successful! You can now log in.');
    } catch (error: any) {
      if (error.response?.status === 400) {
        throw new ApiError(400, error.response?.data?.error || 'User already exists.');
      }
      throw new ApiError(500, 'Registration failed.');
    }
  }

  async googleLogin(): Promise<string> {
    try {
      const response = await axios.get(endpoints.auth.googleLogin);
      return response.data.redirect_url; // Ensure this returns a string
    } catch (error: any) {
      throw new ApiError(500, 'Failed to initiate Google Authentication.');
    }
  }

  async googleCallback(query: string): Promise<void> {
    try {
      const response = await axios.get(`${endpoints.auth.googleCallback}?${query}`);
      const { token } = response.data;
      this.saveToken(token);
      window.location.href = '/businesses'; // Redirect to /businesses upon successful login
    } catch (error: any) {
      throw new ApiError(500, 'Google login callback failed.');
    }
  }

  async fetchProtectedData(): Promise<User> {
    try {
      const response = await axios.get(endpoints.auth.protected, {
        headers: { Authorization: `Bearer ${this.token}` }, // Pass token in headers
      });
      return response.data.user;
    } catch (error: any) {
      throw new ApiError(401, 'Unauthorized access. Please log in again.');
    }
  }

  getToken(): string | null {
    return this.token;
  }

  isAuthenticated(): boolean {
    return !!this.token; // Returns true if token exists
  }

  private saveToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
    this.token = token;
    this.setAuthHeader(); // Update axios headers with the new token
  }

  private clearToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.token = null;
    this.setAuthHeader(); // Clear token from axios headers
  }

  private setAuthHeader(): void {
    if (this.token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }

  async logout(): Promise<void> {
    try {
      await axios.post(endpoints.auth.logout, null, {
        headers: { Authorization: `Bearer ${this.token}` },
      });
    } finally {
      this.clearToken();
      window.location.href = '/'; // Redirect to the home page after logout
    }
  }
}

export const authService = new AuthService();
