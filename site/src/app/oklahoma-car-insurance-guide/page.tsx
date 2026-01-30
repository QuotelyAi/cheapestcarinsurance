import { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import AuthorByline from '@/components/AuthorByline';
import FAQSchema from '@/components/FAQSchema';
import { agencyConfig, oklahomaCompliance, carrierCount, serviceAreas, authoritativeSources } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Oklahoma Car Insurance Guide 2026 | Requirements, Rates & Tips',
  description: 'Complete guide to car insurance in Oklahoma. Learn about state minimum requirements (25/50/25), coverage types, how to save money, and get free quotes from licensed agents.',
  keywords: [
    'Oklahoma car insurance',
    'OK auto insurance requirements',
    'Oklahoma minimum car insurance',
    'car insurance Oklahoma',
    'Oklahoma insurance laws',
    'cheap car insurance Oklahoma',
  ],
  openGraph: {
    title: 'Oklahoma Car Insurance Guide 2026 | Complete Coverage Guide',
    description: 'Everything you need to know about car insurance in Oklahoma. State requirements, coverage options, and money-saving tips.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://cheapestcarinsurancetulsa.com/oklahoma-car-insurance-guide',
  },
};

const faqs = [
  {
    question: "What is the minimum car insurance required in Oklahoma?",
    answer: "Oklahoma requires all drivers to carry minimum liability coverage of 25/50/25: $25,000 for bodily injury per person, $50,000 for bodily injury per accident, and $25,000 for property damage per accident."
  },
  {
    question: "How much does car insurance cost in Oklahoma?",
    answer: "The average cost of car insurance in Oklahoma varies based on factors like age, driving record, location, and coverage level. Tulsa and Oklahoma City tend to have higher rates than rural areas. Getting quotes from multiple carriers is the best way to find your actual rate."
  },
  {
    question: "Is Oklahoma a no-fault insurance state?",
    answer: "No, Oklahoma is an at-fault (tort) state. This means the driver who causes an accident is responsible for paying damages. Their insurance covers the other party's injuries and property damage."
  },
  {
    question: "Do I need uninsured motorist coverage in Oklahoma?",
    answer: "While not legally required, uninsured motorist coverage is highly recommended in Oklahoma. It protects you if you're hit by a driver without insurance or in a hit-and-run accident."
  },
  {
    question: "How can I lower my car insurance in Oklahoma?",
    answer: "You can lower your Oklahoma car insurance by comparing quotes from multiple carriers, bundling home and auto, maintaining a clean driving record, taking defensive driving courses, increasing your deductible, and asking about all available discounts."
  },
  {
    question: "What happens if I drive without insurance in Oklahoma?",
    answer: "Driving without insurance in Oklahoma can result in fines of $250-$500 for first offense, license and registration suspension, and vehicle impoundment. Oklahoma uses the UVED program with license plate cameras to identify uninsured vehicles."
  },
  {
    question: "How does Oklahoma verify car insurance?",
    answer: "Oklahoma uses the Oklahoma Insurance Verification System (OKIVS) combined with the UVED program, which uses license plate recognition cameras to automatically check if vehicles are insured. Uninsured vehicle owners receive a Notice to Respond."
  }
];

export default function OklahomaCarInsuranceGuide() {
  const publishedDate = '2026-01-01';
  const updatedDate = '2026-01-09';

  // Article Schema for this pillar page
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Oklahoma Car Insurance Guide 2026: Requirements, Rates & Tips",
    "description": metadata.description,
    "author": {
      "@id": "https://cheapestcarinsurancetulsa.com/#founder"
    },
    "publisher": {
      "@id": "https://cheapestcarinsurancetulsa.com/#organization"
    },
    "datePublished": publishedDate,
    "dateModified": updatedDate,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://cheapestcarinsurancetulsa.com/oklahoma-car-insurance-guide"
    },
    "about": [
      {"@type": "Thing", "name": "Auto Insurance"},
      {"@type": "Thing", "name": "Oklahoma Insurance Laws"},
      {"@type": "Place", "name": "Oklahoma"}
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <div className="min-h-screen">
        {/* Hero */}
        <section className="bg-gradient-to-br from-blue-900 to-blue-700 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Breadcrumbs
              items={[
                { name: 'Home', href: '/' },
                { name: 'Oklahoma Car Insurance Guide' }
              ]}
              className="mb-6 text-blue-200"
            />
            <div className="max-w-3xl">
              <span className="inline-block bg-blue-800 text-blue-100 text-sm px-3 py-1 rounded-full mb-4">
                Complete Guide
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Oklahoma Car Insurance Guide 2026
              </h1>
              <p className="text-xl text-blue-100 mb-6">
                Everything you need to know about car insurance in Oklahoma — state requirements,
                coverage types, money-saving tips, and how to get the best rates.
              </p>
              <AuthorByline publishedDate={publishedDate} updatedDate={updatedDate} showFactCheck={true} showReviewedBy={true} darkMode={true} />
            </div>
          </div>
        </section>

        {/* Table of Contents */}
        <section className="py-8 bg-gray-50 border-b">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-lg font-semibold mb-4">In This Guide</h2>
            <nav className="grid md:grid-cols-2 gap-2">
              <a href="#requirements" className="text-blue-600 hover:underline">Oklahoma Insurance Requirements</a>
              <a href="#coverage-types" className="text-blue-600 hover:underline">Types of Coverage</a>
              <a href="#costs" className="text-blue-600 hover:underline">How Much Does It Cost?</a>
              <a href="#save-money" className="text-blue-600 hover:underline">How to Save Money</a>
              <a href="#penalties" className="text-blue-600 hover:underline">Penalties for No Insurance</a>
              <a href="#resources" className="text-blue-600 hover:underline">Official Oklahoma Resources</a>
              <a href="#faqs" className="text-blue-600 hover:underline">Frequently Asked Questions</a>
            </nav>
          </div>
        </section>

        {/* Main Content */}
        <article className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose prose-lg max-w-none">

              {/* Introduction */}
              <p className="lead text-xl text-gray-700">
                Whether you&apos;re a new driver in Oklahoma or looking to switch insurance carriers,
                understanding your coverage options is essential. This comprehensive guide covers
                everything Oklahoma drivers need to know about car insurance in 2026.
              </p>

              {/* Requirements Section */}
              <h2 id="requirements">Oklahoma Car Insurance Requirements</h2>
              <p>
                Oklahoma law requires all drivers to carry minimum liability insurance. This coverage
                pays for injuries and property damage you cause to others in an accident.
              </p>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 my-8 not-prose">
                <h3 className="text-lg font-semibold text-blue-900 mb-4">Oklahoma Minimum Coverage (25/50/25)</h3>
                <ul className="space-y-2 text-blue-800">
                  <li className="flex items-start gap-2">
                    <span className="font-bold">${oklahomaCompliance.minimumCoverage.bodilyInjuryPerPerson.toLocaleString()}</span>
                    <span>per person for bodily injury</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold">${oklahomaCompliance.minimumCoverage.bodilyInjuryPerAccident.toLocaleString()}</span>
                    <span>per accident for bodily injury (total)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold">${oklahomaCompliance.minimumCoverage.propertyDamage.toLocaleString()}</span>
                    <span>per accident for property damage</span>
                  </li>
                </ul>
              </div>

              <p>
                While these minimums satisfy the law, many drivers choose higher coverage limits.
                Medical bills and car repairs can easily exceed $25,000, leaving you personally
                responsible for the difference if you only carry minimum coverage.
              </p>

              {/* Coverage Types Section */}
              <h2 id="coverage-types">Types of Car Insurance Coverage</h2>
              <p>
                Beyond the required liability coverage, Oklahoma drivers have several optional
                coverages to consider:
              </p>

              <h3>Liability Insurance (Required)</h3>
              <p>
                Covers injuries and property damage you cause to others. This is the only coverage
                required by Oklahoma law, but it doesn&apos;t cover your own injuries or vehicle damage.
              </p>

              <h3>Collision Coverage</h3>
              <p>
                Pays to repair or replace your vehicle if it&apos;s damaged in an accident, regardless
                of fault. Essential if you have a car loan or lease, or a newer vehicle.
              </p>

              <h3>Comprehensive Coverage</h3>
              <p>
                Covers non-collision damage like theft, vandalism, hail, flooding, and hitting an
                animal. Especially important in Oklahoma due to our severe weather and hail storms.
              </p>

              <h3>Uninsured/Underinsured Motorist Coverage</h3>
              <p>
                Protects you if you&apos;re hit by a driver without insurance or without enough insurance.
                Highly recommended given the number of uninsured drivers on Oklahoma roads.
              </p>

              <h3>Medical Payments (MedPay)</h3>
              <p>
                Covers medical expenses for you and your passengers, regardless of fault. Can help
                fill gaps in health insurance coverage after an accident.
              </p>


              {/* Costs Section */}
              <h2 id="costs">How Much Does Car Insurance Cost in Oklahoma?</h2>
              <p>
                Car insurance rates in Oklahoma vary significantly based on several factors:
              </p>

              <ul>
                <li><strong>Location:</strong> Tulsa and Oklahoma City typically have higher rates than rural areas</li>
                <li><strong>Age:</strong> Young drivers (under 25) pay more; rates typically decrease with age</li>
                <li><strong>Driving Record:</strong> Accidents and violations increase your rates</li>
                <li><strong>Credit Score:</strong> Oklahoma allows credit-based insurance scoring</li>
                <li><strong>Vehicle:</strong> Newer, more expensive cars cost more to insure</li>
                <li><strong>Coverage Level:</strong> More coverage = higher premiums</li>
              </ul>

              <p>
                The best way to find your actual rate is to compare quotes from multiple carriers.
                As an independent agency, we can compare rates from {carrierCount} carriers at once.
              </p>

              {/* Save Money Section */}
              <h2 id="save-money">How to Save Money on Oklahoma Car Insurance</h2>

              <h3>1. Compare Multiple Quotes</h3>
              <p>
                Rates vary significantly between carriers. What&apos;s cheapest for one driver may not
                be cheapest for another. Always compare at least 3-5 quotes.
              </p>

              <h3>2. Bundle Home and Auto</h3>
              <p>
                Most carriers offer discounts of 5-25% when you bundle multiple policies together.
              </p>

              <h3>3. Maintain a Clean Driving Record</h3>
              <p>
                Accidents and violations stay on your record for 3-5 years and significantly
                impact your rates.
              </p>

              <h3>4. Take a Defensive Driving Course</h3>
              <p>
                Oklahoma-approved defensive driving courses can qualify you for discounts and
                may help remove points from your record.
              </p>

              <h3>5. Increase Your Deductible</h3>
              <p>
                A higher deductible means lower premiums. Just make sure you can afford the
                deductible if you need to file a claim.
              </p>

              <h3>6. Ask About All Discounts</h3>
              <p>
                Common discounts include: good student, military, multi-car, pay-in-full,
                paperless billing, and automatic payment.
              </p>

              {/* Penalties Section */}
              <h2 id="penalties">Penalties for Driving Without Insurance in Oklahoma</h2>
              <p>
                Oklahoma takes uninsured driving seriously and actively enforces insurance requirements
                through the{' '}
                <a href={authoritativeSources.uvedok.url} target="_blank" rel="noopener noreferrer" className="text-blue-600">
                  Uninsured Vehicle Enforcement Diversion (UVED) Program
                </a>. This program uses license plate recognition cameras statewide to verify insurance coverage.
              </p>

              <div className="bg-amber-50 border-l-4 border-amber-500 p-6 my-8 not-prose">
                <h3 className="text-lg font-semibold text-amber-900 mb-4">Oklahoma Uninsured Vehicle Penalties</h3>
                <ul className="space-y-2 text-amber-800">
                  <li className="flex items-start gap-2">
                    <span className="font-bold">First Offense:</span>
                    <span>$250-$500 fine</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold">Subsequent Offenses:</span>
                    <span>Higher fines, potential jail time</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold">Registration Suspension:</span>
                    <span>Your vehicle registration can be suspended</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold">Vehicle Impoundment:</span>
                    <span>Your car may be impounded</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold">UVED Notice:</span>
                    <span>You may receive a Notice to Respond requiring proof of insurance</span>
                  </li>
                </ul>
              </div>

              <p>
                The cost of these penalties far exceeds the cost of maintaining proper insurance.
                If you receive a UVED notice, you can respond at{' '}
                <a href={authoritativeSources.uvedok.resolveNotice} target="_blank" rel="noopener noreferrer" className="text-blue-600">
                  resolve.autonotice.com
                </a>{' '}
                or call {authoritativeSources.uvedok.phone}.
              </p>

              {/* Official Resources Section */}
              <h2 id="resources">Official Oklahoma Resources</h2>
              <p>
                For official information about Oklahoma insurance requirements and vehicle services,
                consult these authoritative sources:
              </p>

              <div className="grid md:grid-cols-2 gap-4 my-8 not-prose">
                <a
                  href={authoritativeSources.oid.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 border border-gray-200"
                >
                  <span className="font-semibold text-blue-600">{authoritativeSources.oid.name}</span>
                  <p className="text-sm text-gray-600 mt-1">
                    Official state insurance regulator. File complaints, verify agent licenses, and learn about insurance laws.
                  </p>
                </a>
                <a
                  href={authoritativeSources.naic.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 border border-gray-200"
                >
                  <span className="font-semibold text-blue-600">{authoritativeSources.naic.name}</span>
                  <p className="text-sm text-gray-600 mt-1">
                    National insurance regulatory organization. Consumer guides, complaint filing, and policy locator tools.
                  </p>
                </a>
                <a
                  href={authoritativeSources.serviceOklahoma.vehicles.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 border border-gray-200"
                >
                  <span className="font-semibold text-blue-600">Service Oklahoma - Vehicles</span>
                  <p className="text-sm text-gray-600 mt-1">
                    Vehicle titles, registration, plates, and renewals.
                  </p>
                </a>
                <a
                  href={authoritativeSources.serviceOklahoma.driving.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 border border-gray-200"
                >
                  <span className="font-semibold text-blue-600">Service Oklahoma - Driving</span>
                  <p className="text-sm text-gray-600 mt-1">
                    Driver licenses, permits, REAL ID, and driving services.
                  </p>
                </a>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="mt-16" id="faqs">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">
                Frequently Asked Questions About Oklahoma Car Insurance
              </h2>
              <FAQSchema faqs={faqs} />
            </div>

            {/* CTA Section */}
            <div className="mt-16 bg-blue-50 rounded-xl p-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Ready to Compare Oklahoma Car Insurance Rates?
              </h2>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Get free quotes from {carrierCount} carriers and see how much you could save.
                Licensed Oklahoma independent agency — no obligation.
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

            {/* Related Pages - Internal Linking for Silo */}
            <div className="mt-16 border-t pt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Coverage Guides</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <Link href="/progressive-car-insurance" className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100">
                  <span className="font-medium text-blue-600">Progressive Car Insurance</span>
                  <p className="text-sm text-gray-600">Compare Progressive rates in Oklahoma</p>
                </Link>
                <Link href="/blog" className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100">
                  <span className="font-medium text-blue-600">Insurance Tips & Guides</span>
                  <p className="text-sm text-gray-600">More articles to help you save</p>
                </Link>
              </div>
            </div>

            {/* Service Areas - Local SEO */}
            <div className="mt-8 border-t pt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">We Serve All of Oklahoma</h3>
              <div className="flex flex-wrap gap-2">
                {serviceAreas.primary.map(area => (
                  <Link
                    key={area.slug}
                    href={area.slug === 'tulsa' ? '/' : `/car-insurance-${area.slug}`}
                    className="text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full hover:bg-blue-100"
                  >
                    {area.city}
                  </Link>
                ))}
              </div>
            </div>

            {/* Author Box */}
            <AuthorByline variant="full" publishedDate={publishedDate} updatedDate={updatedDate} showSchema={false} showFactCheck={true} showReviewedBy={true} />

            {/* Disclaimer */}
            <div className="mt-8 text-sm text-gray-500">
              <p>{oklahomaCompliance.disclosures.notAllCarriers}</p>
              <p className="mt-2">
                This guide is for informational purposes only. For specific legal advice about
                Oklahoma insurance requirements, consult the{' '}
                <a href={oklahomaCompliance.regulatoryUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600">
                  Oklahoma Insurance Department
                </a>.
              </p>
            </div>
          </div>
        </article>
      </div>
    </>
  );
}
