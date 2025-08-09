'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import PageContainer from '@/components/PageContainer';
import { supabase } from '@/lib/supabase';

type Post = {
  id: string;
  created_at: string;
  title: string;
  content: string;
  author_id: string;
  published: boolean;
  slug: string;
  featured_image?: string;
};

// Helper function to generate a color from a string
const stringToColor = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = '#';
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xFF;
    color += ('00' + value.toString(16)).substr(-2);
  }
  return color;
};

// Helper function to get reading time
const getReadingTime = (content: string) => {
  const wordsPerMinute = 200;
  const temp = content.replace(/<[^>]+>/g, ' ');
  const words = temp.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return minutes;
};

// Helper function to get excerpt (strip HTML)
const getExcerpt = (content: string, maxLength: number = 250) => {
  const plain = content.replace(/<[^>]+>/g, ' ');
  if (plain.length <= maxLength) return plain;
  
  // Try to find the end of a sentence within the limit
  const limitedContent = plain.substring(0, maxLength);
  const lastPeriod = limitedContent.lastIndexOf('.');
  const lastExclamation = limitedContent.lastIndexOf('!');
  const lastQuestion = limitedContent.lastIndexOf('?');
  
  const lastSentenceEnd = Math.max(lastPeriod, lastExclamation, lastQuestion);
  
  if (lastSentenceEnd > maxLength * 0.75) {
    return plain.substring(0, lastSentenceEnd + 1);
  }
  
  // If no good sentence break, find the last complete word
  const lastSpace = limitedContent.lastIndexOf(' ');
  return plain.substring(0, lastSpace) + '...';
};

export default function BlogPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('published', true)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setPosts(data || []);
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError('Failed to load blog posts');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="animate-pulse bg-gray-100 h-10 w-1/4 mb-8 rounded"></div>
        {[1, 2, 3].map((n) => (
          <div key={n} className="animate-pulse mb-8">
            <div className="h-40 bg-gray-100 rounded mb-2"></div>
            <div className="h-6 bg-gray-100 w-3/4 mb-2 rounded"></div>
            <div className="h-4 bg-gray-100 w-1/4 mb-4 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-md">
          {error}
          <button
            onClick={() => window.location.reload()}
            className="ml-2 text-red-500 underline"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <PageContainer
      title="From the Blog"
      subtitle="Insights, ideas, and perspectives on the future of packaging automation."
    >
      <div className="grid grid-cols-1 gap-12">
        {posts.map((post, index) => {
          const color1 = stringToColor(post.id);
          const color2 = stringToColor(post.title);
          const readingTime = getReadingTime(post.content);
          const excerpt = getExcerpt(post.content);
          
          return (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative bg-white border border-gray-200 rounded-2xl transition-all duration-300 group-hover:shadow-xl block group cursor-pointer"
              onClick={() => router.push(`/blog/${post.slug}`)}
            >
              {/* Engineering corner accents */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-gray-300 group-hover:border-blue-400 transition-colors duration-300"></div>
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-gray-300 group-hover:border-blue-400 transition-colors duration-300"></div>
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-gray-300 group-hover:border-blue-400 transition-colors duration-300"></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-gray-300 group-hover:border-blue-400 transition-colors duration-300"></div>
                
                {/* Featured Image */}
                {post.featured_image && (
                  <div className="relative h-64 w-full overflow-hidden rounded-t-2xl">
                    <Image
                      src={post.featured_image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                )}
                
                <div className={`${post.featured_image ? 'p-6' : 'p-8'}`}>
                  {!post.featured_image && (
                    <div 
                      className="h-2 w-full rounded-full mb-8"
                      style={{
                        backgroundImage: `linear-gradient(45deg, ${color1}, ${color2})`,
                      }}
                    ></div>
                  )}

                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                    <time dateTime={post.created_at}>
                      {new Date(post.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </time>
                    <span>•</span>
                    <span>{readingTime} min read</span>
                  </div>

                  <h2 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-200">
                    {post.title}
                  </h2>

                  <p className="text-gray-600 mb-6 line-clamp-3">
                    {excerpt}
                  </p>

                  <div className="flex items-center text-blue-600">
                    <span className="font-semibold">Read More</span>
                    <svg
                      className="w-5 h-5 ml-2 transform group-hover:translate-x-2 transition-transform duration-200"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </div>
                </div>
              </motion.article>
          );
        })}
      </div>
    </PageContainer>
  );
} 