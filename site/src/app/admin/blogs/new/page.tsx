import { Metadata } from 'next';
import BlogForm from '@/components/BlogForm';
import { getCategories } from '@/lib/wordpress';

export const metadata: Metadata = {
  title: 'Create New Blog Post | Admin',
};

export default async function NewBlogPage() {
  const categories = await getCategories();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Create New Article</h1>
        <p className="mt-2 text-gray-600">
          Write and publish a new blog post.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <BlogForm categories={categories} />
      </div>
    </div>
  );
}
