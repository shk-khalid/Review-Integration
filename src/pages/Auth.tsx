import { Star } from 'lucide-react';
import { AuthForm } from '../components/AuthForm';
import { useAuthForm } from '../hooks/useAuthForm';
import { useAuth } from '../context/AuthContext';

export function Auth() {
  const { user } = useAuth();
  const { mode, isLoading, formData, toggleMode, handleChange, handleSubmit } = useAuthForm();
  const isLogin = mode === 'login';

  if (user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 max-w-md w-full">
          <h2 className="text-xl font-bold mb-4">Welcome, {user.username || user.email}!</h2>
          <p className="text-gray-600 mb-4">You are now logged in.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 text-blue-600 mb-2">
            <Star className="w-8 h-8 md:w-10 md:h-10" />
            <span className="text-2xl md:text-3xl font-bold">ReviewHub</span>
          </div>
          <p className="text-gray-600 text-sm md:text-base">
            Effortlessly manage your Google reviews
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6 text-center">
            {isLogin ? 'Welcome back' : 'Create your account'}
          </h2>

          <AuthForm
            mode={mode}
            isLoading={isLoading}
            formData={formData}
            onSubmit={handleSubmit}
            onChange={handleChange}
          />

          <div className="mt-6 text-sm text-center">
            <p className="text-gray-600">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                type="button"
                onClick={toggleMode}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                {isLogin ? 'Sign up here' : 'Login here'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}