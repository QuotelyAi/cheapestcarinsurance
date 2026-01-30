import { NextResponse } from 'next/server';
import { getAllPosts, getAllPages } from '@/lib/wordpress';
import { serviceAreas } from '@/lib/config';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://cheapestcarinsurancetulsa.com';

interface SitemapEntry {
  url: string;
  lastmod?: string;
  priority: string;
  changefreq: string;
}

// Format date to W3C format (YYYY-MM-DD) for sitemap compatibility
function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return new Date().toISOString().split('T')[0];
    }
    return date.toISOString().split('T')[0];
  } catch {
    return new Date().toISOString().split('T')[0];
  }
}

// Current date for static pages
const today = new Date().toISOString().split('T')[0];

export async function GET() {
  const [posts, pages] = await Promise.all([
    getAllPosts(),
    getAllPages(),
  ]);

  // Core pages - highest priority
  const corePages: SitemapEntry[] = [
    { url: '', lastmod: today, priority: '1.0', changefreq: 'daily' },
    { url: '/quote', lastmod: today, priority: '1.0', changefreq: 'monthly' },
    { url: '/blog', lastmod: today, priority: '0.9', changefreq: 'daily' },
  ];

  // Pillar content pages - high priority for SEO
  const pillarPages: SitemapEntry[] = [
    { url: '/oklahoma-car-insurance-guide', lastmod: today, priority: '0.9', changefreq: 'weekly' },
    { url: '/progressive-car-insurance', lastmod: today, priority: '0.8', changefreq: 'weekly' },
    { url: '/faq', lastmod: today, priority: '0.8', changefreq: 'weekly' },
  ];

  // Location pages - important for local SEO
  const locationPages: SitemapEntry[] = serviceAreas.primary
    .filter(area => area.slug !== 'tulsa') // Tulsa is homepage
    .map(area => ({
      url: `/car-insurance-${area.slug}`,
      lastmod: today,
      priority: '0.8',
      changefreq: 'weekly',
    }));

  // Trust & legal pages
  const trustPages: SitemapEntry[] = [
    { url: '/about', lastmod: today, priority: '0.7', changefreq: 'monthly' },
    { url: '/editorial-standards', lastmod: today, priority: '0.6', changefreq: 'monthly' },
    { url: '/privacy', lastmod: today, priority: '0.4', changefreq: 'yearly' },
    { url: '/terms', lastmod: today, priority: '0.4', changefreq: 'yearly' },
    { url: '/accessibility', lastmod: today, priority: '0.4', changefreq: 'yearly' },
  ];

  // Legacy static pages array for backwards compatibility
  const staticPages: SitemapEntry[] = [
    ...corePages,
    ...pillarPages,
    ...locationPages,
    ...trustPages,
  ];

  const postEntries: SitemapEntry[] = posts.map((post) => ({
    url: `/blog/${post.slug}`,
    lastmod: formatDate(post.modified),
    priority: '0.7',
    changefreq: 'weekly',
  }));

  // Slugs already defined in static pages - avoid duplicates
  const staticSlugs = new Set([
    'blog', 'quote', 'faq', 'about', 'privacy', 'terms', 'accessibility',
    'editorial-standards', 'oklahoma-car-insurance-guide', 'progressive-car-insurance',
    ...serviceAreas.primary.filter(a => a.slug !== 'tulsa').map(a => `car-insurance-${a.slug}`)
  ]);

  const pageEntries: SitemapEntry[] = pages
    .filter((page) => !staticSlugs.has(page.slug))
    .map((page) => ({
      url: `/${page.slug}`,
      lastmod: formatDate(page.modified),
      priority: '0.8',
      changefreq: 'weekly',
    }));

  const allEntries: SitemapEntry[] = [...staticPages, ...postEntries, ...pageEntries];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allEntries
  .map(
    (entry) => `  <url>
    <loc>${SITE_URL}${entry.url}</loc>
    ${entry.lastmod ? `<lastmod>${entry.lastmod}</lastmod>` : ''}
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
