'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';
import ImageUpload from '@/components/ImageUpload';
import RichTextEditor from '@/components/RichTextEditor';

interface EventFormData {
  title: string;
  details: string;
  event_date: string;
  location: string;
  virtual_link: string;
  is_virtual: boolean;
  image_url: string;
}

// Helper function to generate URL-friendly slug from title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

export default function CreateEvent() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<EventFormData>({
    title: '',
    details: '',
    event_date: '',
    location: '',
    virtual_link: '',
    is_virtual: false,
    image_url: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
      } else {
        setUser(user);
        setLoading(false);
      }
    };
    getUser();
  }, [router]);

  const validateForm = (): string | null => {
    if (!formData.title.trim()) return 'Event title is required';
    if (!formData.details.trim()) return 'Event details are required';
    if (!formData.event_date) return 'Event date is required';
    
    // If it's virtual, virtual link is required
    if (formData.is_virtual && !formData.virtual_link.trim()) {
      return 'Virtual link is required for virtual events';
    }
    
    // If it's not virtual, location is required
    if (!formData.is_virtual && !formData.location.trim()) {
      return 'Location is required for in-person events';
    }

    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);

    // Validate form
    const validationError = validateForm();
    if (validationError) {
      setApiError(validationError);
      return;
    }

    if (!user) {
      setApiError('You must be logged in to create events');
      return;
    }

    setIsSubmitting(true);

    try {
      // Generate slug from title
      const slug = generateSlug(formData.title);

      // Check if slug already exists
      const { data: existingEvent } = await supabase
        .from('events')
        .select('id')
        .eq('slug', slug)
        .single();

      if (existingEvent) {
        throw new Error('An event with this title already exists. Please choose a different title.');
      }

      // Prepare event data
      const eventData = {
        title: formData.title.trim(),
        slug: slug,
        details: formData.details.trim(),
        event_date: formData.event_date,
        location: formData.is_virtual ? null : formData.location.trim(),
        virtual_link: formData.is_virtual ? formData.virtual_link.trim() : null,
        is_virtual: formData.is_virtual,
        image_url: formData.image_url || null,
      };

      // Insert event with approval required
      const { data: event, error: insertError } = await supabase
        .from('events')
        .insert({
          ...eventData,
          published: false, // Always start as unpublished
          approval_required: true
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
          content_type: 'event',
          content_id: event.id,
          submitted_by: user.id,
          status: 'pending',
          action_type: 'create',
          content_data: {
            title: eventData.title,
            slug: eventData.slug,
            details: eventData.details,
            event_date: eventData.event_date,
            location: eventData.location,
            virtual_link: eventData.virtual_link,
            is_virtual: eventData.is_virtual,
            image_url: eventData.image_url
          }
        });

      if (approvalError) {
        console.error('Approval error:', approvalError);
        throw new Error('Event created but approval request failed');
      }

      // Success - redirect to events list
      router.push('/dashboard/events');
    } catch (error: any) {
      console.error('Error creating event:', error);
      setApiError(error.message || 'Failed to create event. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData((prev) => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const handleDetailsChange = (html: string) => {
    setFormData((prev) => ({ ...prev, details: html }));
  };

  const handleImageUpload = (imageUrl: string) => {
    setFormData((prev) => ({ ...prev, image_url: imageUrl }));
  };

  const handleImageRemove = () => {
    setFormData((prev) => ({ ...prev, image_url: '' }));
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Create New Event</h1>
        <p className="mt-2 text-sm text-gray-600">Fill in the details below to create a new event.</p>
      </div>
      
      <div className="bg-white shadow-sm rounded-lg p-4 sm:p-6">
        {apiError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">{apiError}</p>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Event Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Event Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter event title"
            />
          </div>

          {/* Event Details */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Event Details *
            </label>
            <RichTextEditor
              value={formData.details}
              onChange={handleDetailsChange}
              placeholder="Describe the event details... (Use toolbar for Bold, Italic, Link, Align)"
            />
          </div>

          {/* Event Date */}
          <div>
            <label htmlFor="event_date" className="block text-sm font-medium text-gray-700 mb-2">
              Event Date *
            </label>
            <input
              type="datetime-local"
              id="event_date"
              name="event_date"
              value={formData.event_date}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Event Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Event Image
            </label>
            <ImageUpload
              onImageUpload={handleImageUpload}
              currentImageUrl={formData.image_url}
              onImageRemove={handleImageRemove}
              buttonText="Add Event Image"
            />
          </div>

          {/* Virtual Event Toggle */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="is_virtual"
              name="is_virtual"
              checked={formData.is_virtual}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="is_virtual" className="ml-2 block text-sm text-gray-700">
              This is a virtual event
            </label>
          </div>

          {/* Location (for in-person events) */}
          {!formData.is_virtual && (
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                Location *
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required={!formData.is_virtual}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter event location"
              />
            </div>
          )}

          {/* Virtual Link (for virtual events) */}
          {formData.is_virtual && (
            <div>
              <label htmlFor="virtual_link" className="block text-sm font-medium text-gray-700 mb-2">
                Virtual Link *
              </label>
              <input
                type="url"
                id="virtual_link"
                name="virtual_link"
                value={formData.virtual_link}
                onChange={handleChange}
                required={formData.is_virtual}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="https://..."
              />
              <p className="mt-1 text-sm text-gray-500">
                Provide the meeting link, Zoom URL, or platform where the event will be held.
              </p>
            </div>
          )}

          {/* Approval Notice */}
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
                  <p>All events require CMD approval before being published. Your event will be submitted for review.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 sm:flex-none px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-400 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Creating...' : 'Submit for Approval'}
            </button>
            <button
              type="button"
              onClick={() => router.push('/dashboard/events')}
              className="flex-1 sm:flex-none px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 