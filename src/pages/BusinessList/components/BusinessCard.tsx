import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Star, Users } from 'lucide-react';
import { Business } from '../types';

interface BusinessCardProps {
  business: Business;
}

export function BusinessCard({ business }: BusinessCardProps) {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate(`/dashboard/${business.id}`)}
      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
    >
      <img
        src={business.imageUrl}
        alt={business.name}
        className="w-full h-48 object-cover rounded-t-lg"
      />
      <div className="p-6">
        <h2 className="text-xl font-bold mb-2">{business.name}</h2>
        <p className="text-gray-600 mb-4 line-clamp-2">{business.description}</p>
        
        <div className="space-y-2">
          <div className="flex items-center text-gray-600">
            <MapPin className="h-4 w-4 mr-2" />
            <span className="text-sm">{business.address}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Star className="h-4 w-4 mr-2" />
            <span className="text-sm">{business.averageRating} ({business.totalReviews} reviews)</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Users className="h-4 w-4 mr-2" />
            <span className="text-sm">{business.employees} employees</span>
          </div>
        </div>
      </div>
    </div>
  );
}