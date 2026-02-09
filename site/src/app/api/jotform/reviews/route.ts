import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const ADMIN_COOKIE_NAME = 'admin_auth';

async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get(ADMIN_COOKIE_NAME);

  if (!authCookie?.value) return false;

  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) return false;

  try {
    const decoded = Buffer.from(authCookie.value, 'base64').toString('utf-8');
    return decoded.includes(adminPassword);
  } catch {
    return false;
  }
}

interface JotFormSubmission {
  id: string;
  created_at: string;
  answers: Record<string, {
    name: string;
    text: string;
    answer: string | Record<string, string>;
    type: string;
  }>;
}

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const apiKey = process.env.JOTFORM_API_KEY;
  const formId = process.env.JOTFORM_FORM_ID;

  if (!apiKey || !formId) {
    return NextResponse.json(
      { error: 'JotForm API not configured (JOTFORM_API_KEY + JOTFORM_FORM_ID required)' },
      { status: 500 }
    );
  }

  try {
    const res = await fetch(
      `https://api.jotform.com/form/${formId}/submissions?apiKey=${apiKey}&limit=100&orderby=created_at`,
      { next: { revalidate: 300 } }
    );

    if (!res.ok) {
      throw new Error(`JotForm API returned ${res.status}`);
    }

    const data = await res.json();
    const submissions: JotFormSubmission[] = data.content || [];

    // Extract ratings from submissions
    const reviews = submissions.map((sub) => {
      let rating = 0;
      let name = '';
      let comment = '';

      for (const answer of Object.values(sub.answers)) {
        const fieldName = (answer.name || answer.text || '').toLowerCase();
        const val = typeof answer.answer === 'string' ? answer.answer : '';

        // Look for star/rating fields
        if (fieldName.includes('rating') || fieldName.includes('star') || answer.type === 'control_rating') {
          const parsed = parseInt(val, 10);
          if (parsed >= 1 && parsed <= 5) rating = parsed;
        }

        // Look for name fields
        if (fieldName.includes('name') && !fieldName.includes('last')) {
          if (typeof answer.answer === 'object' && answer.answer !== null) {
            const parts = answer.answer as Record<string, string>;
            name = [parts.first, parts.last].filter(Boolean).join(' ');
          } else {
            name = val;
          }
        }

        // Look for comment/feedback fields
        if (fieldName.includes('comment') || fieldName.includes('feedback') || fieldName.includes('review')) {
          if (val && val.length > 5) comment = val;
        }
      }

      return {
        id: sub.id,
        rating,
        name,
        comment,
        createdAt: sub.created_at,
      };
    }).filter(r => r.rating > 0);

    return NextResponse.json({
      reviews,
      total: reviews.length,
      averageRating: reviews.length > 0
        ? Math.round((reviews.reduce((s, r) => s + r.rating, 0) / reviews.length) * 10) / 10
        : 0,
    });
  } catch (error) {
    console.error('JotForm reviews fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch JotForm reviews' },
      { status: 500 }
    );
  }
}
