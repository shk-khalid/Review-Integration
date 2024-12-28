import { BusinessInfo } from '../types/business';
import { DashboardData } from '../types';

// Business mock data
export const mockBusinessData: BusinessInfo = {
  name: "Tech Solutions Inc.",
  description: "Leading provider of innovative technology solutions for businesses of all sizes.",
  address: "123 Tech Street, Silicon Valley, CA 94025",
  website: "https://example.com",
  phone: "(555) 123-4567",
  email: "contact@techsolutions.com",
  hours: "Mon-Fri: 9AM-6PM",
  employees: 50,
  imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
};

// Dashboard statistics mock data
export const mockDashboardData: DashboardData = {
  stats: {
    totalReviews: 150,
    positiveReviews: 120,
    neutralReviews: 20,
    negativeReviews: 10,
    reviewsTrend: 15,
    positiveTrend: 12,
    neutralTrend: -5,
    negativeTrend: -8
  },
  reviews: [
    {
      id: '1',
      reviewer: {
        name: 'John Doe',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      rating: 5,
      text: 'Great service! Really impressed with the quality and attention to detail.',
      date: '2024-03-15',
      type: 'positive',
      source: 'google',
      hasReplied: false,
      likes: 12,
      isLiked: false,
      sourceUrl: 'https://g.page/r/...',
    },
    {
      id: '2',
      reviewer: {
        name: 'Jane Smith',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      rating: 4,
      text: 'Very professional team, would recommend!',
      date: '2024-03-14',
      type: 'positive',
      source: 'yelp',
      hasReplied: true,
      reply: 'Thank you for your kind words!',
      likes: 8,
      isLiked: true,
      sourceUrl: 'https://yelp.com/biz/...',
    }
  ],
  analytics: [
    { date: '2024-01', rating: 4.2 },
    { date: '2024-02', rating: 4.5 },
    { date: '2024-03', rating: 4.8 }
  ]
};