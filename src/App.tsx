import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { AuthForm } from './components/AuthForm';
import { BusinessList } from './pages/BusinessList/BusinessList';
import { ProtectedRoute } from './components/ProtectedRoute';
import { GoogleCallback } from './components/GoogleCallback';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<AuthForm mode="login" />} />
          <Route path="/register" element={<AuthForm mode="register" />} />
          <Route path="/google/callback" element={<GoogleCallback />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <BusinessList />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;