import React, { useState } from 'react';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { Card } from '../common/Card';
import { PasswordStrengthMeter } from './PasswordStrength';
import { calculatePasswordStrength } from '../../lib/PasswordStrength';
import { useAuth } from '../../hooks/useAuth';
import { GoogleAuthButton } from './GoogleAuthButton';

export function AuthForm() {
    const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login, register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!isLogin) {
            // Signup validation
            if (password !== confirmPassword) {
                setError('Passwords do not match');
                return;
            }

            const { score } = calculatePasswordStrength(password);
            if (score < 3) {
                setError('Please choose a stronger password');
                return;
            }

            try {
                setIsLoading(true);
                await register(userName, email, password);
                navigate('/auth');
                setIsLoading(false);
                setIsLogin(true);
            } catch (error: any) {
                setError('Failed to create account');
                setIsLoading(false);
            }
        } else {
            // Login validation
            try {
                setIsLoading(true);
                await login(email, password);
                navigate('/dashboard');
            } catch (error: any) {
                setError('Invalid login credentials');
                setIsLoading(false);
            }
        }
    };

    return (
        <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                    {isLogin ? 'Welcome back' : 'Join Us'}
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-300">
                    {isLogin ? 'Sign in to your account to continue' : 'Create your account to get started'}
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <Card className="p-8 shadow-lg rounded-lg bg-white/30 dark:bg-gray-800/30 backdrop-blur-md border border-gray-300/40 dark:border-gray-700/40">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {!isLogin && (
                            <Input
                                label="User Name"
                                type="text"
                                required
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                icon={<User className="h-5 w-5 text-gray-400" />}
                                className="focus:ring-2 focus:ring-[#2563eb] dark:focus:ring-[#facc15] transition-transform duration-200"
                            />
                        )}
                        <Input
                            label="Email address"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            icon={<Mail className="h-5 w-5 text-gray-400" />}
                            className="focus:ring-2 focus:ring-[#2563eb] dark:focus:ring-[#facc15] transition-transform duration-200"
                        />
                        <Input
                            label="Password"
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            icon={<Lock className="h-5 w-5 text-gray-400" />}
                            className="focus:ring-2 focus:ring-[#2563eb] dark:focus:ring-[#facc15] transition-transform duration-200"
                        />
                        {!isLogin && (
                            <>
                                <PasswordStrengthMeter password={password} />
                                <Input
                                    label="Confirm Password"
                                    type="password"
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    icon={<Lock className="h-5 w-5 text-gray-400" />}
                                    className="focus:ring-2 focus:ring-[#2563eb] dark:focus:ring-[#facc15] transition-transform duration-200"
                                />
                            </>
                        )}
                        {error && <p className="text-sm text-red-500 dark:text-red-400">{error}</p>}
                        <Button
                            type="submit"
                            isLoading={isLoading}
                            icon={<ArrowRight className="h-5 w-5" />}
                            className="w-full bg-teal-500 hover:bg-teal-400 dark:bg-rose-500 dark:hover:bg-rose-400 focus:ring-teal-500 dark:focus:ring-rose-400 transition-transform duration-200"
                        >
                            {isLogin ? 'Sign in' : 'Create Account'}
                        </Button>
                    </form>

                    <div className="mt-6">
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 text-gray-500 dark:text-gray-400">
                                {isLogin ? (
                                    <>
                                        Don't have an account?{' '}
                                        <button
                                            type="button"
                                            onClick={() => setIsLogin(false)}
                                            className="text-indigo-600 hover:text-indigo-500"
                                        >
                                            Sign up
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        Already have an account?{' '}
                                        <button
                                            type="button"
                                            onClick={() => setIsLogin(true)}
                                            className="text-indigo-600 hover:text-indigo-500"
                                        >
                                            Sign in
                                        </button>
                                    </>
                                )}
                            </span>
                        </div>
                    </div>
                </Card>
            </div>

            <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300 dark:border-gray-700" />
                    </div>
                    <div className="relative flex justify-center px-4">
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                            Or continue with
                        </span>
                    </div>
                </div>
                <GoogleAuthButton />
            </div>
        </div>
    );
}
