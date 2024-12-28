import { ApiError } from './api';
import { User } from '../types/auth';

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const GOOGLE_REDIRECT_URI = import.meta.env.VITE_APP_URL + '/auth/google/callback';

class GoogleAuthService {
  private googleAuth: typeof google.accounts.oauth2 | null = null;

  async initialize(): Promise<void> {
    if (typeof window === 'undefined') return;
    
    // Load the Google OAuth2 script
    await new Promise<void>((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = () => {
        this.googleAuth = google.accounts.oauth2;
        resolve();
      };
      script.onerror = reject;
      document.body.appendChild(script);
    });
  }

  async signIn(): Promise<User> {
    if (!this.googleAuth) {
      await this.initialize();
    }

    try {
      const client = this.googleAuth!.initTokenClient({
        client_id: GOOGLE_CLIENT_ID,
        scope: 'email profile',
        callback: (response) => {
          if (response.error) {
            throw new ApiError(400, response.error);
          }
          return this.handleGoogleResponse(response);
        },
      });

      client.requestAccessToken();
    } catch (error) {
      throw new ApiError(400, 'Google authentication failed');
    }
  }

  private async handleGoogleResponse(response: google.accounts.oauth2.TokenResponse): Promise<User> {
    // Decode the JWT token to get user info
    const token = response.access_token;
    const userInfo = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => res.json());

    return {
      id: userInfo.sub,
      email: userInfo.email,
      username: userInfo.name
    };
  }
}

// Export a singleton instance
export const googleAuthService = new GoogleAuthService();