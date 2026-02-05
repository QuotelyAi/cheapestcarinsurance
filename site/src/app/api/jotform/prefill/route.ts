import { NextRequest, NextResponse } from 'next/server';

const JOTFORM_FORM_ID = process.env.JOTFORM_FORM_ID || '242546337686164';

interface PrefillData {
  email?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  smsConsent?: boolean | string;
  sourceWebsite?: string;
  [key: string]: any;
}

// Extract domain from URL
function extractDomain(url: string): string {
  try {
    const domain = new URL(url).hostname;
    // Remove 'www.' prefix if present
    return domain.replace(/^www\./, '');
  } catch {
    return 'unknown';
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data: PrefillData = body.data || {};

    // Automatically capture source website from referer header
    const referer = request.headers.get('referer') || '';
    if (referer && !data.sourceWebsite) {
      data.sourceWebsite = extractDomain(referer);
    }

    // Validate smsConsent is boolean
    if (data.smsConsent && typeof data.smsConsent === 'string') {
      data.smsConsent = data.smsConsent === 'true' || data.smsConsent === '1';
    }

    // Build prefill URL with proper JotForm field mappings
    // Note: You'll need to update these field IDs based on your actual form structure
    const prefillParams = new URLSearchParams();

    // Map standard fields to JotForm format
    // Replace these IDs with your actual form field IDs from JotForm
    const fieldMapping: Record<string, string> = {
      email: 'email_1',
      firstName: 'first_name_2',
      lastName: 'last_name_3',
      phone: 'phone_4',
      smsConsent: 'sms_consent_5',
      sourceWebsite: 'source_website_6', // Tag: which website the lead came from
    };

    Object.entries(data).forEach(([key, value]) => {
      if (fieldMapping[key] && value !== undefined && value !== null) {
        const fieldId = fieldMapping[key];
        // Convert boolean SMS consent to "Yes"/"No" for JotForm
        if (key === 'smsConsent') {
          prefillParams.append(fieldId, value === true ? 'Yes' : 'No');
        } else {
          prefillParams.append(fieldId, String(value));
        }
      }
    });

    const prefillUrl = `https://form.jotform.com/${JOTFORM_FORM_ID}?${prefillParams.toString()}`;

    return NextResponse.json({
      success: true,
      formUrl: prefillUrl,
      formId: JOTFORM_FORM_ID,
      prefillParams: Object.fromEntries(prefillParams),
    });
  } catch (error) {
    console.error('[JotForm] Prefill generation failed:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to generate prefilled form URL',
      },
      { status: 500 }
    );
  }
}
