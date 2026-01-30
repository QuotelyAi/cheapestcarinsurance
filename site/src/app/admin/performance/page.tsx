export default function AdminPerformancePage() {
  const coreWebVitals = [
    { name: 'LCP', fullName: 'Largest Contentful Paint', value: '1.8s', target: '< 2.5s', status: 'good' },
    { name: 'INP', fullName: 'Interaction to Next Paint', value: '95ms', target: '< 200ms', status: 'good' },
    { name: 'CLS', fullName: 'Cumulative Layout Shift', value: '0.05', target: '< 0.1', status: 'good' },
  ];

  const pageSpeedScores = [
    { page: 'Homepage', mobile: 92, desktop: 98 },
    { page: '/quote', mobile: 88, desktop: 95 },
    { page: '/blog', mobile: 90, desktop: 96 },
    { page: '/about', mobile: 94, desktop: 99 },
    { page: '/faq', mobile: 91, desktop: 97 },
  ];

  const optimizationTips = [
    { priority: 'high', tip: 'Optimize hero image on homepage', impact: 'Could improve LCP by 0.3s' },
    { priority: 'medium', tip: 'Add lazy loading to blog post images', impact: 'Reduce initial load by 200KB' },
    { priority: 'low', tip: 'Minify inline CSS', impact: 'Save 5KB on initial load' },
  ];

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 50) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'bg-green-100 text-green-800';
      case 'needs-improvement': return 'bg-yellow-100 text-yellow-800';
      case 'poor': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Performance Insights</h1>
        <p className="mt-2 text-gray-600">
          Core Web Vitals and page speed monitoring.
        </p>
      </div>

      {/* External Tools */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Test Your Pages</h2>
        <div className="flex flex-wrap gap-4">
          <a
            href="https://pagespeed.web.dev/analysis?url=https%3A%2F%2Fcheapestcarinsurancetulsa.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            PageSpeed Insights
          </a>
          <a
            href="https://web.dev/measure/?url=https%3A%2F%2Fcheapestcarinsurancetulsa.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Web.dev Measure
          </a>
          <a
            href="https://gtmetrix.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            GTmetrix
          </a>
          <a
            href="https://tools.pingdom.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            Pingdom
          </a>
        </div>
      </div>

      {/* Core Web Vitals */}
      <div className="bg-white rounded-lg shadow overflow-hidden mb-8">
        <div className="px-6 py-4 bg-gray-50 border-b">
          <h3 className="font-semibold text-gray-900">Core Web Vitals</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200">
          {coreWebVitals.map((metric) => (
            <div key={metric.name} className="p-6 text-center">
              <div className="text-sm font-medium text-gray-500 mb-1">{metric.name}</div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{metric.value}</div>
              <div className="text-xs text-gray-500 mb-3">{metric.fullName}</div>
              <div className="flex items-center justify-center gap-2">
                <span className={`px-2 py-1 text-xs font-medium rounded ${getStatusColor(metric.status)}`}>
                  {metric.status === 'good' ? 'GOOD' : metric.status === 'needs-improvement' ? 'NEEDS WORK' : 'POOR'}
                </span>
                <span className="text-xs text-gray-500">Target: {metric.target}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Page Speed Scores */}
      <div className="bg-white rounded-lg shadow overflow-hidden mb-8">
        <div className="px-6 py-4 bg-gray-50 border-b">
          <h3 className="font-semibold text-gray-900">Page Speed Scores</h3>
        </div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Page</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Mobile</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Desktop</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {pageSpeedScores.map((page) => (
              <tr key={page.page}>
                <td className="px-6 py-4 text-sm text-gray-900">{page.page}</td>
                <td className="px-6 py-4 text-center">
                  <span className={`inline-block px-3 py-1 text-sm font-bold rounded ${getScoreColor(page.mobile)}`}>
                    {page.mobile}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className={`inline-block px-3 py-1 text-sm font-bold rounded ${getScoreColor(page.desktop)}`}>
                    {page.desktop}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Optimization Tips */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b">
          <h3 className="font-semibold text-gray-900">Optimization Opportunities</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {optimizationTips.map((item, idx) => (
            <div key={idx} className="px-6 py-4 flex items-start gap-4">
              <span className={`px-2 py-1 text-xs font-medium rounded ${getPriorityColor(item.priority)}`}>
                {item.priority.toUpperCase()}
              </span>
              <div>
                <div className="font-medium text-gray-900">{item.tip}</div>
                <div className="text-sm text-gray-500">{item.impact}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Info Box */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="font-semibold text-blue-900 mb-2">About Core Web Vitals</h3>
        <p className="text-blue-800 text-sm">
          Core Web Vitals are Google&apos;s metrics for measuring user experience.
          Good scores help with SEO rankings and provide better experience for visitors.
          Run tests regularly and address any issues that arise.
        </p>
      </div>
    </div>
  );
}
