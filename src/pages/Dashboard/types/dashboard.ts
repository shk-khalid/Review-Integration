export interface DashboardStats {
  totalReviews: number;
  positiveReviews: number;
  neutralReviews: number;
  negativeReviews: number;
  reviewsTrend: number;
  positiveTrend: number;
  neutralTrend: number;
  negativeTrend: number;
}

export interface AnalyticsData {
  date: string;
  rating: number;
}

export interface DashboardData {
  stats: DashboardStats;
  reviews: Review[];
  analytics: AnalyticsData[];
}