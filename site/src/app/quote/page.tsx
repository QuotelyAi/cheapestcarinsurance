'use client';

import Link from 'next/link';
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

interface PrefillData {
  email?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  smsConsent?: boolean | string;
}

function QuotePageContent() {
  const searchParams = useSearchParams();
  const [formUrl, setFormUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // JotForm auto-resize: listen for postMessage from iframe to adjust height
  useEffect(() => {
    const handleIFrameMessage = (e: MessageEvent) => {
      if (typeof e.data !== 'string') return;
      const args = e.data.split(':');
      const iframe = document.getElementById(
        args.length > 2
          ? 'JotFormIFrame-' + args[args.length - 1]
          : 'JotFormIFrame-242546337686164'
      ) as HTMLIFrameElement | null;
      if (!iframe) return;
      switch (args[0]) {
        case 'scrollIntoView':
          iframe.scrollIntoView();
          break;
        case 'setHeight':
          iframe.style.height = args[1] + 'px';
          break;
        case 'reloadPage':
          window.location.reload();
          break;
      }
    };
    window.addEventListener('message', handleIFrameMessage, false);
    return () => window.removeEventListener('message', handleIFrameMessage);
  }, []);

  useEffect(() => {
    const loadForm = async () => {
      try {
        // Extract query parameters
        const prefillData: PrefillData = {
          email: searchParams.get('email') || undefined,
          firstName: searchParams.get('firstName') || undefined,
          lastName: searchParams.get('lastName') || undefined,
          phone: searchParams.get('phone') || undefined,
          smsConsent: searchParams.get('sms_consent') === 'true',
        };

        // Remove undefined values
        Object.keys(prefillData).forEach(
          (key) =>
            prefillData[key as keyof PrefillData] === undefined &&
            delete prefillData[key as keyof PrefillData]
        );

        // Call backend to generate prefilled URL
        const response = await fetch('/api/jotform/prefill', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ data: prefillData }),
        });

        if (!response.ok) {
          throw new Error('Failed to load form');
        }

        const { formUrl: url } = await response.json();
        setFormUrl(url);
      } catch (err) {
        console.error('[Quote] Form load failed:', err);
        setError(err instanceof Error ? err.message : 'Failed to load form');
      } finally {
        setLoading(false);
      }
    };

    loadForm();
  }, [searchParams]);

  if (loading) {
    return (
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading form...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center h-96 gap-4">
            <h2 className="text-xl font-bold">Form Load Error</h2>
            <p className="text-gray-600">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Get Your Free Quote</h1>
          <p className="text-xl text-gray-600">
            Fill out the form below or call us to get started with your free car insurance quote.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-4 md:p-8">
          {/* JotForm Embed via prefilled URL */}
          <iframe
            id="JotFormIFrame-242546337686164"
            title="Insurance Quote Form"
            src={formUrl || ''}
            style={{
              minWidth: '100%',
              maxWidth: '100%',
              height: '539px',
              border: 'none',
            }}
            scrolling="yes"
            allow="geolocation; microphone; camera; fullscreen"
          />
        </div>

        {/* Contact Info */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-2">Prefer to talk to someone?</p>
          <p className="text-2xl font-bold text-blue-600">
            <a href="tel:+19187946993">(918) 794-6993</a>
          </p>
        </div>

        {/* Back Link */}
        <div className="mt-8 text-center">
          <Link href="/" className="text-blue-600 hover:text-blue-700">
            &larr; Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

// Loading fallback component
function QuoteLoadingFallback() {
  return (
    <div className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Get Your Free Quote</h1>
          <p className="text-xl text-gray-600">
            Fill out the form below or call us to get started with your free car insurance quote.
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-4 md:p-8">
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading form...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Wrapper component with Suspense
export default function QuotePage() {
  return (
    <Suspense fallback={<QuoteLoadingFallback />}>
      <QuotePageContent />
    </Suspense>
  );
}
