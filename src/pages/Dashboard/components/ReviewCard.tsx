import React, { useState } from 'react';
import { MessageSquare, Star, ThumbsUp, ExternalLink } from 'lucide-react';
import { Review, ReviewSource } from '../types';
import { formatDate } from '../utils/dateUtils';
import { ReviewReplyModal } from './ReviewReplyModal';
import { ReviewSourceBadge } from './ReviewSourceBadge';

interface ReviewCardProps {
  review: Review;
  onReply: (id: string, reply: string) => void;
  onLike: (id: string) => void;
}

export function ReviewCard({ review, onReply, onLike }: ReviewCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);

  const shouldTruncate = review.text.length > 200;
  const displayText = shouldTruncate && !isExpanded
    ? `${review.text.slice(0, 200)}...`
    : review.text;

  const handleReply = (reply: string) => {
    onReply(review.id, reply);
    setIsReplyModalOpen(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 transition-all hover:shadow-md">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4">
          <img
            src={review.reviewer.avatar || `https://ui-avatars.com/api/?name=${review.reviewer.name}`}
            alt={review.reviewer.name}
            className="h-10 w-10 rounded-full"
          />
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-medium">{review.reviewer.name}</h3>
              <ReviewSourceBadge source={review.source} />
            </div>
            <div className="flex items-center space-x-2 mt-1">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500">{formatDate(review.date)}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => onLike(review.id)}
            className={`
              p-2 rounded-lg text-sm font-medium flex items-center
              ${review.isLiked
                ? 'text-blue-600 bg-blue-50'
                : 'text-gray-600 hover:bg-gray-50'}
            `}
          >
            <ThumbsUp className={`h-4 w-4 ${review.isLiked ? 'fill-current' : ''}`} />
            <span className="ml-1">{review.likes}</span>
          </button>

          <button
            onClick={() => setIsReplyModalOpen(true)}
            className={`
              px-4 py-2 rounded-lg text-sm font-medium flex items-center
              ${review.hasReplied
                ? 'text-green-700 bg-green-50'
                : 'text-blue-600 bg-blue-50 hover:bg-blue-100'}
            `}
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            {review.hasReplied ? 'Replied' : 'Reply'}
          </button>

          <a
            href={review.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-gray-500 hover:text-gray-700"
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>

      <p className="mt-4 text-gray-600">{displayText}</p>
      
      {shouldTruncate && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-2 text-blue-600 text-sm hover:text-blue-700"
        >
          {isExpanded ? 'Show less' : 'Read more'}
        </button>
      )}

      {review.hasReplied && review.reply && (
        <div className="mt-4 pl-4 border-l-2 border-gray-200">
          <p className="text-sm text-gray-500">Your reply:</p>
          <p className="mt-1 text-gray-600">{review.reply}</p>
        </div>
      )}

      <ReviewReplyModal
        isOpen={isReplyModalOpen}
        onClose={() => setIsReplyModalOpen(false)}
        onSubmit={handleReply}
        existingReply={review.reply}
      />
    </div>
  );
}