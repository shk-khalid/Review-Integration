import React from 'react';
import { ThumbsUp, Minus, ThumbsDown, Star, TrendingUp } from 'lucide-react';
import { StatsCard } from './StatsCard';
import { DashboardStats } from '../types';

interface OverviewSectionProps {
  stats: DashboardStats;
}

export function OverviewSection({ stats }: OverviewSectionProps) {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Reviews"
          value={stats.totalReviews}
          icon={<Star className="h-6 w-6 text-yellow-500" />}
          trend={stats.reviewsTrend}
        />
        <StatsCard
          title="Positive Reviews"
          value={stats.positiveReviews}
          icon={<ThumbsUp className="h-6 w-6 text-green-500" />}
          trend={stats.positiveTrend}
        />
        <StatsCard
          title="Neutral Reviews"
          value={stats.neutralReviews}
          icon={<Minus className="h-6 w-6 text-gray-500" />}
          trend={stats.neutralTrend}
        />
        <StatsCard
          title="Negative Reviews"
          value={stats.negativeReviews}
          icon={<ThumbsDown className="h-6 w-6 text-red-500" />}
          trend={stats.negativeTrend}
        />
      </div>
    </section>
  );
}