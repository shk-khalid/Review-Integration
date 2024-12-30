import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

export function GoogleCallback() {
  const navigate = useNavigate();
  const { handleGoogleCallback } = useAuth();

  useEffect(() => {
    const processCallback = async () => {
      const searchParams = new URLSearchParams(window.location.search);
      const code = searchParams.get('code');

      if (!code) {
        toast.error('Authentication failed');
        navigate('/login');
        return;
      }

      try {
        const response = await handleGoogleCallback(code);
        toast.success(response.message || 'Successfully signed in with Google');
        navigate('/dashboard');
      } catch (error) {
        toast.error('Failed to complete Google authentication');
        navigate('/login');
      }
    };

    processCallback();
  }, [navigate, handleGoogleCallback]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
    </div>
  );
}