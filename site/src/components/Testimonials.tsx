'use client';

import { useEffect, useState } from 'react';

// This component displays REAL Google Reviews only
// Requires: NEXT_PUBLIC_GOOGLE_PLACES_API_KEY and NEXT_PUBLIC_GOOGLE_PLACE_ID env vars

interface GoogleReview {
  author_name: string;
  rating: number;
  text: string;
  relative_time_description: string;
  profile_photo_url?: string;
}

interface PlaceDetails {
  rating?: number;
  user_ratings_total?: number;
  reviews?: GoogleReview[];
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-5 h-5 ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [placeData, setPlaceData] = useState<PlaceDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY;
  const placeId = process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID;

  useEffect(() => {
    async function fetchReviews() {
      if (!apiKey || !placeId) {
        setError('Google Reviews not configured');
        setLoading(false);
        return;
      }

      try {
        // Note: In production, this should go through your own API route
        // to protect your API key
        const response = await fetch(`/api/google-reviews`);
        if (!response.ok) throw new Error('Failed to fetch reviews');
        const data = await response.json();
        setPlaceData(data);
      } catch (err) {
        setError('Unable to load reviews');
        console.error('Error fetching Google reviews:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchReviews();
  }, [apiKey, placeId]);

  // Don't render anything if no API configured or error
  if (error || !placeData?.reviews?.length) {
    // Fallback: Link to Google Reviews page
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Customer Reviews
          </h2>
          <p className="text-gray-600 mb-6">
            See what our customers are saying about their experience.
          </p>
          <a
            href="https://maps.google.com/?cid=7456621553477419244"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white border border-gray-300 px-6 py-3 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            View Our Google Reviews
          </a>
        </div>
      </section>
    );
  }

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="animate-pulse">Loading reviews...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          {placeData.rating && placeData.user_ratings_total && (
            <div className="flex items-center justify-center gap-3">
              <StarRating rating={Math.round(placeData.rating)} />
              <span className="text-lg font-semibold">{placeData.rating.toFixed(1)}</span>
              <span className="text-gray-500">
                ({placeData.user_ratings_total} reviews on Google)
              </span>
            </div>
          )}
        </div>

        {/* Real Google Reviews - filter out 1-star reviews */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {placeData.reviews.filter(review => review.rating >= 2).slice(0, 6).map((review, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl p-6 border border-gray-100"
            >
              <div className="flex items-start gap-3 mb-4">
                {review.profile_photo_url && (
                  <img
                    src={review.profile_photo_url}
                    alt=""
                    className="w-10 h-10 rounded-full"
                  />
                )}
                <div>
                  <div className="font-semibold text-gray-900">{review.author_name}</div>
                  <div className="text-sm text-gray-500">{review.relative_time_description}</div>
                </div>
              </div>
              <StarRating rating={review.rating} />
              <p className="mt-3 text-gray-700 line-clamp-4">{review.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <a
            href="https://maps.google.com/?cid=7456621553477419244"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 font-medium hover:text-blue-700"
          >
            See all reviews on Google →
          </a>
        </div>

        {/* FTC Compliance Notice */}
        <p className="mt-8 text-xs text-gray-400 text-center">
          Reviews shown are from Google and represent the opinions of actual customers.
          Individual results may vary. Past performance does not guarantee future results.
        </p>
      </div>
    </section>
  );
}
