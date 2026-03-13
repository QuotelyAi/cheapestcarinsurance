import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import {
  validateBlogPost,
  getCurrentTimestamp,
} from '@/lib/blog-utils';
import { WPPost } from '@/lib/wordpress';

const POSTS_FILE = path.join(process.cwd(), 'content', 'posts.json');

/**
 * PUT /api/admin/blogs/[id]
 * Update a blog post
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const postId = parseInt(resolvedParams.id, 10);
    if (isNaN(postId)) {
      return NextResponse.json(
        { error: 'Invalid post ID' },
        { status: 400 }
      );
    }

    const body = await request.json();

    // Read existing posts
    const content = await fs.readFile(POSTS_FILE, 'utf-8');
    const posts: WPPost[] = JSON.parse(content);

    // Find post by ID
    const postIndex = posts.findIndex(p => p.id === postId);
    if (postIndex === -1) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    const existingPost = posts[postIndex];

    // Create updated post object (preserving id and date)
    const updatedPost: WPPost = {
      ...existingPost,
      ...body,
      id: existingPost.id, // Preserve original ID
      date: existingPost.date, // Preserve original date
      modified: getCurrentTimestamp(), // Update modified timestamp
    };

    // Validate the updated post
    const validation = validateBlogPost(updatedPost);
    if (!validation.valid) {
      return NextResponse.json(
        { error: 'Validation failed', errors: validation.errors },
        { status: 400 }
      );
    }

    // Check for duplicate slug (if slug changed)
    if (updatedPost.slug !== existingPost.slug) {
      if (posts.some(p => p.slug === updatedPost.slug && p.id !== postId)) {
        return NextResponse.json(
          { error: 'Slug already exists' },
          { status: 409 }
        );
      }
    }

    // Update the post in array
    posts[postIndex] = updatedPost;

    // Write back to file
    await fs.writeFile(POSTS_FILE, JSON.stringify(posts, null, 2));

    return NextResponse.json(updatedPost);
  } catch (error) {
    console.error('Error updating post:', error);
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to update post' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/blogs/[id]
 * Delete a blog post
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const postId = parseInt(resolvedParams.id, 10);
    if (isNaN(postId)) {
      return NextResponse.json(
        { error: 'Invalid post ID' },
        { status: 400 }
      );
    }

    // Read existing posts
    const content = await fs.readFile(POSTS_FILE, 'utf-8');
    const posts: WPPost[] = JSON.parse(content);

    // Find post index
    const postIndex = posts.findIndex(p => p.id === postId);
    if (postIndex === -1) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    // Remove post from array
    posts.splice(postIndex, 1);

    // Write back to file
    await fs.writeFile(POSTS_FILE, JSON.stringify(posts, null, 2));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting post:', error);
    return NextResponse.json(
      { error: 'Failed to delete post' },
      { status: 500 }
    );
  }
}
