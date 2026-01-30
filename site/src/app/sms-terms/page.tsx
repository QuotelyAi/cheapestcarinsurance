import { Metadata } from 'next';
import Link from 'next/link';
import { agencyConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: 'SMS Terms & Conditions',
  description: 'SMS text messaging terms and conditions for Cheapest Car Insurance Tulsa. Learn about message frequency, opt-out instructions, and your rights.',
  alternates: {
    canonical: 'https://cheapestcarinsurancetulsa.com/sms-terms',
  },
};

export default function SMSTermsPage() {
  const lastUpdated = '2026-01-12';

  return (
    <div className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-4">SMS Terms &amp; Conditions</h1>
        <p className="text-gray-500 mb-8">Last updated: {lastUpdated}</p>

        <div className="prose prose-lg max-w-none">
          <h2>About Our SMS Program</h2>
          <p>
            {agencyConfig.name} offers SMS text messaging to provide you with timely updates about your insurance quotes, appointment reminders, and service-related information. By opting in to receive text messages from us, you agree to the following terms.
          </p>

          <h2>Program Description</h2>
          <p>
            When you provide your mobile phone number and consent to receive text messages, you may receive:
          </p>
          <ul>
            <li>Insurance quote updates and reminders</li>
            <li>Appointment confirmations and reminders</li>
            <li>Policy renewal notifications</li>
            <li>Important service announcements</li>
            <li>Responses to your inquiries</li>
          </ul>

          <h2>Message Frequency</h2>
          <p>
            Message frequency varies based on your interactions with us. Typically, you may receive:
          </p>
          <ul>
            <li>1-5 messages when you request a quote</li>
            <li>Occasional service-related messages as needed</li>
            <li>Appointment reminders (if scheduled)</li>
          </ul>
          <p>
            <strong>You will not receive more than 10 messages per month unless you initiate additional conversations.</strong>
          </p>

          <h2>Message and Data Rates</h2>
          <p>
            <strong>Message and data rates may apply.</strong> Standard messaging rates from your wireless carrier may apply to any messages you send or receive. Please check with your carrier for details about your messaging plan.
          </p>

          <h2>How to Opt-Out</h2>
          <p>
            You can stop receiving text messages at any time by:
          </p>
          <ul>
            <li><strong>Replying STOP</strong> to any text message you receive from us</li>
            <li>Calling us at {agencyConfig.phone}</li>
            <li>Emailing us at {agencyConfig.email}</li>
          </ul>
          <p>
            After you send STOP, you will receive a one-time confirmation message. No further messages will be sent unless you re-opt in.
          </p>

          <h2>How to Get Help</h2>
          <p>
            If you need assistance with our SMS program:
          </p>
          <ul>
            <li><strong>Reply HELP</strong> to any text message for instructions</li>
            <li>Call us at {agencyConfig.phone}</li>
            <li>Email us at {agencyConfig.email}</li>
          </ul>

          <h2>Consent Requirements</h2>
          <p>
            By opting in to receive text messages from {agencyConfig.name}, you:
          </p>
          <ul>
            <li>Confirm you are the owner or authorized user of the mobile device</li>
            <li>Consent to receive recurring automated text messages at the number provided</li>
            <li>Understand this consent is not required to purchase any goods or services</li>
            <li>Acknowledge that message and data rates may apply</li>
          </ul>

          <h2>Privacy and Data Protection</h2>
          <p>
            Your privacy is important to us. Regarding your mobile information:
          </p>
          <ul>
            <li><strong>No mobile information will be shared with third parties/affiliates for marketing or promotional purposes.</strong></li>
            <li>Your phone number and opt-in consent will only be used for the purposes described in this agreement</li>
            <li>We will not sell, rent, or share your mobile information with third parties for their marketing purposes</li>
            <li>Information may be shared with SMS service providers solely for the purpose of delivering messages</li>
          </ul>
          <p>
            For more information about how we handle your data, please see our <Link href="/privacy" className="text-blue-600 hover:text-blue-700 underline">Privacy Policy</Link>.
          </p>

          <h2>Carrier Disclaimer</h2>
          <p>
            Wireless carriers are not liable for delayed or undelivered messages. Message delivery is subject to effective transmission from your wireless carrier.
          </p>
          <p>
            Supported carriers include, but are not limited to: AT&amp;T, T-Mobile, Verizon, Sprint, and most other major US carriers. T-Mobile is not liable for delayed or undelivered messages.
          </p>

          <h2>Terms Updates</h2>
          <p>
            We may update these SMS Terms &amp; Conditions from time to time. Any changes will be posted on this page with an updated &quot;Last updated&quot; date. Continued use of our SMS program after changes constitutes acceptance of the updated terms.
          </p>

          <h2>Contact Information</h2>
          <p>If you have any questions about our SMS program or these terms, please contact us:</p>
          <ul>
            <li><strong>Business Name:</strong> {agencyConfig.name}</li>
            <li><strong>Phone:</strong> {agencyConfig.phone}</li>
            <li><strong>Email:</strong> {agencyConfig.email}</li>
            <li><strong>Address:</strong> {agencyConfig.address.street}, {agencyConfig.address.city}, {agencyConfig.address.state} {agencyConfig.address.zip}</li>
          </ul>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">Quick Reference</h3>
            <ul className="text-blue-800 space-y-1">
              <li><strong>To Opt-Out:</strong> Reply STOP</li>
              <li><strong>For Help:</strong> Reply HELP or call {agencyConfig.phone}</li>
              <li><strong>Message Frequency:</strong> Varies, up to 10/month</li>
              <li><strong>Cost:</strong> Message and data rates may apply</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex gap-4">
          <Link href="/privacy" className="text-blue-600 hover:text-blue-700">
            Privacy Policy
          </Link>
          <span className="text-gray-300">|</span>
          <Link href="/terms" className="text-blue-600 hover:text-blue-700">
            Terms of Service
          </Link>
          <span className="text-gray-300">|</span>
          <Link href="/" className="text-blue-600 hover:text-blue-700">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
