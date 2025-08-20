'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { type Post } from '@/lib/supabase-server';

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

interface BlogCardProps {
  post: Post;
  index: number;
}

export default function BlogCard({ post, index }: BlogCardProps) {
  const color1 = stringToColor(post.id);
  const color2 = stringToColor(post.title);
  const readingTime = getReadingTime(post.content);
  const excerpt = getExcerpt(post.content);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative bg-white border border-gray-200 rounded-2xl transition-all duration-300 hover:shadow-xl group [content-visibility:auto] [contain-intrinsic-size:1px_400px]"
    >
      <Link href={`/blog/${post.slug}`} className="block">
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
              className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
