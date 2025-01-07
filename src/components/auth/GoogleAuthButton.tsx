import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../hooks/useAuth';

export function GoogleAuthButton() {
  const { loginGoogle } = useAuth();
  const navigate = useNavigate();

  const login = useGoogleLogin({
    flow: 'auth-code',
    scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email openid',
    onSuccess: async (codeResponse) => {
      try {
        await loginGoogle(codeResponse.code);
        navigate('/dashboard');
      } catch (error) {
        toast.error('Failed to login with Google');
      }
    },
    onError: () => {
      toast.error('Google login failed');
    },
    redirect_uri: 'http://localhost:5173'
  });

  return (
      <button
        onClick={() => login()}
        className="mt-4 w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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