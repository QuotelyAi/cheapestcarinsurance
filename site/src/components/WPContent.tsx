'use client';

import { useSyncExternalStore } from 'react';

interface WPContentProps {
  html: string;
  className?: string;
}

// Use useSyncExternalStore for hydration-safe client detection
const emptySubscribe = () => () => {};
const getServerSnapshot = () => false;
const getClientSnapshot = () => true;

/**
 * Sanitize WordPress content to remove document-level tags that cause
 * multiple head/body/title issues when rendered inside the page.
 */
function sanitizeWPContent(html: string): string {
  // Remove document-level tags that shouldn't be in content
  let sanitized = html;

  // Remove DOCTYPE, html, head, body tags and their content where appropriate
  sanitized = sanitized.replace(/<!DOCTYPE[^>]*>/gi, '');
  sanitized = sanitized.replace(/<html[^>]*>/gi, '');
  sanitized = sanitized.replace(/<\/html>/gi, '');
  sanitized = sanitized.replace(/<head[^>]*>[\s\S]*?<\/head>/gi, '');
  sanitized = sanitized.replace(/<body[^>]*>/gi, '');
  sanitized = sanitized.replace(/<\/body>/gi, '');

  // Remove standalone title tags (but preserve title attributes)
  sanitized = sanitized.replace(/<title[^>]*>[\s\S]*?<\/title>/gi, '');

  // Remove meta tags that might be in the content
  sanitized = sanitized.replace(/<meta[^>]*>/gi, '');

  // Remove link tags for stylesheets that might cause conflicts
  sanitized = sanitized.replace(/<link[^>]*rel=["']stylesheet["'][^>]*>/gi, '');

  // Remove script tags for security and to prevent conflicts
  sanitized = sanitized.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');

  // Remove base tags
  sanitized = sanitized.replace(/<base[^>]*>/gi, '');

  // Remove header and footer tags (but keep their content)
  sanitized = sanitized.replace(/<header[^>]*>/gi, '<div>');
  sanitized = sanitized.replace(/<\/header>/gi, '</div>');
  sanitized = sanitized.replace(/<footer[^>]*>/gi, '<div>');
  sanitized = sanitized.replace(/<\/footer>/gi, '</div>');

  // Remove broken chart image references (relative paths without proper base)
  // These are from old WordPress content that referenced missing images
  sanitized = sanitized.replace(/<img[^>]*src=["']chart\d+_(pie|bar)\.png["'][^>]*>/gi, '');

  // Remove images with relative src that don't start with http, https, /, or data:
  // This catches orphaned images that would 404
  sanitized = sanitized.replace(/<img[^>]*src=["'](?!https?:\/\/|\/|data:)[^"']+\.png["'][^>]*>/gi, '');

  return sanitized.trim();
}

export default function WPContent({ html, className = '' }: WPContentProps) {
  const isClient = useSyncExternalStore(emptySubscribe, getClientSnapshot, getServerSnapshot);

  // Sanitize the HTML to remove document-level tags
  const sanitizedHtml = sanitizeWPContent(html);

  return (
    <div
      className={className}
      suppressHydrationWarning={!isClient}
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
    />
  );
}
