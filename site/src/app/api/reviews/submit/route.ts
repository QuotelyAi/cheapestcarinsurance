import { NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import { notifyNewReview } from '@/lib/email';

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { rating, comment, name } = body;

    // Validate rating
    if (!rating || typeof rating !== 'number' || rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: 'Rating must be between 1 and 5' },
        { status: 400 }
      );
    }

    const reviewId = generateId();
    const review = {
      id: reviewId,
      rating: Math.round(rating),
      comment: typeof comment === 'string' ? comment.trim().slice(0, 1000) : '',
      name: typeof name === 'string' ? name.trim().slice(0, 100) : '',
      createdAt: new Date().toISOString(),
      source: 'website',
    };

    // Store to Vercel Blob
    const pathname = `reviews/${reviewId}-review.json`;
    await put(pathname, JSON.stringify(review), {
      access: 'public',
      contentType: 'application/json',
    });

    // Send email notification (non-blocking)
    notifyNewReview({
      name: review.name,
      rating: review.rating,
      comment: review.comment,
      reviewId: review.id,
    }).catch(err => console.error('Review email notification failed:', err.message));

    return NextResponse.json({ success: true, reviewId });
  } catch (error) {
    console.error('Review submit error:', error);
    return NextResponse.json(
      { error: 'Failed to submit review' },
      { status: 500 }
    );
  }
}
