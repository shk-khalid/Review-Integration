import { Review, BusinessInfo, DashboardStats } from '../pages/Dashboard/types';

interface ReportData {
  business: BusinessInfo;
  stats: DashboardStats;
  reviews: Review[];
}

export function generateReportCSV(data: ReportData): string {
  const sections: string[] = [];
  const formatValue = (value: any) => `"${String(value).replace(/"/g, '""')}"`;

  // Business Overview Section
  sections.push('Business Overview');
  sections.push(['Name', 'Address', 'Phone', 'Email', 'Website', 'Business Hours'].map(formatValue).join(','));
  sections.push([
    data.business.name,
    data.business.address,
    data.business.phone,
    data.business.email,
    data.business.website,
    data.business.hours
  ].map(formatValue).join(','));
  sections.push('');

  // Statistics Overview
  sections.push('Statistics Overview');
  sections.push(['Metric', 'Count', 'Trend'].map(formatValue).join(','));
  sections.push([
    'Total Reviews',
    data.stats.totalReviews,
    `${data.stats.reviewsTrend}%`
  ].map(formatValue).join(','));
  sections.push([
    'Positive Reviews',
    data.stats.positiveReviews,
    `${data.stats.positiveTrend}%`
  ].map(formatValue).join(','));
  sections.push([
    'Neutral Reviews',
    data.stats.neutralReviews,
    `${data.stats.neutralTrend}%`
  ].map(formatValue).join(','));
  sections.push([
    'Negative Reviews',
    data.stats.negativeReviews,
    `${data.stats.negativeTrend}%`
  ].map(formatValue).join(','));
  sections.push('');

  // Reviews Section
  sections.push('Reviews');
  sections.push([
    'Date',
    'Type',
    'Reviewer',
    'Rating',
    'Source',
    'Comment',
    'Reply'
  ].map(formatValue).join(','));
  
  data.reviews.forEach(review => {
    sections.push([
      review.date,
      review.type,
      review.reviewer.name,
      review.rating,
      review.source,
      review.text,
      review.reply || ''
    ].map(formatValue).join(','));
  });

  return sections.join('\n');
}