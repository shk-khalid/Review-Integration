import React from 'react';
import { MapPin, Globe, Clock, Phone, Mail, Users } from 'lucide-react';
import { BusinessInfo } from '../types/business';

interface BusinessOverviewProps {
  business: BusinessInfo;
}

export function BusinessOverview({ business }: BusinessOverviewProps) {
  return (
    <section className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Business Image */}
        <div className="w-full md:w-1/3">
          <img
            src={business.imageUrl}
            alt={business.name}
            className="w-full h-48 object-cover rounded-lg"
          />
        </div>

        {/* Business Details */}
        <div className="w-full md:w-2/3 space-y-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{business.name}</h2>
            <p className="text-gray-600 mt-1">{business.description}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2 text-gray-600">
              <MapPin className="h-5 w-5" />
              <span>{business.address}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <Globe className="h-5 w-5" />
              <a href={business.website} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                Visit Website
              </a>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <Clock className="h-5 w-5" />
              <span>{business.hours}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <Phone className="h-5 w-5" />
              <span>{business.phone}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <Mail className="h-5 w-5" />
              <span>{business.email}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <Users className="h-5 w-5" />
              <span>{business.employees} employees</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}