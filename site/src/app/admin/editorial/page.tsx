import Link from 'next/link';

export default function AdminEditorialPage() {
  const editorialGuidelines = [
    {
      title: 'Accuracy & Fact-Checking',
      items: [
        'All insurance rates and statistics must be sourced from official sources',
        'State-specific information must be verified with Oklahoma Insurance Department',
        'Quotes and claims must be attributed to their sources',
        'Content must be reviewed before publication for factual accuracy',
      ],
    },
    {
      title: 'Transparency & Disclosure',
      items: [
        'Clearly identify sponsored or affiliate content',
        'Disclose our role as a lead generation service',
        'Include advertiser disclosure on relevant pages',
        'Be transparent about how we make money',
      ],
    },
    {
      title: 'Consumer Protection',
      items: [
        'Never make guaranteed savings claims without substantiation',
        'Avoid fear-based or pressure tactics',
        'Provide balanced information about insurance options',
        'Include clear contact information for questions',
      ],
    },
    {
      title: 'Content Quality Standards',
      items: [
        'All articles must be written by qualified authors',
        'Content should be helpful, not just promotional',
        'Regular updates to ensure information is current',
        'Proper grammar, spelling, and formatting',
      ],
    },
  ];

  const contentChecklist = [
    { label: 'Author byline with credentials', required: true },
    { label: 'Last updated date displayed', required: true },
    { label: 'Sources cited for statistics', required: true },
    { label: 'Advertiser disclosure (if applicable)', required: true },
    { label: 'No misleading headlines', required: true },
    { label: 'Mobile-friendly formatting', required: true },
    { label: 'Proper heading hierarchy (H1-H6)', required: false },
    { label: 'Alt text on all images', required: false },
    { label: 'Internal links to related content', required: false },
    { label: 'Clear call-to-action', required: false },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Editorial Standards</h1>
        <p className="mt-2 text-gray-600">
          Guidelines for creating trustworthy, accurate insurance content.
        </p>
      </div>

      {/* Quick Links */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h2>
        <div className="flex flex-wrap gap-4">
          <a
            href="/editorial-standards"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            View Public Editorial Page
          </a>
          <Link
            href="/admin/eeat"
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            E-E-A-T Checklist
          </Link>
          <Link
            href="/admin/compliance"
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            Compliance Review
          </Link>
        </div>
      </div>

      {/* Editorial Guidelines */}
      <div className="space-y-6 mb-8">
        {editorialGuidelines.map((section) => (
          <div key={section.title} className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b">
              <h3 className="font-semibold text-gray-900">{section.title}</h3>
            </div>
            <ul className="divide-y divide-gray-200">
              {section.items.map((item, idx) => (
                <li key={idx} className="px-6 py-3 flex items-center gap-3">
                  <span className="text-green-500">{'\u2713'}</span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Content Checklist */}
      <div className="bg-white rounded-lg shadow overflow-hidden mb-8">
        <div className="px-6 py-4 bg-gray-50 border-b">
          <h3 className="font-semibold text-gray-900">Pre-Publication Checklist</h3>
        </div>
        <div className="p-6">
          <p className="text-sm text-gray-600 mb-4">
            Use this checklist before publishing any new content:
          </p>
          <div className="space-y-3">
            {contentChecklist.map((item, idx) => (
              <label key={idx} className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" className="h-4 w-4 text-blue-600 rounded" />
                <span className="text-gray-700">{item.label}</span>
                {item.required && (
                  <span className="text-xs text-red-600 font-medium">Required</span>
                )}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Author Guidelines */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <h3 className="font-semibold text-yellow-900 mb-3">Author Requirements</h3>
        <p className="text-yellow-800 text-sm mb-3">
          All content authors must meet the following requirements:
        </p>
        <ul className="space-y-2 text-sm text-yellow-800">
          <li>{'\u2022'} Licensed insurance professional OR supervised by one</li>
          <li>{'\u2022'} Bio with relevant credentials and experience</li>
          <li>{'\u2022'} Photo (professional headshot preferred)</li>
          <li>{'\u2022'} Commitment to accuracy and regular updates</li>
        </ul>
      </div>
    </div>
  );
}
