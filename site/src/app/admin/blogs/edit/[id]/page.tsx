import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BlogForm from '@/components/BlogForm';
import { getAllPosts, getCategories, WPPost } from '@/lib/wordpress';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    id: post.id.toString(),
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const postId = parseInt(id, 10);

  const posts = await getAllPosts();
  const post = posts.find((p) => p.id === postId);

  if (!post) {
    return {
      title: 'Article Not Found | Admin',
    };
  }

  return {
    title: `Edit ${post.title} | Admin`,
  };
}

export default async function EditBlogPage({ params }: Props) {
  const { id } = await params;
  const postId = parseInt(id, 10);

  // Validate ID parsing
  if (isNaN(postId)) {
    notFound();
  }

  // Fetch posts and categories
  const [posts, categories] = await Promise.all([
    getAllPosts(),
    getCategories(),
  ]);

  // Find the post
  const post = posts.find((p) => p.id === postId);

  if (!post) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Edit Article</h1>
        <p className="mt-2 text-gray-600">
          {post.title}
        </p>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <BlogForm post={post} categories={categories} />
      </div>
    </div>
  );
}
