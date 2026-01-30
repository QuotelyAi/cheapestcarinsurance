import { Metadata } from 'next';
import Link from 'next/link';
import { agencyConfig, founderConfig, editorialStandards, authoritativeSources } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Editorial Standards | How We Create Trustworthy Content',
  description: 'Learn about our editorial standards, fact-checking process, and commitment to providing accurate, helpful insurance information for Oklahoma drivers.',
  alternates: {
    canonical: 'https://cheapestcarinsurancetulsa.com/editorial-standards',
  },
  openGraph: {
    title: 'Editorial Standards | Cheapest Car Insurance Tulsa',
    description: 'Our commitment to accuracy, transparency, and trustworthy insurance content.',
    type: 'website',
  },
};

export default function EditorialStandardsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="mb-6">
            <ol className="flex items-center space-x-2 text-sm text-blue-200">
              <li><Link href="/" className="hover:text-white">Home</Link></li>
              <li>/</li>
              <li>Editorial Standards</li>
            </ol>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Editorial Standards
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl">
            Our commitment to providing accurate, helpful, and trustworthy insurance
            information for Oklahoma drivers.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <article className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">

            {/* Our Commitment */}
            <section className="mb-12">
              <h2>Our Commitment to You</h2>
              <p>
                At {agencyConfig.name}, we understand that choosing car insurance is an important
                financial decision. That&apos;s why we&apos;re committed to providing you with accurate,
                unbiased, and helpful information to guide your choices.
              </p>
              <p>
                As a licensed insurance agency in Oklahoma, we hold ourselves to high standards
                of accuracy and transparency. This page explains how we create content and ensure
                its reliability.
              </p>
            </section>

            {/* Content Creation Process */}
            <section className="mb-12">
              <h2>How We Create Content</h2>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 my-6 not-prose">
                <h3 className="text-lg font-semibold text-blue-900 mb-4">Our Editorial Process</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">1</div>
                    <div>
                      <h4 className="font-semibold text-blue-900">Research</h4>
                      <p className="text-blue-800 text-sm">{editorialStandards.process.research}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">2</div>
                    <div>
                      <h4 className="font-semibold text-blue-900">Expert Authorship</h4>
                      <p className="text-blue-800 text-sm">{editorialStandards.process.authorship}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">3</div>
                    <div>
                      <h4 className="font-semibold text-blue-900">Licensed Review</h4>
                      <p className="text-blue-800 text-sm">{editorialStandards.process.review}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">4</div>
                    <div>
                      <h4 className="font-semibold text-blue-900">Regular Updates</h4>
                      <p className="text-blue-800 text-sm">{editorialStandards.process.updates}</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Our Sources */}
            <section className="mb-12">
              <h2>Our Sources</h2>
              <p>
                We rely on authoritative, official sources to ensure our information is accurate
                and up-to-date. Our primary sources include:
              </p>
              <div className="grid md:grid-cols-2 gap-4 my-6 not-prose">
                <a
                  href={authoritativeSources.oid.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 border"
                >
                  <svg className="w-6 h-6 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <div>
                    <span className="font-medium text-gray-900">Oklahoma Insurance Department</span>
                    <p className="text-sm text-gray-600">Official state insurance regulator</p>
                  </div>
                </a>
                <a
                  href={authoritativeSources.naic.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 border"
                >
                  <svg className="w-6 h-6 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <div>
                    <span className="font-medium text-gray-900">NAIC</span>
                    <p className="text-sm text-gray-600">National insurance regulatory body</p>
                  </div>
                </a>
                <a
                  href={authoritativeSources.serviceOklahoma.vehicles.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 border"
                >
                  <svg className="w-6 h-6 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <div>
                    <span className="font-medium text-gray-900">Service Oklahoma</span>
                    <p className="text-sm text-gray-600">State vehicle services</p>
                  </div>
                </a>
                <a
                  href={authoritativeSources.uvedok.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 border"
                >
                  <svg className="w-6 h-6 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <div>
                    <span className="font-medium text-gray-900">UVED Program</span>
                    <p className="text-sm text-gray-600">Oklahoma insurance verification</p>
                  </div>
                </a>
              </div>
            </section>

            {/* Who Creates Our Content */}
            <section className="mb-12">
              <h2>Who Creates Our Content</h2>
              <p>
                Our content is created and reviewed by licensed insurance professionals with
                direct experience in the Oklahoma insurance market.
              </p>

              <div className="bg-gray-50 rounded-xl p-6 my-6 not-prose">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xl font-semibold text-blue-600">
                      {founderConfig.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{founderConfig.name}</h3>
                    <p className="text-blue-600 text-sm mb-2">{founderConfig.title}</p>
                    <p className="text-gray-600 text-sm mb-3">{founderConfig.shortBio}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Oklahoma Licensed Agent #{founderConfig.credentials[0]?.number}</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* How We Make Money */}
            <section className="mb-12">
              <h2>How We Make Money (Transparency)</h2>
              <div className="bg-amber-50 border-l-4 border-amber-500 p-6 my-6 not-prose">
                <h3 className="font-semibold text-amber-900 mb-2">Compensation Disclosure</h3>
                <p className="text-amber-800">
                  {editorialStandards.transparency.compensation}
                </p>
              </div>
              <p>
                {editorialStandards.transparency.editorial}
              </p>
              <p>
                We believe in transparency. When you get a quote through us and purchase a policy,
                the insurance carrier pays us a commission. This is standard practice for independent
                insurance agencies and does not increase your premium — you pay the same rate whether
                you buy directly from the carrier or through an agency.
              </p>
            </section>

            {/* Accuracy Commitment */}
            <section className="mb-12">
              <h2>Our Accuracy Commitment</h2>
              <p>
                We strive for 100% accuracy in all our content. However, insurance regulations
                and rates change frequently. Here&apos;s how we maintain accuracy:
              </p>
              <ul>
                <li>
                  <strong>Regular Reviews:</strong> We review our content periodically to ensure
                  it reflects current Oklahoma insurance laws and regulations.
                </li>
                <li>
                  <strong>Date Stamps:</strong> All articles include publication and last-updated
                  dates so you know how current the information is.
                </li>
                <li>
                  <strong>Corrections Policy:</strong> If we discover an error, we correct it
                  promptly and note the correction.
                </li>
                <li>
                  <strong>Reader Feedback:</strong> {editorialStandards.transparency.accuracy}
                </li>
              </ul>
            </section>

            {/* What We Don't Do */}
            <section className="mb-12">
              <h2>What We Don&apos;t Do</h2>
              <p>To maintain trust with our readers, we commit to:</p>
              <ul>
                <li>
                  <strong>No Fake Reviews:</strong> We never create fake testimonials or reviews.
                  All customer feedback is from real clients.
                </li>
                <li>
                  <strong>No Misleading Claims:</strong> We don&apos;t make unsubstantiated claims
                  about savings or coverage. Insurance results vary by individual.
                </li>
                <li>
                  <strong>No Hidden Agendas:</strong> Our recommendations are based on what&apos;s
                  best for you, not which carrier pays us the highest commission.
                </li>
                <li>
                  <strong>No Pressure Tactics:</strong> We provide information and let you make
                  your own decision without high-pressure sales tactics.
                </li>
              </ul>
            </section>

            {/* Contact for Corrections */}
            <section className="mb-12">
              <h2>Report an Issue</h2>
              <p>
                If you find any information on our website that you believe is inaccurate or
                outdated, please let us know. We take accuracy seriously and will investigate
                and correct any errors promptly.
              </p>
              <div className="bg-gray-50 rounded-lg p-6 my-6 not-prose">
                <h3 className="font-semibold text-gray-900 mb-3">Contact Us</h3>
                <p className="text-gray-600 mb-2">
                  <strong>Phone:</strong>{' '}
                  <a href={`tel:${agencyConfig.phone.replace(/\D/g, '')}`} className="text-blue-600 hover:underline">
                    {agencyConfig.phone}
                  </a>
                </p>
                <p className="text-gray-600">
                  <strong>Email:</strong>{' '}
                  <a href={`mailto:${agencyConfig.email}`} className="text-blue-600 hover:underline">
                    {agencyConfig.email}
                  </a>
                </p>
              </div>
            </section>

          </div>

          {/* CTA */}
          <div className="mt-16 bg-blue-50 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Get a Quote?
            </h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Now that you know how we operate, get your free, no-obligation quote
              from a licensed Oklahoma insurance agency.
            </p>
            <Link
              href="/quote"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Get Your Free Quote
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
