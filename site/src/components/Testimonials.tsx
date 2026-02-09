'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { agencyConfig } from '@/lib/config';
import StarRatingInput from '@/components/StarRatingInput';

interface GoogleReview {
  author_name: string;
  rating: number;
  text: string;
  relative_time_description: string;
  profile_photo_url?: string;
  time?: number;
}

interface PlaceDetails {
  rating?: number;
  user_ratings_total?: number;
  reviews?: GoogleReview[];
}

interface SiteReview {
  id: string;
  rating: number;
  comment: string;
  name: string;
  createdAt: string;
  source: string;
}

interface SiteReviewsResponse {
  reviews: SiteReview[];
  total: number;
  averageRating: number;
}

interface DisplayReview {
  name: string;
  rating: number;
  text: string;
  timeLabel: string;
  photoUrl?: string;
  source: 'google' | 'website';
  sortTime: number;
}

export default function Testimonials() {
  const [placeData, setPlaceData] = useState<PlaceDetails | null>(null);
  const [siteReviews, setSiteReviews] = useState<SiteReviewsResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY;
  const placeId = process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID;

  useEffect(() => {
    async function fetchAllReviews() {
      const promises: Promise<void>[] = [];

      // Fetch Google reviews
      if (apiKey && placeId) {
        promises.push(
          fetch('/api/google-reviews')
            .then(res => res.ok ? res.json() : null)
            .then(data => setPlaceData(data))
            .catch(() => {})
        );
      }

      // Fetch site reviews
      promises.push(
        fetch('/api/reviews')
          .then(res => res.ok ? res.json() : null)
          .then(data => { if (data) setSiteReviews(data); })
          .catch(() => {})
      );

      await Promise.all(promises);
      setLoading(false);
    }

    fetchAllReviews();
  }, [apiKey, placeId]);

  // Build merged review list
  const googleReviews: DisplayReview[] = (placeData?.reviews || [])
    .filter(r => r.rating >= 2)
    .map(r => ({
      name: r.author_name,
      rating: r.rating,
      text: r.text,
      timeLabel: r.relative_time_description,
      photoUrl: r.profile_photo_url,
      source: 'google' as const,
      sortTime: r.time ? r.time * 1000 : 0,
    }));

  const websiteReviews: DisplayReview[] = (siteReviews?.reviews || [])
    .filter(r => r.rating >= 2 && r.comment)
    .map(r => ({
      name: r.name || 'Customer',
      rating: r.rating,
      text: r.comment,
      timeLabel: formatTimeAgo(r.createdAt),
      source: 'website' as const,
      sortTime: new Date(r.createdAt).getTime(),
    }));

  // Merge and interleave — show top 6, mixing sources
  const allReviews = [...googleReviews, ...websiteReviews]
    .sort((a, b) => b.sortTime - a.sortTime)
    .slice(0, 6);

  const googleCount = placeData?.user_ratings_total || 0;
  const siteCount = siteReviews?.total || 0;
  const hasAnyReviews = allReviews.length > 0;

  // Fallback when no reviews at all
  if (!loading && !hasAnyReviews) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Customer Reviews
          </h2>
          <p className="text-gray-600 mb-6">
            See what our customers are saying about their experience.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://maps.google.com/?cid=7456621553477419244"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white border border-gray-300 px-6 py-3 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <GoogleIcon />
              View Our Google Reviews
            </a>
            <Link
              href="/review"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Leave a Review
            </Link>
          </div>
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

  // Build JSON-LD schema with both sources
  const schemaReviews = allReviews.map(review => ({
    "@type": "Review",
    "author": {
      "@type": "Person",
      "name": review.name
    },
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": review.rating,
      "bestRating": 5,
      "worstRating": 1
    },
    "reviewBody": review.text,
  }));

  const totalReviewCount = googleCount + siteCount;
  const aggregateRating = placeData?.rating || siteReviews?.averageRating || 0;

  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://cheapestcarinsurancetulsa.com/#organization",
    "name": agencyConfig.name,
    ...(totalReviewCount > 0 && {
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": aggregateRating,
        "reviewCount": totalReviewCount,
        "bestRating": 5,
        "worstRating": 1
      }
    }),
    "review": schemaReviews
  };

  return (
    <section className="py-20 bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            {placeData?.rating && (
              <>
                <StarRatingInput rating={Math.round(placeData.rating)} size="sm" />
                <span className="text-lg font-semibold">{placeData.rating.toFixed(1)}</span>
              </>
            )}
            <span className="text-gray-500">
              {googleCount > 0 && `${googleCount} Google review${googleCount !== 1 ? 's' : ''}`}
              {googleCount > 0 && siteCount > 0 && ' + '}
              {siteCount > 0 && `${siteCount} website review${siteCount !== 1 ? 's' : ''}`}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allReviews.map((review, index) => (
            <div
              key={`${review.source}-${index}`}
              className="bg-gray-50 rounded-xl p-6 border border-gray-100"
            >
              <div className="flex items-start gap-3 mb-4">
                {review.photoUrl && (
                  <img
                    src={review.photoUrl}
                    alt={`${review.name} profile photo`}
                    className="w-10 h-10 rounded-full"
                  />
                )}
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-900">{review.name}</span>
                    <SourceBadge source={review.source} />
                  </div>
                  <div className="text-sm text-gray-500">{review.timeLabel}</div>
                </div>
              </div>
              <StarRatingInput rating={review.rating} size="sm" />
              <p className="mt-3 text-gray-700 line-clamp-4">{review.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="https://maps.google.com/?cid=7456621553477419244"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 font-medium hover:text-blue-700"
          >
            See all reviews on Google &rarr;
          </a>
          <Link
            href="/review"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm"
          >
            Leave a Review
          </Link>
        </div>

        <p className="mt-8 text-xs text-gray-400 text-center">
          Reviews shown are from Google and our website and represent the opinions of actual customers.
          Individual results may vary. Past performance does not guarantee future results.
        </p>
      </div>
    </section>
  );
}

function SourceBadge({ source }: { source: 'google' | 'website' }) {
  if (source === 'google') {
    return (
      <span className="inline-flex items-center gap-1 text-xs bg-white border border-gray-200 rounded-full px-2 py-0.5 text-gray-500">
        <GoogleIcon className="w-3 h-3" />
        Google
      </span>
    );
  }
  return (
    <span className="inline-flex items-center text-xs bg-blue-50 border border-blue-100 rounded-full px-2 py-0.5 text-blue-600">
      Website
    </span>
  );
}

function GoogleIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

function formatTimeAgo(dateString: string): string {
  const now = Date.now();
  const then = new Date(dateString).getTime();
  const diffMs = now - then;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays < 1) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} week${Math.floor(diffDays / 7) > 1 ? 's' : ''} ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} month${Math.floor(diffDays / 30) > 1 ? 's' : ''} ago`;
  return `${Math.floor(diffDays / 365)} year${Math.floor(diffDays / 365) > 1 ? 's' : ''} ago`;
}
