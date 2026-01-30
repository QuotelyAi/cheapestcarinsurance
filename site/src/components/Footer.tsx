import Link from 'next/link';
import Image from 'next/image';
import { agencyConfig, oklahomaCompliance, federalCompliance, serviceAreas, authoritativeSources } from '@/lib/config';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info - Full NAP for Local SEO */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <Image
                src="/logo.jpg"
                alt="Cheapest Car Insurance Tulsa"
                width={50}
                height={50}
                className="h-12 w-auto rounded"
              />
              <h3 className="text-xl font-bold">{agencyConfig.name}</h3>
            </Link>
            <p className="text-gray-400 mb-4">
              Independent insurance agency comparing rates from {agencyConfig.carriers.length} carriers to help you find affordable coverage in Tulsa and Northeast Oklahoma.
            </p>
            {/* Full Address for NAP Consistency */}
            <address className="text-gray-400 not-italic mb-4">
              <p>{agencyConfig.address.street}</p>
              <p>{agencyConfig.address.city}, {agencyConfig.address.state} {agencyConfig.address.zip}</p>
            </address>
            <p className="text-gray-400">
              <strong>Phone:</strong> <a href={`tel:${agencyConfig.phone.replace(/\D/g, '')}`} className="hover:text-white">{agencyConfig.phone}</a>
            </p>
            <p className="text-gray-400">
              <strong>Hours:</strong> Mon-Fri 9AM-5PM
            </p>
            {agencyConfig.oklahomaLicenseNumber && (
              <p className="text-gray-400 mt-2">
                <strong>OK License:</strong> #{agencyConfig.oklahomaLicenseNumber}
              </p>
            )}
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/quote" className="text-gray-400 hover:text-white transition-colors">
                  Get a Quote
                </Link>
              </li>
              <li>
                <Link href="/industry-news" className="text-gray-400 hover:text-white transition-colors">
                  Industry News
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/oklahoma-car-insurance-guide" className="text-gray-400 hover:text-white transition-colors">
                  OK Insurance Guide
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Trust Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Legal & Trust</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/sms-terms" className="text-gray-400 hover:text-white transition-colors">
                  SMS Terms
                </Link>
              </li>
              <li>
                <Link href="/accessibility" className="text-gray-400 hover:text-white transition-colors">
                  Accessibility
                </Link>
              </li>
              <li>
                <Link href="/editorial-standards" className="text-gray-400 hover:text-white transition-colors">
                  Editorial Standards
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Official Resources - E-E-A-T Authority Signals */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <h4 className="text-sm font-semibold text-gray-400 mb-3">Official Oklahoma Resources</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <a
              href={authoritativeSources.oid.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-white transition-colors"
            >
              OK Insurance Department
            </a>
            <a
              href={authoritativeSources.naic.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-white transition-colors"
            >
              NAIC Consumer Info
            </a>
            <a
              href={authoritativeSources.serviceOklahoma.vehicles.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-white transition-colors"
            >
              Service OK - Vehicles
            </a>
            <a
              href={authoritativeSources.serviceOklahoma.driving.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-white transition-colors"
            >
              Service OK - Driving
            </a>
          </div>
        </div>

        {/* Service Areas - Important for Local SEO */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <h4 className="text-sm font-semibold text-gray-400 mb-3">Service Areas</h4>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500">
            {serviceAreas.primary.map((area) => (
              <span key={area.slug}>{area.city}</span>
            ))}
            <span>Tulsa County</span>
            <span>Northeast Oklahoma</span>
          </div>
        </div>

        {/* Carriers */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <h4 className="text-sm font-semibold text-gray-400 mb-3">Our Carrier Partners</h4>
          <div className="flex flex-wrap gap-3 text-sm text-gray-500">
            {agencyConfig.carriers.map((carrier) => (
              <span key={carrier.id}>{carrier.name}</span>
            ))}
          </div>
        </div>

        {/* Disclosures */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-xs text-gray-500 space-y-2">
          <p>{oklahomaCompliance.disclosures.notAllCarriers}</p>
          <p>{oklahomaCompliance.disclosures.quoteAccuracy}</p>
          <p>{federalCompliance.ftc.materialConnection}</p>
        </div>

        {/* Copyright & Trademark */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {currentYear} {agencyConfig.name}. All rights reserved.</p>
          <p className="text-xs text-gray-500 mt-2">
            Cheapest Car Insurance&trade; is a trademark of {agencyConfig.legalName}. USPTO Serial #{agencyConfig.trademark.serialNumber}.
          </p>
        </div>
      </div>
    </footer>
  );
}
