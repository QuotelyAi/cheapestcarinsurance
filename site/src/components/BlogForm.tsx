'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { WPPost, WPCategory } from '@/lib/wordpress';
import { generateSlug } from '@/lib/blog-utils';

interface BlogFormProps {
  post?: WPPost;
  categories?: WPCategory[];
  isLoading?: boolean;
  onSubmit?: (data: Partial<WPPost>) => void;
}

interface FormData {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  categories: number[];
}

interface FormErrors {
  title?: string;
  slug?: string;
  excerpt?: string;
  content?: string;
  categories?: string;
}

export default function BlogForm({
  post,
  categories = [],
  isLoading = false,
  onSubmit,
}: BlogFormProps) {
  const router = useRouter();
  const isEditMode = !!post;

  // Form state
  const [formData, setFormData] = useState<FormData>({
    title: post?.title || '',
    slug: post?.slug || '',
    excerpt: post?.excerpt || '',
    content: post?.content || '',
    categories: post?.categories || [],
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSaving, setIsSaving] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  // Auto-generate slug in create mode when title changes
  useEffect(() => {
    if (!isEditMode && formData.title) {
      const newSlug = generateSlug(formData.title);
      setFormData(prev => ({ ...prev, slug: newSlug }));
    }
  }, [formData.title, isEditMode]);

  // Clear error when user starts editing a field
  const handleFieldChange = (field: keyof FormData) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[field as keyof FormErrors];
      return newErrors;
    });
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, title: value }));
    handleFieldChange('title');
  };

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, slug: value }));
    handleFieldChange('slug');
  };

  const handleExcerptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, excerpt: value }));
    handleFieldChange('excerpt');
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, content: value }));
    handleFieldChange('content');
  };

  const handleCategoryToggle = (categoryId: number) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.includes(categoryId)
        ? prev.categories.filter(id => id !== categoryId)
        : [...prev.categories, categoryId],
    }));
    handleFieldChange('categories');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setApiError(null);
    setIsSaving(true);

    try {
      // Call optional onSubmit callback if provided
      if (onSubmit) {
        onSubmit(formData);
        setIsSaving(false);
        return;
      }

      // Prepare request body
      const requestBody = {
        title: formData.title,
        slug: formData.slug,
        excerpt: formData.excerpt,
        content: formData.content,
        categories: formData.categories,
      };

      // Determine endpoint and method
      const url = isEditMode ? `/api/admin/blogs/${post!.id}` : '/api/admin/blogs';
      const method = isEditMode ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const data = await response.json();

        // Handle validation errors (400 response)
        if (response.status === 400 && data.errors) {
          setErrors(data.errors);
          setApiError(data.error || 'Validation failed. Please check the form fields.');
          setIsSaving(false);
          return;
        }

        // Handle slug conflict (409 response)
        if (response.status === 409) {
          setErrors(prev => ({
            ...prev,
            slug: 'This slug is already in use. Please choose a different one.',
          }));
          setApiError(data.error || 'Slug conflict');
          setIsSaving(false);
          return;
        }

        // Handle other errors
        setApiError(
          data.error ||
          (isEditMode ? 'Failed to update article' : 'Failed to create article')
        );
        setIsSaving(false);
        return;
      }

      // Success - redirect to blog listing
      router.push('/admin/blogs');
      router.refresh();
    } catch (error) {
      console.error('Error submitting form:', error);
      setApiError(
        error instanceof Error
          ? error.message
          : (isEditMode ? 'Failed to update article' : 'Failed to create article')
      );
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  const buttonText = isEditMode ? 'Update Article' : 'Create Article';

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* API Error Alert */}
      {apiError && (
        <div className="rounded-lg bg-red-50 border border-red-200 p-4">
          <p className="text-sm text-red-800 font-medium">Error</p>
          <p className="text-sm text-red-700 mt-1">{apiError}</p>
        </div>
      )}

      {/* Title Field */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="title"
          value={formData.title}
          onChange={handleTitleChange}
          placeholder="Enter article title"
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
            errors.title ? 'border-red-500 bg-red-50' : 'border-gray-300'
          }`}
          disabled={isSaving || isLoading}
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title}</p>
        )}
      </div>

      {/* Slug Field */}
      <div>
        <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-1">
          URL Slug <span className="text-red-500">*</span>
        </label>
        <div className="flex items-center gap-2">
          <span className="text-gray-600 font-medium">/blog/</span>
          <input
            type="text"
            id="slug"
            value={formData.slug}
            onChange={handleSlugChange}
            placeholder="article-title"
            className={`flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
              errors.slug ? 'border-red-500 bg-red-50' : 'border-gray-300'
            }`}
            disabled={isSaving || isLoading}
          />
        </div>
        {errors.slug && (
          <p className="mt-1 text-sm text-red-600">{errors.slug}</p>
        )}
        {!isEditMode && (
          <p className="mt-1 text-xs text-gray-500">
            Auto-generated from title. Edit to customize.
          </p>
        )}
      </div>

      {/* Excerpt Field */}
      <div>
        <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-1">
          Excerpt <span className="text-gray-400 text-xs">(for meta description)</span>
        </label>
        <textarea
          id="excerpt"
          value={formData.excerpt}
          onChange={handleExcerptChange}
          placeholder="Brief summary of the article (optional)"
          rows={3}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none ${
            errors.excerpt ? 'border-red-500 bg-red-50' : 'border-gray-300'
          }`}
          disabled={isSaving || isLoading}
        />
        <p className="mt-1 text-xs text-gray-500">
          {formData.excerpt.length}/500 characters
        </p>
        {errors.excerpt && (
          <p className="mt-1 text-sm text-red-600">{errors.excerpt}</p>
        )}
      </div>

      {/* Content Field */}
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
          Content <span className="text-red-500">*</span>
        </label>
        <textarea
          id="content"
          value={formData.content}
          onChange={handleContentChange}
          placeholder="Enter article content (HTML or plain text)"
          rows={12}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none font-mono text-sm ${
            errors.content ? 'border-red-500 bg-red-50' : 'border-gray-300'
          }`}
          disabled={isSaving || isLoading}
        />
        {errors.content && (
          <p className="mt-1 text-sm text-red-600">{errors.content}</p>
        )}
      </div>

      {/* Categories Field */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Categories
        </label>
        {categories.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {categories.map(category => (
              <label
                key={category.id}
                className="flex items-center space-x-2 p-2 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50 transition"
              >
                <input
                  type="checkbox"
                  checked={formData.categories.includes(category.id)}
                  onChange={() => handleCategoryToggle(category.id)}
                  disabled={isSaving || isLoading}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{category.name}</span>
              </label>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">No categories available</p>
        )}
        {errors.categories && (
          <p className="mt-1 text-sm text-red-600">{errors.categories}</p>
        )}
      </div>

      {/* Form Actions */}
      <div className="flex gap-3 pt-6 border-t border-gray-200">
        <button
          type="submit"
          disabled={isSaving || isLoading}
          className="flex-1 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
        >
          {isSaving || isLoading ? 'Saving...' : buttonText}
        </button>
        <button
          type="button"
          onClick={handleCancel}
          disabled={isSaving || isLoading}
          className="px-4 py-2 bg-gray-200 text-gray-800 font-medium rounded-lg hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed transition"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
