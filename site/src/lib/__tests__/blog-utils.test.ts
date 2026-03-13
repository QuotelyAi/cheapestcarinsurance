import {
  generateSlug,
  validateBlogPost,
  getCurrentTimestamp,
  generatePostId,
} from '../blog-utils';
import { WPPost } from '../wordpress';

describe('blog-utils', () => {
  describe('generateSlug', () => {
    it('should convert title to lowercase', () => {
      expect(generateSlug('Hello World')).toBe('hello-world');
    });

    it('should replace spaces with hyphens', () => {
      expect(generateSlug('This Is A Test')).toBe('this-is-a-test');
    });

    it('should remove special characters', () => {
      expect(generateSlug('Hello & World!')).toBe('hello-world');
    });

    it('should collapse multiple hyphens into single hyphen', () => {
      expect(generateSlug('Hello -- World')).toBe('hello-world');
    });

    it('should handle numbers', () => {
      expect(generateSlug('Article 123')).toBe('article-123');
    });

    it('should handle mixed case with special chars', () => {
      expect(generateSlug('Check Out This!!!  Article (2024)')).toBe(
        'check-out-this-article-2024'
      );
    });

    it('should trim leading and trailing hyphens', () => {
      expect(generateSlug('---hello world---')).toBe('hello-world');
    });

    it('should handle empty string', () => {
      expect(generateSlug('')).toBe('');
    });

    it('should handle title with only special characters', () => {
      expect(generateSlug('!!!***')).toBe('');
    });

    it('should remove accented characters', () => {
      expect(generateSlug('Café Naïve')).toBe('cafe-naive');
    });
  });

  describe('validateBlogPost', () => {
    const validPost: Partial<WPPost> = {
      title: 'Valid Title',
      content: 'Some content here',
      excerpt: 'A short excerpt',
      slug: 'valid-slug',
      categories: [1, 2],
    };

    it('should validate a correct post', () => {
      const result = validateBlogPost(validPost);
      expect(result.valid).toBe(true);
      expect(Object.keys(result.errors).length).toBe(0);
    });

    it('should require title', () => {
      const post = { ...validPost, title: undefined };
      const result = validateBlogPost(post);
      expect(result.valid).toBe(false);
      expect(result.errors.title).toBeDefined();
    });

    it('should require title to not be empty string', () => {
      const post = { ...validPost, title: '' };
      const result = validateBlogPost(post);
      expect(result.valid).toBe(false);
      expect(result.errors.title).toBeDefined();
    });

    it('should enforce max 255 chars on title', () => {
      const post = { ...validPost, title: 'a'.repeat(256) };
      const result = validateBlogPost(post);
      expect(result.valid).toBe(false);
      expect(result.errors.title).toBeDefined();
    });

    it('should allow 255 char title', () => {
      const post = { ...validPost, title: 'a'.repeat(255) };
      const result = validateBlogPost(post);
      expect(result.errors.title).toBeUndefined();
    });

    it('should require content', () => {
      const post = { ...validPost, content: undefined };
      const result = validateBlogPost(post);
      expect(result.valid).toBe(false);
      expect(result.errors.content).toBeDefined();
    });

    it('should require content to not be empty string', () => {
      const post = { ...validPost, content: '' };
      const result = validateBlogPost(post);
      expect(result.valid).toBe(false);
      expect(result.errors.content).toBeDefined();
    });

    it('should enforce max 500 chars on excerpt', () => {
      const post = { ...validPost, excerpt: 'a'.repeat(501) };
      const result = validateBlogPost(post);
      expect(result.valid).toBe(false);
      expect(result.errors.excerpt).toBeDefined();
    });

    it('should allow 500 char excerpt', () => {
      const post = { ...validPost, excerpt: 'a'.repeat(500) };
      const result = validateBlogPost(post);
      expect(result.errors.excerpt).toBeUndefined();
    });

    it('should allow empty excerpt', () => {
      const post = { ...validPost, excerpt: '' };
      const result = validateBlogPost(post);
      expect(result.errors.excerpt).toBeUndefined();
    });

    it('should require slug', () => {
      const post = { ...validPost, slug: undefined };
      const result = validateBlogPost(post);
      expect(result.valid).toBe(false);
      expect(result.errors.slug).toBeDefined();
    });

    it('should require slug to not be empty string', () => {
      const post = { ...validPost, slug: '' };
      const result = validateBlogPost(post);
      expect(result.valid).toBe(false);
      expect(result.errors.slug).toBeDefined();
    });

    it('should only allow lowercase in slug', () => {
      const post = { ...validPost, slug: 'Invalid-Slug' };
      const result = validateBlogPost(post);
      expect(result.valid).toBe(false);
      expect(result.errors.slug).toBeDefined();
    });

    it('should only allow numbers and hyphens in slug', () => {
      const post = { ...validPost, slug: 'invalid_slug' };
      const result = validateBlogPost(post);
      expect(result.valid).toBe(false);
      expect(result.errors.slug).toBeDefined();
    });

    it('should allow valid slug with numbers and hyphens', () => {
      const post = { ...validPost, slug: 'valid-slug-123' };
      const result = validateBlogPost(post);
      expect(result.errors.slug).toBeUndefined();
    });

    it('should require categories to be array', () => {
      const post = { ...validPost, categories: 'not-an-array' as any };
      const result = validateBlogPost(post);
      expect(result.valid).toBe(false);
      expect(result.errors.categories).toBeDefined();
    });

    it('should allow empty categories array', () => {
      const post = { ...validPost, categories: [] };
      const result = validateBlogPost(post);
      expect(result.errors.categories).toBeUndefined();
    });

    it('should return multiple errors at once', () => {
      const post = {
        title: '',
        content: '',
        slug: 'INVALID',
        categories: null as any,
      };
      const result = validateBlogPost(post);
      expect(result.valid).toBe(false);
      expect(Object.keys(result.errors).length).toBeGreaterThan(1);
    });
  });

  describe('getCurrentTimestamp', () => {
    it('should return ISO 8601 format string', () => {
      const timestamp = getCurrentTimestamp();
      expect(typeof timestamp).toBe('string');
      // Check ISO 8601 format: YYYY-MM-DDTHH:mm:ss.sssZ
      expect(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(timestamp)).toBe(
        true
      );
    });

    it('should return a valid date string', () => {
      const timestamp = getCurrentTimestamp();
      const date = new Date(timestamp);
      expect(date instanceof Date).toBe(true);
      expect(date.getTime()).not.toBeNaN();
    });

    it('should return approximately current time', () => {
      const before = Date.now();
      const timestamp = getCurrentTimestamp();
      const after = Date.now();
      const timestampMs = new Date(timestamp).getTime();

      expect(timestampMs).toBeGreaterThanOrEqual(before - 100);
      expect(timestampMs).toBeLessThanOrEqual(after + 100);
    });
  });

  describe('generatePostId', () => {
    it('should return a number', () => {
      const id = generatePostId();
      expect(typeof id).toBe('number');
    });

    it('should return positive number', () => {
      const id = generatePostId();
      expect(id).toBeGreaterThan(0);
    });

    it('should return unique IDs with millisecond separation', async () => {
      const id1 = generatePostId();
      await new Promise(resolve => setTimeout(resolve, 1));
      const id2 = generatePostId();
      expect(id2).toBeGreaterThan(id1);
    });

    it('should return timestamp-based ID', () => {
      const before = Date.now();
      const id = generatePostId();
      const after = Date.now();

      expect(id).toBeGreaterThanOrEqual(before);
      expect(id).toBeLessThanOrEqual(after);
    });
  });
});
