import Link from 'next/link';
import { getAllNews } from '@/lib/news';

export const revalidate = 3600;

export default async function AdminNewsPage() {
  const allNews = await getAllNews();

  const newsBySource = {
    progressive: allNews.filter(n => n.source === 'progressive'),
    geico: allNews.filter(n => n.source === 'geico'),
    insuranceJournal: allNews.filter(n => n.source === 'insurance-journal'),
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Industry News Management</h1>
        <p className="mt-2 text-gray-600">
          Monitor and manage incoming RSS feeds for the industry news section.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm font-medium text-gray-500">Total Articles</div>
          <div className="mt-2 text-3xl font-bold text-gray-900">{allNews.length}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
          <div className="text-sm font-medium text-gray-500">Progressive</div>
          <div className="mt-2 text-3xl font-bold text-gray-900">{newsBySource.progressive.length}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
          <div className="text-sm font-medium text-gray-500">GEICO</div>
          <div className="mt-2 text-3xl font-bold text-gray-900">{newsBySource.geico.length}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-500">
          <div className="text-sm font-medium text-gray-500">Insurance Journal</div>
          <div className="mt-2 text-3xl font-bold text-gray-900">{newsBySource.insuranceJournal.length}</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          <a
            href="/industry-news"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            View Live News Page
          </a>
          <Link
            href="/admin/rss"
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            Manage RSS Sources
          </Link>
        </div>
      </div>

      {/* Recent Articles */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b">
          <h3 className="font-semibold text-gray-900">Recent Articles</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {allNews.slice(0, 20).map((article) => (
            <div key={article.id} className="px-6 py-4 hover:bg-gray-50">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`px-2 py-0.5 text-xs font-medium rounded ${
                      article.source === 'progressive' ? 'bg-blue-100 text-blue-800' :
                      article.source === 'geico' ? 'bg-green-100 text-green-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {article.source}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(article.pubDate).toLocaleDateString()}
                    </span>
                  </div>
                  <a
                    href={article.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-gray-900 hover:text-blue-600 line-clamp-1"
                  >
                    {article.title}
                  </a>
                  <p className="text-sm text-gray-500 line-clamp-2 mt-1">
                    {article.description}
                  </p>
                </div>
                <a
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 text-sm whitespace-nowrap"
                >
                  View &#8594;
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
