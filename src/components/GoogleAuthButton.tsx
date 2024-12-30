import { useCallback } from 'react';
import { toast } from 'react-hot-toast';
import { authService } from '../services/auth.service';

export function GoogleAuthButton() {

  const handleGoogleLogin = useCallback(async () => {
    try {
      const authUrl = await authService.googleLogin();
      window.location.href = authUrl;
    } catch (error) {
      toast.error('Failed to initialize Google login');
    }
  }, []);

  return (
    <button
      onClick={handleGoogleLogin}
      className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      <img
        className="h-5 w-5 mr-2"
        src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
        alt="Google logo"
      />
      Continue with Google
    </button>
  );
}