import React from 'react';
import { Chrome } from 'lucide-react'; 
import { Input } from './Input';
import { Button } from './Button';
import { AuthMode } from '../hooks/useAuthForm';
import { AuthFormData } from '../types/auth';
import { useAuth } from '../context/AuthContext';

interface AuthFormProps {
  mode: AuthMode;
  isLoading: boolean;
  formData: AuthFormData;
  onSubmit: (e: React.FormEvent) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function AuthForm({ mode, isLoading, formData, onSubmit, onChange }: AuthFormProps) {
  const { googleSignIn } = useAuth();
  const isLogin = mode === 'login';

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      // Error is handled by the AuthContext
      console.error('Google sign-in failed:', error);
    }
  };

  return (
    <form className="space-y-6" onSubmit={onSubmit}>
      {!isLogin && (
        <Input
          name="username"
          label="Username"
          value={formData.username}
          onChange={onChange}
          placeholder="Choose a unique username"
          required
        />
      )}

      <Input
        name="email"
        label="Email"
        value={formData.email}
        onChange={onChange}
        placeholder="Enter your email"
        type="email"
        required
      />
      
      <Input
        name="password"
        label="Password"
        value={formData.password}
        onChange={onChange}
        placeholder={isLogin ? "Enter your password" : "Create a strong password"}
        type="password"
        required
      />

      {!isLogin && (
        <Input
          name="confirmPassword"
          label="Confirm Password"
          value={formData.confirmPassword}
          onChange={onChange}
          placeholder="Confirm your password"
          type="password"
          required
        />
      )}

      <div className="space-y-4">
        <Button type="submit" isLoading={isLoading}>
          {isLogin ? 'Login' : 'Create Account'}
        </Button>

        <Button 
          type="button"
          variant="google"
          icon={<Chrome className="w-5 h-5" />}
          onClick={handleGoogleSignIn}
        >
          {isLogin ? 'Continue with Google' : 'Sign up with Google'}
        </Button>
      </div>
    </form>
  );
}