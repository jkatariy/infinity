import { Metadata } from 'next';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';
import PageContainer from '@/components/PageContainer';
import { getBlogPosts, type Post } from '@/lib/supabase-server';

// Enable ISR with 30 minutes revalidation for blog listing
export const revalidate = 1800;

export const metadata: Metadata = {
  title: 'Blog - Packaging Automation Insights | Infinity Automated Solutions',
  description: 'Discover insights, ideas, and perspectives on the future of packaging automation, industrial solutions, and manufacturing technology from Infinity Automated Solutions.',
  keywords: 'packaging automation blog, industrial automation insights, manufacturing technology, FMCG packaging, automation trends, Infinity Automated Solutions',
  openGraph: {
    title: 'Blog - Packaging Automation Insights | Infinity Automated Solutions',
    description: 'Discover insights, ideas, and perspectives on the future of packaging automation, industrial solutions, and manufacturing technology.',
    images: [
      {
        url: 'https://infinitysols.com/logos/logo.png',
        width: 1200,
        height: 630,
        alt: 'Infinity Automated Solutions Blog',
      },
    ],
    url: 'https://infinitysols.com/blog',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog - Packaging Automation Insights | Infinity Automated Solutions',
    description: 'Discover insights, ideas, and perspectives on the future of packaging automation, industrial solutions, and manufacturing technology.',
    images: ['https://infinitysols.com/logos/logo.png'],
  },
  alternates: {
    canonical: 'https://infinitysols.com/blog',
  },
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

interface BlogCardProps {
  post: Post;
  index: number;
}

function BlogCard({ post, index }: BlogCardProps) {
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

export default async function BlogPage() {
  const posts = await getBlogPosts();

  if (posts.length === 0) {
    return (
      <PageContainer
        title="From the Blog"
        subtitle="Insights, ideas, and perspectives on the future of packaging automation."
      >
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No blog posts available at the moment.</p>
          <p className="text-gray-500 mt-2">Check back soon for the latest insights on packaging automation.</p>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer
      title="From the Blog"
      subtitle="Insights, ideas, and perspectives on the future of packaging automation."
    >
      <div className="grid grid-cols-1 gap-12">
        {posts.map((post, index) => (
          <BlogCard key={post.id} post={post} index={index} />
        ))}
      </div>
    </PageContainer>
  );
}