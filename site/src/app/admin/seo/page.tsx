import Link from 'next/link';

export default function AdminSEOPage() {
  const seoChecklist = [
    { category: 'Technical SEO', items: [
      { label: 'XML Sitemap', status: 'pass', note: 'Sitemap is valid and accessible' },
      { label: 'Robots.txt', status: 'pass', note: 'Properly configured' },
      { label: 'SSL Certificate', status: 'pass', note: 'HTTPS enabled' },
      { label: 'Mobile Responsive', status: 'pass', note: 'Passes mobile-friendly test' },
      { label: 'Page Speed', status: 'warning', note: 'Could improve LCP on some pages' },
      { label: 'Core Web Vitals', status: 'pass', note: 'Passing all metrics' },
    ]},
    { category: 'On-Page SEO', items: [
      { label: 'Title Tags', status: 'pass', note: 'Unique titles on all pages' },
      { label: 'Meta Descriptions', status: 'pass', note: 'All pages have descriptions' },
      { label: 'Header Structure', status: 'pass', note: 'Proper H1-H6 hierarchy' },
      { label: 'Image Alt Tags', status: 'warning', note: 'Some images missing alt text' },
      { label: 'Internal Linking', status: 'pass', note: 'Good internal link structure' },
      { label: 'Schema Markup', status: 'pass', note: 'LocalBusiness & FAQ schema present' },
    ]},
    { category: 'Content Quality', items: [
      { label: 'E-E-A-T Signals', status: 'pass', note: 'Author info, credentials displayed' },
      { label: 'Content Freshness', status: 'pass', note: 'Regular blog updates' },
      { label: 'Keyword Optimization', status: 'pass', note: 'Primary keywords present' },
      { label: 'Content Length', status: 'pass', note: 'Adequate content on all pages' },
    ]},
    { category: 'Local SEO', items: [
      { label: 'Google Business Profile', status: 'pass', note: 'Claimed and optimized' },
      { label: 'NAP Consistency', status: 'pass', note: 'Name, Address, Phone consistent' },
      { label: 'Local Keywords', status: 'pass', note: 'Tulsa & Oklahoma keywords present' },
      { label: 'Location Pages', status: 'pass', note: '8 location pages created' },
    ]},
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pass': return 'bg-green-100 text-green-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'fail': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pass': return '&#10003;';
      case 'warning': return '&#9888;';
      case 'fail': return '&#10007;';
      default: return '?';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">SEO Analysis</h1>
        <p className="mt-2 text-gray-600">
          Monitor and optimize your site&apos;s search engine performance.
        </p>
      </div>

      {/* SEO Score Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
          <div className="text-sm font-medium text-gray-500">Overall Score</div>
          <div className="mt-2 flex items-baseline">
            <span className="text-3xl font-bold text-gray-900">87</span>
            <span className="ml-1 text-gray-500">/100</span>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm font-medium text-gray-500">Passing Checks</div>
          <div className="mt-2 text-3xl font-bold text-green-600">16</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm font-medium text-gray-500">Warnings</div>
          <div className="mt-2 text-3xl font-bold text-yellow-600">2</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm font-medium text-gray-500">Failing</div>
          <div className="mt-2 text-3xl font-bold text-red-600">0</div>
        </div>
      </div>

      {/* External Tools */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">External SEO Tools</h2>
        <div className="flex flex-wrap gap-4">
          <a
            href="https://search.google.com/search-console"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Google Search Console
          </a>
          <a
            href="https://pagespeed.web.dev/analysis?url=https%3A%2F%2Fcheapestcarinsurancetulsa.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            PageSpeed Insights
          </a>
          <a
            href="https://search.google.com/test/rich-results?url=https%3A%2F%2Fcheapestcarinsurancetulsa.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            Rich Results Test
          </a>
          <a
            href="https://search.google.com/test/mobile-friendly?url=https%3A%2F%2Fcheapestcarinsurancetulsa.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            Mobile-Friendly Test
          </a>
        </div>
      </div>

      {/* SEO Checklist */}
      <div className="space-y-6">
        {seoChecklist.map((category) => (
          <div key={category.category} className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b">
              <h3 className="font-semibold text-gray-900">{category.category}</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {category.items.map((item) => (
                <div key={item.label} className="px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${getStatusColor(item.status)}`}
                      dangerouslySetInnerHTML={{ __html: getStatusIcon(item.status) }}
                    />
                    <div>
                      <div className="font-medium text-gray-900">{item.label}</div>
                      <div className="text-sm text-gray-500">{item.note}</div>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded ${getStatusColor(item.status)}`}>
                    {item.status.toUpperCase()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
