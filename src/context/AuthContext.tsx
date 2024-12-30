import React, { createContext, useContext, useState, useCallback } from 'react';
import { AuthState, GoogleAuthResponse } from '../types/auth';
import { authService } from '../services/auth.service';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<any>;
  register: (name: string, email: string, password: string) => Promise<any>;
  handleGoogleCallback: (code: string) => Promise<GoogleAuthResponse>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: Boolean(localStorage.getItem('token')),
  });

  const login = async (email: string, password: string) => {
    const response = await authService.login(email, password);
    localStorage.setItem('token', response.token);
    localStorage.setItem('user_id', response.user_id.toString());
    
    setState({
      user: {
        id: response.user_id.toString(),
        email,
        name: email.split('@')[0],
      },
      isAuthenticated: true,
    });

    return response;
  };

  const register = async (name: string, email: string, password: string) => {
    const response = await authService.register(name, email, password);
    return response;
  };

  const handleGoogleCallback = useCallback(async (code: string) => {
    const response = await authService.handleGoogleCallback(code);
    localStorage.setItem('token', response.token);
    localStorage.setItem('user_id', response.user.id);
    
    setState({
      user: response.user,
      isAuthenticated: true,
    });

    return response;
  }, []);

  const logout = async () => {
    await authService.logout();
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    setState({ user: null, isAuthenticated: false });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, register, handleGoogleCallback, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}