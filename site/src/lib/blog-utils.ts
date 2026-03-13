import { WPPost } from './wordpress';

/**
 * Generates a URL-safe slug from a title string
 * - Converts to lowercase
 * - Removes special characters
 * - Replaces spaces with hyphens
 * - Removes accented characters
 * - Collapses multiple hyphens
 * - Trims leading/trailing hyphens
 */
export function generateSlug(title: string): string {
  if (!title) return '';

  // Normalize accented characters
  const normalized = title
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

  // Convert to lowercase
  let slug = normalized.toLowerCase();

  // Replace spaces with hyphens
  slug = slug.replace(/\s+/g, '-');

  // Remove special characters (keep only lowercase letters, numbers, and hyphens)
  slug = slug.replace(/[^a-z0-9-]/g, '');

  // Collapse multiple consecutive hyphens
  slug = slug.replace(/-+/g, '-');

  // Trim leading and trailing hyphens
  slug = slug.replace(/^-+|-+$/g, '');

  return slug;
}

/**
 * Validation result type
 */
export interface ValidationResult {
  valid: boolean;
  errors: Record<string, string>;
}

/**
 * Validates a blog post object
 * Checks:
 * - title: required, max 255 chars
 * - content: required, non-empty
 * - excerpt: max 500 chars (optional)
 * - slug: required, only lowercase, numbers, hyphens
 * - categories: must be array
 */
export function validateBlogPost(
  data: Partial<WPPost>
): ValidationResult {
  const errors: Record<string, string> = {};

  // Validate title
  if (!data.title || typeof data.title !== 'string' || !data.title.trim()) {
    errors.title = 'Title is required';
  } else if (data.title.length > 255) {
    errors.title = 'Title must not exceed 255 characters';
  }

  // Validate content
  if (!data.content || typeof data.content !== 'string' || !data.content.trim()) {
    errors.content = 'Content is required';
  }

  // Validate excerpt (optional but has max length)
  if (data.excerpt !== undefined && data.excerpt !== null) {
    if (typeof data.excerpt === 'string' && data.excerpt.length > 500) {
      errors.excerpt = 'Excerpt must not exceed 500 characters';
    }
  }

  // Validate slug
  if (!data.slug || typeof data.slug !== 'string' || !data.slug.trim()) {
    errors.slug = 'Slug is required';
  } else if (!/^[a-z0-9-]+$/.test(data.slug)) {
    errors.slug = 'Slug must contain only lowercase letters, numbers, and hyphens';
  }

  // Validate categories
  if (data.categories !== undefined && data.categories !== null) {
    if (!Array.isArray(data.categories)) {
      errors.categories = 'Categories must be an array';
    }
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Returns current timestamp in ISO 8601 format (UTC)
 */
export function getCurrentTimestamp(): string {
  return new Date().toISOString();
}

/**
 * Generates a unique post ID based on current timestamp
 */
export function generatePostId(): number {
  return Date.now();
}
