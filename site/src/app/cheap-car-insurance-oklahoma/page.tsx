import { Metadata } from 'next';
import Link from 'next/link';
import { agencyConfig, carrierCount, oklahomaCompliance, serviceAreas } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Cheapest Car Insurance Oklahoma | Compare & Save Statewide',
  description: 'Find cheap car insurance across Oklahoma. Compare rates from 10+ carriers. Free quotes from licensed agents serving Tulsa, OKC, and rural areas.',
  keywords: [
    'cheap car insurance oklahoma',
    'affordable auto insurance oklahoma',
    'car insurance quotes oklahoma',
    'cheapest car insurance in oklahoma',
    'oklahoma auto insurance',
  ],
  openGraph: {
    title: 'Cheapest Car Insurance Oklahoma | Compare & Save Statewide',
    description: 'Find cheap car insurance across Oklahoma. Compare rates from 10+ carriers.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cheapestcarinsurancetulsa.com/cheap-car-insurance-oklahoma',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  'name': `${agencyConfig.name} - Oklahoma Service`,
  'description': `Cheap car insurance quotes across Oklahoma. Compare rates from ${carrierCount} carriers serving all Oklahoma cities.`,
  'url': 'https://cheapestcarinsurancetulsa.com/cheap-car-insurance-oklahoma',
  'telephone': agencyConfig.phone,
  'address': {
    '@type': 'PostalAddress',
    'streetAddress': agencyConfig.address.street,
    'addressLocality': agencyConfig.address.city,
    'addressRegion': agencyConfig.address.state,
    'postalCode': agencyConfig.address.zip,
    'addressCountry': 'US',
  },
  'areaServed': [
    { '@type': 'State', 'name': 'Oklahoma' },
  ],
  'priceRange': '$$',
};

export default function CheapInsuranceOklahoma() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen">
        <section className="bg-gradient-to-br from-blue-900 to-blue-700 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="mb-6">
              <ol className="flex items-center space-x-2 text-sm text-blue-200">
                <li><Link href="/" className="hover:text-white">Home</Link></li>
                <li>/</li>
                <li>Car Insurance Oklahoma</li>
              </ol>
            </nav>
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Cheapest Car Insurance Across Oklahoma</h1>
              <p className="text-xl text-blue-100 mb-8">
                Compare car insurance rates from {carrierCount} carriers across Oklahoma. Find your lowest price in 2 minutes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/quote" className="inline-block bg-white text-blue-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors text-center">
                  Get Your Free Quote
                </Link>
                <a href={`tel:${agencyConfig.phone.replace(/\D/g, '')}`} className="inline-block bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 transition-colors text-center">
                  Call {agencyConfig.phone}
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose prose-lg max-w-none">
              <h2>Car Insurance Rates Across Oklahoma</h2>
              <p>Oklahoma drivers deserve affordable car insurance, but rates vary by location. Our independent agency compares quotes from {carrierCount} carriers across Oklahoma.</p>

              <h3>Why Rates Differ Across Oklahoma</h3>
              <ul>
                <li><strong>Tulsa:</strong> Higher rates due to I-44 traffic, but competitive pricing and discounts available</li>
                <li><strong>Oklahoma City:</strong> Metro area with higher accident frequency pushing rates up 10-20%</li>
                <li><strong>Rural Oklahoma:</strong> Lower accident rates mean lower premiums</li>
                <li><strong>Suburbs:</strong> Professional demographics often qualify for lower rates</li>
              </ul>

              <h3>Oklahoma Minimum Requirements</h3>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 my-8">
                <p className="text-blue-900 mb-0">
                  <strong>${oklahomaCompliance.minimumCoverage.bodilyInjuryPerPerson.toLocaleString()}</strong> / <strong>${oklahomaCompliance.minimumCoverage.bodilyInjuryPerAccident.toLocaleString()}</strong> / <strong>${oklahomaCompliance.minimumCoverage.propertyDamage.toLocaleString()}</strong> (25/50/25)
                </p>
              </div>

              <h3>How to Find Cheapest Insurance in Oklahoma</h3>
              <ol>
                <li>Compare Multiple Quotes: Rates vary 30-50% between carriers</li>
                <li>Bundle Home + Auto: 15-25% savings</li>
                <li>Ask About Discounts: Good driver, telematics, safety features</li>
                <li>Choose Deductibles Wisely: Higher deductibles cost less</li>
              </ol>

              <h3>Discounts Statewide</h3>
              <ul>
                <li>Good driver: 3-10%</li>
                <li>Bundling home + auto: 15-25%</li>
                <li>Usage-based insurance: 10-30%</li>
                <li>Safety features: 2-10%</li>
                <li>Professional affiliations: 5-10%</li>
              </ul>

              <h2>Get Your Oklahoma Quote Today</h2>
              <p>Compare rates from {carrierCount} carriers serving all of Oklahoma. Get a free quote online or call us at {agencyConfig.phone}.</p>
            </div>

            <div className="mt-12 bg-gray-50 rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Compare Rates Across Oklahoma</h3>
              <p className="text-gray-600 mb-6">Free quotes from {carrierCount} carriers. Licensed Oklahoma agency.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/quote" className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                  Compare Quotes Now
                </Link>
                <a href={`tel:${agencyConfig.phone.replace(/\D/g, '')}`} className="inline-block bg-white text-blue-600 border-2 border-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                  Call Us Today
                </a>
              </div>
            </div>

            <div className="mt-8 text-sm text-gray-500">
              <p>{oklahomaCompliance.disclosures.notAllCarriers}</p>
            </div>

            <div className="mt-8">
              <Link href="/" className="text-blue-600 hover:text-blue-700">
                ← Back to Home
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
