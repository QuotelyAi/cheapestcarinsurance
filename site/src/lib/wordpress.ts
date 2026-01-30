import fs from 'fs';
import path from 'path';

// Content directory path
const CONTENT_DIR = path.join(process.cwd(), 'content');

// Types
export interface WPPost {
  id: number;
  slug: string;
  date: string;
  modified: string;
  title: string;
  content: string;
  excerpt: string;
  featured_media: number;
  categories: number[];
  tags: number[];
  author: number;
  status: string;
}

export interface WPPage {
  id: number;
  slug: string;
  date: string;
  modified: string;
  title: string;
  content: string;
  excerpt: string;
  featured_media: number;
  parent: number;
  menu_order: number;
  author: number;
  status: string;
}

export interface WPMedia {
  id: number;
  slug: string;
  title: string;
  alt_text: string;
  source_url: string;
  media_details: {
    width: number;
    height: number;
    sizes: {
      thumbnail?: { source_url: string; width: number; height: number };
      medium?: { source_url: string; width: number; height: number };
      large?: { source_url: string; width: number; height: number };
      full?: { source_url: string; width: number; height: number };
    };
  } | null;
}

export interface WPCategory {
  id: number;
  count: number;
  description: string;
  name: string;
  slug: string;
  parent: number;
}

export interface WPTag {
  id: number;
  count: number;
  description: string;
  name: string;
  slug: string;
}

// Cache for loaded content
let postsCache: WPPost[] | null = null;
let pagesCache: WPPage[] | null = null;
let mediaCache: WPMedia[] | null = null;
let categoriesCache: WPCategory[] | null = null;
let tagsCache: WPTag[] | null = null;

// Load JSON file
function loadJSON<T>(filename: string): T {
  const filePath = path.join(CONTENT_DIR, filename);
  const content = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(content);
}

// Posts
export async function getPosts(params: { per_page?: number; page?: number; categories?: number; tags?: number } = {}): Promise<WPPost[]> {
  if (!postsCache) {
    postsCache = loadJSON<WPPost[]>('posts.json');
  }

  let posts = [...postsCache];

  // Filter by category
  if (params.categories) {
    posts = posts.filter(post => post.categories.includes(params.categories!));
  }

  // Filter by tag
  if (params.tags) {
    posts = posts.filter(post => post.tags.includes(params.tags!));
  }

  // Pagination
  const perPage = params.per_page || 100;
  const page = params.page || 1;
  const start = (page - 1) * perPage;
  const end = start + perPage;

  return posts.slice(start, end);
}

export async function getPostBySlug(slug: string): Promise<WPPost | null> {
  if (!postsCache) {
    postsCache = loadJSON<WPPost[]>('posts.json');
  }
  return postsCache.find(post => post.slug === slug) || null;
}

export async function getAllPosts(): Promise<WPPost[]> {
  if (!postsCache) {
    postsCache = loadJSON<WPPost[]>('posts.json');
  }
  return postsCache;
}

export async function getAllPostSlugs(): Promise<string[]> {
  if (!postsCache) {
    postsCache = loadJSON<WPPost[]>('posts.json');
  }
  return postsCache.map(post => post.slug);
}

// Pages
export async function getPages(params: { per_page?: number; page?: number; parent?: number } = {}): Promise<WPPage[]> {
  if (!pagesCache) {
    pagesCache = loadJSON<WPPage[]>('pages.json');
  }

  let pages = [...pagesCache];

  // Filter by parent
  if (params.parent !== undefined) {
    pages = pages.filter(page => page.parent === params.parent);
  }

  // Pagination
  const perPage = params.per_page || 100;
  const page = params.page || 1;
  const start = (page - 1) * perPage;
  const end = start + perPage;

  return pages.slice(start, end);
}

export async function getPageBySlug(slug: string): Promise<WPPage | null> {
  if (!pagesCache) {
    pagesCache = loadJSON<WPPage[]>('pages.json');
  }
  return pagesCache.find(page => page.slug === slug) || null;
}

export async function getAllPages(): Promise<WPPage[]> {
  if (!pagesCache) {
    pagesCache = loadJSON<WPPage[]>('pages.json');
  }
  return pagesCache;
}

export async function getAllPageSlugs(): Promise<string[]> {
  if (!pagesCache) {
    pagesCache = loadJSON<WPPage[]>('pages.json');
  }
  return pagesCache.map(page => page.slug);
}

// Media
export async function getMedia(id: number): Promise<WPMedia | null> {
  if (!mediaCache) {
    mediaCache = loadJSON<WPMedia[]>('media.json');
  }
  return mediaCache.find(media => media.id === id) || null;
}

export async function getAllMedia(params: { per_page?: number; page?: number } = {}): Promise<WPMedia[]> {
  if (!mediaCache) {
    mediaCache = loadJSON<WPMedia[]>('media.json');
  }

  const perPage = params.per_page || 100;
  const page = params.page || 1;
  const start = (page - 1) * perPage;
  const end = start + perPage;

  return mediaCache.slice(start, end);
}

// Categories
export async function getCategories(): Promise<WPCategory[]> {
  if (!categoriesCache) {
    categoriesCache = loadJSON<WPCategory[]>('categories.json');
  }
  return categoriesCache;
}

export async function getCategoryBySlug(slug: string): Promise<WPCategory | null> {
  if (!categoriesCache) {
    categoriesCache = loadJSON<WPCategory[]>('categories.json');
  }
  return categoriesCache.find(cat => cat.slug === slug) || null;
}

// Tags
export async function getTags(): Promise<WPTag[]> {
  if (!tagsCache) {
    tagsCache = loadJSON<WPTag[]>('tags.json');
  }
  return tagsCache;
}

export async function getTagBySlug(slug: string): Promise<WPTag | null> {
  if (!tagsCache) {
    tagsCache = loadJSON<WPTag[]>('tags.json');
  }
  return tagsCache.find(tag => tag.slug === slug) || null;
}

// Helper to get featured image URL
export async function getFeaturedImageUrl(mediaId: number): Promise<string | null> {
  if (!mediaId) return null;
  const media = await getMedia(mediaId);
  return media?.source_url || null;
}

// Get related posts based on shared categories, falling back to recent posts
export async function getRelatedPosts(currentPost: WPPost, limit: number = 3): Promise<WPPost[]> {
  if (!postsCache) {
    postsCache = loadJSON<WPPost[]>('posts.json');
  }

  // Filter out the current post
  const otherPosts = postsCache.filter(p => p.id !== currentPost.id);

  // Score posts by shared categories and tags
  const scoredPosts = otherPosts.map(post => {
    let score = 0;

    // +2 points for each shared category
    for (const catId of post.categories) {
      if (currentPost.categories.includes(catId)) {
        score += 2;
      }
    }

    // +1 point for each shared tag
    for (const tagId of post.tags) {
      if (currentPost.tags.includes(tagId)) {
        score += 1;
      }
    }

    return { post, score };
  });

  // Sort by score (descending), then by date (newest first)
  scoredPosts.sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    return new Date(b.post.date).getTime() - new Date(a.post.date).getTime();
  });

  return scoredPosts.slice(0, limit).map(sp => sp.post);
}

// Get recent posts (excluding a specific post if provided)
export async function getRecentPosts(limit: number = 5, excludeSlug?: string): Promise<WPPost[]> {
  if (!postsCache) {
    postsCache = loadJSON<WPPost[]>('posts.json');
  }

  let posts = [...postsCache];

  if (excludeSlug) {
    posts = posts.filter(p => p.slug !== excludeSlug);
  }

  // Sort by date descending
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts.slice(0, limit);
}

// Get popular posts (for now, just returns recent posts - could be enhanced with view counts)
export async function getPopularPosts(limit: number = 5): Promise<WPPost[]> {
  return getRecentPosts(limit);
}
