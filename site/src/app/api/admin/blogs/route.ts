import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import {
  validateBlogPost,
  generatePostId,
  generateSlug,
  getCurrentTimestamp,
} from '@/lib/blog-utils';
import { WPPost } from '@/lib/wordpress';

const POSTS_FILE = path.join(process.cwd(), 'content', 'posts.json');

/**
 * GET /api/admin/blogs
 * List blog posts with pagination
 */
export async function GET(request: NextRequest) {
  try {
    // Parse query parameters
    const searchParams = request.nextUrl.searchParams;
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
    const perPage = Math.max(1, Math.min(100, parseInt(searchParams.get('per_page') || '20', 10)));

    // Read posts.json
    const content = await fs.readFile(POSTS_FILE, 'utf-8');
    const posts: WPPost[] = JSON.parse(content);

    // Calculate pagination
    const total = posts.length;
    const start = (page - 1) * perPage;
    const end = start + perPage;
    const paginatedPosts = posts.slice(start, end);

    return NextResponse.json({
      posts: paginatedPosts,
      total,
      page,
      perPage,
    });
  } catch (error) {
    console.error('Error reading posts:', error);
    return NextResponse.json(
      { error: 'Failed to read posts' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/blogs
 * Create a new blog post
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Auto-generate slug from title if not provided
    let slug = body.slug;
    if (!slug && body.title) {
      slug = generateSlug(body.title);
    }

    // Create post object with validated and generated fields
    const newPost: Partial<WPPost> = {
      ...body,
      slug,
    };

    // Validate the post
    const validation = validateBlogPost(newPost);
    if (!validation.valid) {
      return NextResponse.json(
        { error: 'Validation failed', errors: validation.errors },
        { status: 400 }
      );
    }

    // Read existing posts
    let posts: WPPost[];
    try {
      const content = await fs.readFile(POSTS_FILE, 'utf-8');
      posts = JSON.parse(content);
    } catch (error) {
      console.error('Error reading posts file:', error);
      posts = [];
    }

    // Check for duplicate slug
    if (posts.some(p => p.slug === slug)) {
      return NextResponse.json(
        { error: 'Slug already exists' },
        { status: 409 }
      );
    }

    // Generate ID and timestamps
    const id = generatePostId();
    const now = getCurrentTimestamp();

    const post: WPPost = {
      id,
      slug,
      date: now,
      modified: now,
      title: body.title,
      content: body.content,
      excerpt: body.excerpt || '',
      featured_media: body.featured_media || 0,
      categories: body.categories || [],
      tags: body.tags || [],
      author: body.author || 0,
      status: body.status || 'draft',
    };

    // Insert at beginning of array
    posts.unshift(post);

    // Write back to file
    await fs.writeFile(POSTS_FILE, JSON.stringify(posts, null, 2));

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error);
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    );
  }
}
