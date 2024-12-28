import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { AuthFormData, LoginCredentials, RegisterCredentials } from '../types/auth';
import { ApiError } from '../services/api';

export type AuthMode = 'login' | 'register';

export function useAuthForm() {
  const [mode, setMode] = useState<AuthMode>('login');
  const { login, register, isLoading, googleLogin } = useAuth();
  const [formData, setFormData] = useState<AuthFormData>({
    email: '',
    password: '',
    name: '',
    confirmPassword: '',
  });

  /**
   * Toggles between login and register modes
   */
  const toggleMode = () => {
    setMode(mode === 'login' ? 'register' : 'login');
    setFormData({
      email: '',
      password: '',
      name: '',
      confirmPassword: '',
    });
    toast(`Switched to ${mode === 'login' ? 'register' : 'login'} mode`, {
      icon: 'ℹ️', // Info icon
    });
  };

  /**
   * Handles form input changes
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  /**
   * Validates form data before submission
   */
  const validateForm = (): boolean => {
    if (!formData.email || !formData.password) {
      toast.error('Please fill in all required fields');
      return false;
    }

    if (mode === 'register') {
      if (formData.password !== formData.confirmPassword) {
        toast.error('Passwords do not match');
        return false;
      }
      if (formData.password.length < 6) {
        toast.error('Password must be at least 6 characters');
        return false;
      }
    }

    return true;
  };

  /**
   * Handles form submission for both login and register
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      if (mode === 'login') {
        const credentials: LoginCredentials = {
          email: formData.email,
          password: formData.password,
        };
        await login(credentials);
        toast.success('Successfully logged in! Redirecting...');
      } else {
        const credentials: RegisterCredentials = {
          email: formData.email,
          password: formData.password,
          name: formData.name,
        };
        await register(credentials);
        toast.success('Successfully registered! Redirecting...');
      }
    } catch (error) {
      const message =
        error instanceof ApiError
          ? error.message
          : 'Authentication failed. Please try again.';
      toast.error(message);
    }
  };

  /**
   * Handles Google login
   */
  const handleGoogleLogin = async () => {
    try {
      toast('Redirecting to Google for authentication...', {
        icon: '🔗', // Custom icon for redirection
      });
      const redirectUrl = await googleLogin?.();
      if (redirectUrl) {
        window.location.href = redirectUrl;
      }
    } catch (error) {
      const message =
        error instanceof ApiError
          ? error.message
          : 'Google login failed. Please try again.';
      toast.error(message);
    }
  };

  return {
    mode,
    isLoading,
    formData,
    toggleMode,
    handleChange,
    handleSubmit,
    handleGoogleLogin,
  };
}
