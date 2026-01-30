'use client';

import { useState } from 'react';

interface ComplianceItem {
  label: string;
  status: 'pass' | 'warning' | 'fail';
  description: string;
  category: string;
}

export default function AdminCompliancePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const complianceItems: ComplianceItem[] = [
    // Advertising Claims
    { category: 'advertising', label: 'No guaranteed savings claims', status: 'pass', description: 'No unsubstantiated "Save X%" claims found' },
    { category: 'advertising', label: 'Proper disclosure language', status: 'pass', description: 'Lead generation disclosure present' },
    { category: 'advertising', label: 'No false urgency tactics', status: 'pass', description: 'No fake countdown timers or false scarcity' },
    { category: 'advertising', label: 'Testimonials with permission', status: 'pass', description: 'All testimonials are from real customers with consent' },

    // Legal Requirements
    { category: 'legal', label: 'Privacy Policy', status: 'pass', description: 'Comprehensive privacy policy in place' },
    { category: 'legal', label: 'Terms of Service', status: 'pass', description: 'Terms of service page exists' },
    { category: 'legal', label: 'SMS/A2P Compliance', status: 'pass', description: 'SMS terms and opt-in language present' },
    { category: 'legal', label: 'TCPA Compliance', status: 'pass', description: 'Proper consent mechanisms for communications' },
    { category: 'legal', label: 'Accessibility (ADA)', status: 'warning', description: 'Basic accessibility in place, could improve ARIA labels' },

    // Insurance Specific
    { category: 'insurance', label: 'License disclosure', status: 'pass', description: 'Oklahoma insurance license displayed' },
    { category: 'insurance', label: 'State-specific disclaimers', status: 'pass', description: 'Oklahoma-specific content present' },
    { category: 'insurance', label: 'Not giving advice disclaimer', status: 'pass', description: 'Educational content disclaimer present' },
    { category: 'insurance', label: 'Carrier relationship disclosure', status: 'pass', description: 'Independent agent status disclosed' },

    // Data Protection
    { category: 'data', label: 'SSL/HTTPS', status: 'pass', description: 'All pages served over HTTPS' },
    { category: 'data', label: 'Secure form handling', status: 'pass', description: 'Forms use secure submission' },
    { category: 'data', label: 'No PII in URLs', status: 'pass', description: 'Personal data not exposed in URLs' },
    { category: 'data', label: 'Cookie consent', status: 'warning', description: 'Basic cookie notice, may need enhancement for GDPR' },
  ];

  const categories = [
    { id: 'all', label: 'All Categories' },
    { id: 'advertising', label: 'Advertising Claims' },
    { id: 'legal', label: 'Legal Requirements' },
    { id: 'insurance', label: 'Insurance Specific' },
    { id: 'data', label: 'Data Protection' },
  ];

  const filteredItems = selectedCategory === 'all'
    ? complianceItems
    : complianceItems.filter(item => item.category === selectedCategory);

  const stats = {
    pass: complianceItems.filter(i => i.status === 'pass').length,
    warning: complianceItems.filter(i => i.status === 'warning').length,
    fail: complianceItems.filter(i => i.status === 'fail').length,
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pass': return 'bg-green-100 text-green-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'fail': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pass': return '\u2713';
      case 'warning': return '\u26A0';
      case 'fail': return '\u2717';
      default: return '?';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Compliance Review</h1>
        <p className="mt-2 text-gray-600">
          Insurance industry compliance and regulatory checklist.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
          <div className="text-sm font-medium text-gray-500">Total Checks</div>
          <div className="mt-2 text-3xl font-bold text-gray-900">{complianceItems.length}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
          <div className="text-sm font-medium text-gray-500">Passing</div>
          <div className="mt-2 text-3xl font-bold text-green-600">{stats.pass}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-yellow-500">
          <div className="text-sm font-medium text-gray-500">Warnings</div>
          <div className="mt-2 text-3xl font-bold text-yellow-600">{stats.warning}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
          <div className="text-sm font-medium text-gray-500">Failing</div>
          <div className="mt-2 text-3xl font-bold text-red-600">{stats.fail}</div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Compliance Checklist */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b">
          <h3 className="font-semibold text-gray-900">Compliance Checklist</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {filteredItems.map((item, idx) => (
            <div key={idx} className="px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${getStatusColor(item.status)}`}>
                  {getStatusIcon(item.status)}
                </span>
                <div>
                  <div className="font-medium text-gray-900">{item.label}</div>
                  <div className="text-sm text-gray-500">{item.description}</div>
                </div>
              </div>
              <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(item.status)}`}>
                {item.status.toUpperCase()}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Resources */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="font-semibold text-blue-900 mb-3">Compliance Resources</h3>
        <ul className="space-y-2 text-sm text-blue-800">
          <li>
            <a href="https://www.oid.ok.gov/" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">
              Oklahoma Insurance Department
            </a>
          </li>
          <li>
            <a href="https://www.ftc.gov/business-guidance/advertising-marketing" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">
              FTC Advertising Guidelines
            </a>
          </li>
          <li>
            <a href="https://www.naic.org/" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">
              NAIC - National Association of Insurance Commissioners
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
