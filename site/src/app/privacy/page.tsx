import { Metadata } from 'next';
import Link from 'next/link';
import { agencyConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for Cheapest Car Insurance Tulsa. Learn how we collect, use, and protect your personal information.',
  alternates: {
    canonical: 'https://cheapestcarinsurancetulsa.com/privacy',
  },
};

export default function PrivacyPolicy() {
  const lastUpdated = '2026-01-09';

  return (
    <div className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-gray-500 mb-8">Last updated: {lastUpdated}</p>

        <div className="prose prose-lg max-w-none">
          <h2>Introduction</h2>
          <p>
            {agencyConfig.name} (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
          </p>

          <h2>Information We Collect</h2>
          <h3>Personal Information</h3>
          <p>We may collect personal information that you voluntarily provide when requesting insurance quotes, including:</p>
          <ul>
            <li>Name, address, email address, and phone number</li>
            <li>Date of birth and Social Security Number (for quote purposes only)</li>
            <li>Driver&apos;s license information</li>
            <li>Vehicle information (make, model, year, VIN)</li>
            <li>Driving history and claims history</li>
            <li>Current insurance information</li>
          </ul>

          <h3>Automatically Collected Information</h3>
          <p>When you visit our website, we may automatically collect:</p>
          <ul>
            <li>IP address and browser type</li>
            <li>Device information</li>
            <li>Pages visited and time spent on site</li>
            <li>Referring website</li>
          </ul>

          <h2>How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Provide insurance quotes from our carrier partners</li>
            <li>Process insurance applications</li>
            <li>Communicate with you about your quote or policy</li>
            <li>Improve our website and services</li>
            <li>Comply with legal obligations</li>
          </ul>

          <h2>Information Sharing</h2>
          <p>We may share your information with:</p>
          <ul>
            <li><strong>Insurance Carriers:</strong> To obtain quotes and process applications. Our carrier partners include: {agencyConfig.carriers.map(c => c.name).join(', ')}.</li>
            <li><strong>Service Providers:</strong> Third parties who assist in operating our website and business.</li>
            <li><strong>Legal Requirements:</strong> When required by law or to protect our rights.</li>
          </ul>
          <p>We do not sell your personal information to third parties for marketing purposes.</p>

          <h2>Mobile Information Policy</h2>
          <p>
            <strong>No mobile information will be shared with third parties/affiliates for marketing or promotional purposes.</strong> All categories of information listed above exclude text messaging originator opt-in data and consent. This information will not be shared with any third parties, excluding aggregators and providers of SMS services.
          </p>

          <h2>Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect your personal information, including encryption of data in transit and at rest. However, no method of transmission over the Internet is 100% secure.
          </p>

          <h2>Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access the personal information we hold about you</li>
            <li>Request correction of inaccurate information</li>
            <li>Request deletion of your information (subject to legal requirements)</li>
            <li>Opt out of marketing communications</li>
          </ul>

          <h2>SMS/Text Messaging Terms</h2>
          <p>
            By providing your mobile phone number and opting in to receive text messages, you consent to receive recurring SMS/text messages from {agencyConfig.name} regarding your insurance quotes and related services.
          </p>
          <ul>
            <li><strong>Message Frequency:</strong> Message frequency varies based on your interactions with us. You may receive appointment reminders, quote updates, and service-related messages.</li>
            <li><strong>Message and Data Rates:</strong> Message and data rates may apply depending on your mobile carrier plan.</li>
            <li><strong>Opt-Out:</strong> You may opt out at any time by replying STOP to any text message. You will receive a confirmation message and no further messages will be sent.</li>
            <li><strong>Help:</strong> Reply HELP to any message for assistance, or contact us at {agencyConfig.phone}.</li>
            <li><strong>Carriers:</strong> Carriers are not liable for delayed or undelivered messages.</li>
          </ul>
          <p>
            For complete SMS terms, please see our <a href="/sms-terms" className="text-blue-600 hover:text-blue-700 underline">SMS Terms &amp; Conditions</a>.
          </p>

          <h2>TCPA Consent</h2>
          <p>
            By submitting your information through our website and checking the SMS consent checkbox, you provide express written consent for {agencyConfig.name} and its partners to contact you at the phone number provided regarding insurance quotes and related services. This consent is not a condition of purchasing any goods or services.
          </p>

          <h2>California Residents</h2>
          <p>
            California residents have additional rights under the California Consumer Privacy Act (CCPA). Please contact us to exercise your rights.
          </p>

          <h2>Oklahoma Insurance Regulations</h2>
          <p>
            We are licensed by the Oklahoma Insurance Department and comply with all applicable Oklahoma insurance regulations regarding the handling of consumer information.
          </p>

          <h2>Contact Us</h2>
          <p>If you have questions about this Privacy Policy, please contact us:</p>
          <ul>
            <li>Phone: {agencyConfig.phone}</li>
            <li>Address: {agencyConfig.address.city}, {agencyConfig.address.state}</li>
          </ul>

          <h2>Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. The updated version will be indicated by an updated &quot;Last updated&quot; date at the top of this page.
          </p>
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
