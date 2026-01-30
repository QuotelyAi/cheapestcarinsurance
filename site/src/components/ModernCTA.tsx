'use client';

import Link from 'next/link';
import { agencyConfig, carrierCount } from '@/lib/config';

export default function ModernCTA() {
  const showSavings = agencyConfig.stats.averageSavings !== null;

  return (
    <section className="py-16 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Ready to Compare Car Insurance Rates?
        </h2>
        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          Get quotes from {carrierCount} carriers including Progressive, GEICO, Safeco, and more.
          {showSavings && (
            <> See if you could save up to ${agencyConfig.stats.averageSavings}/year.*</>
          )}
        </p>

        {/* CTA Button */}
        <Link
          href="/quote"
          className="inline-flex items-center gap-3 bg-white hover:bg-gray-100 text-blue-700 px-8 py-4 rounded-xl font-bold text-lg shadow-xl transition-all"
        >
          Get My Free Quote
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>

        {/* Trust Elements */}
        <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm text-blue-200">
          <span className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            No obligation
          </span>
          <span className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Free quotes
          </span>
          <span className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Licensed in Oklahoma
          </span>
        </div>

        {/* Disclaimer */}
        {showSavings && (
          <p className="mt-6 text-xs text-blue-200/70">
            *{agencyConfig.stats.savingsDisclaimer}
          </p>
        )}
      </div>
    </section>
  );
}
