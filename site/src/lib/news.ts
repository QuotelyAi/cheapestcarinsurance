// Insurance News Fetching Service
// Fetches news from Insurance Journal, Progressive, and GEICO

import { XMLParser } from 'fast-xml-parser';

export interface NewsArticle {
  id: string;
  title: string;
  description: string;
  link: string;
  pubDate: string;
  source: 'insurance-journal' | 'progressive' | 'geico';
  category?: string;
  imageUrl?: string;
}

interface RSSItem {
  title: string;
  description: string;
  link: string;
  pubDate: string;
  category?: string | string[];
  'media:content'?: { '@_url': string };
  enclosure?: { '@_url': string };
}

interface RSSFeed {
  rss: {
    channel: {
      title: string;
      item: RSSItem[];
    };
  };
}

// RSS Feed URLs
const FEEDS = {
  insuranceJournal: 'https://www.insurancejournal.com/rss/news/',
  // Progressive and GEICO don't have public RSS feeds, we'll handle them differently
};

// Keywords to filter for auto insurance and Oklahoma relevance
const RELEVANT_KEYWORDS = [
  'auto insurance',
  'car insurance',
  'vehicle insurance',
  'auto rates',
  'car rates',
  'progressive',
  'geico',
  'oklahoma',
  'tulsa',
  'motor vehicle',
  'liability coverage',
  'collision',
  'comprehensive',
  'uninsured motorist',
  'underinsured',
  'personal auto',
  'auto policy',
  'driving',
  'accident',
  'claims',
  'premium',
  'deductible',
  'p/c insurer',
  'property casualty',
  'south central',
  'texas', // neighboring state, relevant market info
];

function generateId(title: string, source: string): string {
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .slice(0, 50);
  return `${source}-${slug}-${Date.now()}`;
}

function isRelevantArticle(title: string, description: string): boolean {
  const text = `${title} ${description}`.toLowerCase();
  return RELEVANT_KEYWORDS.some(keyword => text.includes(keyword.toLowerCase()));
}

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();
}

function formatDate(dateStr: string): string {
  try {
    const date = new Date(dateStr);
    return date.toISOString();
  } catch {
    return new Date().toISOString();
  }
}

export async function fetchInsuranceJournalNews(): Promise<NewsArticle[]> {
  try {
    const response = await fetch(FEEDS.insuranceJournal, {
      next: { revalidate: 3600 }, // Cache for 1 hour
      headers: {
        'User-Agent': 'CheapestCarInsuranceTulsa/1.0',
      },
    });

    if (!response.ok) {
      console.error('Failed to fetch Insurance Journal RSS:', response.status);
      return [];
    }

    const xmlText = await response.text();
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: '@_',
    });

    const feed: RSSFeed = parser.parse(xmlText);
    const items = feed.rss?.channel?.item || [];

    const articles: NewsArticle[] = items
      .filter((item: RSSItem) => {
        const title = item.title || '';
        const description = stripHtml(item.description || '');
        return isRelevantArticle(title, description);
      })
      .slice(0, 20) // Limit to 20 relevant articles
      .map((item: RSSItem) => ({
        id: generateId(item.title, 'ij'),
        title: item.title,
        description: stripHtml(item.description || '').slice(0, 300) + '...',
        link: item.link,
        pubDate: formatDate(item.pubDate),
        source: 'insurance-journal' as const,
        category: Array.isArray(item.category) ? item.category[0] : item.category,
        imageUrl: item['media:content']?.['@_url'] || item.enclosure?.['@_url'],
      }));

    return articles;
  } catch (error) {
    console.error('Error fetching Insurance Journal news:', error);
    return [];
  }
}

// Curated news sources for Progressive and GEICO
// Since they don't have public RSS feeds, we'll use static curated content
// that can be updated periodically

export function getProgressiveNews(): NewsArticle[] {
  // These would be updated periodically from progressive.mediaroom.com
  return [
    {
      id: 'prog-accident-response-2025',
      title: 'Progressive Introduces Accident Response to Customers Nationwide',
      description: 'Progressive Insurance launched Accident Response, powered by Cambridge Mobile Telematics, providing real-time crash detection and emergency response services to policyholders across the nation.',
      link: 'https://progressive.mediaroom.com/news-releases/',
      pubDate: new Date('2025-11-15').toISOString(),
      source: 'progressive',
      category: 'Product Launch',
    },
    {
      id: 'prog-rate-decrease-la-2026',
      title: 'Progressive Approved for Personal Auto Rate Decreases in Louisiana',
      description: 'Louisiana Insurance Commissioner approved Progressive\'s request for a 6.6% average rate decrease for personal auto insurance customers in the state.',
      link: 'https://www.insurancejournal.com/news/southcentral/2026/01/08/853529.htm',
      pubDate: new Date('2026-01-08').toISOString(),
      source: 'progressive',
      category: 'Rates',
    },
    {
      id: 'prog-purpose-strategy-2024',
      title: 'Progressive Introduces Purpose-Driven Strategy',
      description: 'Progressive Insurance unveiled new purpose-driven strategy and initiatives designed to help people move forward and live fully through innovative insurance solutions.',
      link: 'https://progressive.mediaroom.com/news-releases/',
      pubDate: new Date('2024-09-20').toISOString(),
      source: 'progressive',
      category: 'Corporate',
    },
  ];
}

export function getGeicoNews(): NewsArticle[] {
  // These would be updated periodically from geico.com/about/pressreleases/
  return [
    {
      id: 'geico-new-ceo-2025',
      title: 'Berkshire Hathaway Names Nancy L. Pierce as GEICO CEO',
      description: 'Nancy L. Pierce, previously chief operating officer at GEICO, has been named the new chief executive officer of the major U.S. auto insurer.',
      link: 'https://www.geico.com/about/pressreleases/2025/',
      pubDate: new Date('2025-12-08').toISOString(),
      source: 'geico',
      category: 'Leadership',
    },
    {
      id: 'geico-motive-partnership-2025',
      title: 'GEICO Partners with Motive for Fleet Safety',
      description: 'GEICO and fleet management company Motive have partnered to improve driver safety and reduce insurance costs for commercial fleets through telematics and AI-powered safety tools.',
      link: 'https://www.geico.com/about/pressreleases/2025/',
      pubDate: new Date('2025-10-15').toISOString(),
      source: 'geico',
      category: 'Partnership',
    },
    {
      id: 'geico-texas-expansion-2025',
      title: 'GEICO Expands in North Texas with Second Office',
      description: 'GEICO announced expansion in North Texas with a second office location, creating more than 1,000 new jobs in the region.',
      link: 'https://www.businesswire.com/news/home/20250327526470/en/',
      pubDate: new Date('2025-03-27').toISOString(),
      source: 'geico',
      category: 'Expansion',
    },
  ];
}

export async function getAllNews(): Promise<NewsArticle[]> {
  const [ijNews, progressiveNews, geicoNews] = await Promise.all([
    fetchInsuranceJournalNews(),
    Promise.resolve(getProgressiveNews()),
    Promise.resolve(getGeicoNews()),
  ]);

  // Combine and sort by date (newest first)
  const allNews = [...ijNews, ...progressiveNews, ...geicoNews];
  allNews.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());

  return allNews;
}

export async function getNewsBySource(source: NewsArticle['source']): Promise<NewsArticle[]> {
  switch (source) {
    case 'insurance-journal':
      return fetchInsuranceJournalNews();
    case 'progressive':
      return getProgressiveNews();
    case 'geico':
      return getGeicoNews();
    default:
      return [];
  }
}

// Helper to get source display name
export function getSourceDisplayName(source: NewsArticle['source']): string {
  switch (source) {
    case 'insurance-journal':
      return 'Insurance Journal';
    case 'progressive':
      return 'Progressive';
    case 'geico':
      return 'GEICO';
    default:
      return source;
  }
}

// Helper to get source color
export function getSourceColor(source: NewsArticle['source']): string {
  switch (source) {
    case 'insurance-journal':
      return 'bg-blue-100 text-blue-800';
    case 'progressive':
      return 'bg-blue-600 text-white';
    case 'geico':
      return 'bg-green-600 text-white';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}
