import { NextResponse } from 'next/server';
import { list } from '@vercel/blob';

export const revalidate = 600; // Cache for 10 minutes

interface SiteReview {
  id: string;
  rating: number;
  comment: string;
  name: string;
  createdAt: string;
  source: string;
}

export async function GET() {
  try {
    const { blobs } = await list({ prefix: 'reviews/' });

    const reviews: SiteReview[] = [];

    for (const blob of blobs) {
      if (!blob.pathname.endsWith('-review.json')) continue;
      try {
        const response = await fetch(blob.url);
        const data = await response.json();
        reviews.push({
          id: data.id,
          rating: data.rating,
          comment: data.comment || '',
          name: data.name || '',
          createdAt: data.createdAt || blob.uploadedAt.toISOString(),
          source: 'website',
        });
      } catch (err) {
        console.error('Error parsing review blob:', blob.pathname, err);
      }
    }

    // Sort newest first
    reviews.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    const total = reviews.length;
    const averageRating = total > 0
      ? Math.round((reviews.reduce((sum, r) => sum + r.rating, 0) / total) * 10) / 10
      : 0;

    return NextResponse.json({ reviews, total, averageRating });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json(
      { error: 'Failed to fetch reviews' },
      { status: 500 }
    );
  }
}
