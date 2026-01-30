import { Metadata } from 'next';
import { cookies } from 'next/headers';
import AdminLogin from '@/components/AdminLogin';
import AdminNav from '@/components/AdminNav';

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nosnippet: true,
  },
};

const ADMIN_COOKIE_NAME = 'admin_auth';

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

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authenticated = await isAuthenticated();

  if (!authenticated) {
    return <AdminLogin />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNav />
      <main className="py-8">
        {children}
      </main>
    </div>
  );
}
