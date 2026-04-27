import { Metadata } from 'next';
import Link from 'next/link';
import { agencyConfig, carrierCount, oklahomaCompliance } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Cheapest Car Insurance Oklahoma City | Compare & Save OKC',
  description: 'Find cheap car insurance in Oklahoma City. Compare rates from 10+ carriers. Free quotes from licensed agents serving OKC, Norman, Edmond, and Midwest City.',
  keywords: [
    'cheap car insurance oklahoma city',
    'affordable auto insurance okc',
    'car insurance quotes oklahoma city',
    'cheapest insurance agents oklahoma city',
    'auto insurance okc',
  ],
  openGraph: {
    title: 'Cheapest Car Insurance Oklahoma City | Compare & Save OKC',
    description: 'Find cheap car insurance in Oklahoma City. Compare rates from 10+ carriers.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cheapestcarinsurancetulsa.com/car-insurance-oklahoma-city',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  'name': `${agencyConfig.name} - Oklahoma City Service`,
  'description': `Car insurance quotes for Oklahoma City residents. Compare rates from ${carrierCount} carriers serving OKC, Norman, Edmond, and Midwest City.`,
  'url': 'https://cheapestcarinsurancetulsa.com/car-insurance-oklahoma-city',
  'telephone': agencyConfig.phone,
  'address': {
    '@type': 'PostalAddress',
    'streetAddress': agencyConfig.address.street,
    'addressLocality': agencyConfig.address.city,
    'addressRegion': agencyConfig.address.state,
    'postalCode': agencyConfig.address.zip,
    'addressCountry': 'US',
  },
  'areaServed': {
    '@type': 'City',
    'name': 'Oklahoma City',
    'containedInPlace': {
      '@type': 'State',
      'name': 'Oklahoma',
    },
  },
  'priceRange': '$$',
};

export default function CheapInsuranceOKC() {
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
                <li>Car Insurance Oklahoma City</li>
              </ol>
            </nav>
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Cheap Car Insurance in Oklahoma City</h1>
              <p className="text-xl text-blue-100 mb-8">
                Compare auto insurance rates from {carrierCount} carriers for OKC drivers. Licensed independent agency serving Oklahoma City, Norman, Edmond, and surrounding areas.
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
              <h2>Car Insurance for Oklahoma City Residents</h2>
              <p>Looking for affordable car insurance in Oklahoma City? We compare rates from {carrierCount} different carriers to help OKC drivers find the best coverage at competitive prices.</p>

              <h3>Why Oklahoma City Drivers Choose Independent Insurance</h3>
              <ul>
                <li><strong>Compare Multiple Carriers:</strong> {carrierCount} carriers including Progressive, GEICO, Safeco, and State Farm</li>
                <li><strong>OKC Metro Expertise:</strong> We understand I-35, I-44, and I-235 traffic patterns</li>
                <li><strong>Licensed by Oklahoma:</strong> Licensed by the Oklahoma Insurance Department</li>
                <li><strong>Free Quotes, No Obligation:</strong> Get multiple quotes online instantly</li>
              </ul>

              <h3>How Oklahoma City Traffic & Conditions Affect Rates</h3>
              <ul>
                <li><strong>I-35 Corridor:</strong> High-volume traffic means accident frequency is higher than Tulsa</li>
                <li><strong>Downtown OKC:</strong> Urban traffic pushes rates slightly higher than suburbs</li>
                <li><strong>Suburban Areas:</strong> Norman and Edmond have lower rates than downtown (5-15% cheaper)</li>
                <li><strong>Severe Weather:</strong> Oklahoma City is in tornado alley. Hail and flood damage are common</li>
                <li><strong>Theft Rates:</strong> OKC metro has higher property crime. Comprehensive coverage protects against theft</li>
              </ul>

              <h3>Oklahoma Car Insurance Requirements</h3>
              <ul>
                <li><strong>${oklahomaCompliance.minimumCoverage.bodilyInjuryPerPerson.toLocaleString()}</strong> per person bodily injury</li>
                <li><strong>${oklahomaCompliance.minimumCoverage.bodilyInjuryPerAccident.toLocaleString()}</strong> per accident bodily injury</li>
                <li><strong>${oklahomaCompliance.minimumCoverage.propertyDamage.toLocaleString()}</strong> property damage</li>
              </ul>

              <h3>Coverage Options for OKC Drivers</h3>
              <ul>
                <li><strong>Liability Insurance</strong> - Meets Oklahoma minimum requirements</li>
                <li><strong>Full Coverage</strong> - Includes comprehensive and collision</li>
                <li><strong>Comprehensive Coverage</strong> - Protects against weather, hail, theft, vandalism</li>
                <li><strong>Uninsured Motorist</strong> - Protects you from uninsured drivers</li>
                <li><strong>SR-22 Insurance</strong> - For drivers with serious violations</li>
              </ul>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 my-8">
                <h4 className="text-blue-900 font-semibold mb-2">Serving All of OKC Metro</h4>
                <p className="text-blue-800 mb-0">We serve Oklahoma City, Norman, Edmond, Midwest City, and surrounding areas. Call us at {agencyConfig.phone}.</p>
              </div>

              <h3>Discounts That Lower Your OKC Rate</h3>
              <ul>
                <li>Good driver discount: 3-10%</li>
                <li>Bundling home + auto insurance: 15-25%</li>
                <li>Usage-based insurance/telematics: 10-30%</li>
                <li>Safety features on your vehicle: 2-10%</li>
                <li>Good credit/credit-based insurance score: 5-15%</li>
                <li>Auto-pay and paperless billing: 2-5%</li>
                <li>Professional affiliations: 5-10%</li>
                <li>Military or first responder discounts: 10-20%</li>
              </ul>

              <h2>Get Your Oklahoma City Car Insurance Quote Today</h2>
              <p>Ready to compare car insurance rates? Call us at {agencyConfig.phone} or request a free quote online. We'll help you find affordable coverage.</p>
            </div>

            <div className="mt-12 bg-gray-50 rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Compare {carrierCount} Carriers for OKC</h3>
              <p className="text-gray-600 mb-6">Free quotes. No obligation. Licensed Oklahoma agency.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/quote" className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                  Get Free Quote
                </Link>
                <a href={`tel:${agencyConfig.phone.replace(/\D/g, '')}`} className="inline-block bg-white text-blue-600 border-2 border-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                  Call {agencyConfig.phone}
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
