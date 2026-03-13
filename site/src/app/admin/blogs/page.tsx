'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface WPPost {
  id: number;
  title: string;
  slug: string;
  date: string;
  content: string;
  excerpt: string;
  featured_media: number;
  categories: number[];
  tags: number[];
  author: number;
  status: string;
  modified: string;
}

interface PostsResponse {
  posts: WPPost[];
  total: number;
  page: number;
  perPage: number;
}

export default function AdminBlogsPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<WPPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  // Fetch posts on component mount
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/admin/blogs?per_page=100');
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data: PostsResponse = await response.json();
        setPosts(data.posts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Handle delete action
  const handleDelete = async (postId: number, postTitle: string) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${postTitle}"? This cannot be undone.`
    );

    if (!confirmed) {
      return;
    }

    setDeletingId(postId);

    try {
      const response = await fetch(`/api/admin/blogs/${postId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete post');
      }

      // Remove post from state
      setPosts(posts.filter(p => p.id !== postId));
      router.refresh();
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Failed to delete article. Please try again.');
    } finally {
      setDeletingId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Blog Posts</h1>
            <p className="mt-2 text-gray-600">
              Manage and create blog content.
            </p>
          </div>
          <Link
            href="/admin/blogs/new"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            + New Article
          </Link>
        </div>
        <div className="text-center py-12">
          <p className="text-gray-500">Loading articles...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Blog Posts</h1>
          <p className="mt-2 text-gray-600">
            Manage and create blog content.
          </p>
        </div>
        <Link
          href="/admin/blogs/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          + New Article
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {posts.map((post) => (
              <tr key={post.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900 line-clamp-1">
                    {post.title.replace(/&#8217;/g, "'")}
                  </div>
                  <div className="text-xs text-gray-500 line-clamp-1">
                    /blog/{post.slug}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(post.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                    Published
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                  <a
                    href={`/blog/${post.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    View
                  </a>
                  <Link
                    href={`/admin/blogs/edit/${post.id}`}
                    className="text-gray-600 hover:text-gray-800"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(post.id, post.title)}
                    disabled={deletingId === post.id}
                    className="text-red-600 hover:text-red-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {deletingId === post.id ? 'Deleting...' : 'Delete'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 text-sm text-gray-500">
        Showing {posts.length} articles
      </div>
    </div>
  );
}
