import { Metadata } from 'next';
import Link from 'next/link';
import { getAllNews, NewsArticle, getSourceDisplayName, getSourceColor } from '@/lib/news';

export const metadata: Metadata = {
  title: 'Auto Insurance Industry News | Oklahoma & National Coverage',
  description: 'Stay informed with the latest auto insurance news from Progressive, GEICO, and Insurance Journal. Coverage includes Oklahoma insurance updates, rate changes, and industry trends.',
  alternates: {
    canonical: 'https://cheapestcarinsurancetulsa.com/industry-news',
  },
  openGraph: {
    title: 'Auto Insurance Industry News',
    description: 'Latest news from Progressive, GEICO, and Insurance Journal covering auto insurance trends and Oklahoma updates.',
  },
};

// Revalidate every hour
export const revalidate = 3600;

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

function formatRelativeDate(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  return formatDate(dateStr);
}

function NewsCard({ article, featured = false }: { article: NewsArticle; featured?: boolean }) {
  const sourceColor = getSourceColor(article.source);
  const sourceName = getSourceDisplayName(article.source);

  if (featured) {
    return (
      <article className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow">
        <div className="p-6 md:p-8">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${sourceColor}`}>
              {sourceName}
            </span>
            {article.category && (
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                {article.category}
              </span>
            )}
            <span className="text-sm text-gray-500">
              {formatRelativeDate(article.pubDate)}
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 hover:text-blue-600 transition-colors">
            <a href={article.link} target="_blank" rel="noopener noreferrer">
              {article.title}
            </a>
          </h2>
          <p className="text-gray-600 mb-6 text-lg leading-relaxed">
            {article.description}
          </p>
          <a
            href={article.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Read Full Article
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </article>
    );
  }

  return (
    <article className="bg-white rounded-lg shadow border border-gray-100 hover:shadow-md transition-shadow p-5">
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <span className={`px-2 py-0.5 rounded text-xs font-semibold ${sourceColor}`}>
          {sourceName}
        </span>
        <span className="text-xs text-gray-500">
          {formatRelativeDate(article.pubDate)}
        </span>
      </div>
      <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
        <a href={article.link} target="_blank" rel="noopener noreferrer">
          {article.title}
        </a>
      </h3>
      <p className="text-sm text-gray-600 line-clamp-3 mb-3">
        {article.description}
      </p>
      <a
        href={article.link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-blue-600 font-medium hover:text-blue-700 inline-flex items-center gap-1"
      >
        Read more
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </a>
    </article>
  );
}

export default async function IndustryNewsPage() {
  const allNews = await getAllNews();

  // Separate by source for the sidebar
  const progressiveNews = allNews.filter(a => a.source === 'progressive');
  const geicoNews = allNews.filter(a => a.source === 'geico');
  const ijNews = allNews.filter(a => a.source === 'insurance-journal');

  const featuredArticle = allNews[0];
  const restArticles = allNews.slice(1);

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <nav className="text-sm text-gray-500 mb-4">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">Industry News</span>
          </nav>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Auto Insurance Industry News
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Stay informed with the latest updates from Progressive, GEICO, and Insurance Journal.
            Covering auto insurance trends, rate changes, and Oklahoma market news.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Featured Article */}
            {featuredArticle && (
              <section>
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-1 h-6 bg-blue-600 rounded"></span>
                  Latest News
                </h2>
                <NewsCard article={featuredArticle} featured />
              </section>
            )}

            {/* More Articles */}
            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-blue-600 rounded"></span>
                More Headlines
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                {restArticles.slice(0, 10).map((article) => (
                  <NewsCard key={article.id} article={article} />
                ))}
              </div>
            </section>

            {/* Source Attribution */}
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-6">
              <h3 className="font-semibold text-blue-900 mb-2">About Our News Sources</h3>
              <p className="text-sm text-blue-800">
                News content is aggregated from{' '}
                <a href="https://www.insurancejournal.com" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">Insurance Journal</a>,{' '}
                <a href="https://progressive.mediaroom.com" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">Progressive Newsroom</a>, and{' '}
                <a href="https://www.geico.com/about/pressreleases/" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">GEICO Press Releases</a>.
                All content is property of the respective publishers and linked to original sources.
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-8">
            {/* CTA */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 text-white">
              <h3 className="text-xl font-bold mb-3">Get Your Free Quote</h3>
              <p className="text-blue-100 mb-4 text-sm">
                Compare rates from Progressive, GEICO, and 8 other carriers in minutes.
              </p>
              <Link
                href="/quote"
                className="inline-flex items-center gap-2 bg-white text-blue-600 px-5 py-2.5 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Get Quote
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>

            {/* Progressive News */}
            {progressiveNews.length > 0 && (
              <div className="bg-white rounded-xl shadow border border-gray-100 p-5">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">P</span>
                  Progressive News
                </h3>
                <ul className="space-y-3">
                  {progressiveNews.slice(0, 3).map((article) => (
                    <li key={article.id}>
                      <a
                        href={article.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-gray-700 hover:text-blue-600 line-clamp-2 block"
                      >
                        {article.title}
                      </a>
                      <span className="text-xs text-gray-400">{formatRelativeDate(article.pubDate)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* GEICO News */}
            {geicoNews.length > 0 && (
              <div className="bg-white rounded-xl shadow border border-gray-100 p-5">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-xs font-bold">G</span>
                  GEICO News
                </h3>
                <ul className="space-y-3">
                  {geicoNews.slice(0, 3).map((article) => (
                    <li key={article.id}>
                      <a
                        href={article.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-gray-700 hover:text-blue-600 line-clamp-2 block"
                      >
                        {article.title}
                      </a>
                      <span className="text-xs text-gray-400">{formatRelativeDate(article.pubDate)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Quick Links */}
            <div className="bg-white rounded-xl shadow border border-gray-100 p-5">
              <h3 className="font-bold text-gray-900 mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/oklahoma-car-insurance-guide" className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Oklahoma Insurance Guide
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Insurance FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                    Insurance Blog
                  </Link>
                </li>
                <li>
                  <a href="https://www.oid.ok.gov/" target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    OK Insurance Department
                  </a>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
