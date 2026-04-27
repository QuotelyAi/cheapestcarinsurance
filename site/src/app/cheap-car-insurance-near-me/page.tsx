import { Metadata } from 'next';
import Link from 'next/link';
import { agencyConfig, carrierCount, oklahomaCompliance } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Cheap Car Insurance Near Me | Local Quotes in 2 Minutes',
  description: 'Find cheap car insurance near you. Compare rates from 10+ carriers instantly. Licensed local agents, free quotes, no obligation. Get the best price today.',
  keywords: [
    'cheap car insurance near me',
    'affordable auto insurance near me',
    'car insurance quotes near me',
    'cheapest insurance agents near me',
    'local car insurance companies',
  ],
  openGraph: {
    title: 'Cheap Car Insurance Near Me | Local Quotes in 2 Minutes',
    description: 'Find cheap car insurance near you. Compare rates from 10+ carriers instantly.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cheapestcarinsurancetulsa.com/cheap-car-insurance-near-me',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://cheapestcarinsurancetulsa.com/#local-agency',
  'name': agencyConfig.name,
  'description': 'Local independent insurance agency comparing cheap car insurance from 10+ carriers.',
  'url': 'https://cheapestcarinsurancetulsa.com/cheap-car-insurance-near-me',
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
    { '@type': 'City', 'name': 'Tulsa', 'containedInPlace': { '@type': 'State', 'name': 'Oklahoma' } },
    { '@type': 'AdministrativeArea', 'name': 'Northeast Oklahoma' },
  ],
  'priceRange': '$$',
  'aggregateRating': {
    '@type': 'AggregateRating',
    'ratingValue': agencyConfig.google.rating,
    'reviewCount': agencyConfig.google.reviewCount,
  },
};

export default function CheapInsuranceNearMe() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen">
        <section className="bg-gradient-to-br from-blue-900 to-blue-700 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Cheap Car Insurance Near You</h1>
              <p className="text-xl text-blue-100 mb-8">
                Find affordable auto insurance from {carrierCount} carriers. Compare rates instantly from a licensed local agency. Free quotes, no obligation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/quote"
                  className="inline-block bg-white text-blue-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors text-center"
                >
                  Get Your Free Quote
                </Link>
                <a
                  href={`tel:${agencyConfig.phone.replace(/\D/g, '')}`}
                  className="inline-block bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 transition-colors text-center"
                >
                  Call {agencyConfig.phone}
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose prose-lg max-w-none">
              <h2>How to Find the Cheapest Car Insurance Near You</h2>
              <p>
                Finding cheap car insurance doesn't mean settling for poor coverage. Our independent agency compares rates from {carrierCount} carriers to find you the absolute best price for your driving needs, right in your area.
              </p>

              <h3>Why Shop Local for Car Insurance?</h3>
              <p>
                Local independent agents like us understand your area's specific insurance needs—local traffic patterns, weather risks, and driving behaviors. We customize your coverage for your neighborhood and commute, not one-size-fits-all pricing.
              </p>
              <ul>
                <li>Personalized Service: We know your area and your needs</li>
                <li>Multiple Carriers: Compare {carrierCount} options instead of being locked into one company</li>
                <li>Instant Quotes: Get 2-minute quotes online or over the phone</li>
                <li>Local Expertise: Licensed Oklahoma agents who understand state requirements</li>
                <li>Ongoing Support: We're here when you need claims help or coverage questions</li>
              </ul>

              <h3>How to Get Cheap Car Insurance in Your Area</h3>
              <p>Finding affordable coverage involves these key steps:</p>
              <ol>
                <li>Compare Multiple Quotes: Never accept the first quote. We compare {carrierCount} carriers in 2 minutes.</li>
                <li>Review Your Coverage: Minimum liability is required, but full coverage (comprehensive + collision) protects you in accidents and weather.</li>
                <li>Choose Your Deductible: Higher deductibles ($1,000) mean lower monthly premiums, but you'll pay more if you claim.</li>
                <li>Ask About Discounts: Good driver (3–10%), bundling home/auto (15–25%), safety features (2–10%), and telematics (10–30%).</li>
                <li>Lock in Your Rate: Once you find the cheapest option, lock it in before rates change.</li>
              </ol>

              <h3>Why Rates Vary in Your Area</h3>
              <p>Several local factors affect car insurance prices in your neighborhood:</p>
              <ul>
                <li>Accident Frequency: Urban areas and main highways have higher accident rates, raising premiums.</li>
                <li>Theft Rates: Some neighborhoods have higher theft claims, affecting comprehensive coverage.</li>
                <li>Traffic Density: Rush hour congestion increases accident likelihood.</li>
                <li>Weather Exposure: Hail, flooding, and severe weather increase comprehensive claims.</li>
                <li>Local Carrier Competition: Some carriers price aggressively in certain zip codes.</li>
              </ul>

              <h3>Types of Coverage You'll See</h3>
              <ul>
                <li>Liability Insurance: Covers damage you cause to others. Oklahoma minimum is 25/50/25.</li>
                <li>Comprehensive: Covers theft, weather, vandalism, animals. Often required by lenders.</li>
                <li>Collision: Covers accident damage. Usually bundled with comprehensive as "full coverage."</li>
                <li>Uninsured Motorist: Protects you if hit by uninsured drivers (~15% of OK drivers).</li>
                <li>Medical Payments: Covers medical expenses from accidents.</li>
              </ul>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 my-8">
                <h4 className="text-blue-900 font-semibold mb-2">Oklahoma Insurance Requirements</h4>
                <p className="text-blue-800 mb-0">
                  All drivers must carry minimum liability: ${oklahomaCompliance.minimumCoverage.bodilyInjuryPerPerson.toLocaleString()} bodily injury per person, ${oklahomaCompliance.minimumCoverage.bodilyInjuryPerAccident.toLocaleString()} per accident, ${oklahomaCompliance.minimumCoverage.propertyDamage.toLocaleString()} property damage (25/50/25). Proof of insurance is required to register your vehicle.
                </p>
              </div>

              <h3>Discounts That Lower Your Rate</h3>
              <ul>
                <li>Good driver discount (no accidents, no tickets)</li>
                <li>Bundling home + auto insurance (biggest savings: 15–25%)</li>
                <li>Usage-based insurance / telematics (pay by miles, driving behavior)</li>
                <li>Safety features on your vehicle (airbags, anti-theft, etc.)</li>
                <li>Good credit / credit-based insurance score</li>
                <li>Auto-pay and paperless billing discounts</li>
                <li>Professional affiliations (teacher, engineer, etc.)</li>
                <li>Military or first responder discounts</li>
              </ul>

              <h2>Get Cheap Car Insurance Near You Today</h2>
              <p>
                Stop overpaying for car insurance. Get a free quote from our local agency and compare rates from {carrierCount} carriers. In 2 minutes, you'll see your options and start saving.
              </p>
            </div>

            <div className="mt-12 bg-gray-50 rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Find the Cheapest Rate in Your Area</h3>
              <p className="text-gray-600 mb-6">
                Free quotes from {carrierCount} carriers. No obligation. Takes just 2 minutes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/quote"
                  className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Compare Quotes
                </Link>
                <a
                  href={`tel:${agencyConfig.phone.replace(/\D/g, '')}`}
                  className="inline-block bg-white text-blue-600 border-2 border-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                >
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
