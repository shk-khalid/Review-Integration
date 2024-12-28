import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { Auth } from './pages/Auth';
import { BusinessList } from './pages/BusinessList/BusinessList';
import { Dashboard } from './pages/Dashboard/Dashboard';
import { useAuth } from './context/AuthContext';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  return user ? <>{children}</> : <Navigate to="/auth" />;
}

function AppContent() {
  const { user } = useAuth();
  return user ? <Navigate to="/businesses" /> : <Auth />;
}

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <Toaster position="top-right" />
          <Routes>
            <Route path="/auth" element={<AppContent />} />
            <Route
              path="/businesses"
              element={
                <ProtectedRoute>
                  <BusinessList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/:businessId"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route path="/" element={<Navigate to="/auth" />} />
          </Routes>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;