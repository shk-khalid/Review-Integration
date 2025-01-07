import { useState, useRef, useEffect } from 'react';
import { Star, Bell, ChevronDown, LogOut, Sun, Moon } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useThemeToggler } from '../../hooks/useTheme';

export function DashboardHeader() {
    const { state, logout } = useAuth();
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const { darkMode, toggleDarkMode } = useThemeToggler();
    const userDropdownRef = useRef<HTMLDivElement>(null);
    const notificationsRef = useRef<HTMLDivElement>(null);

    const { user } = state;

    // Close dropdowns when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
                setIsUserDropdownOpen(false);
            }
            if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
                setIsNotificationsOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <header className={`sticky top-0 z-50 ${darkMode ? 'bg-gray-900/50' : 'bg-white/75'} backdrop-blur-md shadow-md`}>
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center space-x-2">
                        <Star className="h-6 w-6 text-blue-600" />
                        <span className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>ReviewHub</span>
                    </div>

                    {/* For Small and Medium Screens */}
                    <div className="flex items-center md:hidden space-x-4">
                        <button
                            onClick={toggleDarkMode}
                            className="p-2 text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300 rounded-xl transition-all duration-200"
                        >
                            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </button>

                        <div className="relative" ref={notificationsRef}>
                            <button
                                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                                className="p-2 hover:bg-gray-100 rounded-full relative dark:hover:bg-gray-700"
                            >
                                <Bell className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
                            </button>

                            {isNotificationsOpen && (
                                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg py-2 border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                                    <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                                        <h3 className="font-semibold text-gray-900 dark:text-white">Notifications</h3>
                                    </div>
                                    <div className="max-h-96 overflow-y-auto">
                                        <div className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700">
                                            <p className="text-sm text-gray-900 dark:text-white">New review received</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">2 minutes ago</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* User Dropdown for Small Screens */}
                        <div className="relative">
                            <div className="flex items-center space-x-2">
                                <img
                                    src={`https://ui-avatars.com/api/?name=${user?.name || 'User'}&background=random`}
                                    alt="Profile"
                                    className="h-8 w-8 rounded-full"
                                />
                                <button
                                    onClick={handleLogout}
                                    className="px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-800 flex items-center"
                                >
                                    <LogOut className="h-4 w-4 mr-2" />
                                    Logout
                                </button>
                            </div>

                        </div>
                    </div>

                    {/* For Desktop Screens */}
                    <div className="hidden md:flex items-center space-x-4">
                        <button
                            onClick={toggleDarkMode}
                            className="p-2 text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300 rounded-xl transition-all duration-200"
                        >
                            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </button>

                        <div className="relative" ref={notificationsRef}>
                            <button
                                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                                className="p-2 hover:bg-gray-100 rounded-full relative dark:hover:bg-gray-700"
                            >
                                <Bell className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
                            </button>

                            {isNotificationsOpen && (
                                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg py-2 border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                                    <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                                        <h3 className="font-semibold text-gray-900 dark:text-white">Notifications</h3>
                                    </div>
                                    <div className="max-h-96 overflow-y-auto">
                                        <div className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700">
                                            <p className="text-sm text-gray-900 dark:text-white">New review received</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">2 minutes ago</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="relative" ref={userDropdownRef}>
                            <button
                                onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                                className="flex items-center space-x-2 hover:bg-gray-100 rounded-lg p-2 dark:hover:bg-gray-700"
                            >
                                <img
                                    src={`https://ui-avatars.com/api/?name=${user?.name || 'User'}&background=random`}
                                    alt="Profile"
                                    className="h-8 w-8 rounded-full"
                                />
                                <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                    {user?.name || user?.email}
                                </span>
                                <ChevronDown className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                            </button>

                            {isUserDropdownOpen && (
                                <div className="absolute mt-2 w-48 bg-white rounded-lg shadow-lg py-2 border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                                    <div className="flex items-center space-x-2 px-4 py-2">
                                        <img
                                            src={`https://ui-avatars.com/api/?name=${user?.name || 'User'}&background=random`}
                                            alt="Profile"
                                            className="h-8 w-8 rounded-full"
                                        />
                                        <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                            {user?.name || user?.email}
                                        </span>
                                    </div>
                                    <hr className="my-1" />
                                    <button
                                        onClick={handleLogout}
                                        className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-800 flex items-center"
                                    >
                                        <LogOut className="h-4 w-4 mr-2" />
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
