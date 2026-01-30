import { Metadata } from 'next';
import { getPosts } from '@/lib/wordpress';
import { carrierCount } from '@/lib/config';
import HeroSection from '@/components/HeroSection';
import InsurancePricingCalculator from '@/components/InsurancePricingCalculator';
import WhyChooseUs from '@/components/WhyChooseUs';
import Testimonials from '@/components/Testimonials';
import FAQSection from '@/components/FAQSection';
import ModernCTA from '@/components/ModernCTA';
import PostCard from '@/components/PostCard';
import Link from 'next/link';

export const metadata: Metadata = {
  title: `Compare Car Insurance in Tulsa | ${carrierCount} Carriers | Free Quotes`,
  description: `Compare auto insurance from ${carrierCount} carriers including Progressive, GEICO, Safeco & more. Get free quotes from a licensed Oklahoma independent agency. No obligation.`,
  keywords: ['car insurance Tulsa', 'auto insurance Tulsa OK', 'Oklahoma car insurance', 'Tulsa insurance quotes', 'compare car insurance'],
  alternates: {
    canonical: 'https://cheapestcarinsurancetulsa.com',
  },
  openGraph: {
    title: `Compare Car Insurance in Tulsa | ${carrierCount} Carriers`,
    description: `Compare auto insurance from ${carrierCount} carriers. Get free quotes from a licensed Oklahoma agency.`,
    type: 'website',
    locale: 'en_US',
  },
};

export default async function Home() {
  const recentPosts = await getPosts({ per_page: 3 });

  return (
    <div>
      {/* Hero Section */}
      <HeroSection />

      {/* Insurance Pricing Calculator */}
      <InsurancePricingCalculator />

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Testimonials - Real Google Reviews Only */}
      <Testimonials />

      {/* FAQ Section */}
      <FAQSection />

      {/* Recent Posts Section */}
      {recentPosts.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Insurance Tips & Guides
              </h2>
              <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
                Learn about car insurance coverage options and ways to save.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {recentPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
            <div className="text-center mt-10">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors"
              >
                View All Articles
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <ModernCTA />
    </div>
  );
}
