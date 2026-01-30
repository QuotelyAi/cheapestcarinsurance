import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { agencyConfig, carrierCount, serviceAreas, founderConfig } from "@/lib/config";

export const metadata: Metadata = {
  // Base URL for resolving relative URLs
  metadataBase: new URL('https://cheapestcarinsurancetulsa.com'),

  title: {
    default: `Cheapest Car Insurance Tulsa | Compare ${carrierCount} Carriers | Free Quote`,
    template: "%s | Cheapest Car Insurance Tulsa",
  },
  description: `Compare auto insurance from ${carrierCount} carriers in Tulsa, OK. Licensed independent agency. Get your free quote today.`,
  keywords: ["car insurance Tulsa", "auto insurance Tulsa OK", "cheap car insurance Tulsa", "Oklahoma car insurance", "Tulsa insurance quotes"],
  authors: [{ name: agencyConfig.name }],
  creator: agencyConfig.name,
  publisher: agencyConfig.name,

  // Icons for various platforms
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.svg',
  },

  // Web app manifest
  manifest: '/site.webmanifest',

  // Open Graph for social sharing
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://cheapestcarinsurancetulsa.com",
    siteName: agencyConfig.name,
    title: `Cheapest Car Insurance Tulsa | Compare ${carrierCount} Carriers`,
    description: `Compare auto insurance from ${carrierCount} carriers in Tulsa, OK. Licensed independent agency.`,
  },

  // Twitter cards
  twitter: {
    card: "summary_large_image",
    title: `Cheapest Car Insurance Tulsa | Compare ${carrierCount} Carriers`,
    description: `Compare auto insurance from ${carrierCount} carriers in Tulsa, OK.`,
  },

  // Comprehensive robots directives for Google
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Category for better classification
  category: 'Insurance',

  // Verification for search consoles (add your verification codes)
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || '',
    // yandex: 'your-yandex-verification',
    // bing: 'your-bing-verification',
  },

  // Additional metadata
  other: {
    'geo.region': 'US-OK',
    'geo.placename': 'Tulsa',
    'geo.position': `${agencyConfig.geo.latitude};${agencyConfig.geo.longitude}`,
    'ICBM': `${agencyConfig.geo.latitude}, ${agencyConfig.geo.longitude}`,
  },
};

// Enhanced JSON-LD structured data for local SEO domination
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "InsuranceAgency",
  "@id": "https://cheapestcarinsurancetulsa.com/#organization",
  "name": agencyConfig.name,
  "legalName": agencyConfig.legalName,
  "description": `Compare auto insurance from ${carrierCount} carriers in Tulsa, OK. Licensed independent agency serving Tulsa County and Northeast Oklahoma.`,
  "url": "https://cheapestcarinsurancetulsa.com",
  "telephone": agencyConfig.phone,
  "email": agencyConfig.email,
  "address": {
    "@type": "PostalAddress",
    "streetAddress": agencyConfig.address.street,
    "addressLocality": agencyConfig.address.city,
    "addressRegion": agencyConfig.address.state,
    "postalCode": agencyConfig.address.zip,
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": agencyConfig.geo.latitude,
    "longitude": agencyConfig.geo.longitude
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": agencyConfig.hours.weekdays.open,
      "closes": agencyConfig.hours.weekdays.close
    }
  ],
  "areaServed": [
    ...serviceAreas.primary.map(area => ({
      "@type": "City",
      "name": area.city,
      "containedInPlace": {
        "@type": "State",
        "name": "Oklahoma"
      }
    })),
    {
      "@type": "AdministrativeArea",
      "name": "Tulsa County"
    },
    {
      "@type": "AdministrativeArea",
      "name": "Northeast Oklahoma"
    }
  ],
  "serviceType": [
    "Auto Insurance",
    "Car Insurance",
    "Vehicle Insurance",
    "Liability Insurance",
    "Full Coverage Insurance"
  ],
  "sameAs": [
    agencyConfig.social.facebook,
    agencyConfig.google.businessUrl
  ],
  "founder": {
    "@type": "Person",
    "@id": "https://cheapestcarinsurancetulsa.com/#founder",
    "name": founderConfig.name,
    "jobTitle": founderConfig.title,
    "description": founderConfig.shortBio,
    "hasCredential": {
      "@type": "EducationalOccupationalCredential",
      "credentialCategory": "license",
      "name": "Oklahoma Insurance License",
      "identifier": founderConfig.credentials[0]?.number,
      "recognizedBy": {
        "@type": "Organization",
        "name": "Oklahoma Insurance Department",
        "url": "https://www.oid.ok.gov/"
      }
    }
  },
  "knowsAbout": [
    "Auto Insurance",
    "Car Insurance",
    "Oklahoma Insurance Law",
    "Insurance Rate Comparison",
    "Liability Insurance",
    "Full Coverage Insurance",
    "Uninsured Motorist Coverage"
  ],
  "slogan": "Compare Car Insurance from 10 Carriers",
  "foundingLocation": {
    "@type": "Place",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Tulsa",
      "addressRegion": "OK",
      "addressCountry": "US"
    }
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": agencyConfig.google.rating,
    "reviewCount": agencyConfig.google.reviewCount,
    "bestRating": 5,
    "worstRating": 1
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Car Insurance Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Liability Car Insurance",
          "description": "Oklahoma minimum coverage 25/50/25"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Full Coverage Car Insurance",
          "description": "Comprehensive and collision coverage"
        }
      }
    ]
  },
  "priceRange": "$$"
};

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Google Analytics */}
        {GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}');
              `}
            </Script>
          </>
        )}
      </head>
      <body className="font-sans antialiased bg-white text-gray-900">
        {/* Microsoft Clarity - Heatmaps & Analytics */}
        <Script
          id="microsoft-clarity"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "v8cht6ph81");
            `,
          }}
        />
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
