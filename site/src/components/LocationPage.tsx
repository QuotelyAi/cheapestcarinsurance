import Link from 'next/link';
import { agencyConfig, serviceAreas, oklahomaCompliance, carrierCount } from '@/lib/config';

interface LocationPageProps {
  city: string;
  county: string;
  slug: string;
  driveTime: string;
}

export default function LocationPage({ city, county, slug, driveTime }: LocationPageProps) {
  // JSON-LD for this specific location page
  const localJsonLd = {
    "@context": "https://schema.org",
    "@type": "InsuranceAgency",
    "name": `${agencyConfig.name} - ${city} Service`,
    "description": `Car insurance quotes for ${city}, Oklahoma residents. Compare rates from ${carrierCount} carriers.`,
    "url": `https://cheapestcarinsurancetulsa.com/car-insurance-${slug}`,
    "telephone": agencyConfig.phone,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": agencyConfig.address.street,
      "addressLocality": agencyConfig.address.city,
      "addressRegion": agencyConfig.address.state,
      "postalCode": agencyConfig.address.zip,
      "addressCountry": "US"
    },
    "areaServed": {
      "@type": "City",
      "name": city,
      "containedInPlace": {
        "@type": "State",
        "name": "Oklahoma"
      }
    },
    "parentOrganization": {
      "@id": "https://cheapestcarinsurancetulsa.com/#organization"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localJsonLd) }}
      />

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-900 to-blue-700 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="mb-6">
              <ol className="flex items-center space-x-2 text-sm text-blue-200">
                <li><Link href="/" className="hover:text-white">Home</Link></li>
                <li>/</li>
                <li>Car Insurance {city}</li>
              </ol>
            </nav>
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Cheap Car Insurance in {city}, Oklahoma
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Compare auto insurance rates from {carrierCount} carriers for {city} drivers.
                Our Tulsa office is just {driveTime} away, serving all of {county} County.
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

        {/* Main Content */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose prose-lg max-w-none">
              <h2>Car Insurance for {city} Residents</h2>
              <p>
                Looking for affordable car insurance in {city}, Oklahoma? As an independent
                insurance agency, we compare rates from {carrierCount} different carriers to help
                {city} drivers find the best coverage at competitive prices.
              </p>
              <p>
                Whether you live in {city} proper or anywhere in {county} County,
                we can help you find car insurance that fits your needs and budget.
              </p>

              <h3>Why {city} Drivers Choose Us</h3>
              <ul>
                <li><strong>Local Service:</strong> Our Tulsa office is just {driveTime} from {city}</li>
                <li><strong>Multiple Options:</strong> Compare {carrierCount} carriers including Progressive, GEICO, Safeco, and more</li>
                <li><strong>Oklahoma Licensed:</strong> Licensed by the Oklahoma Insurance Department (#{agencyConfig.oklahomaLicenseNumber})</li>
                <li><strong>Free Quotes:</strong> No obligation to get a quote and compare rates</li>
              </ul>

              <h3>Oklahoma Car Insurance Requirements</h3>
              <p>
                All {city} drivers must carry minimum liability insurance as required by Oklahoma law:
              </p>
              <ul>
                <li><strong>${oklahomaCompliance.minimumCoverage.bodilyInjuryPerPerson.toLocaleString()}</strong> per person for bodily injury</li>
                <li><strong>${oklahomaCompliance.minimumCoverage.bodilyInjuryPerAccident.toLocaleString()}</strong> per accident for bodily injury</li>
                <li><strong>${oklahomaCompliance.minimumCoverage.propertyDamage.toLocaleString()}</strong> for property damage</li>
              </ul>
              <p>
                This is often referred to as &quot;25/50/25&quot; coverage. Many {city} drivers
                choose higher limits for better protection, and we can help you understand your options.
              </p>

              <h3>Coverage Options for {city} Drivers</h3>
              <ul>
                <li><strong>Liability Insurance</strong> - Meets Oklahoma&apos;s minimum requirements</li>
                <li><strong>Full Coverage</strong> - Includes comprehensive and collision</li>
                <li><strong>Uninsured Motorist</strong> - Protects you from uninsured drivers</li>
                <li><strong>SR-22 Insurance</strong> - High-risk driver certification</li>
              </ul>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 my-8">
                <h4 className="text-blue-900 font-semibold mb-2">Serving All of {county} County</h4>
                <p className="text-blue-800 mb-0">
                  Our office in Tulsa serves drivers throughout {county} County and
                  Northeast Oklahoma. Get quotes online or visit us at {agencyConfig.address.street},
                  Tulsa, OK {agencyConfig.address.zip}.
                </p>
              </div>

              <h2>Get Your {city} Car Insurance Quote</h2>
              <p>
                Ready to compare car insurance rates? Request a free quote online or call us at{' '}
                <a href={`tel:${agencyConfig.phone.replace(/\D/g, '')}`}>{agencyConfig.phone}</a>.
                We&apos;ll help you find affordable coverage from top carriers.
              </p>
            </div>

            {/* CTA Box */}
            <div className="mt-12 bg-gray-50 rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Compare {carrierCount} Carriers for {city}
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
                  href={`tel:${agencyConfig.phone.replace(/\D/g, '')}`}
                  className="inline-block bg-white text-blue-600 border-2 border-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                >
                  Call {agencyConfig.phone}
                </a>
              </div>
            </div>

            {/* Other Service Areas */}
            <div className="mt-12 border-t pt-8">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Other Areas We Serve</h4>
              <div className="flex flex-wrap gap-3">
                {serviceAreas.primary
                  .filter(area => area.slug !== slug && area.slug !== 'tulsa')
                  .map(area => (
                    <Link
                      key={area.slug}
                      href={`/car-insurance-${area.slug}`}
                      className="text-blue-600 hover:text-blue-700 text-sm bg-blue-50 px-3 py-1 rounded-full"
                    >
                      {area.city}
                    </Link>
                  ))}
                <Link href="/" className="text-blue-600 hover:text-blue-700 text-sm bg-blue-50 px-3 py-1 rounded-full">
                  Tulsa
                </Link>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="mt-8 text-sm text-gray-500">
              <p>{oklahomaCompliance.disclosures.notAllCarriers}</p>
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
    </>
  );
}
