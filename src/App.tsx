import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './hooks/useAuth';
import { LoginForm } from './components/auth/LoginForm';
import { SignupForm } from './components/auth/SignupForm';
import { Dashboard } from './components/auth/demodashboard';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { GoogleOAuthProvider } from '@react-oauth/google';


function App() {
    return (
        <AuthProvider>
            <GoogleOAuthProvider clientId="887264470642-nq8uo33595hd3oj0fucj6jqg55ou72br.apps.googleusercontent.com">
                <Router>
                    <div className="main-content">
                        <Routes>
                            <Route path="/" element={<LoginForm />} />
                            <Route path="/login" element={<LoginForm />} />
                            <Route path="/register" element={<SignupForm />} />
                            <Route
                                path="/dashboard"
                                element={
                                    <ProtectedRoute>
                                        <Dashboard />
                                    </ProtectedRoute>
                                }
                            />
                        </Routes>
                    </div>
                </Router>
                <Toaster position="top-right" />
            </GoogleOAuthProvider>
        </AuthProvider>
    );
}

export default App;
