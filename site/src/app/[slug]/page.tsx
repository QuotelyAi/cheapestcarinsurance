import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getPageBySlug, getAllPageSlugs, getMedia } from '@/lib/wordpress';
import WPContent from '@/components/WPContent';
import Breadcrumbs from '@/components/Breadcrumbs';

interface Props {
  params: Promise<{ slug: string }>;
}

// Reserved routes that shouldn't be handled by this catch-all
const RESERVED_ROUTES = ['blog', 'quote', 'api'];

/**
 * Extract a clean meta description from HTML content.
 */
function extractMetaDescription(html: string, maxLength: number = 155): string {
  let text = html.replace(/<[^>]*>/g, ' ');
  text = text.replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#8217;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&hellip;/g, '...');
  text = text.replace(/\s+/g, ' ').trim();
  if (text.length > maxLength) {
    text = text.substring(0, maxLength);
    const lastSpace = text.lastIndexOf(' ');
    if (lastSpace > maxLength - 30) {
      text = text.substring(0, lastSpace);
    }
    text = text.trim() + '...';
  }
  return text;
}

export async function generateStaticParams() {
  const slugs = await getAllPageSlugs();
  return slugs
    .filter((slug) => !RESERVED_ROUTES.includes(slug))
    .map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  if (RESERVED_ROUTES.includes(slug)) {
    return {};
  }

  const page = await getPageBySlug(slug);

  if (!page) {
    return {
      title: 'Page Not Found',
    };
  }

  const plainTitle = page.title.replace(/<[^>]*>/g, '');
  const plainExcerpt = page.excerpt.replace(/<[^>]*>/g, '').trim();

  // Use excerpt if available, otherwise extract from content
  let description = plainExcerpt;
  if (!description || description.length < 50) {
    description = extractMetaDescription(page.content);
  }
  if (!description || description.length < 30) {
    description = `${plainTitle} - Expert insurance information from Cheapest Car Insurance Tulsa.`;
  }

  return {
    title: plainTitle,
    description,
    alternates: {
      canonical: `https://cheapestcarinsurancetulsa.com/${slug}`,
    },
    openGraph: {
      title: plainTitle,
      description,
      type: 'website',
      url: `https://cheapestcarinsurancetulsa.com/${slug}`,
    },
  };
}

export default async function DynamicPage({ params }: Props) {
  const { slug } = await params;

  if (RESERVED_ROUTES.includes(slug)) {
    notFound();
  }

  const page = await getPageBySlug(slug);

  if (!page) {
    notFound();
  }

  const featuredMedia = page.featured_media ? await getMedia(page.featured_media) : null;

  const plainTitle = page.title.replace(/<[^>]*>/g, '');

  return (
    <div className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb with Schema */}
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: plainTitle }
          ]}
          className="mb-8"
        />

        {/* Header */}
        <header className="mb-8">
          <h1
            className="text-4xl md:text-5xl font-bold mb-4"
            dangerouslySetInnerHTML={{ __html: page.title }}
          />
        </header>

        {/* Featured Image */}
        {featuredMedia && (
          <div className="relative w-full h-64 md:h-96 mb-8 rounded-xl overflow-hidden">
            <Image
              src={featuredMedia.source_url}
              alt={featuredMedia.alt_text || page.title.replace(/<[^>]*>/g, '')}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Content */}
        <WPContent
          html={page.content}
          className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600 prose-img:rounded-lg"
        />

        {/* CTA Section */}
        <div className="mt-12 pt-8 border-t border-gray-200 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-gray-600 mb-6">
            Get a free quote and see how much you can save on your car insurance today.
          </p>
          <Link
            href="/quote"
            className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Get Your Free Quote
          </Link>
        </div>
      </div>
    </div>
  );
}
