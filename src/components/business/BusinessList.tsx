import { Loader2, Building2 } from 'lucide-react';
import { DashboardHeader } from '../common/Header';
import { BusinessCard } from './BusinessCard';
import useBusiness from '../../hooks/useBusiness';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../common/Button';
import { Card } from '../common/Card';

export function BusinessList() {
  const { state } = useAuth();
  const { user } = state;
  const { businesses, loading: isLoading, error } = user?.id
    ? useBusiness(user.id)
    : { businesses: [], loading: false, error: null };

  const backgroundClass = "bg-gradient-to-br from-indigo-200/20 via-purple-200/20 to-pink-200/20 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900";

  if (isLoading) {
    return (
      <div className={`min-h-screen flex flex-col ${backgroundClass}`}>
        <DashboardHeader />
        <div className="flex flex-col items-center justify-center grow">
          <div className="relative">
            <Loader2 className="h-12 w-12 animate-spin text-indigo-600 dark:text-indigo-400" />
            <div className="absolute inset-0 animate-ping">
              <div className="h-12 w-12 rounded-full bg-indigo-600/20 dark:bg-indigo-400/30"></div>
            </div>
          </div>
          <p className="mt-4 text-gray-600 dark:text-gray-300 animate-pulse font-medium">
            Loading your businesses...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`min-h-screen flex flex-col ${backgroundClass}`}>
        <DashboardHeader />
        <div className="flex flex-col items-center justify-center grow">
          <Card className="p-8 shadow-lg rounded-lg bg-white/30 dark:bg-gray-800/30 backdrop-blur-md border border-gray-300/40 dark:border-gray-700/40">
            <p className="font-semibold text-red-600 dark:text-red-400">Error</p>
            <p className="mt-2 text-gray-600 dark:text-gray-400">{error}</p>
          </Card>
        </div>
      </div>
    );
  }

  if (!businesses || businesses.length === 0) {
    return (
      <div className={`min-h-screen flex flex-col ${backgroundClass}`}>
        <DashboardHeader />
        <div className="flex flex-col items-center justify-center grow">
          <Card className="text-center p-8 shadow-lg rounded-lg bg-white/30 dark:bg-gray-800/30 backdrop-blur-md border border-gray-300/40 dark:border-gray-700/40">
            <div className="mb-6">
              <Building2 className="w-12 h-12 text-indigo-600 dark:text-indigo-400 mx-auto" />
            </div>
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
              No Businesses Found
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-4">
              Get started by adding your first business to manage reviews and analytics all in one place.
            </p>
            <Button
              className="mt-6 w-full bg-teal-500 hover:bg-teal-400 dark:bg-rose-500 dark:hover:bg-rose-400 focus:ring-teal-500 dark:focus:ring-rose-400 transition-transform duration-200"
              onClick={() => console.log('Redirect to Add Business')}
            >
              Add Your First Business
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex flex-col ${backgroundClass}`}>
      <DashboardHeader />
      <div className="container mx-auto px-6 py-8 grow">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            Your Businesses
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Manage and monitor all your business profiles.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {businesses.map((business) => (
            <BusinessCard key={business.id} business={business} />
          ))}
        </div>
      </div>
    </div>
  );
}
