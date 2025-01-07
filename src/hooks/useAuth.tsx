import { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import toast from 'react-hot-toast';
import AuthService from '../services/authService';

interface User {
    name: string;
    id: number;
    email: string;
    is_oauth_user: boolean;
}

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
}

interface AuthContextType {
    state: AuthState;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    register: (name: string, email: string, password: string) => Promise<void>;
    loginGoogle: (code: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [state, setState] = useState<AuthState>({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
    });

    const setIsLoading = (isLoading: boolean) =>
        setState((prevState) => ({ ...prevState, isLoading }));

    const setError = (error: string | null) =>
        setState((prevState) => ({ ...prevState, error }));

    const login = async (email: string, password: string) => {
        setIsLoading(true);
        setError(null);
        try {
            setState((prev) => ({
                ...prev,
                IsLoading: true,
                error: null,
            }));
            const { token, user } = await AuthService.login(email, password);
            localStorage.setItem("token", token);
            setState({
                user,
                isAuthenticated: true,
                isLoading: false,
                error: null,
            });
            toast.success("Login successful!");
        } catch (err) {
            setError('Login failed. Please try again.');
            toast.error("Login failed. Please try again.");
            console.error("Login error: ", err);
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        setIsLoading(true);
        setError(null);
        try {
            await AuthService.logout();
            setState({
                user: null,
                isAuthenticated: false,
                isLoading: false,
                error: null,
            });
            localStorage.removeItem('token'); // Clear token
            toast.success('Logged out successfully!');
        } catch (err) {
            setError('Logout failed. Please try again.');
            toast.error('Logout failed. Please try again.');
            console.error('Logout error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (name: string, email: string, password: string) => {
        setIsLoading(true);
        setError(null);
        try {
            await AuthService.register(name, email, password);
            toast.success('Registration successful!');
        } catch (err) {
            setError('Registration failed. Please try again.');
            toast.error('Registration failed. Please try again.');
            console.error('Registration error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const loginGoogle = async (code: string) => {
        try {
            setState((prev) => ({
                ...prev,
                IsLoading: true,
                error: null,
            }));
            const { token, user } = await AuthService.googleOAuth(code);
            localStorage.setItem("token", token);
            setState({
                user,
                isAuthenticated: true,
                isLoading: false,
                error: null,
            });
            toast.success("Google login sucessful!");
        } catch (err) {
            console.error("Error: ", err);
            setState((prev) => ({
                ...prev,
                IsLoading: false,
                error: "Google Authentication failed. Please try again later."
            }));
            toast.error("Google Authentication failed. Please try again later.");
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        const loadUserData = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                setIsLoading(true);
                try {
                    const user = await AuthService.getUserProfile();
                    setState({
                        user,
                        isAuthenticated: true,
                        isLoading: false,
                        error: null,
                    });
                } catch (err) {
                    console.error('Failed to fetch user profile:', err);
                    localStorage.removeItem('token');
                    setState({
                        user: null,
                        isAuthenticated: false,
                        isLoading: false,
                        error: null,
                    });
                    toast.error('Session expired. Please log in again.');
                } finally {
                    setIsLoading(false);
                }
            } else {
                setState((prevState) => ({
                    ...prevState,
                    isLoading: false,
                }));
            }
        };
    
        loadUserData();
    }, []);
    

    return (
        <AuthContext.Provider value={{
            state,
            login: login,
            logout: logout,
            register: register,

            loginGoogle
        }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use auth context
const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export { AuthProvider, useAuth };