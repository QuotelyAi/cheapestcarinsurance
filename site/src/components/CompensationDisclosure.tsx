import Link from 'next/link';
import { editorialStandards } from '@/lib/config';

interface CompensationDisclosureProps {
  variant?: 'inline' | 'box';
  className?: string;
}

export default function CompensationDisclosure({
  variant = 'inline',
  className = ''
}: CompensationDisclosureProps) {
  if (variant === 'box') {
    return (
      <div className={`bg-gray-50 border border-gray-200 rounded-lg p-4 ${className}`}>
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className="text-sm font-medium text-gray-900 mb-1">Advertiser Disclosure</p>
            <p className="text-xs text-gray-600">
              {editorialStandards.transparency.compensation}
            </p>
            <Link href="/editorial-standards" className="text-xs text-blue-600 hover:underline mt-2 inline-block">
              Learn more about how we make money →
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Inline variant - small text at top of content
  return (
    <div className={`text-xs text-gray-500 flex items-center gap-2 ${className}`}>
      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span>
        We may receive compensation from our partners.{' '}
        <Link href="/editorial-standards" className="text-blue-600 hover:underline">
          Advertiser Disclosure
        </Link>
      </span>
    </div>
  );
}
