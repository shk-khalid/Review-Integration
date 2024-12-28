import React from 'react';
import { ReviewSource } from '../types';

interface ReviewSourceBadgeProps {
  source: ReviewSource;
}

const sourceConfig: Record<ReviewSource, { label: string; color: string }> = {
  google: { label: 'Google', color: 'bg-red-100 text-red-800' },
  yelp: { label: 'Yelp', color: 'bg-pink-100 text-pink-800' },
  facebook: { label: 'Facebook', color: 'bg-blue-100 text-blue-800' },
  trustpilot: { label: 'Trustpilot', color: 'bg-green-100 text-green-800' },
};

export function ReviewSourceBadge({ source }: ReviewSourceBadgeProps) {
  const config = sourceConfig[source];

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
      {config.label}
    </span>
  );
}