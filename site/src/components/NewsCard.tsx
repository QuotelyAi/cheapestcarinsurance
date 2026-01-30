import Link from 'next/link';
import { NewsArticle, getSourceDisplayName, getSourceColor } from '@/lib/news';

interface NewsCardProps {
  article: NewsArticle;
  featured?: boolean;
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
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function NewsCard({ article, featured = false }: NewsCardProps) {
  const sourceColor = getSourceColor(article.source);
  const sourceName = getSourceDisplayName(article.source);

  if (featured) {
    return (
      <article className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${sourceColor}`}>
              {sourceName}
            </span>
            {article.category && (
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                {article.category}
              </span>
            )}
            <span className="text-sm text-gray-500 ml-auto">
              {formatRelativeDate(article.pubDate)}
            </span>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-blue-600 transition-colors">
            <a href={article.link} target="_blank" rel="noopener noreferrer">
              {article.title}
            </a>
          </h3>
          <p className="text-gray-600 mb-4 line-clamp-3">
            {article.description}
          </p>
          <a
            href={article.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-blue-600 font-medium hover:text-blue-700 transition-colors"
          >
            Read full article
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </article>
    );
  }

  return (
    <article className="bg-white rounded-lg shadow border border-gray-100 hover:shadow-md transition-shadow p-4">
      <div className="flex items-start gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className={`px-2 py-0.5 rounded text-xs font-semibold ${sourceColor}`}>
              {sourceName}
            </span>
            <span className="text-xs text-gray-500">
              {formatRelativeDate(article.pubDate)}
            </span>
          </div>
          <h4 className="font-semibold text-gray-900 mb-1 line-clamp-2 hover:text-blue-600 transition-colors">
            <a href={article.link} target="_blank" rel="noopener noreferrer">
              {article.title}
            </a>
          </h4>
          <p className="text-sm text-gray-600 line-clamp-2">
            {article.description}
          </p>
        </div>
      </div>
    </article>
  );
}

interface NewsListProps {
  articles: NewsArticle[];
  showFeatured?: boolean;
  limit?: number;
}

export function NewsList({ articles, showFeatured = true, limit }: NewsListProps) {
  const displayArticles = limit ? articles.slice(0, limit) : articles;
  const featured = showFeatured && displayArticles.length > 0 ? displayArticles[0] : null;
  const rest = showFeatured ? displayArticles.slice(1) : displayArticles;

  return (
    <div className="space-y-6">
      {featured && (
        <NewsCard article={featured} featured />
      )}
      <div className="grid gap-4 md:grid-cols-2">
        {rest.map((article) => (
          <NewsCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
}

interface NewsFilterProps {
  activeSource: string;
  onSourceChange: (source: string) => void;
}

export function NewsFilter({ activeSource, onSourceChange }: NewsFilterProps) {
  const sources = [
    { id: 'all', label: 'All Sources' },
    { id: 'insurance-journal', label: 'Insurance Journal' },
    { id: 'progressive', label: 'Progressive' },
    { id: 'geico', label: 'GEICO' },
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {sources.map((source) => (
        <button
          key={source.id}
          onClick={() => onSourceChange(source.id)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            activeSource === source.id
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {source.label}
        </button>
      ))}
    </div>
  );
}
