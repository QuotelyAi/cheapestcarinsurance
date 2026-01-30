'use client';

import { useState, useEffect } from 'react';

interface Lead {
  id: string;
  type?: 'form' | 'pdf';
  filename?: string;
  url?: string;
  uploadedAt: string;
  size?: number;
  formData?: Record<string, unknown>;
  name?: string;
  email?: string;
  phone?: string;
  submissionId?: string;
}

interface LeadsListProps {
  refreshTrigger: number;
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function LeadsList({ refreshTrigger }: LeadsListProps) {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleting, setDeleting] = useState<string | null>(null);
  const [expandedLead, setExpandedLead] = useState<string | null>(null);

  const fetchLeads = async () => {
    try {
      const response = await fetch('/api/admin/leads');
      const data = await response.json();

      if (response.ok) {
        setLeads(data.leads || []);
        setError('');
      } else {
        setError(data.error || 'Failed to load leads');
      }
    } catch {
      setError('Failed to load leads');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [refreshTrigger]);

  const handleDelete = async (lead: Lead) => {
    if (!confirm('Are you sure you want to delete this lead?')) {
      return;
    }

    setDeleting(lead.id);
    try {
      // For PDF leads, delete by URL; for form leads, delete by ID
      const deleteParam = lead.url ? `url=${encodeURIComponent(lead.url)}` : `id=${lead.id}`;
      const response = await fetch(`/api/admin/leads?${deleteParam}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setLeads(leads.filter(l => l.id !== lead.id));
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to delete');
      }
    } catch {
      alert('Failed to delete lead');
    } finally {
      setDeleting(null);
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedLead(expandedLead === id ? null : id);
  };

  if (loading) {
    return (
      <div className="text-center py-8 text-gray-500">
        Loading leads...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-600 rounded-lg">
        {error}
      </div>
    );
  }

  if (leads.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 border-2 border-dashed rounded-lg">
        No leads yet. Form submissions will appear here automatically.
      </div>
    );
  }

  const formLeads = leads.filter(l => l.type === 'form' || (!l.type && !l.filename));
  const pdfLeads = leads.filter(l => l.type === 'pdf' || (!l.type && l.filename));

  return (
    <div className="space-y-8">
      {/* Form Submissions */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Form Submissions ({formLeads.length})
        </h2>

        {formLeads.length === 0 ? (
          <div className="text-center py-6 text-gray-500 border-2 border-dashed rounded-lg">
            No form submissions yet.
          </div>
        ) : (
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Submitted
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {formLeads.map((lead) => (
                  <>
                    <tr key={lead.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <span className="text-lg mr-3 bg-green-100 text-green-600 w-8 h-8 rounded-full flex items-center justify-center">
                            &#128100;
                          </span>
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {lead.name || 'No name provided'}
                            </div>
                            {lead.email && (
                              <div className="text-sm text-gray-500">
                                <a href={`mailto:${lead.email}`} className="hover:text-blue-600">
                                  {lead.email}
                                </a>
                              </div>
                            )}
                            {lead.phone && (
                              <div className="text-sm text-gray-500">
                                <a href={`tel:${lead.phone}`} className="hover:text-blue-600">
                                  {lead.phone}
                                </a>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(lead.uploadedAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                        <button
                          onClick={() => toggleExpand(lead.id)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          {expandedLead === lead.id ? 'Hide Details' : 'View Details'}
                        </button>
                        <button
                          onClick={() => handleDelete(lead)}
                          disabled={deleting === lead.id}
                          className="text-red-600 hover:text-red-800 disabled:opacity-50"
                        >
                          {deleting === lead.id ? 'Deleting...' : 'Delete'}
                        </button>
                      </td>
                    </tr>
                    {expandedLead === lead.id && lead.formData && (
                      <tr key={`${lead.id}-details`}>
                        <td colSpan={3} className="px-6 py-4 bg-gray-50">
                          <div className="text-sm">
                            <h4 className="font-medium text-gray-900 mb-2">Form Data:</h4>
                            <pre className="bg-white p-3 rounded border text-xs overflow-auto max-h-64">
                              {JSON.stringify(lead.formData, null, 2)}
                            </pre>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* PDF Uploads */}
      {pdfLeads.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Uploaded Documents ({pdfLeads.length})
          </h2>

          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Filename
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Size
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Uploaded
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {pdfLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="text-lg mr-2">&#128196;</span>
                        <span className="text-sm font-medium text-gray-900">
                          {lead.filename}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {lead.size ? formatFileSize(lead.size) : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(lead.uploadedAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                      {lead.url && (
                        <a
                          href={lead.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800"
                        >
                          Download
                        </a>
                      )}
                      <button
                        onClick={() => handleDelete(lead)}
                        disabled={deleting === lead.id}
                        className="text-red-600 hover:text-red-800 disabled:opacity-50"
                      >
                        {deleting === lead.id ? 'Deleting...' : 'Delete'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
