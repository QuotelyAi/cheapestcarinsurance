import { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import FAQSchema from '@/components/FAQSchema';
import { agencyConfig, oklahomaCompliance, carrierCount } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Car Insurance FAQ | Common Questions Answered',
  description: 'Answers to frequently asked questions about car insurance in Oklahoma. Learn about coverage requirements, costs, how to save money, and more.',
  openGraph: {
    title: 'Car Insurance FAQ | Cheapest Car Insurance Tulsa',
    description: 'Get answers to common car insurance questions for Oklahoma drivers.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://cheapestcarinsurancetulsa.com/faq',
  },
};

// Comprehensive FAQ for LLM parsing
const faqCategories = [
  {
    category: 'Oklahoma Insurance Requirements',
    faqs: [
      {
        question: 'What is the minimum car insurance required in Oklahoma?',
        answer: `Oklahoma requires all drivers to carry minimum liability coverage of 25/50/25: $${oklahomaCompliance.minimumCoverage.bodilyInjuryPerPerson.toLocaleString()} for bodily injury per person, $${oklahomaCompliance.minimumCoverage.bodilyInjuryPerAccident.toLocaleString()} for bodily injury per accident, and $${oklahomaCompliance.minimumCoverage.propertyDamage.toLocaleString()} for property damage per accident.`
      },
      {
        question: 'Is Oklahoma a no-fault or at-fault state for car insurance?',
        answer: 'Oklahoma is an at-fault (tort) state. This means the driver who causes an accident is responsible for paying damages. Their insurance covers the other party\'s injuries and property damage.'
      },
      {
        question: 'Is uninsured motorist coverage required in Oklahoma?',
        answer: 'No, uninsured motorist coverage is not legally required in Oklahoma. However, it is highly recommended because it protects you if you\'re hit by a driver without insurance or in a hit-and-run accident.'
      },
      {
        question: 'What happens if I drive without insurance in Oklahoma?',
        answer: 'Driving without insurance in Oklahoma can result in fines of $250-$500 for first offense, license and registration suspension, and vehicle impoundment. Oklahoma uses the UVED program with license plate cameras to identify uninsured vehicles.'
      },
      {
        question: 'How does Oklahoma verify car insurance?',
        answer: 'Oklahoma uses the Oklahoma Insurance Verification System (OKIVS) combined with the UVED (Uninsured Vehicle Enforcement Diversion) program. License plate recognition cameras automatically check if vehicles are insured, and uninsured vehicle owners receive a Notice to Respond.'
      },
    ]
  },
  {
    category: 'Coverage Types',
    faqs: [
      {
        question: 'What is liability insurance?',
        answer: 'Liability insurance covers injuries and property damage you cause to others in an accident. It\'s the only coverage required by Oklahoma law. It does not cover your own injuries or vehicle damage.'
      },
      {
        question: 'What is the difference between collision and comprehensive coverage?',
        answer: 'Collision coverage pays to repair your vehicle after an accident, regardless of fault. Comprehensive coverage covers non-collision damage like theft, vandalism, hail, flooding, and hitting an animal. Both are optional in Oklahoma but often required by lenders.'
      },
      {
        question: 'What is full coverage insurance?',
        answer: 'Full coverage typically means liability insurance plus collision and comprehensive coverage. It provides broader protection than minimum liability coverage. The exact definition can vary by carrier.'
      },
      {
        question: 'What is Medical Payments coverage (MedPay)?',
        answer: 'Medical Payments coverage (MedPay) pays for medical expenses for you and your passengers after an accident, regardless of who is at fault. It can help fill gaps in health insurance coverage.'
      },
    ]
  },
  {
    category: 'Costs and Savings',
    faqs: [
      {
        question: 'How much does car insurance cost in Oklahoma?',
        answer: 'Car insurance costs in Oklahoma vary based on factors like age, driving record, location, credit score, vehicle type, and coverage level. Tulsa and Oklahoma City typically have higher rates than rural areas. The best way to find your actual rate is to compare quotes from multiple carriers.'
      },
      {
        question: 'How can I lower my car insurance in Oklahoma?',
        answer: 'You can lower your Oklahoma car insurance by: comparing quotes from multiple carriers, bundling home and auto insurance, maintaining a clean driving record, taking defensive driving courses, increasing your deductible, and asking about all available discounts (good student, military, multi-car, pay-in-full).'
      },
      {
        question: 'Does my credit score affect my car insurance rate in Oklahoma?',
        answer: 'Yes, Oklahoma allows insurance companies to use credit-based insurance scores when determining rates. A higher credit score typically results in lower premiums.'
      },
      {
        question: 'Is it cheaper to bundle home and auto insurance?',
        answer: 'Yes, most insurance carriers offer multi-policy discounts of 5-25% when you bundle home and auto insurance together.'
      },
    ]
  },
  {
    category: 'About Our Agency',
    faqs: [
      {
        question: 'What is Cheapest Car Insurance Tulsa?',
        answer: `Cheapest Car Insurance Tulsa is a licensed independent insurance agency in Tulsa, Oklahoma. We compare auto insurance rates from ${carrierCount} carriers to help drivers find affordable coverage. We are licensed by the Oklahoma Insurance Department (License #${agencyConfig.oklahomaLicenseNumber}).`
      },
      {
        question: 'What insurance carriers do you work with?',
        answer: 'We work with 10 insurance carriers including Progressive, GEICO, Equity Insurance, Harbor Insurance, Bristol West, National General, Mercury Insurance, Safeco, Falcon Insurance, and Assurance America.'
      },
      {
        question: 'What areas do you serve?',
        answer: 'We serve drivers throughout Northeast Oklahoma including Tulsa, Broken Arrow, Owasso, Jenks, Bixby, Sand Springs, Sapulpa, Glenpool, Collinsville, and the surrounding Tulsa County area.'
      },
      {
        question: 'How do I get a car insurance quote?',
        answer: `You can get a free, no-obligation quote by visiting our website at cheapestcarinsurancetulsa.com/quote or by calling us at ${agencyConfig.phone}. Our office is open Monday-Friday, 9 AM - 5 PM.`
      },
      {
        question: 'Is Cheapest Car Insurance Tulsa licensed?',
        answer: `Yes, we are licensed by the Oklahoma Insurance Department. Our license number is ${agencyConfig.oklahomaLicenseNumber}. You can verify our license at oid.ok.gov.`
      },
    ]
  },
];

// Flatten all FAQs for schema
const allFaqs = faqCategories.flatMap(cat => cat.faqs);

export default function FAQPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { name: 'Home', href: '/' },
              { name: 'FAQ' }
            ]}
            className="mb-6 text-blue-200"
          />
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl">
            Get answers to common questions about car insurance in Oklahoma.
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {faqCategories.map((category, catIndex) => (
            <div key={catIndex} className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b">
                {category.category}
              </h2>
              <div className="space-y-6">
                {category.faqs.map((faq, faqIndex) => (
                  <div key={faqIndex} className="bg-white rounded-lg border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      {faq.question}
                    </h3>
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* CTA */}
          <div className="mt-12 bg-blue-50 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Have More Questions?
            </h2>
            <p className="text-gray-600 mb-6">
              Our licensed agents are here to help. Get a free quote or call us for personalized assistance.
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
        </div>
      </section>

      {/* FAQ Schema */}
      <FAQSchema faqs={allFaqs} className="hidden" />
    </div>
  );
}
