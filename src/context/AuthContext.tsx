/**
 * Authentication context provider and hook
 * Manages global authentication state and provides auth methods
 */
import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthContextType, User, LoginCredentials, RegisterCredentials } from '../types/auth';
import { authService } from '../services/auth.service';
import { googleAuthService } from '../services/google-auth.service';
import { ApiError } from '../services/api';

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize Google OAuth on mount
  useEffect(() => {
    googleAuthService.initialize().catch(console.error);
  }, []);

  /**
   * Generic handler for authentication operations
   */
  const handleAuth = async <T extends LoginCredentials | RegisterCredentials>(
    credentials: T,
    authMethod: (creds: T) => Promise<User>
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      const user = await authMethod(credentials);
      setUser(user);
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
    login: (credentials) => handleAuth(credentials, authService.login.bind(authService)),
    register: (credentials) => handleAuth(credentials, authService.register.bind(authService)),
    googleSignIn: async () => {
      setIsLoading(true);
      setError(null);
      try {
        const user = await googleAuthService.signIn();
        setUser(user);
      } catch (err) {
        const message = err instanceof ApiError 
          ? err.message 
          : 'Google authentication failed';
        setError(message);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    logout: async () => {
      setIsLoading(true);
      try {
        await authService.logout();
        setUser(null);
      } catch (err) {
        const message = err instanceof ApiError 
          ? err.message 
          : 'Logout failed';
        setError(message);
      } finally {
        setIsLoading(false);
      }
    }
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