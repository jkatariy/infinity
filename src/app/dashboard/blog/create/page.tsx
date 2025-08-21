'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';
import ImageUpload from '@/components/ImageUpload';
import RichTextEditor from '@/components/RichTextEditor';

export default function CreateBlogPost() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    published: true,
    featured_image: '',
  });

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data.user) {
        router.push('/login');
      } else {
        setUser(data.user);
        setLoading(false);
      }
    };
    fetchUser();
  }, [router]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleContentChange = (html: string) => {
    setFormData((prev) => ({ ...prev, content: html }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleImageUpload = (imageUrl: string) => {
    setFormData((prev) => ({ ...prev, featured_image: imageUrl }));
  };

  const handleImageRemove = () => {
    setFormData((prev) => ({ ...prev, featured_image: '' }));
  };

  const createSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/-+/g, '-') // Replace multiple consecutive dashes with single dash
      .trim(); // Remove any leading or trailing dashes
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setError('You must be logged in to create a post.');
      return;
    }
    setLoading(true);
    setError('');

    try {
      // Validate inputs
      if (!formData.title.trim()) {
        throw new Error('Title is required');
      }
      if (!formData.content.trim()) {
        throw new Error('Content is required');
      }
      if (formData.title.length > 255) {
        throw new Error('Title must be less than 255 characters');
      }

      const slug = createSlug(formData.title);

      // Check if slug already exists
      const { data: existingPost } = await supabase
        .from('blog_posts')
        .select('id')
        .eq('slug', slug)
        .single();

      if (existingPost) {
        throw new Error('A post with this title already exists. Please choose a different title.');
      }

      // Insert blog post with approval required
      const { data: blogPost, error: insertError } = await supabase
        .from('blog_posts')
        .insert({
          title: formData.title.trim(),
          content: formData.content.trim(),
          author_id: user.id,
          published: false, // Always start as unpublished
          approval_required: true,
          slug: slug,
          featured_image: formData.featured_image || null,
        })
        .select()
        .single();

      if (insertError) {
        console.error('Supabase error:', insertError);
        throw new Error(insertError.message);
      }

      // Create approval request with enhanced data
      const { error: approvalError } = await supabase
        .from('content_approvals')
        .insert({
          content_type: 'blog_post',
          content_id: blogPost.id,
          submitted_by: user.id,
          status: 'pending',
          action_type: 'create',
          content_data: {
            title: formData.title.trim(),
            content: formData.content.trim(),
            slug: slug,
            featured_image: formData.featured_image || null
          }
        });

      if (approvalError) {
        console.error('Approval error:', approvalError);
        throw new Error('Blog post created but approval request failed');
      }

      router.push('/dashboard/blog');
    } catch (err) {
      console.error('Error creating blog post:', err);
      setError(err instanceof Error ? err.message : 'Failed to create blog post');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="md:flex md:items-center md:justify-between mb-6">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Create New Blog Post
          </h2>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <button
            type="button"
            onClick={() => router.push('/dashboard/blog')}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg p-6">
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error</h3>
                <div className="mt-2 text-sm text-red-700">{error}</div>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title *
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="title"
                id="title"
                required
                value={formData.title}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900"
                placeholder="Enter post title"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Content *
            </label>
            <div className="mt-2">
              <RichTextEditor
                value={formData.content}
                onChange={handleContentChange}
                placeholder="Write your post content here... (Use toolbar for Bold, Italic, Link, Align)"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Featured Image
            </label>
            <ImageUpload
              onImageUpload={handleImageUpload}
              currentImageUrl={formData.featured_image}
              onImageRemove={handleImageRemove}
              buttonText="Add Featured Image"
            />
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">Approval Required</h3>
                <div className="mt-2 text-sm text-yellow-700">
                  <p>All blog posts require CMD approval before being published. Your post will be submitted for review.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Publishing...
                </>
              ) : (
                'Submit for Approval'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 