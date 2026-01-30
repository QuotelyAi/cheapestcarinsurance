import { Metadata } from 'next';
import Link from 'next/link';
import { agencyConfig, founderConfig, carrierCount, oklahomaCompliance, authoritativeSources } from '@/lib/config';

export const metadata: Metadata = {
  title: 'About Us | Licensed Oklahoma Insurance Agency',
  description: `Learn about ${agencyConfig.name}, a licensed independent insurance agency in Tulsa, OK. Meet our founder ${founderConfig.name} and discover why thousands trust us for car insurance.`,
  alternates: {
    canonical: 'https://cheapestcarinsurancetulsa.com/about',
  },
  openGraph: {
    title: `About ${agencyConfig.name}`,
    description: `Licensed Oklahoma insurance agency comparing ${carrierCount} carriers.`,
    type: 'website',
  },
};

export default function AboutPage() {
  // Person Schema for E-E-A-T
  const founderSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `https://cheapestcarinsurancetulsa.com/#founder`,
    "name": founderConfig.name,
    "jobTitle": founderConfig.title,
    "description": founderConfig.bio,
    "worksFor": {
      "@id": "https://cheapestcarinsurancetulsa.com/#organization"
    },
    "hasCredential": founderConfig.credentials.map(cred => ({
      "@type": "EducationalOccupationalCredential",
      "credentialCategory": cred.type,
      "name": cred.name,
      "identifier": cred.number,
      "recognizedBy": {
        "@type": "Organization",
        "name": cred.issuedBy,
        "url": cred.url
      }
    })),
    "knowsAbout": founderConfig.expertise
  };

  // AboutPage Schema
  const aboutPageSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": `About ${agencyConfig.name}`,
    "description": metadata.description,
    "mainEntity": {
      "@id": "https://cheapestcarinsurancetulsa.com/#organization"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(founderSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }}
      />

      <div className="min-h-screen">
        {/* Hero */}
        <section className="bg-gradient-to-br from-blue-900 to-blue-700 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="mb-6">
              <ol className="flex items-center space-x-2 text-sm text-blue-200">
                <li><Link href="/" className="hover:text-white">Home</Link></li>
                <li>/</li>
                <li>About Us</li>
              </ol>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About {agencyConfig.name}
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl">
              A licensed independent insurance agency helping Tulsa-area drivers
              find affordable car insurance since day one.
            </p>
          </div>
        </section>

        {/* Mission */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-700 mb-6">
              At {agencyConfig.name}, we believe everyone deserves access to affordable
              car insurance. As an independent agency, we&apos;re not tied to any single
              insurance company. This means we can compare rates from {carrierCount} different
              carriers to find you the best coverage at the best price.
            </p>
            <p className="text-lg text-gray-700">
              Whether you&apos;re a new driver, have a perfect record, or are a high-risk driver,
              we&apos;re here to help you navigate your options and find a policy that fits
              your needs and budget.
            </p>
          </div>
        </section>

        {/* Founder Section - Critical for E-E-A-T */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Meet Our Founder</h2>

            <div className="bg-white rounded-xl shadow-sm p-8">
              <div className="flex flex-col md:flex-row gap-8">
                {/* Photo placeholder - replace with actual photo */}
                <div className="w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mx-auto md:mx-0">
                  <span className="text-4xl text-blue-600 font-bold">
                    {founderConfig.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{founderConfig.name}</h3>
                  <p className="text-blue-600 font-medium mb-4">{founderConfig.title}</p>
                  <p className="text-gray-700 mb-4">{founderConfig.bio}</p>

                  {/* Credentials - Important for E-E-A-T */}
                  <div className="border-t pt-4 mt-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Credentials</h4>
                    {founderConfig.credentials.map((cred, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>
                          {cred.name}: #{cred.number} — Issued by{' '}
                          <a href={cred.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                            {cred.issuedBy}
                          </a>
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Expertise */}
                  <div className="border-t pt-4 mt-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Areas of Expertise</h4>
                    <div className="flex flex-wrap gap-2">
                      {founderConfig.expertise.map((skill, i) => (
                        <span key={i} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Why Choose Us</h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="border rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Independent Agency</h3>
                <p className="text-gray-600">
                  We work with {carrierCount} carriers, not just one. This means we can shop
                  your rate across multiple companies to find you the best deal.
                </p>
              </div>

              <div className="border rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Licensed in Oklahoma</h3>
                <p className="text-gray-600">
                  We&apos;re licensed by the{' '}
                  <a href={authoritativeSources.oid.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    Oklahoma Insurance Department
                  </a>
                  {' '}(License #{agencyConfig.oklahomaLicenseNumber}) and follow all state regulations.
                </p>
              </div>

              <div className="border rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Local Expertise</h3>
                <p className="text-gray-600">
                  Based in Tulsa, we understand the unique insurance needs of Oklahoma drivers,
                  from hail damage to local traffic patterns.
                </p>
              </div>

              <div className="border rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">No Pressure</h3>
                <p className="text-gray-600">
                  Get a free quote with no obligation. We&apos;re here to educate and help you
                  make the best decision for your situation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Signals */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Trust & Transparency</h2>

            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2">{agencyConfig.google.rating}</div>
                <div className="text-gray-600">Google Rating</div>
                <div className="text-sm text-gray-500">{agencyConfig.google.reviewCount} reviews</div>
              </div>

              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2">{carrierCount}</div>
                <div className="text-gray-600">Insurance Carriers</div>
                <div className="text-sm text-gray-500">To compare rates from</div>
              </div>

              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2">OK</div>
                <div className="text-gray-600">State Licensed</div>
                <div className="text-sm text-gray-500">#{agencyConfig.oklahomaLicenseNumber}</div>
              </div>
            </div>

            <div className="mt-12 text-center">
              <p className="text-sm text-gray-500 max-w-2xl mx-auto">
                {oklahomaCompliance.disclosures.notAllCarriers}
              </p>
            </div>

            {/* Verify Our License - Trust Signal */}
            <div className="mt-8 p-6 bg-white rounded-lg border text-center">
              <h3 className="font-semibold text-gray-900 mb-2">Verify Our License</h3>
              <p className="text-sm text-gray-600 mb-4">
                You can verify our Oklahoma insurance license through official state resources:
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href={authoritativeSources.oid.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-600 hover:underline text-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  Oklahoma Insurance Department
                </a>
                <a
                  href={authoritativeSources.naic.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-600 hover:underline text-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  NAIC Consumer Resources
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Info */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Contact Us</h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Office Location</h3>
                <address className="text-gray-600 not-italic">
                  <p>{agencyConfig.name}</p>
                  <p>{agencyConfig.address.street}</p>
                  <p>{agencyConfig.address.city}, {agencyConfig.address.state} {agencyConfig.address.zip}</p>
                </address>
                <p className="mt-4">
                  <strong>Phone:</strong>{' '}
                  <a href={`tel:${agencyConfig.phone.replace(/\D/g, '')}`} className="text-blue-600 hover:underline">
                    {agencyConfig.phone}
                  </a>
                </p>
                <p>
                  <strong>Hours:</strong> Monday - Friday, 9:00 AM - 5:00 PM
                </p>
              </div>

              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Get a Free Quote</h3>
                <p className="text-gray-600 mb-4">
                  Ready to see how much you can save? Get a free, no-obligation quote in minutes.
                </p>
                <Link
                  href="/quote"
                  className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Get Your Free Quote
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
