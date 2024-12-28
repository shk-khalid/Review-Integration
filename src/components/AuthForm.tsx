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

export function AuthForm({ mode, isLoading, formData, onChange }: AuthFormProps) {
  const { login, register, googleLogin } = useAuth();
  const isLogin = mode === 'login';

  // Handle form submission
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isLogin) {
      try {
        const credentials = {
          email: formData.email,
          password: formData.password,
        };
        await login(credentials); // Call the login method from AuthContext
      } catch (error) {
        // Error is handled by the AuthContext
        console.error('Login failed:', error);
      }
    } else {
      try {
        const credentials = {
          email: formData.email,
          password: formData.password,
          name: formData.name,
        };
        await register(credentials); // Call the register method from AuthContext
      } catch (error) {
        // Error is handled by the AuthContext
        console.error('Registration failed:', error);
      }
    }
  };

  // Handle Google Sign-In
  const handleGoogleSignIn = async () => {
    if (googleLogin) { // Check if googleLogin is available
      try {
        await googleLogin(); // Initiate the Google login process
      } catch (error) {
        // Error is handled by the AuthContext
        console.error('Google sign-in failed:', error);
      }
    } else {
      console.error('Google Sign-In method is not available.');
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleFormSubmit}>
      {/* If it's not the login mode, ask for the username */}
      {!isLogin && (
        <Input
          name="name"
          label="Username"
          value={formData.name}
          onChange={onChange}
          placeholder="Choose a unique username"
          required
        />
      )}

      {/* Email input */}
      <Input
        name="email"
        label="Email"
        value={formData.email}
        onChange={onChange}
        placeholder="Enter your email"
        type="email"
        required
      />
      
      {/* Password input */}
      <Input
        name="password"
        label="Password"
        value={formData.password}
        onChange={onChange}
        placeholder={isLogin ? "Enter your password" : "Create a strong password"}
        type="password"
        required
      />

      {/* If it's not the login mode, ask for password confirmation */}
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
        {/* Submit button for login/register */}
        <Button type="submit" isLoading={isLoading}>
          {isLogin ? 'Login' : 'Create Account'}
        </Button>

        {/* Google Sign-In Button */}
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
