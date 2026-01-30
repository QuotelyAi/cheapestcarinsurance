'use client';

import { useState } from 'react';

const faqs = [
  {
    question: 'How much can I save on car insurance in Tulsa?',
    answer: 'Tulsa drivers who compare quotes through us save an average of $847 per year. Your actual savings depend on factors like your driving record, vehicle, and current coverage level. Many of our customers have saved over $1,000 annually by switching providers.',
  },
  {
    question: 'What\'s the minimum car insurance required in Oklahoma?',
    answer: 'Oklahoma requires minimum liability coverage of 25/50/25: $25,000 for bodily injury per person, $50,000 for bodily injury per accident, and $25,000 for property damage. However, we often recommend higher limits to fully protect your assets.',
  },
  {
    question: 'How long does it take to get a quote?',
    answer: 'Our online quote process takes about 2 minutes. Once you submit your information, we compare rates from 50+ carriers and present you with your best options. If you need coverage immediately, same-day policies are available.',
  },
  {
    question: 'Will getting a quote affect my credit score?',
    answer: 'No. Our quotes use a "soft pull" that doesn\'t impact your credit score. Only when you actually purchase a policy and the carrier does a full underwriting review might a hard inquiry occur, depending on the company.',
  },
  {
    question: 'Can I get coverage if I have accidents or tickets on my record?',
    answer: 'Yes! We work with carriers that specialize in high-risk drivers. While your rates may be higher than someone with a clean record, we can still find you competitive coverage. Many of our customers with past accidents have found affordable options through us.',
  },
  {
    question: 'Do you offer home and auto bundle discounts?',
    answer: 'Absolutely. Bundling home and auto insurance typically saves 15-25% on both policies. We can quote both together to maximize your savings. Many Tulsa families save over $100/month by bundling with us.',
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-blue-600 font-semibold text-sm uppercase tracking-wide">
            FAQ
          </span>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900">
            Common Questions About Tulsa Car Insurance
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 text-left flex items-center justify-between bg-white hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
                <svg
                  className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-5 text-gray-600 leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">Still have questions?</p>
          <a
            href="tel:+19187946993"
            className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Call (918) 794-6993
          </a>
        </div>
      </div>
    </section>
  );
}
