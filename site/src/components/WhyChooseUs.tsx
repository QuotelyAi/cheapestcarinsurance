import { carrierCount, oklahomaCompliance } from '@/lib/config';

export default function WhyChooseUs() {
  const features = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      title: `Compare ${carrierCount} Carriers`,
      description: 'One form, multiple quotes from carriers like Progressive, GEICO, Safeco, and more.',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Quick Quote Process',
      description: 'Get quotes fast without lengthy phone calls or multiple forms.',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: 'Licensed Oklahoma Agents',
      description: 'Work with local, licensed insurance professionals who know Oklahoma requirements.',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: 'Serving Tulsa Area',
      description: 'Local agency serving Tulsa, Broken Arrow, Owasso, Jenks, and surrounding areas.',
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Why Compare Insurance With Us
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            We&apos;re an independent agency, which means we work for you—not the insurance companies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-100"
            >
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Oklahoma Coverage Requirements Info */}
        <div className="mt-16 bg-white rounded-2xl p-8 border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Oklahoma Minimum Coverage Requirements
          </h3>
          <p className="text-gray-600 mb-4">
            Oklahoma law requires all drivers to carry minimum liability insurance:
          </p>
          <ul className="grid md:grid-cols-3 gap-4 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="font-semibold text-blue-600">${(oklahomaCompliance.minimumCoverage.bodilyInjuryPerPerson / 1000).toFixed(0)}K</span>
              <span>Bodily injury per person</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-semibold text-blue-600">${(oklahomaCompliance.minimumCoverage.bodilyInjuryPerAccident / 1000).toFixed(0)}K</span>
              <span>Bodily injury per accident</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-semibold text-blue-600">${(oklahomaCompliance.minimumCoverage.propertyDamage / 1000).toFixed(0)}K</span>
              <span>Property damage</span>
            </li>
          </ul>
          <p className="mt-4 text-sm text-gray-500">
            Source: <a href={oklahomaCompliance.regulatoryUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Oklahoma Insurance Department</a>
          </p>
        </div>
      </div>
    </section>
  );
}
