import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const POSTS_FILE = path.join(process.cwd(), 'content', 'posts.json');

interface BlogPost {
  id: number;
  slug: string;
  date: string;
  modified: string;
  title: string;
  content: string;
  excerpt: string;
  featured_media: number | null;
  categories: number[];
  tags: number[];
  author: number;
  status: string;
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function getCurrentTimestamp(): string {
  return new Date().toISOString();
}

function generatePostId(): number {
  return Date.now();
}

async function readPosts(): Promise<BlogPost[]> {
  try {
    const content = await fs.readFile(POSTS_FILE, 'utf-8');
    return JSON.parse(content);
  } catch {
    return [];
  }
}

async function writePosts(posts: BlogPost[]): Promise<void> {
  await fs.writeFile(POSTS_FILE, JSON.stringify(posts, null, 2));
}

export async function GET(request: NextRequest) {
  try {
    const posts = await readPosts();
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const perPage = parseInt(searchParams.get('per_page') || '100');

    const start = (page - 1) * perPage;
    const end = start + perPage;
    const paginatedPosts = posts.slice(start, end);

    return NextResponse.json({
      posts: paginatedPosts,
      total: posts.length,
      page,
      perPage,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, content, excerpt, categories = [], tags = [], author = 1 } = body;

    // Validation
    if (!title || !content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      );
    }

    const posts = await readPosts();
    const slug = generateSlug(title);

    // Check for duplicate slug
    if (posts.some(p => p.slug === slug)) {
      return NextResponse.json(
        { error: 'A post with this title slug already exists' },
        { status: 409 }
      );
    }

    const now = getCurrentTimestamp();
    const newPost: BlogPost = {
      id: generatePostId(),
      slug,
      date: now,
      modified: now,
      title,
      content,
      excerpt: excerpt || content.substring(0, 160),
      featured_media: null,
      categories,
      tags,
      author,
      status: 'publish',
    };

    posts.push(newPost);
    await writePosts(posts);

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    );
  }
}
