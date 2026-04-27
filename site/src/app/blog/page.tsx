import { Metadata } from 'next';
import Link from 'next/link';
import { getAllPosts, getCategories } from '@/lib/wordpress';
import PostCard from '@/components/PostCard';

interface Props {
  searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { page } = await searchParams;
  const currentPage = page ? parseInt(page) : 1;

  return {
    title: currentPage > 1 ? `Blog - Page ${currentPage}` : 'Blog',
    description: 'Read our latest articles about car insurance, tips for saving money, and industry news.',
    alternates: {
      canonical: currentPage > 1 ? `https://cheapestcarinsurancetulsa.com/blog?page=${currentPage}` : 'https://cheapestcarinsurancetulsa.com/blog',
    },
  };
}

const POSTS_PER_PAGE = 12;

export default async function BlogPage({ searchParams }: Props) {
  const { page } = await searchParams;
  const currentPage = page ? Math.max(1, parseInt(page)) : 1;

  const [allPosts, categories] = await Promise.all([
    getAllPosts(),
    getCategories(),
  ]);

  // Filter published posts
  const publishedPosts = allPosts.filter(p => p.status === 'publish');
  const totalPages = Math.ceil(publishedPosts.length / POSTS_PER_PAGE);

  // Validate page number
  const validPage = Math.min(currentPage, Math.max(1, totalPages));
  const startIndex = (validPage - 1) * POSTS_PER_PAGE;
  const paginatedPosts = publishedPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);

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
        {paginatedPosts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {paginatedPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-16">
                {validPage > 1 && (
                  <Link
                    href={`/blog${validPage > 2 ? `?page=${validPage - 1}` : ''}`}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    ← Previous
                  </Link>
                )}

                <div className="flex gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const pageNum = validPage <= 3 ? i + 1 : validPage + i - 2;
                    if (pageNum > totalPages) return null;
                    return (
                      <Link
                        key={pageNum}
                        href={`/blog${pageNum > 1 ? `?page=${pageNum}` : ''}`}
                        className={`px-3 py-2 rounded-lg transition-colors ${
                          pageNum === validPage
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {pageNum}
                      </Link>
                    );
                  })}
                </div>

                {validPage < totalPages && (
                  <Link
                    href={`/blog?page=${validPage + 1}`}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Next →
                  </Link>
                )}
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No posts found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
