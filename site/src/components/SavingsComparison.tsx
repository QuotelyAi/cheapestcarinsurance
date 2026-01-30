'use client';

import { useState } from 'react';

interface CarrierSavings {
  name: string;
  logo?: string;
  mainStat: string;
  details: string[];
  source: string;
  disclaimer?: string;
}

const carrierData: CarrierSavings[] = [
  {
    name: 'Progressive',
    mainStat: '$900',
    details: [
      'Average savings when switching to Progressive',
      'Switchers from Allstate saved $1,019 on average',
      'Switchers from State Farm saved $792 on average',
      'Snapshot program saves an average of $322',
    ],
    source: 'Progressive.com',
    disclaimer: 'Savings based on Progressive data for new customers who switched and saved.',
  },
  {
    name: 'GEICO',
    mainStat: '15%+',
    details: [
      '15 minutes could save you 15% or more',
      'Good driver discount up to 26%',
      'Multi-vehicle discount available',
      'Federal employee discount available',
    ],
    source: 'GEICO.com',
    disclaimer: 'Savings vary by state and individual circumstances.',
  },
  {
    name: 'Liberty Mutual',
    mainStat: '$950+',
    details: [
      'Average savings when bundling auto and home',
      'Multi-policy discount available',
      'New customer discounts',
      'Safe driver rewards',
    ],
    source: 'LibertyMutual.com',
    disclaimer: 'Bundling discount based on Liberty Mutual data.',
  },
  {
    name: 'Mercury Insurance',
    mainStat: 'Up to 40%',
    details: [
      'MercuryGO telematics program saves up to 40%',
      'RealDrive program saves up to 20% (CA)',
      'Multi-car discount available',
      'Good driver discounts',
    ],
    source: 'MercuryInsurance.com',
    disclaimer: 'Savings vary by state and driving behavior.',
  },
];

export default function SavingsComparison() {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  return (
    <section className="py-16 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How Much Could You Save?
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Major insurance carriers report significant savings for customers who compare and switch.
            Here&apos;s what the top carriers say their customers are saving.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {carrierData.map((carrier) => (
            <div
              key={carrier.name}
              className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="p-6">
                <div className="text-center mb-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {carrier.name}
                  </h3>
                  <div className="text-4xl font-bold text-blue-600 mb-1">
                    {carrier.mainStat}
                  </div>
                  <p className="text-sm text-gray-500">average savings*</p>
                </div>

                <ul className="space-y-2 mb-4">
                  {carrier.details.slice(0, expandedCard === carrier.name ? undefined : 2).map((detail, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                      <svg className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {detail}
                    </li>
                  ))}
                </ul>

                {carrier.details.length > 2 && (
                  <button
                    onClick={() => setExpandedCard(expandedCard === carrier.name ? null : carrier.name)}
                    className="text-blue-600 text-sm font-medium hover:text-blue-700"
                  >
                    {expandedCard === carrier.name ? 'Show less' : 'Show more'}
                  </button>
                )}

                <p className="mt-4 text-xs text-gray-400">
                  Source: {carrier.source}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <p className="text-lg text-gray-700 mb-6">
            Ready to see how much you could save? Compare quotes from multiple carriers in minutes.
          </p>
          <a
            href="/quote"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
          >
            Compare Quotes Now
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>

        {/* Compliance Disclaimer */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-xs text-gray-400 text-center max-w-4xl mx-auto">
            *Savings amounts are based on data reported by each insurance carrier on their official websites.
            Individual savings will vary based on your specific circumstances, driving history, location,
            coverage selections, and other factors. Past savings by other customers do not guarantee
            that you will achieve similar results. We recommend comparing quotes from multiple carriers
            to find the best rate for your situation. Cheapest Car Insurance Tulsa is a lead generation
            service and does not guarantee any specific savings amount.
          </p>
        </div>
      </div>
    </section>
  );
}
