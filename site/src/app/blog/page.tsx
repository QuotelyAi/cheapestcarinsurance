import { Metadata } from 'next';
import { getAllPosts, getCategories } from '@/lib/wordpress';
import PostCard from '@/components/PostCard';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Read our latest articles about car insurance, tips for saving money, and industry news.',
  alternates: {
    canonical: 'https://cheapestcarinsurancetulsa.com/blog',
  },
};

export default async function BlogPage() {
  const [posts, categories] = await Promise.all([
    getAllPosts(),
    getCategories(),
  ]);

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Insurance Blog</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Stay informed with the latest tips, news, and guides about car insurance in Tulsa.
          </p>
        </div>

        {/* Categories */}
        {categories.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((category) => (
              <span
                key={category.id}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-blue-100 hover:text-blue-700 transition-colors cursor-pointer"
              >
                {category.name}
              </span>
            ))}
          </div>
        )}

        {/* Posts Grid */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No posts found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
