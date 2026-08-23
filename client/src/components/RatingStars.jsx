import React from 'react';
import { Star, StarHalf } from 'lucide-react';

const RatingStars = ({ rating = 0, numReviews, size = 'sm', showNum = true }) => {
  const stars = [];
  const iconSize = size === 'lg' ? 'w-5 h-5' : size === 'md' ? 'w-4 h-4' : 'w-3.5 h-3.5';

  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(
        <Star
          key={i}
          className={`${iconSize} fill-amber-400 text-amber-400`}
        />
      );
    } else if (rating >= i - 0.5) {
      stars.push(
        <StarHalf
          key={i}
          className={`${iconSize} fill-amber-400 text-amber-400`}
        />
      );
    } else {
      stars.push(
        <Star
          key={i}
          className={`${iconSize} text-gray-300 fill-gray-100`}
        />
      );
    }
  }

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center">{stars}</div>
      {showNum && (
        <span className="text-xs font-semibold text-gray-700">
          {rating ? rating.toFixed(1) : '0.0'}
        </span>
      )}
      {numReviews !== undefined && (
        <span className="text-xs text-amazon-blue hover:text-amazon-orange hover:underline cursor-pointer">
          ({numReviews.toLocaleString()})
        </span>
      )}
    </div>
  );
};

export default RatingStars;