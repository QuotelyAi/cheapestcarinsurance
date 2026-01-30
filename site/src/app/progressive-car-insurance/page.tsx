import { Metadata } from 'next';
import Link from 'next/link';
import { agencyConfig, oklahomaCompliance } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Progressive Car Insurance in Tulsa, OK | Compare Quotes',
  description: 'Get Progressive car insurance quotes in Tulsa, Oklahoma. Compare rates from Progressive and other carriers through our licensed independent agency. Free quotes, no obligation.',
  keywords: ['Progressive car insurance Tulsa', 'Progressive auto insurance Oklahoma', 'Progressive insurance quotes', 'car insurance Tulsa OK'],
  alternates: {
    canonical: 'https://cheapestcarinsurancetulsa.com/progressive-car-insurance',
  },
  openGraph: {
    title: 'Progressive Car Insurance in Tulsa, OK',
    description: 'Compare Progressive car insurance rates with other carriers. Licensed Oklahoma independent agency.',
    type: 'website',
  },
};

export default function ProgressiveCarInsurance() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Progressive Car Insurance in Tulsa
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Compare Progressive auto insurance rates alongside {agencyConfig.carriers.length - 1} other carriers.
              As an independent agency, we help you find the best coverage at competitive rates.
            </p>
            <Link
              href="/quote"
              className="inline-block bg-white text-blue-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors"
            >
              Get Your Free Quote
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <h2>Why Consider Progressive Insurance?</h2>
            <p>
              Progressive is one of the largest auto insurance providers in the United States,
              known for competitive rates and innovative coverage options. As a licensed
              independent insurance agency in Oklahoma, {agencyConfig.name} can help you
              compare Progressive quotes alongside other top carriers.
            </p>

            <h3>Progressive Coverage Options</h3>
            <ul>
              <li><strong>Liability Coverage</strong> - Meets Oklahoma&apos;s minimum requirements ({oklahomaCompliance.minimumCoverage.description})</li>
              <li><strong>Collision Coverage</strong> - Covers damage to your vehicle from accidents</li>
              <li><strong>Comprehensive Coverage</strong> - Protects against theft, weather damage, and more</li>
              <li><strong>Uninsured/Underinsured Motorist</strong> - Protection when other drivers lack adequate coverage</li>
              <li><strong>Medical Payments</strong> - Covers medical expenses for you and passengers</li>
            </ul>

            <h3>Progressive Discounts</h3>
            <p>Progressive offers various discounts that may help lower your premium:</p>
            <ul>
              <li>Multi-policy discount (bundling auto with home or renters)</li>
              <li>Safe driver discount</li>
              <li>Good student discount</li>
              <li>Snapshot usage-based insurance program</li>
              <li>Paid-in-full discount</li>
              <li>Paperless and automatic payment discounts</li>
            </ul>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 my-8">
              <h4 className="text-blue-900 font-semibold mb-2">Why Compare Through an Independent Agency?</h4>
              <p className="text-blue-800 mb-0">
                When you get a quote directly from Progressive, you only see Progressive rates.
                Through {agencyConfig.name}, you can compare Progressive with {agencyConfig.carriers.length - 1} other
                carriers including {agencyConfig.carriers.filter(c => c.id !== 'progressive').slice(0, 3).map(c => c.name).join(', ')},
                and more - all in one place.
              </p>
            </div>

            <h2>Oklahoma Auto Insurance Requirements</h2>
            <p>
              Oklahoma law requires all drivers to carry minimum liability coverage:
            </p>
            <ul>
              <li>${oklahomaCompliance.minimumCoverage.bodilyInjuryPerPerson.toLocaleString()} per person for bodily injury</li>
              <li>${oklahomaCompliance.minimumCoverage.bodilyInjuryPerAccident.toLocaleString()} per accident for bodily injury</li>
              <li>${oklahomaCompliance.minimumCoverage.propertyDamage.toLocaleString()} for property damage</li>
            </ul>
            <p>
              While these are the minimums, many drivers choose higher coverage limits for better protection.
              We can help you understand your options and find the right balance of coverage and cost.
            </p>

            <h2>Get Your Progressive Quote Today</h2>
            <p>
              Ready to see how Progressive rates compare? Request a free quote and we&apos;ll
              show you rates from Progressive alongside other top carriers. There&apos;s no
              obligation, and our licensed agents are here to answer your questions.
            </p>
          </div>

          {/* CTA Box */}
          <div className="mt-12 bg-gray-50 rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Compare Progressive with {agencyConfig.carriers.length - 1} Other Carriers
            </h3>
            <p className="text-gray-600 mb-6">
              Free quotes. No obligation. Licensed Oklahoma agency.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/quote"
                className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Get Free Quote
              </Link>
              <a
                href={`tel:${agencyConfig.phone.replace(/[^0-9]/g, '')}`}
                className="inline-block bg-white text-blue-600 border-2 border-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Call {agencyConfig.phone}
              </a>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-8 text-sm text-gray-500">
            <p>
              {oklahomaCompliance.disclosures.notAllCarriers} Progressive is a registered
              trademark of Progressive Casualty Insurance Company. {agencyConfig.name} is
              an independent insurance agency licensed in Oklahoma (License #{agencyConfig.oklahomaLicenseNumber}).
            </p>
          </div>

          {/* Back Link */}
          <div className="mt-8">
            <Link href="/" className="text-blue-600 hover:text-blue-700">
              &larr; Back to Home
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
