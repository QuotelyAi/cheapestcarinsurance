import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { put, del, list } from '@vercel/blob';

const ADMIN_COOKIE_NAME = 'admin_auth';

interface Lead {
  id: string;
  filename: string;
  url: string;
  uploadedAt: string;
  size: number;
  type: 'pdf' | 'form';
  formData?: {
    name?: string;
    email?: string;
    phone?: string;
  };
}

async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get(ADMIN_COOKIE_NAME);

  if (!authCookie?.value) {
    return false;
  }

  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    return false;
  }

  try {
    const decoded = Buffer.from(authCookie.value, 'base64').toString('utf-8');
    return decoded.includes(adminPassword);
  } catch {
    return false;
  }
}

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
}

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // List all blobs in the leads folder
    const { blobs } = await list({ prefix: 'leads/' });

    const leads: Lead[] = blobs.map(blob => {
      // Parse metadata from pathname
      const filename = blob.pathname.replace('leads/', '');
      const id = filename.split('-').slice(0, 2).join('-');

      return {
        id,
        filename: filename.split('-').slice(2).join('-') || filename,
        url: blob.url,
        uploadedAt: blob.uploadedAt.toISOString(),
        size: blob.size,
        type: 'pdf' as const,
      };
    });

    // Sort by upload date, newest first
    leads.sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime());

    return NextResponse.json({ leads });
  } catch (error) {
    console.error('Error fetching leads:', error);
    return NextResponse.json(
      { error: 'Failed to fetch leads', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file type
    if (file.type !== 'application/pdf') {
      return NextResponse.json(
        { error: 'Only PDF files are allowed' },
        { status: 400 }
      );
    }

    // Validate file size (10MB max)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File size must be less than 10MB' },
        { status: 400 }
      );
    }

    // Generate unique filename
    const id = generateId();
    const safeFilename = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const pathname = `leads/${id}-${safeFilename}`;

    // Upload to Vercel Blob
    const blob = await put(pathname, file, {
      access: 'public',
      contentType: 'application/pdf',
    });

    const lead: Lead = {
      id,
      filename: file.name,
      url: blob.url,
      uploadedAt: new Date().toISOString(),
      size: file.size,
      type: 'pdf',
    };

    return NextResponse.json({ success: true, lead });
  } catch (error) {
    console.error('Error uploading lead:', error);
    return NextResponse.json(
      { error: 'Failed to upload file', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');

    if (!url) {
      return NextResponse.json(
        { error: 'Blob URL is required' },
        { status: 400 }
      );
    }

    // Delete from Vercel Blob
    await del(url);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting lead:', error);
    return NextResponse.json(
      { error: 'Failed to delete lead', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
