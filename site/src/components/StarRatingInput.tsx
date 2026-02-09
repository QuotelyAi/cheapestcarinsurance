'use client';

import { useState } from 'react';

interface StarRatingInputProps {
  rating: number;
  onRate?: (rating: number) => void;
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
}

const sizeClasses = {
  sm: 'w-5 h-5',
  md: 'w-8 h-8',
  lg: 'w-10 h-10',
};

export default function StarRatingInput({
  rating,
  onRate,
  size = 'md',
  interactive = false,
}: StarRatingInputProps) {
  const [hovered, setHovered] = useState(0);

  const displayRating = interactive && hovered > 0 ? hovered : rating;

  return (
    <div
      className="flex gap-1"
      role={interactive ? 'radiogroup' : 'img'}
      aria-label={interactive ? 'Rate your experience' : `${rating} out of 5 stars`}
      onMouseLeave={() => interactive && setHovered(0)}
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={!interactive}
          className={`${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : 'cursor-default'} ${sizeClasses[size]}`}
          onMouseEnter={() => interactive && setHovered(star)}
          onClick={() => interactive && onRate?.(star)}
          aria-label={`${star} star${star > 1 ? 's' : ''}`}
          role={interactive ? 'radio' : undefined}
          aria-checked={interactive ? star === rating : undefined}
        >
          <svg
            className={`${sizeClasses[size]} ${
              star <= displayRating ? 'text-yellow-400' : 'text-gray-300'
            } transition-colors`}
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </button>
      ))}
    </div>
  );
}
