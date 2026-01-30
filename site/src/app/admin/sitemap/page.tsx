import Link from 'next/link';

export default async function AdminSitemapPage() {
  // Fetch sitemap data
  let sitemapUrls: string[] = [];
  try {
    const response = await fetch('https://cheapestcarinsurancetulsa.com/sitemap.xml', {
      next: { revalidate: 3600 }
    });
    const text = await response.text();
    const urlMatches = text.match(/<loc>(.*?)<\/loc>/g);
    if (urlMatches) {
      sitemapUrls = urlMatches.map(match => match.replace(/<\/?loc>/g, ''));
    }
  } catch (error) {
    console.error('Failed to fetch sitemap:', error);
  }

  const categorizedUrls = {
    pages: sitemapUrls.filter(url => !url.includes('/blog/') && !url.includes('/car-insurance-')),
    blogs: sitemapUrls.filter(url => url.includes('/blog/')),
    locations: sitemapUrls.filter(url => url.includes('/car-insurance-')),
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Sitemap Management</h1>
        <p className="mt-2 text-gray-600">
          View and manage your site&apos;s sitemap for search engines.
        </p>
      </div>

      {/* Sitemap Status */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm font-medium text-gray-500">Total URLs</div>
          <div className="mt-2 text-3xl font-bold text-gray-900">{sitemapUrls.length}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm font-medium text-gray-500">Pages</div>
          <div className="mt-2 text-3xl font-bold text-gray-900">{categorizedUrls.pages.length}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm font-medium text-gray-500">Blog Posts</div>
          <div className="mt-2 text-3xl font-bold text-gray-900">{categorizedUrls.blogs.length}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm font-medium text-gray-500">Location Pages</div>
          <div className="mt-2 text-3xl font-bold text-gray-900">{categorizedUrls.locations.length}</div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h2>
        <div className="flex flex-wrap gap-4">
          <a
            href="https://cheapestcarinsurancetulsa.com/sitemap.xml"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800"
          >
            View Live Sitemap XML &#8594;
          </a>
          <a
            href="https://search.google.com/search-console"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800"
          >
            Google Search Console &#8594;
          </a>
          <a
            href="https://www.bing.com/webmasters"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800"
          >
            Bing Webmaster Tools &#8594;
          </a>
        </div>
      </div>

      {/* URL Lists */}
      <div className="space-y-8">
        {/* Main Pages */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b">
            <h3 className="font-semibold text-gray-900">Main Pages ({categorizedUrls.pages.length})</h3>
          </div>
          <div className="divide-y divide-gray-200 max-h-64 overflow-y-auto">
            {categorizedUrls.pages.map((url) => (
              <div key={url} className="px-6 py-3 flex justify-between items-center hover:bg-gray-50">
                <span className="text-sm text-gray-600 truncate">{url.replace('https://cheapestcarinsurancetulsa.com', '')}</span>
                <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 text-sm">
                  View
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Blog Posts */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b">
            <h3 className="font-semibold text-gray-900">Blog Posts ({categorizedUrls.blogs.length})</h3>
          </div>
          <div className="divide-y divide-gray-200 max-h-64 overflow-y-auto">
            {categorizedUrls.blogs.slice(0, 20).map((url) => (
              <div key={url} className="px-6 py-3 flex justify-between items-center hover:bg-gray-50">
                <span className="text-sm text-gray-600 truncate">{url.replace('https://cheapestcarinsurancetulsa.com', '')}</span>
                <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 text-sm">
                  View
                </a>
              </div>
            ))}
            {categorizedUrls.blogs.length > 20 && (
              <div className="px-6 py-3 text-sm text-gray-500">
                ... and {categorizedUrls.blogs.length - 20} more
              </div>
            )}
          </div>
        </div>

        {/* Location Pages */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b">
            <h3 className="font-semibold text-gray-900">Location Pages ({categorizedUrls.locations.length})</h3>
          </div>
          <div className="divide-y divide-gray-200 max-h-64 overflow-y-auto">
            {categorizedUrls.locations.map((url) => (
              <div key={url} className="px-6 py-3 flex justify-between items-center hover:bg-gray-50">
                <span className="text-sm text-gray-600 truncate">{url.replace('https://cheapestcarinsurancetulsa.com', '')}</span>
                <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 text-sm">
                  View
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
