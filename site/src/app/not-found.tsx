import Link from 'next/link';
import { getPopularPosts } from '@/lib/wordpress';

export default async function NotFound() {
  const popularPosts = await getPopularPosts(4);

  const quickLinks = [
    { href: '/', label: 'Home', description: 'Compare car insurance quotes' },
    { href: '/quote', label: 'Get a Quote', description: 'Free, no-obligation quote' },
    { href: '/blog', label: 'Blog', description: 'Insurance tips & guides' },
    { href: '/faq', label: 'FAQ', description: 'Common questions answered' },
    { href: '/oklahoma-car-insurance-guide', label: 'OK Insurance Guide', description: 'State requirements & more' },
    { href: '/about', label: 'About Us', description: 'Learn about our agency' },
  ];

  return (
    <div className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Main 404 Message */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-100 mb-6">
            <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Page Not Found</h1>
          <p className="text-xl text-gray-600 max-w-lg mx-auto">
            Sorry, the page you&apos;re looking for doesn&apos;t exist or may have moved.
            Let us help you find what you need.
          </p>
        </div>

        {/* Primary CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Link
            href="/"
            className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center"
          >
            Go to Homepage
          </Link>
          <Link
            href="/quote"
            className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-colors text-center"
          >
            Get a Free Quote
          </Link>
        </div>

        {/* Quick Links Grid */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Quick Links</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all"
              >
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {link.label}
                </h3>
                <p className="text-sm text-gray-500 mt-1">{link.description}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Popular Articles */}
        {popularPosts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Popular Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {popularPosts.map((post) => {
                const plainTitle = post.title.replace(/<[^>]*>/g, '');
                const plainExcerpt = post.excerpt.replace(/<[^>]*>/g, '').substring(0, 100);

                return (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className="group p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all"
                  >
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {plainTitle}
                    </h3>
                    <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                      {plainExcerpt}...
                    </p>
                    <span className="inline-block mt-2 text-sm text-blue-600 font-medium">
                      Read article &rarr;
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Contact Section */}
        <div className="mt-16 text-center p-8 bg-gray-50 rounded-xl">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Still can&apos;t find what you need?</h2>
          <p className="text-gray-600 mb-4">
            Our team is here to help you find the right car insurance coverage.
          </p>
          <Link
            href="/about"
            className="text-blue-600 font-medium hover:text-blue-700 transition-colors"
          >
            Contact us &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
