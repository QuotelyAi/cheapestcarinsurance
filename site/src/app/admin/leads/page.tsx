'use client';

import { useState } from 'react';
import LeadsUpload from '@/components/LeadsUpload';
import LeadsList from '@/components/LeadsList';

export default function AdminLeadsPage() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleUploadSuccess = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Leads Management</h1>
        <p className="mt-2 text-gray-600">
          View form submissions and manage uploaded lead documents.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
          <div className="text-sm font-medium text-gray-500">Form Submissions</div>
          <div className="mt-2 text-3xl font-bold text-gray-900">--</div>
          <div className="text-xs text-gray-500 mt-1">From JotForm</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
          <div className="text-sm font-medium text-gray-500">Document Uploads</div>
          <div className="mt-2 text-3xl font-bold text-gray-900">--</div>
          <div className="text-xs text-gray-500 mt-1">PDF files</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-500">
          <div className="text-sm font-medium text-gray-500">This Week</div>
          <div className="mt-2 text-3xl font-bold text-gray-900">--</div>
          <div className="text-xs text-gray-500 mt-1">New leads</div>
        </div>
      </div>

      {/* JotForm Integration Status */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8">
        <div className="flex items-center gap-3">
          <span className="text-green-600 text-xl">&#10003;</span>
          <div>
            <div className="font-medium text-green-900">JotForm Integration Active</div>
            <div className="text-sm text-green-700">
              Form submissions from <a href="https://form.jotform.com/242546337686164" target="_blank" rel="noopener noreferrer" className="underline">/quote</a> will appear here automatically.
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Leads List - Takes 2 columns */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow p-6">
            <LeadsList refreshTrigger={refreshTrigger} />
          </div>
        </div>

        {/* Upload Section - Takes 1 column */}
        <div>
          <div className="bg-white rounded-lg shadow p-6">
            <LeadsUpload onUploadSuccess={handleUploadSuccess} />
          </div>

          {/* Quick Links */}
          <div className="bg-white rounded-lg shadow p-6 mt-6">
            <h3 className="font-semibold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://form.jotform.com/242546337686164"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-2"
                >
                  <span>&#8594;</span> View JotForm
                </a>
              </li>
              <li>
                <a
                  href="https://www.jotform.com/myforms/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-2"
                >
                  <span>&#8594;</span> JotForm Dashboard
                </a>
              </li>
              <li>
                <a
                  href="/quote"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-2"
                >
                  <span>&#8594;</span> View Quote Page
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
