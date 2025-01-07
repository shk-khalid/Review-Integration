import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './hooks/useAuth';
import { AuthForm } from './components/auth/AuthForm';
// import { Dashboard } from './components/auth/demodashboard';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { BusinessList } from './components/business/BusinessList';


function App() {
    return (
        <AuthProvider>
            
            <GoogleOAuthProvider clientId="887264470642-nq8uo33595hd3oj0fucj6jqg55ou72br.apps.googleusercontent.com">
                <Router>
                    <div className="main-content">
                        <Routes>
                            <Route path="/" element={<AuthForm />} />
                            <Route path="/auth" element={<AuthForm />} />
                            <Route
                                path="/dashboard"
                                element={
                                    <ProtectedRoute>
                                        <BusinessList />
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
