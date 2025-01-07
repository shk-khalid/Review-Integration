import { useNavigate } from 'react-router-dom';
import { MapPin, Globe, Phone, AtSign, Clock, ArrowRight, Star } from 'lucide-react';
import { Business } from '../../types/business';

interface BusinessCardProps {
  business: Business;
}

export function BusinessCard({ business }: BusinessCardProps) {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate(`/dashboard/${business.id}`)}
      className="group relative bg-white/70 dark:bg-gray-800/50 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden border border-gray-100/50 dark:border-gray-700/30 backdrop-blur-sm"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-indigo-600/5 dark:from-blue-400/10 dark:to-indigo-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative">
        <div className="h-48 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 flex items-center justify-center overflow-hidden">
          {business.logo ? (
            <img 
              src={business.logo} 
              alt={business.name}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <span className="text-white text-4xl font-bold bg-white/10 w-16 h-16 rounded-full flex items-center justify-center backdrop-blur-sm ring-2 ring-white/20">
              {business.name.charAt(0)}
            </span>
          )}
        </div>
        <div className="absolute top-4 right-4 flex space-x-2">
          <span className="px-3 py-1 bg-white/90 dark:bg-gray-900/90 rounded-full text-sm font-medium text-green-600 dark:text-green-400 shadow-lg backdrop-blur-sm border border-green-100/50 dark:border-green-500/20">
            Active
          </span>
          <span className="px-3 py-1 bg-white/90 dark:bg-gray-900/90 rounded-full text-sm font-medium text-blue-600 dark:text-blue-400 shadow-lg backdrop-blur-sm border border-blue-100/50 dark:border-blue-500/20 flex items-center">
            <Star className="w-3.5 h-3.5 mr-1" />
            4.8
          </span>
        </div>
      </div>

      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {business.name}
        </h2>
        
        {business.description && (
          <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
            {business.description}
          </p>
        )}
        
        <div className="space-y-3 mb-6">
          {business.address && (
            <div className="flex items-center text-gray-600 dark:text-gray-400 group/item hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              <MapPin className="h-5 w-5 text-blue-500 dark:text-blue-400 mr-3 flex-shrink-0 group-hover/item:animate-bounce" />
              <span className="text-sm truncate">{business.address}</span>
            </div>
          )}
          
          {business.website && (
            <div className="flex items-center text-gray-600 dark:text-gray-400 group/item hover:text-green-600 dark:hover:text-green-400 transition-colors">
              <Globe className="h-5 w-5 text-green-500 dark:text-green-400 mr-3 flex-shrink-0 group-hover/item:animate-spin" />
              <a 
                href={business.website} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-sm truncate hover:underline"
                onClick={(e) => e.stopPropagation()}
              >
                {business.website}
              </a>
            </div>
          )}
          
          {business.contact && (
            <div className="flex items-center text-gray-600 dark:text-gray-400 group/item hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
              <Phone className="h-5 w-5 text-purple-500 dark:text-purple-400 mr-3 flex-shrink-0 group-hover/item:animate-pulse" />
              <span className="text-sm truncate">{business.contact}</span>
            </div>
          )}
          
          {business.email && (
            <div className="flex items-center text-gray-600 dark:text-gray-400 group/item hover:text-red-600 dark:hover:text-red-400 transition-colors">
              <AtSign className="h-5 w-5 text-red-500 dark:text-red-400 mr-3 flex-shrink-0 group-hover/item:animate-pulse" />
              <span className="text-sm truncate">{business.email}</span>
            </div>
          )}
          
          {business.timings && (
            <div className="flex items-center text-gray-600 dark:text-gray-400 group/item hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors">
              <Clock className="h-5 w-5 text-yellow-500 dark:text-yellow-400 mr-3 flex-shrink-0 group-hover/item:animate-spin" />
              <span className="text-sm truncate">{business.timings}</span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-end pt-4 border-t border-gray-100 dark:border-gray-700/50">
          <span className="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform">
            View Details
            <ArrowRight className="ml-2 h-4 w-4 group-hover:animate-bounce-x" />
          </span>
        </div>
      </div>
    </div>
  );
}