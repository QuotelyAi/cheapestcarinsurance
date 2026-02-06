import { NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import { notifyNewLead } from '@/lib/email';

const WEBHOOK_SECRET = process.env.JOTFORM_WEBHOOK_SECRET;

interface Lead {
  id: string;
  type: 'form';
  uploadedAt: string;
  name: string;
  email: string;
  phone: string;
  submissionId: string;
  sourceWebsite: string;
  formData: Record<string, unknown>;
}

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
}

function extractFieldValue(rawRequest: Record<string, unknown>, fieldKey: string): string {
  const value = rawRequest[fieldKey];
  if (!value) return '';
  if (typeof value === 'string') return value;
  if (typeof value === 'object' && value !== null) {
    // JotForm sends complex fields as objects with parts like first, last, etc.
    const obj = value as Record<string, string>;
    if (obj.first && obj.last) return `${obj.first} ${obj.last}`.trim();
    if (obj.full) return obj.full;
    // For phone numbers
    if (obj.full || obj.area) {
      return `${obj.area || ''}${obj.phone || ''}`.trim() || Object.values(obj).join('');
    }
    return Object.values(obj).filter(v => v).join(' ');
  }
  return String(value);
}

export async function POST(request: Request) {
  try {
    // Get the raw body for parsing
    const contentType = request.headers.get('content-type') || '';
    let formData: Record<string, unknown> = {};
    let rawRequest: Record<string, unknown> = {};

    if (contentType.includes('application/json')) {
      const body = await request.json();
      rawRequest = body.rawRequest || body;
      formData = body;
    } else if (contentType.includes('application/x-www-form-urlencoded') || contentType.includes('multipart/form-data')) {
      const form = await request.formData();
      for (const [key, value] of form.entries()) {
        if (key === 'rawRequest') {
          try {
            rawRequest = JSON.parse(value as string);
          } catch {
            rawRequest[key] = value;
          }
        } else {
          formData[key] = value;
        }
      }
    }

    // Verify webhook secret if configured
    if (WEBHOOK_SECRET) {
      const providedSecret = formData.handshakeKey || request.headers.get('x-jotform-signature');
      if (providedSecret !== WEBHOOK_SECRET) {
        console.log('Webhook secret mismatch');
        // Still process but log the mismatch - JotForm doesn't always send the key
      }
    }

    // Extract common fields from JotForm submission
    // JotForm field names vary, so we try multiple common patterns
    const name = extractFieldValue(rawRequest, 'q3_name') ||
                 extractFieldValue(rawRequest, 'q4_name') ||
                 extractFieldValue(rawRequest, 'name') ||
                 formData.pretty?.toString().match(/Name:\s*([^\n]+)/)?.[1] || '';

    const email = extractFieldValue(rawRequest, 'q5_email') ||
                  extractFieldValue(rawRequest, 'q4_email') ||
                  extractFieldValue(rawRequest, 'email') ||
                  formData.pretty?.toString().match(/Email:\s*([^\n]+)/)?.[1] || '';

    const phone = extractFieldValue(rawRequest, 'q6_phone') ||
                  extractFieldValue(rawRequest, 'q5_phone') ||
                  extractFieldValue(rawRequest, 'phone') ||
                  formData.pretty?.toString().match(/Phone:\s*([^\n]+)/)?.[1] || '';

    const sourceWebsite = extractFieldValue(rawRequest, 'q7_sourceWebsite') ||
                          extractFieldValue(rawRequest, 'source_website') ||
                          extractFieldValue(rawRequest, 'sourceWebsite') ||
                          formData.pretty?.toString().match(/Source Website:\s*([^\n]+)/)?.[1] || '';

    const submissionId = formData.submissionID?.toString() || generateId();

    // Create the lead entry
    const lead: Lead = {
      id: generateId(),
      type: 'form',
      uploadedAt: new Date().toISOString(),
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      submissionId,
      sourceWebsite: sourceWebsite.trim(),
      formData: rawRequest,
    };

    // Store as JSON blob in Vercel Blob storage
    const pathname = `leads/${lead.id}-form.json`;
    await put(pathname, JSON.stringify(lead), {
      access: 'public',
      contentType: 'application/json',
    });

    console.log('JotForm lead saved to Vercel Blob:', {
      id: lead.id,
      name: lead.name,
      email: lead.email,
      sourceWebsite: lead.sourceWebsite,
    });

    // Send email notification (don't let email failure block the response)
    notifyNewLead({
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      sourceWebsite: lead.sourceWebsite,
      submissionId: lead.submissionId,
    }).catch(err => console.error('Email notification failed:', err.message));

    return NextResponse.json({ success: true, leadId: lead.id });
  } catch (error) {
    console.error('JotForm webhook error:', error);
    return NextResponse.json(
      { error: 'Failed to process submission' },
      { status: 500 }
    );
  }
}

// Handle GET for webhook verification
export async function GET() {
  return NextResponse.json({ status: 'JotForm webhook endpoint active' });
}
