/**
 * Hook for validating password strength
 */
import { useState, useEffect } from 'react';

interface PasswordValidation {
  isValid: boolean;
  errors: string[];
}

export function usePasswordValidation(password: string): PasswordValidation {
  const [validation, setValidation] = useState<PasswordValidation>({
    isValid: false,
    errors: [],
  });

  useEffect(() => {
    const errors: string[] = [];

    // Minimum length check
    if (password.length < 8) {
      errors.push('Password must be at least 8 characters long');
    }

    // Contains number check
    if (!/\d/.test(password)) {
      errors.push('Password must contain at least one number');
    }

    // Contains uppercase letter check
    if (!/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }

    // Contains special character check
    if (!/[!@#$%^&*]/.test(password)) {
      errors.push('Password must contain at least one special character (!@#$%^&*)');
    }

    setValidation({
      isValid: errors.length === 0,
      errors,
    });
  }, [password]);

  return validation;
}