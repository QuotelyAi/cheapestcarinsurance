import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const ADMIN_COOKIE_NAME = 'admin_auth';
const COOKIE_MAX_AGE = 60 * 60 * 24; // 24 hours

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword) {
      console.error('ADMIN_PASSWORD environment variable not set');
      return NextResponse.json(
        { error: 'Admin authentication not configured' },
        { status: 500 }
      );
    }

    if (password !== adminPassword) {
      return NextResponse.json(
        { error: 'Invalid password' },
        { status: 401 }
      );
    }

    // Create a simple auth token (in production, use proper JWT or sessions)
    const authToken = Buffer.from(`${Date.now()}-${adminPassword}`).toString('base64');

    const cookieStore = await cookies();
    cookieStore.set(ADMIN_COOKIE_NAME, authToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: COOKIE_MAX_AGE,
      path: '/',
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
  return NextResponse.json({ success: true });
}

export async function GET() {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get(ADMIN_COOKIE_NAME);

  if (!authCookie?.value) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  // Validate the token contains the admin password
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    return NextResponse.json({ authenticated: false }, { status: 500 });
  }

  try {
    const decoded = Buffer.from(authCookie.value, 'base64').toString('utf-8');
    if (decoded.includes(adminPassword)) {
      return NextResponse.json({ authenticated: true });
    }
  } catch {
    // Invalid token format
  }

  return NextResponse.json({ authenticated: false }, { status: 401 });
}
