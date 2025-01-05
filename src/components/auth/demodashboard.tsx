import { useAuth } from '../../hooks/useAuth'; // assume it's a context that holds user info
import { Button } from '../common/Button';
import { useNavigate } from 'react-router-dom';

export function Dashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto bg-white shadow-lg p-8 rounded-lg">
        <h1 className="text-3xl font-bold text-gray-900">Welcome to the Dashboard!</h1>
        <p className="mt-4 text-lg text-gray-600">Hello, {'User'}!</p>
        <div className="mt-6">
          <Button onClick={handleLogout} className="bg-red-500 hover:bg-red-400 text-white">
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}
