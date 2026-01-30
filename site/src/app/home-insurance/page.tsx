import { Metadata } from 'next';
import Link from 'next/link';
import { agencyConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Home Insurance Tulsa | Get a Free Quote',
  description: 'Compare home insurance rates in Tulsa, Oklahoma. Get a free quote from our licensed independent agency.',
  alternates: {
    canonical: 'https://cheapestcarinsurancetulsa.com/home-insurance',
  },
};

export default function HomeInsurance() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Home Insurance in Tulsa
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Protect your home with affordable coverage. We compare rates from multiple carriers to find you the best value.
          </p>
          <a
            href={`tel:${agencyConfig.phone.replace(/\D/g, '')}`}
            className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-50 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Call {agencyConfig.phone}
          </a>
        </div>
      </section>

      {/* Coverage Types */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Home Insurance Coverage Options
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Dwelling Coverage',
                description: 'Protects the structure of your home from covered perils like fire, wind, and hail.',
              },
              {
                title: 'Personal Property',
                description: 'Covers your belongings inside the home, including furniture, electronics, and clothing.',
              },
              {
                title: 'Liability Protection',
                description: 'Covers legal expenses if someone is injured on your property.',
              },
              {
                title: 'Additional Living Expenses',
                description: 'Pays for temporary housing if your home becomes uninhabitable.',
              },
              {
                title: 'Oklahoma Storm Coverage',
                description: 'Protection against tornado, hail, and severe weather damage common in Oklahoma.',
              },
              {
                title: 'Bundle & Save',
                description: 'Combine home and auto insurance for additional discounts.',
              },
            ].map((item, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Compare Home Insurance Rates?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Call us today for a free, no-obligation quote. We&apos;ll help you find the right coverage at the right price.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`tel:${agencyConfig.phone.replace(/\D/g, '')}`}
              className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {agencyConfig.phone}
            </a>
            <Link
              href="/quote"
              className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 border-2 border-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-50 transition-colors"
            >
              Get Auto Quote
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-12 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-8 text-center text-gray-600">
            <div>
              <div className="text-2xl font-bold text-gray-900">Licensed</div>
              <div className="text-sm">Oklahoma Insurance Agent</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">Independent</div>
              <div className="text-sm">Multiple Carrier Options</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">Local</div>
              <div className="text-sm">Tulsa-Based Agency</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
