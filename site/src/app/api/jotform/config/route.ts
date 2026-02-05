import { NextResponse } from 'next/server';

const JOTFORM_API_KEY = process.env.JOTFORM_API_KEY;
const JOTFORM_FORM_ID = process.env.JOTFORM_FORM_ID || '242546337686164';
const JOTFORM_BASE_URL = 'https://api.jotform.com/v1';

export async function GET() {
  try {
    if (!JOTFORM_API_KEY) {
      console.error('[JotForm] API key not configured');
      return NextResponse.json(
        { error: 'JotForm configuration missing' },
        { status: 500 }
      );
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const response = await fetch(
      `${JOTFORM_BASE_URL}/form/${JOTFORM_FORM_ID}?apiKey=${JOTFORM_API_KEY}`,
      { signal: controller.signal }
    );

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`JotForm API returned ${response.status}`);
    }

    const data = await response.json();

    return NextResponse.json({
      formId: JOTFORM_FORM_ID,
      formUrl: `https://form.jotform.com/${JOTFORM_FORM_ID}`,
      title: data.content?.title,
      status: data.content?.status,
      success: true,
    });
  } catch (error) {
    console.error('[JotForm] Config fetch failed:', error);
    return NextResponse.json(
      { error: 'Failed to load form configuration' },
      { status: 500 }
    );
  }
}
