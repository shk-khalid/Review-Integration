import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthContextType, User, LoginCredentials, RegisterCredentials } from '../types/auth';
import { authService } from '../services/auth.service';
import { ApiError } from '../services/api';

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // On initial render, check if the user is already authenticated
  useEffect(() => {
    const initializeAuth = async () => {
      setIsLoading(true);
      try {
        const fetchedUser = await authService.fetchProtectedData();
        setUser(fetchedUser);
      } catch (err) {
        console.error('Failed to validate user session', err);
        setUser(null); // Ensure the user is logged out if token validation fails
      } finally {
        setIsLoading(false);
      }
    };

    if (authService.getToken()) {
      initializeAuth();
    }
  }, []);

  /**
   * Generic handler for authentication operations
   */
  const handleAuth = async <T extends LoginCredentials | RegisterCredentials>(
    credentials: T,
    authMethod: (creds: T) => Promise<void>
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      await authMethod(credentials);
      const fetchedUser = await authService.fetchProtectedData(); // Fetch user details after login/register
      setUser(fetchedUser);
      window.location.href = '/businesses'; // Redirect to /businesses after successful login
    } catch (err) {
      const message = err instanceof ApiError 
        ? err.message 
        : 'An unexpected error occurred';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const contextValue: AuthContextType = {
    user,
    isLoading,
    error,
    login: async (credentials) => {
      await handleAuth(credentials, authService.login.bind(authService));
    },
    register: async (credentials) => {
      await handleAuth(credentials, authService.register.bind(authService));
    },
    logout: async () => {
      setIsLoading(true);
      setError(null);
      try {
        await authService.logout();
        setUser(null);
        window.location.href = '/'; // Redirect to home page on logout
      } catch (err) {
        const message = err instanceof ApiError 
          ? err.message 
          : 'Logout failed';
        setError(message);
      } finally {
        setIsLoading(false);
      }
    },
    googleLogin: async () => {
      setIsLoading(true);
      setError(null);
      try {
        const redirectUrl = await authService.googleLogin(); // Expecting a string
        window.location.href = redirectUrl; // Perform the redirection
      } catch (err) {
        const message = err instanceof ApiError 
          ? err.message 
          : 'Failed to initiate Google Sign-In';
        setError(message);
        throw err; // Optionally re-throw the error if needed
      } finally {
        setIsLoading(false);
      }
    },
    googleCallback: async (query: string) => {
      setIsLoading(true);
      setError(null);
      try {
        await authService.googleCallback(query);
        const fetchedUser = await authService.fetchProtectedData();
        setUser(fetchedUser);
        window.location.href = '/businesses'; // Redirect to /businesses after successful Google login
      } catch (err) {
        const message = err instanceof ApiError 
          ? err.message 
          : 'Google Sign-In callback failed';
        setError(message);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Hook to access authentication context
 * Must be used within an AuthProvider
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
