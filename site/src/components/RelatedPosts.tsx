import Link from 'next/link';
import Image from 'next/image';
import { WPPost, getMedia } from '@/lib/wordpress';

interface RelatedPostsProps {
  posts: WPPost[];
  title?: string;
}

async function RelatedPostCard({ post }: { post: WPPost }) {
  const featuredMedia = post.featured_media ? await getMedia(post.featured_media) : null;
  const featuredImage = featuredMedia?.media_details?.sizes?.thumbnail?.source_url
    || featuredMedia?.media_details?.sizes?.medium?.source_url
    || featuredMedia?.source_url;

  const plainTitle = post.title.replace(/<[^>]*>/g, '');

  return (
    <article className="group flex gap-4">
      {featuredImage ? (
        <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
          <Image
            src={featuredImage}
            alt={featuredMedia?.alt_text || plainTitle}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-200"
            sizes="80px"
          />
        </div>
      ) : (
        <div className="w-20 h-20 flex-shrink-0 rounded-lg bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
          <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
        </div>
      )}
      <div className="flex-1 min-w-0">
        <Link
          href={`/blog/${post.slug}`}
          className="block text-gray-900 font-medium hover:text-blue-600 transition-colors line-clamp-2"
        >
          {plainTitle}
        </Link>
        <time className="text-sm text-gray-500 mt-1 block" dateTime={post.date}>
          {new Date(post.date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })}
        </time>
      </div>
    </article>
  );
}

export default async function RelatedPosts({ posts, title = 'Related Articles' }: RelatedPostsProps) {
  if (posts.length === 0) {
    return null;
  }

  return (
    <section className="mt-12 pt-8 border-t border-gray-200">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <RelatedPostCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}
