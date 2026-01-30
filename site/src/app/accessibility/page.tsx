import { Metadata } from 'next';
import Link from 'next/link';
import { agencyConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Accessibility Statement',
  description: 'Accessibility statement for Cheapest Car Insurance Tulsa. Our commitment to digital accessibility.',
  alternates: {
    canonical: 'https://cheapestcarinsurancetulsa.com/accessibility',
  },
};

export default function AccessibilityStatement() {
  const lastUpdated = '2026-01-09';

  return (
    <div className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-4">Accessibility Statement</h1>
        <p className="text-gray-500 mb-8">Last updated: {lastUpdated}</p>

        <div className="prose prose-lg max-w-none">
          <h2>Our Commitment</h2>
          <p>
            {agencyConfig.name} is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards.
          </p>

          <h2>Conformance Status</h2>
          <p>
            We strive to conform to the Web Content Accessibility Guidelines (WCAG) 2.1, Level AA. These guidelines explain how to make web content more accessible for people with disabilities.
          </p>

          <h2>Accessibility Features</h2>
          <p>We have implemented the following accessibility features on our website:</p>
          <ul>
            <li><strong>Keyboard Navigation:</strong> All functionality is accessible via keyboard</li>
            <li><strong>Alt Text:</strong> Images include alternative text descriptions</li>
            <li><strong>Heading Structure:</strong> Proper heading hierarchy for screen readers</li>
            <li><strong>Color Contrast:</strong> Sufficient color contrast for readability</li>
            <li><strong>Form Labels:</strong> All form fields have associated labels</li>
            <li><strong>Focus Indicators:</strong> Visible focus states for interactive elements</li>
            <li><strong>Resizable Text:</strong> Text can be resized without loss of functionality</li>
            <li><strong>ARIA Labels:</strong> Accessible Rich Internet Applications labels where appropriate</li>
          </ul>

          <h2>Assistive Technologies</h2>
          <p>Our website is designed to be compatible with the following assistive technologies:</p>
          <ul>
            <li>Screen readers (JAWS, NVDA, VoiceOver)</li>
            <li>Screen magnification software</li>
            <li>Speech recognition software</li>
            <li>Keyboard-only navigation</li>
          </ul>

          <h2>Known Limitations</h2>
          <p>
            While we strive for full accessibility, some third-party content or legacy pages may not be fully accessible. We are actively working to address these issues.
          </p>

          <h2>Alternative Access</h2>
          <p>
            If you have difficulty accessing any part of our website, please contact us. We are happy to provide information in alternative formats or assist you by phone.
          </p>

          <h2>Contact Us for Accessibility Assistance</h2>
          <p>
            If you experience any difficulty accessing our website or have suggestions for improvement, please contact us:
          </p>
          <ul>
            <li><strong>Phone:</strong> {agencyConfig.phone}</li>
            <li><strong>Address:</strong> {agencyConfig.address.city}, {agencyConfig.address.state}</li>
          </ul>
          <p>
            We aim to respond to accessibility feedback within 2 business days.
          </p>

          <h2>Regulatory Information</h2>
          <p>
            This accessibility statement applies to the {agencyConfig.name} website. Our commitment to accessibility is guided by:
          </p>
          <ul>
            <li>Americans with Disabilities Act (ADA)</li>
            <li>Section 508 of the Rehabilitation Act</li>
            <li>Web Content Accessibility Guidelines (WCAG) 2.1</li>
          </ul>

          <h2>Continuous Improvement</h2>
          <p>
            We regularly review our website for accessibility issues and implement improvements. This statement was last reviewed on {lastUpdated}.
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
