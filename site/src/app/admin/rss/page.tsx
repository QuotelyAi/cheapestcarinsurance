import Link from 'next/link';

export default function AdminRSSPage() {
  const rssFeeds = [
    {
      name: 'Insurance Journal - Auto',
      url: 'https://www.insurancejournal.com/rss/auto/',
      status: 'active',
      lastFetch: '2025-01-21T10:30:00Z',
      itemCount: 15,
    },
    {
      name: 'Progressive Newsroom',
      url: 'https://progressive.mediaroom.com/rss/news-releases/',
      status: 'active',
      lastFetch: '2025-01-21T10:30:00Z',
      itemCount: 10,
    },
    {
      name: 'GEICO Press Releases',
      url: 'https://www.geico.com/about/pressreleases/rss/',
      status: 'active',
      lastFetch: '2025-01-21T10:30:00Z',
      itemCount: 8,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">RSS Feed Sources</h1>
        <p className="mt-2 text-gray-600">
          Manage the RSS feeds that power the industry news section.
        </p>
      </div>

      {/* Feed List */}
      <div className="bg-white rounded-lg shadow overflow-hidden mb-8">
        <div className="px-6 py-4 bg-gray-50 border-b flex justify-between items-center">
          <h3 className="font-semibold text-gray-900">Configured Feeds</h3>
          <span className="text-sm text-gray-500">{rssFeeds.length} feeds</span>
        </div>
        <div className="divide-y divide-gray-200">
          {rssFeeds.map((feed) => (
            <div key={feed.url} className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <h4 className="font-medium text-gray-900">{feed.name}</h4>
                    <span className={`px-2 py-0.5 text-xs font-medium rounded ${
                      feed.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {feed.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    {feed.url}
                  </p>
                  <div className="text-xs text-gray-400 mt-1">
                    Last fetch: {new Date(feed.lastFetch).toLocaleString()} &bull; {feed.itemCount} items
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-1 text-sm text-blue-600 hover:text-blue-800">
                    Test Feed
                  </button>
                  <button className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800">
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h3 className="font-semibold text-blue-900 mb-2">How RSS Feeds Work</h3>
        <p className="text-blue-800 text-sm mb-3">
          RSS feeds are automatically fetched and cached every hour. New articles appear on the
          Industry News page automatically. The feeds are parsed and displayed with source attribution.
        </p>
        <div className="text-sm text-blue-700">
          <strong>Feed configuration is in:</strong> <code className="bg-blue-100 px-1 rounded">src/lib/news.ts</code>
        </div>
      </div>

      {/* Add New Feed Form */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Add New RSS Feed</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Feed Name
            </label>
            <input
              type="text"
              placeholder="e.g., State Farm News"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              RSS Feed URL
            </label>
            <input
              type="url"
              placeholder="https://example.com/rss/feed.xml"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="text-sm text-gray-500">
            Note: Adding new feeds requires code changes. Contact your developer to add new RSS sources.
          </div>
        </div>
      </div>
    </div>
  );
}
