import Link from 'next/link';
import { founderConfig } from '@/lib/config';

interface AuthorBylineProps {
  publishedDate?: string;
  updatedDate?: string;
  showSchema?: boolean;
  variant?: 'compact' | 'full';
  showFactCheck?: boolean;
  showReviewedBy?: boolean;
  darkMode?: boolean;
}

export default function AuthorByline({
  publishedDate,
  updatedDate,
  showSchema = true,
  variant = 'compact',
  showFactCheck = false,
  showReviewedBy = false,
  darkMode = false
}: AuthorBylineProps) {
  // Article Author Schema
  const authorSchema = showSchema ? {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://cheapestcarinsurancetulsa.com/#founder",
    "name": founderConfig.name,
    "jobTitle": founderConfig.title,
    "description": founderConfig.shortBio,
    "url": "https://cheapestcarinsurancetulsa.com/about"
  } : null;

  if (variant === 'compact') {
    return (
      <>
        {authorSchema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(authorSchema) }}
          />
        )}
        <div className={`flex flex-wrap items-center gap-3 text-sm ${darkMode ? 'text-blue-100' : 'text-gray-600'}`}>
          {/* Author avatar */}
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${darkMode ? 'bg-white/20' : 'bg-blue-100'}`}>
              <span className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-blue-600'}`}>
                {founderConfig.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div>
              <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                <Link href="/about" className={darkMode ? 'hover:text-blue-200' : 'hover:text-blue-600'}>
                  {founderConfig.name}
                </Link>
              </p>
              <p className={`text-xs ${darkMode ? 'text-blue-200' : 'text-gray-500'}`}>
                {publishedDate && (
                  <time dateTime={publishedDate}>
                    {new Date(publishedDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                )}
                {updatedDate && updatedDate !== publishedDate && (
                  <span> · Updated <time dateTime={updatedDate}>
                    {new Date(updatedDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time></span>
                )}
              </p>
            </div>
          </div>

          {/* E-E-A-T Trust Signals */}
          {(showFactCheck || showReviewedBy) && (
            <div className={`flex items-center gap-3 text-xs border-l pl-3 ml-1 ${darkMode ? 'border-white/30' : 'border-gray-300'}`}>
              {showReviewedBy && (
                <span className={`flex items-center gap-1 ${darkMode ? 'text-blue-200' : 'text-gray-500'}`}>
                  <svg className={`w-3.5 h-3.5 ${darkMode ? 'text-green-400' : 'text-green-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Reviewed by licensed agent
                </span>
              )}
              {showFactCheck && (
                <span className={`flex items-center gap-1 ${darkMode ? 'text-blue-200' : 'text-gray-500'}`}>
                  <svg className={`w-3.5 h-3.5 ${darkMode ? 'text-blue-300' : 'text-blue-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                  Fact-checked
                </span>
              )}
            </div>
          )}
        </div>
      </>
    );
  }

  // Full variant for end of articles
  return (
    <>
      {authorSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(authorSchema) }}
        />
      )}
      <div className="bg-gray-50 rounded-xl p-6 mt-12">
        <div className="flex items-start gap-4">
          {/* Author avatar */}
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-xl font-semibold text-blue-600">
              {founderConfig.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Written by</p>
            <h4 className="text-lg font-semibold text-gray-900">
              <Link href="/about" className="hover:text-blue-600">
                {founderConfig.name}
              </Link>
            </h4>
            <p className="text-sm text-blue-600 mb-2">{founderConfig.title}</p>
            <p className="text-sm text-gray-600">{founderConfig.shortBio}</p>

            {/* Credentials for E-E-A-T */}
            <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Oklahoma Licensed Agent #{founderConfig.credentials[0]?.number}
              </span>
              {showReviewedBy && (
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Reviewed by licensed agent
                </span>
              )}
              {showFactCheck && (
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                  Fact-checked
                </span>
              )}
            </div>

            {/* Editorial Standards Link */}
            <div className="mt-3 pt-3 border-t border-gray-200">
              <Link href="/editorial-standards" className="text-xs text-blue-600 hover:underline">
                Read our editorial standards →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
