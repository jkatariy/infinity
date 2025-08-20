'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ImageUploadProps {
  onImageUpload: (imageUrl: string) => void;
  currentImageUrl?: string;
  onImageRemove?: () => void;
  className?: string;
  buttonText?: string;
}

export default function ImageUpload({
  onImageUpload,
  currentImageUrl,
  onImageRemove,
  className = '',
  buttonText = 'Add Image'
}: ImageUploadProps) {
  const [isAddingUrl, setIsAddingUrl] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateImageUrl = (url: string): boolean => {
    if (!url) return false;
    
    // Basic URL validation
    try {
      new URL(url);
    } catch {
      return false;
    }
    
    // Check if it's likely an image URL
    const imageExtensions = /\.(jpg|jpeg|png|gif|webp|bmp|svg)(\?.*)?$/i;
    const commonImageHosts = /(imgur|cloudinary|unsplash|pexels|pixabay|amazonaws|googleusercontent|githubusercontent)/i;
    
    return imageExtensions.test(url) || commonImageHosts.test(url);
  };

  const handleUrlSubmit = async () => {
    if (!imageUrl.trim()) {
      setError('Please enter an image URL');
      return;
    }

    if (!validateImageUrl(imageUrl)) {
      setError('Please enter a valid image URL (jpg, png, gif, webp, etc.)');
      return;
    }

    setIsLoading(true);
    setError(null);

    // Test if image loads
    const imgElement = new window.Image();
    imgElement.onload = () => {
      console.log('✅ Image loaded successfully:', imageUrl);
      onImageUpload(imageUrl);
      setIsAddingUrl(false);
      setImageUrl('');
      setIsLoading(false);
    };
    
    imgElement.onerror = () => {
      console.error('❌ Failed to load image:', imageUrl);
      setError('Failed to load image. Please check the URL and try again.');
      setIsLoading(false);
    };
    
    imgElement.src = imageUrl;
  };

  const handleCancel = () => {
    setIsAddingUrl(false);
    setImageUrl('');
    setError(null);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
          {error}
        </div>
      )}
      
      {currentImageUrl && (
        <div className="relative h-48 rounded-lg border border-gray-300 overflow-hidden">
          <Image
            src={currentImageUrl}
            alt="Current image"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 400px"
          />
          {onImageRemove && (
            <button
              type="button"
              onClick={onImageRemove}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors duration-200"
              title="Remove image"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      )}
      
      {!isAddingUrl ? (
        <div className="flex flex-col sm:flex-row gap-2">
          <button
            type="button"
            onClick={() => setIsAddingUrl(true)}
            className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
            {currentImageUrl ? 'Change Image URL' : buttonText}
          </button>
          
          {currentImageUrl && onImageRemove && (
            <button
              type="button"
              onClick={onImageRemove}
              className="flex items-center justify-center px-4 py-2 border border-red-300 rounded-md shadow-sm text-sm font-medium text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Remove Image
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          <div>
            <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">
              Image URL
            </label>
            <input
              type="url"
              id="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              disabled={isLoading}
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <button
              type="button"
              onClick={handleUrlSubmit}
              disabled={isLoading || !imageUrl.trim()}
              className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <svg className="w-4 h-4 mr-2 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Loading...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Add Image
                </>
              )}
            </button>
            
            <button
              type="button"
              onClick={handleCancel}
              disabled={isLoading}
              className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      
      <p className="text-sm text-gray-500">
        Add images from any URL (JPG, PNG, GIF, WebP). Try Unsplash, Imgur, or any public image URL.
      </p>
    </div>
  );
}