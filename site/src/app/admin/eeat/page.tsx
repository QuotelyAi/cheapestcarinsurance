'use client';

import { useState } from 'react';
import Link from 'next/link';

interface AnalysisResult {
  overallScore: number;
  categories: {
    experience: { score: number; findings: string[] };
    expertise: { score: number; findings: string[] };
    authoritativeness: { score: number; findings: string[] };
    trustworthiness: { score: number; findings: string[] };
  };
  recommendations: string[];
}

export default function AdminEEATPage() {
  const [articleContent, setArticleContent] = useState('');
  const [articleUrl, setArticleUrl] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  const eeatChecklist = {
    experience: [
      { label: 'Author bylines on articles', status: 'complete', priority: 'high' },
      { label: 'Author bio with credentials', status: 'complete', priority: 'high' },
      { label: 'Real customer testimonials', status: 'complete', priority: 'high' },
      { label: 'Case studies or examples', status: 'partial', priority: 'medium' },
      { label: 'First-hand insurance knowledge', status: 'complete', priority: 'high' },
    ],
    expertise: [
      { label: 'Licensed insurance agent credentials', status: 'complete', priority: 'high' },
      { label: 'Oklahoma Insurance Department license #', status: 'complete', priority: 'high' },
      { label: 'Industry-specific content', status: 'complete', priority: 'high' },
      { label: 'Technical accuracy in content', status: 'complete', priority: 'high' },
      { label: 'Up-to-date insurance information', status: 'complete', priority: 'high' },
    ],
    authoritativeness: [
      { label: 'About page with company history', status: 'complete', priority: 'high' },
      { label: 'Physical business address', status: 'complete', priority: 'high' },
      { label: 'Google Business Profile', status: 'complete', priority: 'high' },
      { label: 'Industry association memberships', status: 'incomplete', priority: 'medium' },
      { label: 'Media mentions/press coverage', status: 'incomplete', priority: 'low' },
      { label: 'Citations from authoritative sources', status: 'partial', priority: 'medium' },
    ],
    trustworthiness: [
      { label: 'SSL certificate (HTTPS)', status: 'complete', priority: 'high' },
      { label: 'Privacy policy', status: 'complete', priority: 'high' },
      { label: 'Terms of service', status: 'complete', priority: 'high' },
      { label: 'Contact information visible', status: 'complete', priority: 'high' },
      { label: 'Editorial standards page', status: 'complete', priority: 'medium' },
      { label: 'Advertiser disclosure', status: 'complete', priority: 'high' },
      { label: 'Real Google reviews displayed', status: 'complete', priority: 'high' },
      { label: 'Secure form handling', status: 'complete', priority: 'high' },
    ],
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'complete': return 'bg-green-100 text-green-800';
      case 'partial': return 'bg-yellow-100 text-yellow-800';
      case 'incomplete': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-50 text-red-700 border-red-200';
      case 'medium': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-gray-50 text-gray-700 border-gray-200';
      default: return 'bg-gray-50 text-gray-700';
    }
  };

  const calculateScore = (items: { status: string }[]) => {
    const complete = items.filter(i => i.status === 'complete').length;
    const partial = items.filter(i => i.status === 'partial').length;
    return Math.round(((complete + partial * 0.5) / items.length) * 100);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const analyzeArticle = async () => {
    if (!articleContent.trim() && !articleUrl.trim()) {
      alert('Please enter article content or URL to analyze');
      return;
    }

    setAnalyzing(true);

    // Simulate analysis (in production, this would call an AI API)
    await new Promise(resolve => setTimeout(resolve, 2000));

    const content = articleContent.toLowerCase();

    // Experience analysis
    const experienceChecks = {
      hasAuthorByline: /by\s+[a-z]+\s+[a-z]+/i.test(content) || content.includes('author'),
      hasPersonalExperience: content.includes('experience') || content.includes('worked with') || content.includes('helped'),
      hasExamples: content.includes('example') || content.includes('case study') || content.includes('client'),
      hasFirstPerson: content.includes(' i ') || content.includes(' we ') || content.includes("i've"),
    };
    const experienceScore = Object.values(experienceChecks).filter(Boolean).length * 25;

    // Expertise analysis
    const expertiseChecks = {
      hasCredentials: content.includes('licensed') || content.includes('certified') || content.includes('agent'),
      hasTechnicalTerms: content.includes('deductible') || content.includes('premium') || content.includes('coverage') || content.includes('liability'),
      hasStatistics: /\d+%|\$\d+/.test(content),
      hasSources: content.includes('according to') || content.includes('source') || content.includes('study'),
    };
    const expertiseScore = Object.values(expertiseChecks).filter(Boolean).length * 25;

    // Authoritativeness analysis
    const authorityChecks = {
      hasOrganizationMention: content.includes('insurance department') || content.includes('naic') || content.includes('oklahoma'),
      hasCitations: content.includes('http') || content.includes('www.') || content.includes('source:'),
      hasQuotes: content.includes('"') || content.includes("'"),
      hasExpertMention: content.includes('expert') || content.includes('specialist') || content.includes('professional'),
    };
    const authorityScore = Object.values(authorityChecks).filter(Boolean).length * 25;

    // Trustworthiness analysis
    const trustChecks = {
      hasDisclosure: content.includes('disclosure') || content.includes('advertiser') || content.includes('affiliate'),
      hasContactInfo: content.includes('contact') || content.includes('call') || content.includes('email'),
      hasUpdateDate: content.includes('updated') || content.includes('reviewed') || /\d{4}/.test(content),
      noMisleadingClaims: !content.includes('guaranteed') && !content.includes('always save'),
    };
    const trustScore = Object.values(trustChecks).filter(Boolean).length * 25;

    const overallScore = Math.round((experienceScore + expertiseScore + authorityScore + trustScore) / 4);

    const result: AnalysisResult = {
      overallScore,
      categories: {
        experience: {
          score: experienceScore,
          findings: [
            experienceChecks.hasAuthorByline ? 'Author byline detected' : 'Missing author byline',
            experienceChecks.hasPersonalExperience ? 'Personal experience mentioned' : 'Add personal experience/expertise',
            experienceChecks.hasExamples ? 'Examples/case studies included' : 'Add real-world examples',
            experienceChecks.hasFirstPerson ? 'First-person perspective used' : 'Consider adding personal insights',
          ],
        },
        expertise: {
          score: expertiseScore,
          findings: [
            expertiseChecks.hasCredentials ? 'Professional credentials mentioned' : 'Add author credentials',
            expertiseChecks.hasTechnicalTerms ? 'Industry terminology present' : 'Include more technical terms',
            expertiseChecks.hasStatistics ? 'Statistics/data included' : 'Add relevant statistics',
            expertiseChecks.hasSources ? 'Sources cited' : 'Add source citations',
          ],
        },
        authoritativeness: {
          score: authorityScore,
          findings: [
            authorityChecks.hasOrganizationMention ? 'Authoritative organizations mentioned' : 'Reference authoritative sources',
            authorityChecks.hasCitations ? 'External citations present' : 'Add external links/citations',
            authorityChecks.hasQuotes ? 'Expert quotes included' : 'Add expert quotes',
            authorityChecks.hasExpertMention ? 'Expert references found' : 'Reference industry experts',
          ],
        },
        trustworthiness: {
          score: trustScore,
          findings: [
            trustChecks.hasDisclosure ? 'Proper disclosures present' : 'Add advertiser disclosure',
            trustChecks.hasContactInfo ? 'Contact information included' : 'Add contact information',
            trustChecks.hasUpdateDate ? 'Date/freshness indicated' : 'Add last updated date',
            trustChecks.noMisleadingClaims ? 'No misleading claims detected' : 'Review for misleading claims',
          ],
        },
      },
      recommendations: [],
    };

    // Generate recommendations based on lowest scores
    if (experienceScore < 75) {
      result.recommendations.push('Add author byline with credentials and relevant experience');
    }
    if (expertiseScore < 75) {
      result.recommendations.push('Include more industry statistics and cite authoritative sources');
    }
    if (authorityScore < 75) {
      result.recommendations.push('Reference Oklahoma Insurance Department and industry organizations');
    }
    if (trustScore < 75) {
      result.recommendations.push('Add last updated date and ensure proper disclosures are present');
    }
    if (overallScore < 60) {
      result.recommendations.push('Consider having a licensed insurance professional review and co-author this content');
    }

    setAnalysisResult(result);
    setAnalyzing(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">E-E-A-T Guidance</h1>
        <p className="mt-2 text-gray-600">
          Experience, Expertise, Authoritativeness, and Trustworthiness checklist for Google&apos;s quality guidelines.
        </p>
      </div>

      {/* Article Analyzer */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Article Quality Analyzer</h2>
        <p className="text-sm text-gray-600 mb-4">
          Paste article content or enter a URL to analyze for E-E-A-T compliance and get a quality score (1-100).
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Article URL (optional)
            </label>
            <input
              type="url"
              value={articleUrl}
              onChange={(e) => setArticleUrl(e.target.value)}
              placeholder="https://cheapestcarinsurancetulsa.com/blog/article-slug"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Article Content
            </label>
            <textarea
              value={articleContent}
              onChange={(e) => setArticleContent(e.target.value)}
              placeholder="Paste the full article content here for analysis..."
              rows={8}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y"
            />
          </div>

          <button
            onClick={analyzeArticle}
            disabled={analyzing || (!articleContent.trim() && !articleUrl.trim())}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {analyzing ? 'Analyzing...' : 'Analyze Article'}
          </button>
        </div>

        {/* Analysis Results */}
        {analysisResult && (
          <div className="mt-8 border-t pt-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Analysis Results</h3>
              <div className="text-center">
                <div className={`text-4xl font-bold ${getScoreColor(analysisResult.overallScore)}`}>
                  {analysisResult.overallScore}
                </div>
                <div className="text-sm text-gray-500">Overall Score</div>
              </div>
            </div>

            {/* Category Scores */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {Object.entries(analysisResult.categories).map(([key, value]) => (
                <div key={key} className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm font-medium text-gray-500 capitalize mb-1">{key}</div>
                  <div className={`text-2xl font-bold ${getScoreColor(value.score)}`}>
                    {value.score}%
                  </div>
                </div>
              ))}
            </div>

            {/* Detailed Findings */}
            <div className="space-y-4">
              {Object.entries(analysisResult.categories).map(([key, value]) => (
                <div key={key} className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 capitalize mb-2">{key} Findings</h4>
                  <ul className="space-y-1">
                    {value.findings.map((finding, idx) => (
                      <li key={idx} className="text-sm flex items-center gap-2">
                        <span className={finding.includes('Missing') || finding.includes('Add') || finding.includes('Consider') || finding.includes('Include') || finding.includes('Reference') || finding.includes('Review')
                          ? 'text-yellow-500'
                          : 'text-green-500'
                        }>
                          {finding.includes('Missing') || finding.includes('Add') || finding.includes('Consider') || finding.includes('Include') || finding.includes('Reference') || finding.includes('Review')
                            ? '\u26A0'
                            : '\u2713'
                          }
                        </span>
                        <span className="text-gray-700">{finding}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Recommendations */}
            {analysisResult.recommendations.length > 0 && (
              <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-900 mb-2">Recommendations</h4>
                <ul className="space-y-2">
                  {analysisResult.recommendations.map((rec, idx) => (
                    <li key={idx} className="text-sm text-yellow-800 flex items-start gap-2">
                      <span className="text-yellow-500 mt-0.5">{'\u2022'}</span>
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Score Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
          <div className="text-sm font-medium text-gray-500">Experience</div>
          <div className="mt-2 flex items-baseline">
            <span className="text-3xl font-bold text-gray-900">{calculateScore(eeatChecklist.experience)}%</span>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
          <div className="text-sm font-medium text-gray-500">Expertise</div>
          <div className="mt-2 flex items-baseline">
            <span className="text-3xl font-bold text-gray-900">{calculateScore(eeatChecklist.expertise)}%</span>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-500">
          <div className="text-sm font-medium text-gray-500">Authoritativeness</div>
          <div className="mt-2 flex items-baseline">
            <span className="text-3xl font-bold text-gray-900">{calculateScore(eeatChecklist.authoritativeness)}%</span>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-orange-500">
          <div className="text-sm font-medium text-gray-500">Trustworthiness</div>
          <div className="mt-2 flex items-baseline">
            <span className="text-3xl font-bold text-gray-900">{calculateScore(eeatChecklist.trustworthiness)}%</span>
          </div>
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h3 className="font-semibold text-blue-900 mb-2">Why E-E-A-T Matters</h3>
        <p className="text-blue-800 text-sm">
          E-E-A-T is especially important for YMYL (Your Money Your Life) sites like insurance.
          Google&apos;s Search Quality Raters use these guidelines to evaluate content quality.
          Strong E-E-A-T signals help build trust with both users and search engines.
        </p>
      </div>

      {/* Checklists */}
      <div className="space-y-8">
        {Object.entries(eeatChecklist).map(([key, items]) => (
          <div key={key} className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b">
              <h3 className="font-semibold text-gray-900 capitalize">
                {key === 'experience' ? 'Experience (First E)' :
                 key === 'expertise' ? 'Expertise (Second E)' :
                 key === 'authoritativeness' ? 'Authoritativeness (A)' :
                 'Trustworthiness (T)'}
              </h3>
            </div>
            <div className="divide-y divide-gray-200">
              {items.map((item) => (
                <div key={item.label} className="px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={item.status === 'complete'}
                      readOnly
                      className="h-4 w-4 text-blue-600 rounded"
                    />
                    <span className="text-gray-900">{item.label}</span>
                    <span className={`px-2 py-0.5 text-xs border rounded ${getPriorityBadge(item.priority)}`}>
                      {item.priority}
                    </span>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded ${getStatusColor(item.status)}`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Action Items */}
      <div className="mt-8 bg-white rounded-lg shadow p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Recommended Actions</h3>
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <span className="text-yellow-500">{'\u26A0'}</span>
            <div>
              <div className="font-medium text-gray-900">Add case studies</div>
              <div className="text-sm text-gray-500">Include real examples of how you&apos;ve helped clients save on insurance.</div>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-yellow-500">{'\u26A0'}</span>
            <div>
              <div className="font-medium text-gray-900">Industry association memberships</div>
              <div className="text-sm text-gray-500">Consider joining IIABA or other insurance associations and display memberships.</div>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-yellow-500">{'\u26A0'}</span>
            <div>
              <div className="font-medium text-gray-900">Cite authoritative sources</div>
              <div className="text-sm text-gray-500">Link to Oklahoma Insurance Department, III, and other authoritative sources in content.</div>
            </div>
          </li>
        </ul>
      </div>

      {/* Quick Links */}
      <div className="mt-8 flex gap-4">
        <Link
          href="/admin/editorial"
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
        >
          Editorial Standards
        </Link>
        <Link
          href="/admin/compliance"
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
        >
          Compliance Review
        </Link>
      </div>
    </div>
  );
}
