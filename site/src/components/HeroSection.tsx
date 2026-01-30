'use client';

import { useState } from 'react';
import Link from 'next/link';
import { agencyConfig, carrierCount } from '@/lib/config';

export default function HeroSection() {
  const [zipCode, setZipCode] = useState('');
  const [phone, setPhone] = useState('');
  const [smsConsent, setSmsConsent] = useState(false);
  const [termsConsent, setTermsConsent] = useState(false);

  // Only show stats if we have real data
  const showSavings = agencyConfig.stats.averageSavings !== null;
  // Reserved for future use when customer count data is available
  const _showCustomerCount = agencyConfig.stats.customerCount !== null;
  void _showCustomerCount;

  // Build query string with consent info
  const buildQueryString = () => {
    const params = new URLSearchParams();
    if (zipCode) params.set('zip', zipCode);
    if (phone) params.set('phone', phone);
    if (smsConsent) params.set('sms_consent', 'true');
    return params.toString() ? `?${params.toString()}` : '';
  };

  return (
    <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Compare{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                Car Insurance
              </span>{' '}
              Rates in Tulsa
            </h1>

            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Get quotes from {carrierCount} insurance carriers with one form.
              {showSavings && (
                <> Our customers save an average of <strong className="text-white">${agencyConfig.stats.averageSavings}/year</strong>.*</>
              )}
            </p>

            {/* Quick Quote Form */}
            <div className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-6 mb-8">
              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <div className="flex-1">
                  <label htmlFor="zip" className="block text-sm font-medium text-blue-200 mb-2">
                    Enter your ZIP code to start
                  </label>
                  <input
                    type="text"
                    id="zip"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value.replace(/\D/g, '').slice(0, 5))}
                    placeholder="74101"
                    className="w-full px-4 py-4 rounded-xl bg-white text-gray-900 text-lg font-medium placeholder-gray-400 focus:ring-4 focus:ring-cyan-400/50 focus:outline-none"
                    maxLength={5}
                    aria-describedby="zip-help"
                  />
                  <span id="zip-help" className="sr-only">Enter your 5-digit ZIP code</span>
                </div>
                <div className="flex-1">
                  <label htmlFor="phone-hero" className="block text-sm font-medium text-blue-200 mb-2">
                    Phone <span className="text-blue-300/60">(optional)</span>
                  </label>
                  <input
                    type="tel"
                    id="phone-hero"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/[^\d-() ]/g, '').slice(0, 14))}
                    placeholder="(918) 555-0123"
                    className="w-full px-4 py-4 rounded-xl bg-white text-gray-900 text-lg font-medium placeholder-gray-400 focus:ring-4 focus:ring-cyan-400/50 focus:outline-none"
                  />
                </div>
              </div>

              {/* Consent Checkboxes - Required for A2P 10DLC */}
              <div className="space-y-3 mb-4 text-sm">
                {/* Terms Consent */}
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={termsConsent}
                    onChange={(e) => setTermsConsent(e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded border-white/30 bg-white/10 text-cyan-500 focus:ring-cyan-400"
                  />
                  <span className="text-blue-100 text-xs leading-relaxed">
                    I agree to the{' '}
                    <Link href="/terms" className="text-cyan-400 hover:underline">Terms of Service</Link>
                    {' '}and{' '}
                    <Link href="/privacy" className="text-cyan-400 hover:underline">Privacy Policy</Link>.
                  </span>
                </label>

                {/* SMS Consent - Must be separate and unchecked by default */}
                <label className="flex items-start gap-3 cursor-pointer bg-white/5 rounded-lg p-3 border border-white/10">
                  <input
                    type="checkbox"
                    checked={smsConsent}
                    onChange={(e) => setSmsConsent(e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded border-white/30 bg-white/10 text-cyan-500 focus:ring-cyan-400"
                  />
                  <span className="text-blue-100 text-xs leading-relaxed">
                    <strong className="text-white">Optional: SMS/Text Updates</strong><br />
                    I agree to receive recurring SMS/text messages from Cheapest Car Insurance Tulsa at the phone number provided. Msg frequency varies. Msg & data rates may apply. Reply STOP to cancel, HELP for help.{' '}
                    <Link href="/sms-terms" className="text-cyan-400 hover:underline">SMS Terms</Link>
                  </span>
                </label>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <Link
                  href={`/quote${buildQueryString()}`}
                  className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-lg shadow-lg transition-all ${
                    termsConsent
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white shadow-cyan-500/25 hover:shadow-cyan-400/40'
                      : 'bg-gray-500/50 text-white/50 cursor-not-allowed'
                  }`}
                  onClick={(e) => {
                    if (!termsConsent) {
                      e.preventDefault();
                      alert('Please agree to the Terms of Service and Privacy Policy to continue.');
                    }
                  }}
                >
                  Get My Quote
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <span className="text-xs text-blue-200/70">
                  Or call: <a href="tel:+19187946993" className="text-cyan-400 hover:underline">(918) 794-6993</a>
                </span>
              </div>

              <div className="mt-4 flex flex-wrap gap-4 text-sm text-blue-200">
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Free quotes
                </span>
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  No obligation
                </span>
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {carrierCount} carriers
                </span>
              </div>
            </div>

            {/* Savings Disclaimer - only show if we're claiming savings */}
            {showSavings && (
              <p className="text-xs text-blue-300/70">
                *{agencyConfig.stats.savingsDisclaimer}
              </p>
            )}
          </div>

          {/* Right Content - Carriers */}
          <div className="hidden lg:block">
            <div className="bg-white/10 backdrop-blur border border-white/20 rounded-3xl p-8">
              <h2 className="text-xl font-semibold mb-6">We work with these carriers:</h2>
              <div className="grid grid-cols-2 gap-4">
                {agencyConfig.carriers.map((carrier) => (
                  <div
                    key={carrier.id}
                    className="bg-white/10 rounded-lg px-4 py-3 text-center font-medium"
                  >
                    {carrier.name}
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-white/10 text-sm text-blue-200">
                <p>Independent agency serving Tulsa, Oklahoma</p>
                {agencyConfig.oklahomaLicenseNumber && (
                  <p className="mt-1">OK License #{agencyConfig.oklahomaLicenseNumber}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
