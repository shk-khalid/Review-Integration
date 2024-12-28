import React from 'react';
import { DashboardHeader } from './components/Header';
import { BusinessOverview } from './components/BusinessOverview';
import { OverviewSection } from './components/Overview';
import { ReviewsSection } from './components/Reviews';
import { ReportSection } from './components/Report';
import { AnalyticsSection } from './components/Analytics';
import { useDashboardData } from './hooks/useDashboardData';
import { mockBusinessData } from './data/mockData';

export function Dashboard() {
  const { data, isLoading, error, handleReplyToReview, handleLikeReview } = useDashboardData();

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (!data) {
    return <div className="text-red-500">No data available</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Business Overview Card */}
          <BusinessOverview business={mockBusinessData} />

          {/* Stats Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <OverviewSection stats={data.stats} />
            <AnalyticsSection data={data.analytics} />
          </div>

          {/* Reviews Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <ReviewsSection 
              reviews={data.reviews}
              onReply={handleReplyToReview}
              onLike={handleLikeReview}
            />
          </div>

          {/* Report Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ReportSection />
          </div>
        </div>
      </main>
    </div>
  );
}