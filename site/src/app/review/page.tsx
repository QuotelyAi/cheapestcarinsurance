'use client';

import { useState } from 'react';
import StarRatingInput from '@/components/StarRatingInput';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const GOOGLE_REVIEW_URL = 'https://maps.google.com/?cid=7456621553477419244';

export default function ReviewPage() {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (rating === 0) {
      setError('Please select a star rating');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/reviews/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rating, comment, name }),
      });

      if (!res.ok) throw new Error('Failed to submit');
      setSubmitted(true);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <meta name="robots" content="noindex" />
      <Header />
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-lg mx-auto px-4 py-16">
          {!submitted ? (
            <>
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  How Was Your Experience?
                </h1>
                <p className="text-gray-600">
                  We value your feedback! Let us know how we did.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
                {/* Star Rating */}
                <div className="text-center">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Your Rating
                  </label>
                  <div className="flex justify-center">
                    <StarRatingInput
                      rating={rating}
                      onRate={setRating}
                      size="lg"
                      interactive
                    />
                  </div>
                  {rating > 0 && (
                    <p className="mt-2 text-sm text-gray-500">
                      {rating === 5 && 'Excellent!'}
                      {rating === 4 && 'Great!'}
                      {rating === 3 && 'Good'}
                      {rating === 2 && 'Fair'}
                      {rating === 1 && 'Poor'}
                    </p>
                  )}
                </div>

                {/* Name (optional) */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Your First Name <span className="text-gray-400">(optional)</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    maxLength={100}
                    placeholder="John"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                {/* Comment (optional) */}
                <div>
                  <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
                    Comments <span className="text-gray-400">(optional)</span>
                  </label>
                  <textarea
                    id="comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    maxLength={1000}
                    rows={4}
                    placeholder="Tell us about your experience..."
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none"
                  />
                </div>

                {error && (
                  <p className="text-red-600 text-sm text-center">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={submitting || rating === 0}
                  className="w-full bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Submitting...' : 'Submit Review'}
                </button>
              </form>
            </>
          ) : (
            /* Thank You + Google Review CTA */
            <div className="text-center bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <div className="text-5xl mb-4">🎉</div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Thank You{name ? `, ${name}` : ''}!
              </h1>
              <p className="text-gray-600 mb-8">
                We appreciate you taking the time to share your feedback.
              </p>

              {/* Google Review CTA — shown to ALL raters (no review gating) */}
              <div className="bg-blue-50 rounded-lg p-6 mb-6">
                <p className="text-gray-700 font-medium mb-4">
                  Would you also share your experience on Google? It helps other customers find us!
                </p>
                <a
                  href={GOOGLE_REVIEW_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-white border-2 border-blue-600 text-blue-700 font-semibold px-8 py-4 rounded-lg hover:bg-blue-600 hover:text-white transition-colors text-lg"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  Share on Google
                </a>
              </div>

              <a
                href="/"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                &larr; Back to Home
              </a>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
