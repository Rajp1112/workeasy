import React from 'react';
import { Star, User } from 'lucide-react';
import { LinearProgress } from '@mui/material';

const ratingsBreakdown = [
  { stars: 5, count: 89 },
  { stars: 4, count: 28 },
  { stars: 3, count: 7 },
  { stars: 2, count: 2 },
  { stars: 1, count: 1 },
];

const reviews = [
  {
    initials: 'SJ',
    name: 'Sarah Johnson',
    rating: 5,
    timeAgo: '2 days ago',
    content:
      'John did an excellent job installing new outlets in my kitchen. Very professional and clean work!',
  },
  {
    initials: 'MD',
    name: 'Mike Davis',
    rating: 5,
    timeAgo: '1 week ago',
    content:
      'Quick response and fair pricing. Fixed my electrical panel issue efficiently.',
  },
  {
    initials: 'LC',
    name: 'Lisa Chen',
    rating: 4,
    timeAgo: '2 weeks ago',
    content:
      'Good work overall. Arrived on time and completed the job as expected.',
  },
];

const totalReviews = ratingsBreakdown.reduce((acc, r) => acc + r.count, 0);
const averageRating = ((
  ratingsBreakdown.reduce((acc, r) => acc + r.stars * r.count, 0) /
  totalReviews
).toFixed(1));

const ReviewsContent = () => {
  return (
    <div className="bg-white p-2">
      <h2 className="text-2xl font-semibold mb-4">Reviews & Ratings</h2>

      {/* Rating Summary */}
      <div className="flex flex-col md:flex-row md:items-center gap-6 mb-6">
        {/* Average */}
        <div className="flex flex-col items-center md:items-start">
          <span className="text-4xl font-bold">{averageRating}</span>
          <div className="flex text-yellow-500">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <Star key={i} size={18} fill={i < Math.round(averageRating) ? '#facc15' : 'none'} strokeWidth={1.5} />
              ))}
          </div>
          <span className="text-gray-500 text-sm mt-1">{totalReviews} reviews</span>
        </div>

        {/* Progress Bars */}
        <div className="flex-1 space-y-1">
          {ratingsBreakdown.map((rating) => {
            const percentage = ((rating.count / totalReviews) * 100).toFixed(1);
            return (
              <div key={rating.stars} className="flex items-center gap-2">
                <span className="w-6 text-sm">{rating.stars}★</span>
                <LinearProgress
                  variant="determinate"
                  value={parseFloat(percentage)}
                  sx={{
                    flex: 1,
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: '#e5e7eb',
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: '#111827',
                    },
                  }}
                />
                <span className="text-sm text-gray-600 w-8 text-right">{rating.count}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Individual Reviews */}
      <div className="space-y-6">
        {reviews.map((review, index) => (
          <div key={index} className="border-t pt-4">
            <div className="flex items-start gap-4">
              {/* Avatar */}
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium text-gray-700">
                {review.initials}
              </div>

              {/* Review Details */}
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{review.name}</span>
                  <div className="flex text-yellow-500">
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          fill={i < review.rating ? '#facc15' : 'none'}
                          strokeWidth={1.5}
                        />
                      ))}
                  </div>
                  <span className="text-sm text-gray-500">{review.timeAgo}</span>
                </div>
                <p className="text-gray-700 mt-1">{review.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsContent;
