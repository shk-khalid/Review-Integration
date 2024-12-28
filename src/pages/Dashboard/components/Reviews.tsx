import React, { useState } from 'react';
import { ReviewCard } from './ReviewCard';
import { Review, ReviewType } from '../types';

interface ReviewsSectionProps {
  reviews: Review[];
  onReply: (id: string, reply: string) => void;
  onLike: (id: string) => void;
}

export function ReviewsSection({ reviews, onReply, onLike }: ReviewsSectionProps) {
  const [activeTab, setActiveTab] = useState<ReviewType>('positive');

  const filteredReviews = reviews.filter(review => review.type === activeTab);

  const tabs: { type: ReviewType; label: string }[] = [
    { type: 'positive', label: 'Positive Reviews' },
    { type: 'neutral', label: 'Neutral Reviews' },
    { type: 'negative', label: 'Negative Reviews' },
  ];

  return (
    <section>
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map(({ type, label }) => (
            <button
              key={type}
              onClick={() => setActiveTab(type)}
              className={`
                py-4 px-1 border-b-2 font-medium text-sm
                ${activeTab === type
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
              `}
            >
              {label}
            </button>
          ))}
        </nav>
      </div>

      <div className="mt-6 space-y-4">
        {filteredReviews.map(review => (
          <ReviewCard 
            key={review.id} 
            review={review}
            onReply={onReply}
            onLike={onLike}
          />
        ))}
      </div>
    </section>
  );
}