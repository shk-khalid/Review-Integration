export type ReviewType = 'positive' | 'neutral' | 'negative';
export type ReviewSource = 'google' | 'yelp' | 'facebook' | 'trustpilot';

export interface Review {
  id: string;
  reviewer: {
    name: string;
    avatar?: string;
  };
  rating: number;
  text: string;
  date: string;
  type: ReviewType;
  source: ReviewSource;
  hasReplied: boolean;
  reply?: string;
  likes: number;
  isLiked: boolean;
  sourceUrl: string;
}

// ... rest of the types remain the same