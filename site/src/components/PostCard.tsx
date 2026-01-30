import Link from 'next/link';
import Image from 'next/image';
import { WPPost, getMedia } from '@/lib/wordpress';

interface PostCardProps {
  post: WPPost;
}

export default async function PostCard({ post }: PostCardProps) {
  const featuredMedia = post.featured_media ? await getMedia(post.featured_media) : null;
  const featuredImage = featuredMedia?.media_details?.sizes?.medium?.source_url || featuredMedia?.source_url;

  return (
    <article className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      {featuredImage && (
        <div className="relative h-48 w-full">
          <Image
            src={featuredImage}
            alt={featuredMedia?.alt_text || post.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}
      <div className="p-6">
        <time className="text-sm text-gray-500" dateTime={post.date}>
          {new Date(post.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </time>
        <h3 className="text-xl font-semibold mt-2 mb-3">
          <Link
            href={`/blog/${post.slug}`}
            className="text-gray-900 hover:text-blue-600 transition-colors"
            dangerouslySetInnerHTML={{ __html: post.title }}
          />
        </h3>
        <div
          className="text-gray-600 line-clamp-3"
          dangerouslySetInnerHTML={{ __html: post.excerpt }}
        />
        <Link
          href={`/blog/${post.slug}`}
          className="inline-block mt-4 text-blue-600 font-medium hover:text-blue-700 transition-colors"
        >
          Read More &rarr;
        </Link>
      </div>
    </article>
  );
}
