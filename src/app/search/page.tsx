'use client';

import { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import PageContainer from '@/components/PageContainer';

// Custom debounce hook
function useDebounce<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): [T, () => void] {
  const timeoutRef = useRef<NodeJS.Timeout>();

  const debouncedCallback = useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => callback(...args), delay);
    },
    [callback, delay]
  ) as T;

  const cancel = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return [debouncedCallback, cancel];
}

interface SearchResult {
  id: string;
  title: string;
  description: string;
  url: string;
  type: 'product' | 'blog' | 'event' | 'page';
  category?: string;
  image?: string;
  relevance: number;
}

interface SearchMeta {
  total: number;
  query: string;
  type: string;
}

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams?.get('q') ?? '';
  const [results, setResults] = useState<SearchResult[]>([]);
  const [meta, setMeta] = useState<SearchMeta | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const router = useRouter();

  // Debounced search function
  const [debouncedSearch, cancelDebouncedSearch] = useDebounce(async (searchQuery: string, filter: string) => {
      if (!searchQuery.trim()) {
        setResults([]);
        setMeta(null);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `/api/search?q=${encodeURIComponent(searchQuery)}${
            filter !== 'all' ? `&type=${filter}` : ''
          }`
        );

        if (!response.ok) {
          throw new Error('Search request failed');
        }

        const data = await response.json();
        
        if (data.error) {
          throw new Error(data.error);
        }

        if (data.success === false) {
          throw new Error(data.error || 'Search service is temporarily unavailable');
        }

        setResults(data.results || []);
        setMeta(data.meta || null);
      } catch (err) {
        console.error('Search error:', err);
        setError(
          err instanceof Error 
            ? err.message 
            : 'An error occurred while searching. Please try again.'
        );
        setResults([]);
        setMeta(null);
      } finally {
        setLoading(false);
      }
    }, 300);

  // Effect to trigger search
  useEffect(() => {
    debouncedSearch(query, activeFilter);
    
    // Cleanup
    return () => {
      cancelDebouncedSearch();
    };
  }, [query, activeFilter, debouncedSearch, cancelDebouncedSearch]);

  // Count results by type
  const resultCounts = {
    all: results.length,
    product: results.filter(r => r.type === 'product').length,
    blog: results.filter(r => r.type === 'blog').length,
    event: results.filter(r => r.type === 'event').length
  };

  return (
    <PageContainer title="Search Results">
      <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Search Results {query ? `for "${query}"` : ''}
          </h1>
          
          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 border-b border-gray-200">
            {[
              { id: 'all', label: 'All Results' },
              { id: 'product', label: 'Products' },
              { id: 'blog', label: 'Blog Posts' },
              { id: 'event', label: 'Events' }
            ].map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-all duration-200 ${
                  activeFilter === filter.id
                    ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                {filter.label}
                {resultCounts[filter.id as keyof typeof resultCounts] > 0 && (
                  <span className="ml-2 text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                    {resultCounts[filter.id as keyof typeof resultCounts]}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Results Section */}
        {loading ? (
          <div className="space-y-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="p-6 bg-red-50 text-red-700 rounded-lg border border-red-200">
            <div className="flex items-center mb-4">
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="font-semibold">Search Error</h3>
            </div>
            <p>{error}</p>
            <button
              onClick={() => debouncedSearch(query, activeFilter)}
              className="mt-4 px-4 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : results.length === 0 ? (
          <div className="text-center py-12">
            <div className="mb-6">
              <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              {query 
                ? `No results found for "${query}"` 
                : 'Enter a search term to begin'}
            </h2>
            <p className="text-gray-600 mb-8">
              {query 
                ? 'Try adjusting your search terms or browse our categories below.' 
                : 'Search for products, blog posts, events, and more.'}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                href="/products"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                Browse Products
              </Link>
              <Link 
                href="/blog"
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H14" />
                </svg>
                Read Blog
              </Link>
              <Link 
                href="/events"
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                View Events
              </Link>
            </div>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <div className="space-y-6">
              {results.map((result, index) => (
                <motion.div
                  key={`${result.type}-${result.id}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="group relative bg-white rounded-xl border border-gray-200 p-6 transition-all duration-300 hover:shadow-lg"
                  onClick={() => router.push(result.url)}
                >
                  {/* Result Type Badge */}
                  <span className={`absolute top-4 right-4 text-xs font-medium px-2.5 py-1 rounded-full ${
                    result.type === 'product' 
                      ? 'bg-blue-100 text-blue-700'
                      : result.type === 'blog'
                      ? 'bg-green-100 text-green-700'
                      : result.type === 'page'
                      ? 'bg-gray-100 text-gray-700'
                      : 'bg-purple-100 text-purple-700'
                  }`}>
                    {result.type.charAt(0).toUpperCase() + result.type.slice(1)}
                  </span>

                  <div className="flex items-start space-x-4">
                    {/* Image */}
                    {result.image && (
                      <div className="flex-shrink-0 w-24 h-24 relative rounded-lg overflow-hidden bg-gray-100">
                        <Image
                          src={result.image}
                          alt={result.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 96px) 100vw, 96px"
                          onError={(e) => {
                            // Hide image on error
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                      </div>
                    )}

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h2 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                        {result.title}
                      </h2>
                      {result.category && (
                        <p className="text-sm text-blue-600 mb-2 capitalize">
                          {result.category.replace(/-/g, ' ')}
                        </p>
                      )}
                      <p className="text-gray-600 line-clamp-2">{result.description}</p>
                    </div>

                    {/* Arrow indicator */}
                    <div className="hidden sm:flex items-center text-gray-400 group-hover:text-blue-500 transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        )}

        {/* Search Meta Info */}
        {meta && results.length > 0 && (
          <div className="mt-8 text-sm text-gray-500 text-center">
            Found {meta.total} results for "{meta.query}"
            {meta.type !== 'all' && ` in ${meta.type}s`}
          </div>
        )}
      </div>
    </PageContainer>
  );
} 