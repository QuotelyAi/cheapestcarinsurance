import Link from 'next/link';

async function getSiteHealth() {
  // This would normally fetch real data
  return {
    totalPages: 25,
    totalBlogPosts: 82,
    lastBlogPost: '2025-01-20',
    sitemapStatus: 'healthy',
    indexedPages: 118,
    avgPageSpeed: 92,
    seoScore: 87,
    leadsThisMonth: 12,
    leadsThisWeek: 3,
  };
}

export default async function AdminDashboard() {
  const health = await getSiteHealth();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Site health overview and management tools.
        </p>
      </div>

      {/* Site Health Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
          <div className="text-sm font-medium text-gray-500">SEO Score</div>
          <div className="mt-2 flex items-baseline">
            <span className="text-3xl font-bold text-gray-900">{health.seoScore}</span>
            <span className="ml-1 text-gray-500">/100</span>
          </div>
          <div className="mt-2 text-xs text-green-600">Healthy</div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
          <div className="text-sm font-medium text-gray-500">Blog Posts</div>
          <div className="mt-2 flex items-baseline">
            <span className="text-3xl font-bold text-gray-900">{health.totalBlogPosts}</span>
            <span className="ml-2 text-sm text-gray-500">articles</span>
          </div>
          <div className="mt-2 text-xs text-gray-500">Last: {health.lastBlogPost}</div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-500">
          <div className="text-sm font-medium text-gray-500">Indexed Pages</div>
          <div className="mt-2 flex items-baseline">
            <span className="text-3xl font-bold text-gray-900">{health.indexedPages}</span>
            <span className="ml-2 text-sm text-gray-500">pages</span>
          </div>
          <div className="mt-2 text-xs text-gray-500">Sitemap: {health.sitemapStatus}</div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-orange-500">
          <div className="text-sm font-medium text-gray-500">Leads</div>
          <div className="mt-2 flex items-baseline">
            <span className="text-3xl font-bold text-gray-900">{health.leadsThisWeek}</span>
            <span className="ml-2 text-sm text-gray-500">this week</span>
          </div>
          <div className="mt-2 text-xs text-gray-500">{health.leadsThisMonth} this month</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/admin/blogs/new"
            className="flex items-center gap-3 p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <span className="text-2xl">&#9998;</span>
            <span className="font-medium">Write New Blog</span>
          </Link>
          <Link
            href="/admin/leads"
            className="flex items-center gap-3 p-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <span className="text-2xl">&#128100;</span>
            <span className="font-medium">View Leads</span>
          </Link>
          <Link
            href="/admin/seo"
            className="flex items-center gap-3 p-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <span className="text-2xl">&#128200;</span>
            <span className="font-medium">SEO Analysis</span>
          </Link>
          <Link
            href="/admin/sitemap"
            className="flex items-center gap-3 p-4 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            <span className="text-2xl">&#128506;</span>
            <span className="font-medium">Sitemap Status</span>
          </Link>
        </div>
      </div>

      {/* Management Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Content Management */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <span>&#128196;</span> Content Management
          </h3>
          <ul className="space-y-3">
            <li>
              <Link href="/admin/blogs" className="text-blue-600 hover:text-blue-800 flex items-center gap-2">
                <span>&#8594;</span> Blog Posts ({health.totalBlogPosts})
              </Link>
            </li>
            <li>
              <Link href="/admin/blogs/new" className="text-blue-600 hover:text-blue-800 flex items-center gap-2">
                <span>&#8594;</span> Write New Article
              </Link>
            </li>
            <li>
              <Link href="/admin/pages" className="text-blue-600 hover:text-blue-800 flex items-center gap-2">
                <span>&#8594;</span> Static Pages ({health.totalPages})
              </Link>
            </li>
            <li>
              <Link href="/admin/media" className="text-blue-600 hover:text-blue-800 flex items-center gap-2">
                <span>&#8594;</span> Media Library
              </Link>
            </li>
          </ul>
        </div>

        {/* SEO & Performance */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <span>&#128200;</span> SEO & Performance
          </h3>
          <ul className="space-y-3">
            <li>
              <Link href="/admin/seo" className="text-blue-600 hover:text-blue-800 flex items-center gap-2">
                <span>&#8594;</span> SEO Analysis
              </Link>
            </li>
            <li>
              <Link href="/admin/sitemap" className="text-blue-600 hover:text-blue-800 flex items-center gap-2">
                <span>&#8594;</span> Sitemap Management
              </Link>
            </li>
            <li>
              <Link href="/admin/eeat" className="text-blue-600 hover:text-blue-800 flex items-center gap-2">
                <span>&#8594;</span> E-E-A-T Guidance
              </Link>
            </li>
            <li>
              <Link href="/admin/performance" className="text-blue-600 hover:text-blue-800 flex items-center gap-2">
                <span>&#8594;</span> Page Speed Insights
              </Link>
            </li>
          </ul>
        </div>

        {/* Leads & Conversions */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <span>&#128100;</span> Leads & Conversions
          </h3>
          <ul className="space-y-3">
            <li>
              <Link href="/admin/leads" className="text-blue-600 hover:text-blue-800 flex items-center gap-2">
                <span>&#8594;</span> All Leads
              </Link>
            </li>
            <li>
              <Link href="/admin/leads?type=form" className="text-blue-600 hover:text-blue-800 flex items-center gap-2">
                <span>&#8594;</span> Form Submissions
              </Link>
            </li>
            <li>
              <Link href="/admin/leads?type=pdf" className="text-blue-600 hover:text-blue-800 flex items-center gap-2">
                <span>&#8594;</span> Document Uploads
              </Link>
            </li>
          </ul>
        </div>

        {/* News & RSS Feeds */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <span>&#128240;</span> News & RSS Feeds
          </h3>
          <ul className="space-y-3">
            <li>
              <Link href="/admin/news" className="text-blue-600 hover:text-blue-800 flex items-center gap-2">
                <span>&#8594;</span> Industry News Feed
              </Link>
            </li>
            <li>
              <Link href="/admin/rss" className="text-blue-600 hover:text-blue-800 flex items-center gap-2">
                <span>&#8594;</span> RSS Feed Sources
              </Link>
            </li>
            <li>
              <Link href="/admin/news/refresh" className="text-blue-600 hover:text-blue-800 flex items-center gap-2">
                <span>&#8594;</span> Refresh News Cache
              </Link>
            </li>
          </ul>
        </div>

        {/* Editorial & Quality */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <span>&#9989;</span> Editorial & Quality
          </h3>
          <ul className="space-y-3">
            <li>
              <Link href="/admin/editorial" className="text-blue-600 hover:text-blue-800 flex items-center gap-2">
                <span>&#8594;</span> Editorial Standards
              </Link>
            </li>
            <li>
              <Link href="/admin/eeat" className="text-blue-600 hover:text-blue-800 flex items-center gap-2">
                <span>&#8594;</span> E-E-A-T Checklist
              </Link>
            </li>
            <li>
              <Link href="/admin/compliance" className="text-blue-600 hover:text-blue-800 flex items-center gap-2">
                <span>&#8594;</span> Compliance Review
              </Link>
            </li>
          </ul>
        </div>

        {/* Settings */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <span>&#9881;</span> Settings
          </h3>
          <ul className="space-y-3">
            <li>
              <Link href="/admin/settings" className="text-blue-600 hover:text-blue-800 flex items-center gap-2">
                <span>&#8594;</span> Site Settings
              </Link>
            </li>
            <li>
              <Link href="/admin/integrations" className="text-blue-600 hover:text-blue-800 flex items-center gap-2">
                <span>&#8594;</span> Integrations
              </Link>
            </li>
            <li>
              <a href="https://vercel.com/quotely/cheapestcarinsurancetulsa" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 flex items-center gap-2">
                <span>&#8594;</span> Vercel Dashboard
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
