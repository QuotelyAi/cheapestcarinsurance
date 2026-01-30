import { Metadata } from 'next';
import Link from 'next/link';
import { agencyConfig, oklahomaCompliance } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of service for Cheapest Car Insurance Tulsa website and services.',
  alternates: {
    canonical: 'https://cheapestcarinsurancetulsa.com/terms',
  },
};

export default function TermsOfService() {
  const lastUpdated = '2026-01-09';

  return (
    <div className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
        <p className="text-gray-500 mb-8">Last updated: {lastUpdated}</p>

        <div className="prose prose-lg max-w-none">
          <h2>Agreement to Terms</h2>
          <p>
            By accessing or using the {agencyConfig.name} website, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website.
          </p>

          <h2>Services Description</h2>
          <p>
            We are an independent insurance agency licensed in Oklahoma. We provide insurance quotes from multiple carriers to help you compare options. We are not an insurance company; we are an intermediary that helps connect consumers with insurance carriers.
          </p>
          <p>Our carrier partners include: {agencyConfig.carriers.map(c => c.name).join(', ')}.</p>

          <h2>Quote Accuracy</h2>
          <p>
            <strong>Important:</strong> {oklahomaCompliance.disclosures.quoteAccuracy}
          </p>
          <p>
            Quotes provided through our website are estimates based on the information you provide. Final rates are determined by the insurance carrier after a complete underwriting review. Rates may vary based on verification of information, credit history (where permitted by law), driving records, and other factors.
          </p>

          <h2>No Guarantee of Coverage</h2>
          <p>
            Requesting a quote does not guarantee coverage. Insurance carriers have the right to accept or decline applications based on their underwriting guidelines.
          </p>

          <h2>Accuracy of Information</h2>
          <p>
            You agree to provide accurate, current, and complete information when requesting quotes. Providing false or misleading information may result in denial of coverage or cancellation of a policy.
          </p>

          <h2>Not All Carriers Represented</h2>
          <p>
            {oklahomaCompliance.disclosures.notAllCarriers}
          </p>

          <h2>Licensing</h2>
          <p>
            We are licensed to sell insurance in the state of Oklahoma. Our activities are regulated by the {oklahomaCompliance.regulatoryBody}.
          </p>
          {agencyConfig.oklahomaLicenseNumber && (
            <p>Oklahoma Insurance License Number: {agencyConfig.oklahomaLicenseNumber}</p>
          )}

          <h2>Compensation Disclosure</h2>
          <p>
            We receive compensation from insurance carriers for policies sold through our agency. This compensation may vary by carrier and product. This compensation does not affect the quotes you receive, but you should be aware of this material relationship.
          </p>

          <h2>SMS/Text Messaging</h2>
          <p>
            If you opt in to receive text messages from us, you agree to our{' '}
            <Link href="/sms-terms" className="text-blue-600 hover:underline">SMS Terms &amp; Conditions</Link>.
            Key points include:
          </p>
          <ul>
            <li>Message frequency varies based on your interactions</li>
            <li>Message and data rates may apply</li>
            <li>Reply STOP to opt out at any time</li>
            <li>Reply HELP for assistance</li>
            <li>Consent is not required to obtain a quote</li>
          </ul>
          <p>
            Your mobile information will not be shared with third parties for marketing purposes. See our{' '}
            <Link href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link> for details.
          </p>

          <h2>Intellectual Property</h2>
          <p>
            The content on this website, including text, graphics, logos, and images, is our property or the property of our licensors and is protected by copyright and other intellectual property laws.
          </p>

          <h2>Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, we shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our website or services.
          </p>

          <h2>Third-Party Links</h2>
          <p>
            Our website may contain links to third-party websites. We are not responsible for the content or privacy practices of these sites.
          </p>

          <h2>Governing Law</h2>
          <p>
            These Terms shall be governed by the laws of the State of Oklahoma, without regard to conflict of law principles.
          </p>

          <h2>Changes to Terms</h2>
          <p>
            We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting to the website.
          </p>

          <h2>Contact Information</h2>
          <p>For questions about these Terms, contact us at:</p>
          <ul>
            <li>Phone: {agencyConfig.phone}</li>
            <li>Address: {agencyConfig.address.city}, {agencyConfig.address.state}</li>
          </ul>
        </div>

        <div className="mt-8">
          <Link href="/" className="text-blue-600 hover:text-blue-700">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
