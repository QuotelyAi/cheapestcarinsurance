'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

interface MenuItem {
  href: string;
  label: string;
}

interface MenuSection {
  label: string;
  icon: string;
  items: MenuItem[];
}

const menuSections: MenuSection[] = [
  {
    label: 'Content',
    icon: '&#128196;',
    items: [
      { href: '/admin/blogs', label: 'Blog Posts' },
      { href: '/admin/blogs/new', label: 'Write New Article' },
      { href: '/admin/pages', label: 'Static Pages' },
      { href: '/admin/media', label: 'Media Library' },
    ],
  },
  {
    label: 'SEO',
    icon: '&#128200;',
    items: [
      { href: '/admin/seo', label: 'SEO Analysis' },
      { href: '/admin/sitemap', label: 'Sitemap Management' },
      { href: '/admin/eeat', label: 'E-E-A-T Guidance' },
      { href: '/admin/performance', label: 'Page Speed' },
    ],
  },
  {
    label: 'Leads',
    icon: '&#128100;',
    items: [
      { href: '/admin/leads', label: 'All Leads' },
      { href: '/admin/leads?type=form', label: 'Form Submissions' },
      { href: '/admin/leads?type=pdf', label: 'Document Uploads' },
    ],
  },
  {
    label: 'News',
    icon: '&#128240;',
    items: [
      { href: '/admin/news', label: 'Industry News' },
      { href: '/admin/rss', label: 'RSS Feed Sources' },
    ],
  },
  {
    label: 'Editorial',
    icon: '&#9989;',
    items: [
      { href: '/admin/editorial', label: 'Editorial Standards' },
      { href: '/admin/compliance', label: 'Compliance Review' },
    ],
  },
];

export default function AdminNav() {
  const router = useRouter();
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleLogout = async () => {
    await fetch('/api/admin/auth', { method: 'DELETE' });
    router.refresh();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setOpenMenu(null);
  }, [pathname]);

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/admin" className="text-xl font-semibold text-gray-900 hover:text-gray-700">
              Admin Dashboard
            </Link>
          </div>

          <div className="flex items-center space-x-1" ref={menuRef}>
            {/* Dashboard Link */}
            <Link
              href="/admin"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                pathname === '/admin'
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              Overview
            </Link>

            {/* Dropdown Menus */}
            {menuSections.map((section) => (
              <div key={section.label} className="relative">
                <button
                  type="button"
                  onClick={() => setOpenMenu(openMenu === section.label ? null : section.label)}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium ${
                    openMenu === section.label
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <span dangerouslySetInnerHTML={{ __html: section.icon }} />
                  <span>{section.label}</span>
                  <svg
                    className={`w-4 h-4 transition-transform ${openMenu === section.label ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {openMenu === section.label && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
                    {section.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`block px-4 py-2 text-sm hover:bg-gray-100 ${
                          pathname === item.href
                            ? 'text-blue-600 bg-blue-50'
                            : 'text-gray-700'
                        }`}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Logout */}
            <button
              type="button"
              onClick={handleLogout}
              className="ml-4 px-3 py-2 text-sm text-gray-500 hover:text-gray-700"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
